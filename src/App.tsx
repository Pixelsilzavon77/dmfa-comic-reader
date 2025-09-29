import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { App as CapacitorApp } from '@capacitor/app';
import { Header } from './components/Header';
import { checkForUpdates, getUpdateStates, acknowledgeNewIndicator } from './utils/updateChecker';
import { comicConfigs, updateDmfaTotalPages } from './comicConfigs';
import { UnifiedComicViewer } from './components/UnifiedComicViewer';
import { ArchiveViewer } from './components/ArchiveViewer';
import { BookmarkModal } from './components/BookmarkModal';
import { PopupMenu } from './components/PopupMenu';
import { CastModal } from './components/CastModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { LandingPage } from './components/LandingPage';
import { DemonologyModal } from './components/DemonologyModal';
import { WryEasterEgg } from './components/WryEasterEgg';
import { SensitiveContentWarning } from './components/SensitiveContentWarning';
import type { Bookmark, ComicIdentifier } from './types';
import { configUpdateEvents, CONFIG_UPDATE_EVENT } from './comicConfigs';
import { getChaptersWithDynamicEnd } from './utils/chapterUtils';
import { BASE_CHAPTERS } from './constants';

const BOOKMARKS_STORAGE_KEY = 'dmfa-reader-bookmarks';

type View = 'landing' | 'comic' | 'archive' | 'abel_comic' | 'matilda_comic' | 'cubi_mind_abilities_comic' | 'furrae_fashion_laws_comic' | 'hybrid_genetics_comic' | 'cubi_clan_leaders_comic' | 'perfect_date_comic' | 'taking_pride_comic' | 'borked_wrist_comic' | 'uncanon_christmas_comic' | 'bonus_comics_comic' | 'wallpaper_wars_comic' | 'wry_easter_egg' | 'wry_main_comic' | 'wry_stuff_comic' | 'wry_np_comic' | 'wry_sketches_comic';

interface BookmarkEditConfig {
  page: number;
  note: string;
  comic: ComicIdentifier;
}

const App: React.FC = () => {
  const [comicPages, setComicPages] = useState<Record<ComicIdentifier, number>>(() => {
    const pages: Record<ComicIdentifier, number> = {
      dmfa: 1,
      abel: 1,
      matilda: 1,
      cubiMindAbilities: 1,
      furraaeFashionLaws: 1,
      hybridGenetics: 1,
      cubiClanLeaders: 1,
      perfectDate: 1,
      takingPride: 1,
      borkedWrist: 1,
      uncanonChristmas: 1,
      bonusComics: 1,
      wallpaperWars: 1,
      wryMain: 1,
      wryStuff: 1,
      wryNP: 1,
      wrySketches: 1
    };
    try {
      Object.values(comicConfigs).forEach(config => {
        const isBonusComic = ['cubiMindAbilities', 'furraaeFashionLaws', 'hybridGenetics', 'cubiClanLeaders', 'perfectDate', 'takingPride', 'borkedWrist', 'uncanonChristmas', 'bonusComics', 'wallpaperWars', 'wryMain', 'wryStuff', 'wryNP', 'wrySketches'].includes(config.id);
        
        if (isBonusComic) {
          // Bonus comics always start at page 1
          pages[config.id] = 1;
        } else {
          // Main story comics load saved progress
          const savedPage = localStorage.getItem(config.storageKey);
          pages[config.id] = savedPage ? 
            Math.max(1, Math.min(parseInt(savedPage, 10), config.totalPages)) : 
            1;
        }
      });
    } catch (e) {
      console.error('Failed to load comic pages', e);
      Object.values(comicConfigs).forEach(config => {
        pages[config.id] = 1;
      });
    }
    return pages;
  });

  const [view, setView] = useState<View>('landing');
  const [showSensitiveContentWarning, setShowSensitiveContentWarning] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmarkEditConfig, setBookmarkEditConfig] = useState<BookmarkEditConfig | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCastModalOpen, setIsCastModalOpen] = useState(false);
  const [isDemonologyModalOpen, setIsDemonologyModalOpen] = useState(false);
  const [deletionTarget, setDeletionTarget] = useState<Bookmark | null>(null);

  useEffect(() => {
    try {
      Object.values(comicConfigs).forEach(config => {
        localStorage.setItem(config.storageKey, String(comicPages[config.id]));
      });
    } catch (e) {
      console.error('Failed to save comic progress', e);
    }
  }, [comicPages]);

  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (savedBookmarks) {
        // The 'any' type is used here for safe migration of untyped legacy bookmarks
        const parsedBookmarks: any[] = JSON.parse(savedBookmarks);
        
        const migratedBookmarks: Bookmark[] = parsedBookmarks.map(b => ({
          ...b,
          comic: b.comic || 'dmfa', // Add 'dmfa' if comic property is missing
          timestamp: b.timestamp || Date.now(), // Ensure timestamp exists
        }));

        setBookmarks(migratedBookmarks);
      }
    } catch (e) {
      console.error("Failed to load bookmarks", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.error("Failed to save bookmarks", e);
    }
  }, [bookmarks]);

  const [updateStates, setUpdateStates] = useState(() => getUpdateStates());
  const [dmfaPages, setDmfaPages] = useState(() => comicConfigs.dmfa.totalPages);

  // Listen for config updates
  useEffect(() => {
    const handleConfigUpdate = (event: CustomEvent<{ newTotal: number }>) => {
      setDmfaPages(event.detail.newTotal);
    };

    configUpdateEvents.addEventListener(CONFIG_UPDATE_EVENT, handleConfigUpdate as EventListener);
    return () => {
      configUpdateEvents.removeEventListener(CONFIG_UPDATE_EVENT, handleConfigUpdate as EventListener);
    };
  }, []);

  // Android back button handling  
  useEffect(() => {
    const handleBackButton = async () => {
      console.log('Back button pressed, menu open:', isMenuOpen);
      if (isMenuOpen) {
        setIsMenuOpen(false);
        return;
      }
    };

    let backButtonListener: any = null;

    const setupBackButton = async () => {
      try {
        // Only add listener on Capacitor
        if (window.location.protocol === 'capacitor:') {
          backButtonListener = await CapacitorApp.addListener('backButton', handleBackButton);
        }
      } catch (error) {
        console.log('Back button listener not available:', error);
      }
    };

    setupBackButton();

    return () => {
      if (backButtonListener) {
        backButtonListener.remove();
      }
    };
  }, [isMenuOpen]);

  const checkForNewPages = useCallback(async (comicId: ComicIdentifier) => {
    // Move the check to the next frame to prevent UI blocking
    requestAnimationFrame(async () => {
      const config = comicConfigs[comicId];
      if (comicId === 'dmfa') {
        const result = await checkForUpdates(config);
        // Always update the state to reflect the latest check results
        ReactDOM.unstable_batchedUpdates(() => {
          if (result.hasUpdate) {
            console.log('Found new pages! New total:', result.newTotal);
            updateDmfaTotalPages(result.newTotal);
          }
          setUpdateStates(getUpdateStates());
        });
      }
    });
  }, []);

  const handleAcknowledgeNewIndicator = useCallback((comicId: string) => {
    acknowledgeNewIndicator(comicId as ComicIdentifier);
    // Update the React state immediately to reflect the change
    setUpdateStates(getUpdateStates());
  }, []);

    const navigateTo = useCallback((page: number, comic: ComicIdentifier): void => {
    const config = comicConfigs[comic];
    
    // Handle secret page for comics that have one (like Hybrid Genetics)
    const effectiveMaxPage = config.hasSecretPage ? config.secretPageNumber! : config.totalPages;
    const clampedPage = Math.max(1, Math.min(page, effectiveMaxPage));
    
    setComicPages(prev => ({ ...prev, [comic]: clampedPage }));
    
    // Don't save progress for bonus/demo comics, only for main story comics
    // Also, don't save progress for secret pages - keep the saved progress at the last official page
    const isBonusComic = ['cubiMindAbilities', 'furraaeFashionLaws', 'hybridGenetics', 'cubiClanLeaders'].includes(comic);
    if (!isBonusComic) {
      const saveablePage = Math.min(clampedPage, config.totalPages); // Don't save secret page progress
      localStorage.setItem(config.storageKey, String(saveablePage));
    }
  }, []);

  const handleGoHome = useCallback(() => {
    requestAnimationFrame(() => {
      setView('landing');
    });
  }, []);
  
  const handleStartReading = useCallback((): void => {
    setView('comic');
  }, []);
  
  const handleStartAbel = useCallback((): void => {
    setView('abel_comic');
  }, []);

  const handleStartMatilda = useCallback(() => {
    setView('matilda_comic');
  }, []);

  const handleStartCubiMindAbilities = useCallback(() => {
    // Always start bonus comics at page 1, don't load saved progress
    setComicPages(prev => ({
      ...prev,
      cubiMindAbilities: 1
    }));
    setView('cubi_mind_abilities_comic');
  }, []);

  const handleStartFurraaeFashionLaws = useCallback(() => {
    setComicPages(prev => ({
      ...prev,
      furraaeFashionLaws: 1
    }));
    setView('furrae_fashion_laws_comic');
  }, []);

  const handleStartHybridGenetics = useCallback(() => {
    setComicPages(prev => ({
      ...prev,
      hybridGenetics: 1
    }));
    setView('hybrid_genetics_comic');
  }, []);

  const handleStartCubiClanLeaders = useCallback(() => {
    setComicPages(prev => ({
      ...prev,
      cubiClanLeaders: 1
    }));
    setView('cubi_clan_leaders_comic');
  }, []);

  const handleStartPerfectDate = useCallback(() => {
    setComicPages(prev => ({
      ...prev,
      perfectDate: 1
    }));
    setView('perfect_date_comic');
  }, []);

  const handleStartTakingPride = useCallback(() => {
    setComicPages(prev => ({
      ...prev,
      takingPride: 1
    }));
    setView('taking_pride_comic');
  }, []);

  const handleStartBorkedWrist = useCallback(() => {
    setComicPages(prev => ({
      ...prev,
      borkedWrist: 1
    }));
    setView('borked_wrist_comic');
  }, []);

  const handleStartUncanonChristmas = useCallback(() => {
    setComicPages(prev => ({
      ...prev,
      uncanonChristmas: 1
    }));
    setView('uncanon_christmas_comic');
  }, []);

  const handleStartBonusComics = useCallback(() => {
    setComicPages(prev => ({
      ...prev,
      bonusComics: 1
    }));
    setView('bonus_comics_comic');
  }, []);

  const handleStartWallpaperWars = useCallback(() => {
    setComicPages(prev => ({
      ...prev,
      wallpaperWars: 1
    }));
    setView('wallpaper_wars_comic');
  }, []);

    const handleStartWryEasterEgg = useCallback(() => {
    // Show content warning first
    setShowSensitiveContentWarning(true);
  }, []);

  const handleAcceptSensitiveContent = useCallback(() => {
    setShowSensitiveContentWarning(false);
    setView('wry_easter_egg');
  }, []);

  const handleDeclineSensitiveContent = useCallback(() => {
    setShowSensitiveContentWarning(false);
    // Stay on landing page
  }, []);

  // No-op functions for WRY comics (no bookmarking)
  const noOpAddBookmark = useCallback(() => {}, []);
  const noOpRemoveBookmark = useCallback(() => {}, []);
  const noOpEditBookmark = useCallback(() => {}, []);
  const noOpNavigateBookmark = useCallback(() => {}, []);

  const handleWryComicSelect = useCallback((comicId: ComicIdentifier) => {
    // Set the comic to start at page 1
    setComicPages(prev => ({
      ...prev,
      [comicId]: 1
    }));
    
    // Switch to the appropriate WRY comic view
    const viewMap = {
      wryMain: 'wry_main_comic' as View,
      wryStuff: 'wry_stuff_comic' as View, 
      wryNP: 'wry_np_comic' as View,
      wrySketches: 'wry_sketches_comic' as View
    };
    
    const targetView = viewMap[comicId as keyof typeof viewMap];
    if (targetView) {
      setView(targetView);
    }
  }, []);

  const handleBackToWryCollections = useCallback(() => {
    setView('wry_easter_egg');
  }, []);

  const handleComicSelect = useCallback((comicId: ComicIdentifier) => {
    // Map comic IDs to their corresponding views
    const comicViewMap: Record<ComicIdentifier, View> = {
      dmfa: 'comic',
      abel: 'abel_comic', 
      matilda: 'matilda_comic',
      cubiMindAbilities: 'cubi_mind_abilities_comic',
      furraaeFashionLaws: 'furrae_fashion_laws_comic',
      hybridGenetics: 'hybrid_genetics_comic',
      cubiClanLeaders: 'cubi_clan_leaders_comic',
      perfectDate: 'perfect_date_comic',
      takingPride: 'taking_pride_comic',
      borkedWrist: 'borked_wrist_comic',
      uncanonChristmas: 'uncanon_christmas_comic',
      bonusComics: 'bonus_comics_comic',
      wallpaperWars: 'wallpaper_wars_comic',
      wryMain: 'wallpaper_wars_comic',
      wryStuff: 'wallpaper_wars_comic',
      wryNP: 'wallpaper_wars_comic',
      wrySketches: 'wallpaper_wars_comic'
    };
    
    // Handle WRY comics specially to track which one is active
    // WRY comics are handled by their specific view cases
    
    // Set the comic to start at page 1 (for bonus comics this is always the case)
    setComicPages(prev => ({
      ...prev,
      [comicId]: 1
    }));
    
    // Switch to the corresponding view
    const targetView = comicViewMap[comicId];
    if (targetView) {
      setView(targetView);
    }
  }, []);

  const handleToggleView = useCallback(() => {
    setView(currentView => currentView === 'comic' ? 'archive' : 'comic');
  }, []);

  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);
  
  const handleViewArchive = useCallback(() => {
    setView('archive');
    setIsMenuOpen(false);
  }, []);

  const handleViewCast = useCallback(() => {
    setIsCastModalOpen(true);
    setIsMenuOpen(false);
  }, []);

  const handleViewDemonology = useCallback(() => {
    setIsDemonologyModalOpen(true);
    setIsMenuOpen(false);
  }, []);

  const handleNavigateFromBookmark = useCallback((bookmark: Bookmark) => {
    navigateTo(bookmark.page, bookmark.comic);
    setView(
      bookmark.comic === 'abel' ? 'abel_comic' : 
      bookmark.comic === 'matilda' ? 'matilda_comic' : 
      bookmark.comic === 'cubiMindAbilities' ? 'cubi_mind_abilities_comic' :
      bookmark.comic === 'furraaeFashionLaws' ? 'furrae_fashion_laws_comic' :
      bookmark.comic === 'hybridGenetics' ? 'hybrid_genetics_comic' :
      bookmark.comic === 'cubiClanLeaders' ? 'cubi_clan_leaders_comic' : 'comic'
    );
    setIsMenuOpen(false);
  }, [navigateTo]);

  const handleAddBookmark = useCallback((page: number, comic: ComicIdentifier) => {
    setBookmarks(prev => {
      if (prev.some(b => b.page === page && b.comic === comic)) {
        return prev;
      }
      const newBookmark: Bookmark = { page, comic, note: '', timestamp: Date.now() };
      return [...prev, newBookmark].sort((a, b) => {
        // Group by comic, then sort by page number
        if (a.comic !== b.comic) {
          return a.comic.localeCompare(b.comic);
        }
        return a.page - b.page;
      });
    });
  }, []);
  
  const handleEditBookmarkRequest = useCallback((bookmark: Bookmark) => {
    setBookmarkEditConfig({ page: bookmark.page, note: bookmark.note, comic: bookmark.comic });
  }, []);

  const handleNavigateToBookmark = useCallback((bookmark: Bookmark) => {
    // Set the comic page
    setComicPages(prev => ({ ...prev, [bookmark.comic]: bookmark.page }));
    
    // Navigate to the appropriate view
    const viewMap: Record<ComicIdentifier, View> = {
      dmfa: 'comic',
      abel: 'abel_comic',
      matilda: 'matilda_comic',
      cubiMindAbilities: 'cubi_mind_abilities_comic',
      furraaeFashionLaws: 'furrae_fashion_laws_comic',
      hybridGenetics: 'hybrid_genetics_comic',
      cubiClanLeaders: 'cubi_clan_leaders_comic',
      perfectDate: 'perfect_date_comic',
      takingPride: 'taking_pride_comic',
      borkedWrist: 'borked_wrist_comic',
      uncanonChristmas: 'uncanon_christmas_comic',
      bonusComics: 'bonus_comics_comic',
      wallpaperWars: 'wallpaper_wars_comic',
      wryMain: 'wallpaper_wars_comic',
      wryStuff: 'wallpaper_wars_comic',
      wryNP: 'wallpaper_wars_comic',
      wrySketches: 'wallpaper_wars_comic'
    };
    
    setView(viewMap[bookmark.comic]);
  }, []);

  const handleSaveBookmark = useCallback((page: number, note: string, comic: ComicIdentifier) => {
    setBookmarks(prev => 
      prev.map(b => (b.page === page && b.comic === comic ? { ...b, note } : b))
    );
    setBookmarkEditConfig(null);
  }, []);

  const handleRemoveBookmark = useCallback((bookmark: Bookmark) => {
    setDeletionTarget(bookmark);
  }, []);
  
  const handleConfirmDeletion = useCallback(() => {
    if (deletionTarget !== null) {
      setBookmarks(prev => prev.filter(b => !(b.page === deletionTarget.page && b.comic === deletionTarget.comic)));
    }
    setDeletionTarget(null);
  }, [deletionTarget]);

  const handleCancelDeletion = useCallback(() => {
    setDeletionTarget(null);
  }, []);

  const popupMenuNavigationProps = useMemo(() => {
    if (!view.includes('comic')) {
      return {
        isMobile: window.innerWidth <= 768,
        currentPage: undefined,
        totalPages: undefined,
        hasChapters: undefined,
        onPageNavigate: undefined,
        prevChapterPage: undefined,
        nextChapterPage: undefined,
      };
    }

    const currentComic: ComicIdentifier = 
      view === 'abel_comic' ? 'abel' : 
      view === 'matilda_comic' ? 'matilda' :
      view === 'cubi_mind_abilities_comic' ? 'cubiMindAbilities' :
      view === 'furrae_fashion_laws_comic' ? 'furraaeFashionLaws' :
      view === 'hybrid_genetics_comic' ? 'hybridGenetics' :
      view === 'cubi_clan_leaders_comic' ? 'cubiClanLeaders' :
      view === 'perfect_date_comic' ? 'perfectDate' :
      view === 'taking_pride_comic' ? 'takingPride' :
      view === 'borked_wrist_comic' ? 'borkedWrist' :
      view === 'uncanon_christmas_comic' ? 'uncanonChristmas' :
      view === 'bonus_comics_comic' ? 'bonusComics' :
      view === 'wry_main_comic' ? 'wryMain' :
      view === 'wry_stuff_comic' ? 'wryStuff' :
      view === 'wry_np_comic' ? 'wryNP' :
      view === 'wry_sketches_comic' ? 'wrySketches' : 'dmfa';

    const config = comicConfigs[currentComic];
    const currentPage = comicPages[currentComic] || 1;
    const totalPages = currentComic === 'dmfa' ? dmfaPages : config.totalPages;
    
    const currentChapterIndex = config.chapters?.findIndex(
      c => currentPage >= c.startPage && currentPage <= c.endPage
    ) ?? -1;
    const prevChapterPage = currentChapterIndex > 0 && config.chapters ? config.chapters[currentChapterIndex - 1].startPage : null;
    const nextChapterPage = currentChapterIndex < (config.chapters?.length ?? 0) - 1 && config.chapters ? config.chapters[currentChapterIndex + 1].startPage : null;

    return {
      isMobile: window.innerWidth <= 768,
      currentPage,
      totalPages,
      hasChapters: (config.chapters?.length ?? 0) > 0,
      onPageNavigate: (page: number) => navigateTo(page, currentComic),
      prevChapterPage,
      nextChapterPage,
    };
  }, [view, comicPages, dmfaPages, navigateTo]);

  const handleCloseBookmarkModal = useCallback(() => {
    setBookmarkEditConfig(null);
  }, []);

  const renderView = () => {
    const currentComic: ComicIdentifier = 
      view === 'abel_comic' ? 'abel' : 
      view === 'matilda_comic' ? 'matilda' :
      view === 'cubi_mind_abilities_comic' ? 'cubiMindAbilities' :
      view === 'furrae_fashion_laws_comic' ? 'furraaeFashionLaws' :
      view === 'hybrid_genetics_comic' ? 'hybridGenetics' :
      view === 'cubi_clan_leaders_comic' ? 'cubiClanLeaders' :
      view === 'perfect_date_comic' ? 'perfectDate' :
      view === 'taking_pride_comic' ? 'takingPride' :
      view === 'borked_wrist_comic' ? 'borkedWrist' :
      view === 'uncanon_christmas_comic' ? 'uncanonChristmas' :
      view === 'bonus_comics_comic' ? 'bonusComics' :
      view === 'wallpaper_wars_comic' ? 'wallpaperWars' :
      view === 'wry_main_comic' ? 'wryMain' :
      view === 'wry_stuff_comic' ? 'wryStuff' :
      view === 'wry_np_comic' ? 'wryNP' :
      view === 'wry_sketches_comic' ? 'wrySketches' : 'dmfa';
    const config = comicConfigs[currentComic];
    const totalPages = currentComic === 'dmfa' ? dmfaPages : config.totalPages;

    // Memoize the comic config to prevent unnecessary re-renders and loading state resets
    const memoizedComicConfig = useMemo(() => ({
      ...config,
      totalPages: totalPages,
      chapters: currentComic === 'dmfa' ? getChaptersWithDynamicEnd(BASE_CHAPTERS, totalPages) : config.chapters
    }), [config, totalPages, currentComic]);

    switch(view) {
      case 'landing':
        return (
          <LandingPage 
            lastPage={comicPages.dmfa}
            abelLastPage={comicPages.abel}
            matildaLastPage={comicPages.matilda}
            hasNewPages={{
              dmfa: updateStates.dmfa.hasNewPages && !updateStates.dmfa.newIndicatorAcknowledged,
              abel: updateStates.abel.hasNewPages && !updateStates.abel.newIndicatorAcknowledged,
              matilda: updateStates.matilda.hasNewPages && !updateStates.matilda.newIndicatorAcknowledged
            }}
            bookmarks={bookmarks}
            onStart={handleStartReading}
            onStartAbel={handleStartAbel}
            onStartMatilda={handleStartMatilda}
            onStartCubiMindAbilities={handleStartCubiMindAbilities}
            onStartFurraaeFashionLaws={handleStartFurraaeFashionLaws}
            onStartHybridGenetics={handleStartHybridGenetics}
            onStartCubiClanLeaders={handleStartCubiClanLeaders}
            onStartPerfectDate={handleStartPerfectDate}
            onStartTakingPride={handleStartTakingPride}
            onStartBorkedWrist={handleStartBorkedWrist}
            onStartUncanonChristmas={handleStartUncanonChristmas}
            onStartBonusComics={handleStartBonusComics}
            onStartWallpaperWars={handleStartWallpaperWars}
            onStartWryEasterEgg={handleStartWryEasterEgg}
            onViewCast={handleViewCast}
            onViewDemonology={handleViewDemonology}
            onCheckUpdates={() => checkForNewPages('dmfa')}
            onAcknowledgeNewIndicator={handleAcknowledgeNewIndicator}
            onNavigateToBookmark={handleNavigateToBookmark}
            onEditBookmarkRequest={handleEditBookmarkRequest}
            onRemoveBookmark={handleRemoveBookmark}
          />
        );
      case 'wry_easter_egg':
        return (
          <WryEasterEgg
            onComicSelect={handleWryComicSelect}
            onGoHome={handleGoHome}
            onToggleMenu={handleToggleMenu}
          />
        );
      case 'comic':
      case 'abel_comic':
      case 'matilda_comic':
      case 'cubi_mind_abilities_comic':
      case 'furrae_fashion_laws_comic':
      case 'hybrid_genetics_comic':
      case 'cubi_clan_leaders_comic':
      case 'perfect_date_comic':
      case 'taking_pride_comic':
      case 'borked_wrist_comic':
      case 'uncanon_christmas_comic':
      case 'bonus_comics_comic':
      case 'wallpaper_wars_comic':
      case 'wry_main_comic':
      case 'wry_stuff_comic':
      case 'wry_np_comic':
      case 'wry_sketches_comic':
        return (
          <UnifiedComicViewer
            comicConfig={memoizedComicConfig}
            currentPage={comicPages[currentComic] || 1}
            onNavigate={page => navigateTo(page, currentComic)}
            onChapterSelect={(startPage: number) => {
              navigateTo(startPage, currentComic);
            }}
            onComicSelect={handleComicSelect}
            onGoHome={handleGoHome}
            onToggleMenu={handleToggleMenu}
            bookmarks={currentComic.startsWith('wry') ? [] : bookmarks}
            onAddBookmark={currentComic.startsWith('wry') ? noOpAddBookmark : handleAddBookmark}
            onRemoveBookmark={currentComic.startsWith('wry') ? noOpRemoveBookmark : handleRemoveBookmark}
            onEditBookmarkRequest={currentComic.startsWith('wry') ? noOpEditBookmark : handleEditBookmarkRequest}
            onNavigateToBookmark={currentComic.startsWith('wry') ? noOpNavigateBookmark : handleNavigateToBookmark}
            onBackToWryCollections={currentComic.startsWith('wry') ? handleBackToWryCollections : undefined}
          />
        );
      case 'archive':
        return (
          <div className="flex flex-col items-center min-h-screen bg-comic-dark p-4 font-sans">
            <div className="w-full max-w-5xl">
              <Header 
                chapters={config.chapters || []}
                currentPage={comicPages[currentComic]}
                onChapterSelect={(startPage: number) => {
                  navigateTo(startPage, currentComic);
                  setView('comic');
                }}
                view={view}
                onToggleView={handleToggleView}
                onToggleMenu={handleToggleMenu}
                onGoHome={handleGoHome}
              />
              <main className="mt-4">
                <ArchiveViewer
                  chapters={config.chapters || []}
                  onNavigate={(startPage: number) => {
                    navigateTo(startPage, currentComic);
                    setView('comic');
                  }}
                />
              </main>
            </div>
          </div>
        );
    }
  };

  const getBookmarkTitle = (comic: ComicIdentifier, page: number) => {
    switch(comic) {
      case 'abel':
        return `Abel's Story: Page ${page}`;
      case 'matilda':
        return `Matilda: Page ${page}`;
      case 'perfectDate':
        return `Perfect Date: Page ${page}`;
      default:
        return `Page ${page}`;
    }
  };

  // Check for updates on initial load
  useEffect(() => {
    checkForNewPages('dmfa');
  }, [checkForNewPages]);

  const deletionMessage = deletionTarget 
    ? `Are you sure you want to delete the bookmark for ${getBookmarkTitle(deletionTarget.comic, deletionTarget.page)}? This action cannot be undone.`
    : '';

  return (
    <>
      {renderView()}

      <PopupMenu
        isOpen={isMenuOpen}
        onClose={handleToggleMenu}
        bookmarks={bookmarks.filter(b => !b.comic.startsWith('wry'))}
        onNavigate={handleNavigateFromBookmark}
        onEditBookmarkRequest={handleEditBookmarkRequest}
        onRemoveBookmark={handleRemoveBookmark}
        onViewArchive={handleViewArchive}
        onViewCast={handleViewCast}
        onViewDemonology={handleViewDemonology}
        {...popupMenuNavigationProps}
      />
       <CastModal 
        isOpen={isCastModalOpen}
        onClose={() => setIsCastModalOpen(false)}
        onNavigateToComic={(page: number) => {
          navigateTo(page, 'dmfa');
          setView('comic');
          setIsCastModalOpen(false);
        }}
      />
      <DemonologyModal
        isOpen={isDemonologyModalOpen}
        onClose={() => setIsDemonologyModalOpen(false)}
      />
      {bookmarkEditConfig && (
        <BookmarkModal 
          isOpen={!!bookmarkEditConfig}
          page={bookmarkEditConfig.page}
          initialNote={bookmarkEditConfig.note}
          comic={bookmarkEditConfig.comic}
          onSave={handleSaveBookmark}
          onClose={handleCloseBookmarkModal}
        />
      )}
      {deletionTarget !== null && (
        <ConfirmationModal
          isOpen={deletionTarget !== null}
          title="Confirm Deletion"
          message={deletionMessage}
          onConfirm={handleConfirmDeletion}
          onCancel={handleCancelDeletion}
        />
      )}
      <SensitiveContentWarning
        isOpen={showSensitiveContentWarning}
        onAccept={handleAcceptSensitiveContent}
        onDecline={handleDeclineSensitiveContent}
      />
    </>
  );
};

export default App;
