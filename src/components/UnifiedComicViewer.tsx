import React, { useState, useEffect, useMemo } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import type { Bookmark, ComicConfig, ComicIdentifier } from '../types';
import { JumpToPageModal } from './JumpToPageModal';
import { ComicSelector } from './ComicSelector';
import { ChapterSelector } from './ChapterSelector';
import { BookmarkSidebar } from './BookmarkSidebar';
import RantSidebar from './RantSidebar';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { DoubleChevronLeftIcon } from './icons/DoubleChevronLeftIcon';
import { DoubleChevronRightIcon } from './icons/DoubleChevronRightIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { SkipToStartIcon } from './icons/SkipToStartIcon';
import { SkipToEndIcon } from './icons/SkipToEndIcon';
import { Header } from './Header';
import { BookmarkIcon } from './icons/BookmarkIcon';

interface UnifiedComicViewerProps {
  comicConfig: ComicConfig;
  currentPage: number;
  onNavigate: (page: number) => void;
  onChapterSelect: (startPage: number) => void;
  onComicSelect?: (comicId: ComicIdentifier) => void;
  onGoHome: () => void;
  onToggleMenu: () => void;
  bookmarks: Bookmark[];
  onAddBookmark: (page: number, comic: ComicConfig['id']) => void;
  onRemoveBookmark: (bookmark: Bookmark) => void;
  onEditBookmarkRequest?: (bookmark: Bookmark) => void;
  onNavigateToBookmark?: (bookmark: Bookmark) => void;
  onBackToWryCollections?: () => void;
}

const NavigationButton: React.FC<{ 
  onClick: () => void; 
  disabled: boolean; 
  children: React.ReactNode; 
  ariaLabel: string;
  className?: string;
}> = ({ onClick, disabled, children, ariaLabel, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className={className || "px-2 py-2 bg-comic-accent text-white rounded-md transition-colors duration-200 enabled:hover:bg-comic-accent-hover disabled:bg-comic-disabled disabled:cursor-not-allowed flex items-center justify-center"}
  >
    {children}
  </button>
);

export const UnifiedComicViewer: React.FC<UnifiedComicViewerProps> = ({
  comicConfig,
  currentPage,
  onNavigate,
  onChapterSelect,
  onComicSelect,
  onGoHome,
  onToggleMenu,
  bookmarks,
  onAddBookmark,
  onRemoveBookmark,
  onEditBookmarkRequest,
  onNavigateToBookmark,
  onBackToWryCollections,
}) => {
  // Define Demo. 101 comics data
  const demoComics = [
    { id: 'cubiMindAbilities' as ComicIdentifier, title: 'Cubi Mind Abilities', totalPages: 5 },
    { id: 'furraaeFashionLaws' as ComicIdentifier, title: 'Furrae Fashion Laws', totalPages: 4 },
    { id: 'hybridGenetics' as ComicIdentifier, title: 'Hybrid Genetics', totalPages: 14 },
    { id: 'cubiClanLeaders' as ComicIdentifier, title: 'Cubi Clan Leaders', totalPages: 15 },
  ];

  const miniArcComics = [
    { id: 'perfectDate' as ComicIdentifier, title: 'Perfect Date', totalPages: 18 },
    { id: 'takingPride' as ComicIdentifier, title: 'Taking Pride', totalPages: 8 },
    { id: 'borkedWrist' as ComicIdentifier, title: 'Borked Wrist Sketchapalooza', totalPages: 24 },
    { id: 'uncanonChristmas' as ComicIdentifier, title: 'Un-canon Christmas', totalPages: 6 },
  ];

  const extrasComics = [
    { id: 'bonusComics' as ComicIdentifier, title: 'Bonus Comics', totalPages: 58 },
    { id: 'wallpaperWars' as ComicIdentifier, title: 'Wallpaper Wars', totalPages: 120 },
  ];

  const wryComics = [
    { id: 'wryMain' as ComicIdentifier, title: 'WRY - Main Collection', totalPages: 136 },
    { id: 'wryStuff' as ComicIdentifier, title: 'WRY - Stuff', totalPages: 4 },
    { id: 'wryNP' as ComicIdentifier, title: 'WRY - NP', totalPages: 18 },
    { id: 'wrySketches' as ComicIdentifier, title: 'WRY - Sketches', totalPages: 33 },
  ];
  
  const isDemoComic = demoComics.some(comic => comic.id === comicConfig.id);
  const isMiniArcComic = miniArcComics.some(comic => comic.id === comicConfig.id);
  const isExtrasComic = extrasComics.some(comic => comic.id === comicConfig.id);
  const isWryComic = wryComics.some(comic => comic.id === comicConfig.id);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [commentary, setCommentary] = useState('');
  const [commentaryStatus, setCommentaryStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [isJumpModalOpen, setIsJumpModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0, naturalWidth: 0, naturalHeight: 0 });
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [justOpenedFocusMode, setJustOpenedFocusMode] = useState(false);
  const [focusModeDebounce, setFocusModeDebounce] = useState(false);
  const [isCheckingNextPage, setIsCheckingNextPage] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileLayout = useMemo(() => windowWidth <= 768, [windowWidth]);
  const isWideImage = useMemo(() => {
    // Always enable focus mode on mobile for better reading experience
    return isMobileLayout && imageDimensions.naturalWidth > 0 && imageDimensions.naturalHeight > 0;
  }, [isMobileLayout, imageDimensions]);

  const isBookmarked = useMemo(() => 
    bookmarks.some(b => b.page === currentPage && b.comic === comicConfig.id), 
    [bookmarks, currentPage, comicConfig.id]
  );

  const chapterPages = useMemo(() => {
    if (!comicConfig.chapters) {
      return { prevChapterPage: null, nextChapterPage: null };
    }
    const currentChapterIndex = comicConfig.chapters.findIndex(
      c => currentPage >= c.startPage && currentPage <= c.endPage
    );
    if (currentChapterIndex === -1) {
      return { prevChapterPage: null, nextChapterPage: null };
    }
    const prevChapterPage = currentChapterIndex > 0 
      ? comicConfig.chapters[currentChapterIndex - 1].startPage 
      : null;
    const nextChapterPage = currentChapterIndex < comicConfig.chapters.length - 1 
      ? comicConfig.chapters[currentChapterIndex + 1].startPage 
      : null;
    return { prevChapterPage, nextChapterPage };
  }, [comicConfig.chapters, currentPage]);

  // Focus mode debounce helper functions
  const enterFocusMode = () => {
    if (focusModeDebounce) {
      console.log('Focus mode toggle blocked by debounce');
      return;
    }
    console.log('Entering focus mode');
    setIsFocusMode(true);
    setFocusModeDebounce(true);
    setTimeout(() => setFocusModeDebounce(false), 250);
  };

  const exitFocusMode = () => {
    if (focusModeDebounce) {
      console.log('Focus mode toggle blocked by debounce');
      return;
    }
    console.log('Exiting focus mode');
    setIsFocusMode(false);
    setImageScale(1);
    setImagePosition({ x: 0, y: 0 });
    setFocusModeDebounce(true);
    setTimeout(() => setFocusModeDebounce(false), 250);
  };

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    // Reset image zoom/pan when page changes
    setImageScale(1);
    setImagePosition({ x: 0, y: 0 });
    setImageDimensions({ width: 0, height: 0, naturalWidth: 0, naturalHeight: 0 });
    setIsFocusMode(false);
    if (comicConfig.commentaryEnabled) {
      setCommentaryStatus('loading');
      setCommentary('');
    }

    const filename = comicConfig.getImageFilename(currentPage);
    const newImageSrc = `${comicConfig.imageBaseUrl}${filename}`;
    setImageSrc(newImageSrc);

    // Fetch commentary if enabled for this comic
    if (comicConfig.commentaryEnabled && comicConfig.getCommentaryUrl) {
      const fetchCommentary = async () => {
        try {
          const commentaryUrl = comicConfig.getCommentaryUrl!(currentPage, comicConfig.totalPages);
          if (!commentaryUrl) {
            setCommentaryStatus('error');
            setCommentary('');
            return;
          }
          
          const response = await fetch(commentaryUrl);
          if (!response.ok) throw new Error('Network response was not ok');
          
          const htmlText = await response.text();
          let foundCommentary: string | null = null;

          console.log('Page content:', htmlText);
          console.log('Looking for commentary for page:', currentPage);

          // First try to find the commentary in #number: format - this appears most reliably
          const commentFormat = new RegExp(`#${currentPage}:([^<\\n!]+)`, 'i');
          console.log('Using regex pattern:', commentFormat);
          const simpleMatch = htmlText.match(commentFormat);
          console.log('Match result:', simpleMatch);
          
          if (simpleMatch && simpleMatch[1]) {
            foundCommentary = simpleMatch[1].trim();
            console.log('Found commentary:', foundCommentary);
          }
          
          // If not found, try looking around image tags
          if (!foundCommentary) {
            const imageFileBase = comicConfig.getImageFilename(currentPage).split('.')[0];
            const imageTagRegex = new RegExp(`<img[^>]*src\\s*=\\s*["'][^"']*${imageFileBase}\\.(png|jpg|gif)["'][^>]*>`, 'i');
            const imageTagMatch = htmlText.match(imageTagRegex);

            if (imageTagMatch) {
              const imageTagEndIndex = (imageTagMatch.index || 0) + imageTagMatch[0].length;
              const searchArea = htmlText.substring(imageTagEndIndex);
              
              // Try to find commentary in <i> tags (older format)
              const iTagStart = searchArea.toLowerCase().indexOf('<i>');
              if (iTagStart !== -1) {
                const iTagEnd = searchArea.toLowerCase().indexOf('</i>', iTagStart);
                if (iTagEnd !== -1) {
                  foundCommentary = searchArea.substring(iTagStart + 3, iTagEnd).trim();
                }
              }
              
              // If still not found, look for text between images
              if (!foundCommentary) {
                const nextImageIndex = searchArea.toLowerCase().indexOf('<img');
                if (nextImageIndex !== -1) {
                  const text = searchArea.substring(0, nextImageIndex).trim();
                  if (text) {
                    // Check if it's in the #number: format
                    const formatMatch = text.match(/^#\d+:\s*(.+)$/);
                    foundCommentary = formatMatch ? formatMatch[1].trim() : text;
                  }
                }
              }
            }
          }

          const cleanCommentary = (text: string) => {
            // Remove any #number: prefix
            return text.replace(/^#\d+:\s*/, '');
          };

          if (foundCommentary) {
            setCommentary(cleanCommentary(foundCommentary));
            setCommentaryStatus('loaded');
          } else {
            setCommentaryStatus('error');
          }
        } catch (error) {
          console.error('Error fetching commentary:', error);
          setCommentaryStatus('error');
        }
      };

      fetchCommentary();
    }
  }, [currentPage, comicConfig]);

  // Android back button handling
  useEffect(() => {
    const handleBackButton = async () => {
      console.log('Back button pressed, focus mode:', isFocusMode);
      if (isFocusMode) {
        exitFocusMode();
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
  }, [isFocusMode]);

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const dimensions = {
      width: img.offsetWidth,
      height: img.offsetHeight,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    };
    setImageDimensions(dimensions);
    setIsLoading(false);
    
    // Debug logging
    console.log('Image loaded:', {
      dimensions,
      aspectRatio: dimensions.naturalWidth / dimensions.naturalHeight,
      isMobileLayout,
      enableFocusMode: isMobileLayout && dimensions.naturalWidth > 0
    });
  };

  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return null;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    console.log('Touch start detected:', { 
      touches: e.touches.length, 
      isMobileLayout, 
      isWideImage, 
      isFocusMode 
    });
    
    if (e.touches.length === 1) {
      if (isFocusMode) {
        // In focus mode - start pan
        setPanStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      } else {
        // Not in focus mode - prepare for swipe/tap detection
        setTouchStart(e.touches[0].clientX);
        setTouchEnd(null);
      }
    } else if (e.touches.length === 2 && isFocusMode) {
      // Pinch gesture start - only in focus mode
      const distance = getTouchDistance(e.touches);
      setLastTouchDistance(distance);
      setIsPanning(true);
      setPanStart(null); // Cancel panning when pinching
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      if (isFocusMode && panStart && imageScale > 1) {
        // Pan the image when zoomed in focus mode
        e.stopPropagation();
        const touch = e.touches[0];
        const deltaX = touch.clientX - panStart.x;
        const deltaY = touch.clientY - panStart.y;
        
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          setImagePosition(prev => ({
            x: prev.x + deltaX * 0.8, // Less dampening for better responsiveness
            y: prev.y + deltaY * 0.8
          }));
        });
        
        setPanStart({ x: touch.clientX, y: touch.clientY });
      } else if (!isFocusMode) {
        // Track for swipe detection
        setTouchEnd(e.touches[0].clientX);
      }
    } else if (e.touches.length === 2 && lastTouchDistance && isFocusMode) {
      // Pinch zoom - only in focus mode
      e.stopPropagation();
      const distance = getTouchDistance(e.touches);
      if (distance) {
        const scaleChange = distance / lastTouchDistance;
        const newScale = Math.max(1, Math.min(4, imageScale * scaleChange));
        
        requestAnimationFrame(() => {
          setImageScale(newScale);
        });
        
        setLastTouchDistance(distance);
      }
    }
  };

  const handleTouchEnd = async () => {
    if (isPanning) {
      setIsPanning(false);
      setLastTouchDistance(null);
      return;
    }

    if (isFocusMode && panStart) {
      // End panning in focus mode
      setPanStart(null);
      return;
    }

    if (!isFocusMode && (!touchStart || !touchEnd)) {
      // This might be a tap - check if we should toggle focus mode
      if (isMobileLayout && isWideImage && touchStart) {
        console.log('Detected tap on image in mobile layout - entering focus mode');
        enterFocusMode();
        setJustOpenedFocusMode(true);
        // Clear the flag after a short delay
        setTimeout(() => {
          setJustOpenedFocusMode(false);
        }, 100);
      }
      setTouchEnd(null);
      setTouchStart(null);
      return;
    }

    if (!isFocusMode && touchStart && touchEnd) {
      const distance = touchStart - touchEnd;
      const isSwipe = Math.abs(distance) > 50;

      // Only allow swipe navigation if not in focus mode
      if (isSwipe) {
        if (distance > 0) {
          // Swiped left, go forward
          await handleNextPage();
        } else if (distance < 0 && currentPage > 1) {
          // Swiped right, go back
          onNavigate(currentPage - 1);
        }
      }
    }

    setTouchEnd(null);
    setTouchStart(null);
  };

  const handleImageClick = () => {
    console.log('handleImageClick called');
    console.log('Image clicked:', { isMobileLayout, enableFocusMode: isWideImage, currentFocusMode: isFocusMode });
    if (isMobileLayout && isWideImage && !isFocusMode) {
      console.log('Setting focus mode to true');
      enterFocusMode();
      setJustOpenedFocusMode(true);
      // Clear the flag after a short delay
      setTimeout(() => {
        setJustOpenedFocusMode(false);
      }, 100);
    } else {
      console.log('Focus mode conditions not met:', { isMobileLayout, isWideImage, isFocusMode });
    }
  };

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      const bookmarkToRemove = bookmarks.find(b => b.page === currentPage && b.comic === comicConfig.id);
      if (bookmarkToRemove) {
        onRemoveBookmark(bookmarkToRemove);
      }
    } else {
      onAddBookmark(currentPage, comicConfig.id);
    }
  };

  const handleNextPage = async () => {
    const nextPage = currentPage + 1;
    
    // If we're within known bounds, navigate normally
    if (nextPage <= getEffectiveMaxPage()) {
      onNavigate(nextPage);
      return;
    }
    
    // If this comic supports dynamic page checking, try to check if the next page exists
    if (comicConfig.isDynamicPageCount && comicConfig.checkPageExists) {
      setIsCheckingNextPage(true);
      try {
        const pageExists = await comicConfig.checkPageExists(nextPage);
        if (pageExists) {
          onNavigate(nextPage);
        }
        // If page doesn't exist, do nothing (button should appear disabled)
      } catch (error) {
        console.error('Error checking if page exists:', error);
        // On error, don't navigate
      } finally {
        setIsCheckingNextPage(false);
      }
    }
  };

  // Helper functions for secret page easter egg
  const isSecretPage = (page: number) => {
    return comicConfig.hasSecretPage && page === comicConfig.secretPageNumber;
  };

  const getDisplayPageNumber = (page: number) => {
    return isSecretPage(page) ? '???' : page.toString();
  };

  const getEffectiveMaxPage = () => {
    return comicConfig.hasSecretPage ? comicConfig.secretPageNumber! : comicConfig.totalPages;
  };

  const shouldNextButtonAppearDisabled = () => {
    // For dynamic page count comics, never show as disabled - we'll check on click
    if (comicConfig.isDynamicPageCount) {
      return false;
    }
    return currentPage === comicConfig.totalPages && comicConfig.hasSecretPage;
  };

  const isNextButtonActuallyDisabled = () => {
    // For dynamic page count comics, never actually disable - we'll check on click  
    if (comicConfig.isDynamicPageCount) {
      return false;
    }
    return currentPage >= getEffectiveMaxPage();
  };

  const NavControls = () => {
    // Determine if navigation should show chapter skip buttons
    // Hide for single-chapter comics and bonus/demo comics where chapter navigation doesn't make sense
    const comicsWithoutChapterNav = ['matilda', 'cubiMindAbilities', 'furraaeFashionLaws', 'hybridGenetics', 'cubiClanLeaders'];
    const hasChapters = (comicConfig.chapters?.length ?? 0) > 1 && !comicsWithoutChapterNav.includes(comicConfig.id);

    if (isMobileLayout) {
      return (
        <div className="w-full max-w-2xl flex flex-col items-center gap-4">
          <div className="flex gap-2 items-center justify-center w-full">
            <NavigationButton
              onClick={() => onNavigate(currentPage - 1)}
              disabled={currentPage <= 1}
              ariaLabel="Previous page"
            >
              <ChevronLeftIcon />
              <span className="hidden sm:inline ml-1">Prev</span>
            </NavigationButton>

            <NavigationButton
              onClick={handleNextPage}
              disabled={isNextButtonActuallyDisabled() || isCheckingNextPage}
              ariaLabel="Next page"
              className={shouldNextButtonAppearDisabled() ? 
                "px-2 py-2 bg-comic-disabled text-white rounded-md transition-colors duration-200 flex items-center justify-center" : undefined}
            >
              {isCheckingNextPage ? (
                <SpinnerIcon />
              ) : (
                <>
                  <span className="hidden sm:inline mr-1">Next</span>
                  <ChevronRightIcon />
                </>
              )}
            </NavigationButton>
          </div>

          {/* Always visible floating panel at bottom - hidden on mobile */}
          <div className="fixed left-1/2 -translate-x-1/2 bg-comic-secondary p-2 rounded-lg shadow-lg z-50 flex gap-2 hidden sm:flex" style={{ maxWidth: 'calc(100vw - 2rem)', bottom: 'max(6rem, calc(6rem + env(safe-area-inset-bottom)))' }}>
            <NavigationButton onClick={() => onNavigate(1)} disabled={currentPage === 1} ariaLabel="First page">
              <SkipToStartIcon />
            </NavigationButton>
            {hasChapters && (
              <>
                <NavigationButton 
                  onClick={() => chapterPages.prevChapterPage && onNavigate(chapterPages.prevChapterPage)} 
                  disabled={!chapterPages.prevChapterPage} 
                  ariaLabel="Previous chapter"
                >
                  <DoubleChevronLeftIcon />
                </NavigationButton>
                <NavigationButton 
                  onClick={() => chapterPages.nextChapterPage && onNavigate(chapterPages.nextChapterPage)} 
                  disabled={!chapterPages.nextChapterPage} 
                  ariaLabel="Next chapter"
                >
                  <DoubleChevronRightIcon />
                </NavigationButton>
              </>
            )}
            <NavigationButton onClick={() => onNavigate(comicConfig.totalPages)} disabled={currentPage === comicConfig.totalPages || Boolean(isSecretPage(currentPage))} ariaLabel="Last known page">
              <SkipToEndIcon />
            </NavigationButton>
          </div>
        </div>
      );
    }

    // Desktop layout
    const gridCols = hasChapters ? 'grid-cols-6' : 'grid-cols-4';
    return (
      <div className={`grid ${gridCols} gap-2 w-full max-w-2xl`}>
        <NavigationButton onClick={() => onNavigate(1)} disabled={currentPage === 1} ariaLabel="First page">
          <SkipToStartIcon />
        </NavigationButton>
        {hasChapters && (
          <NavigationButton 
            onClick={() => chapterPages.prevChapterPage && onNavigate(chapterPages.prevChapterPage)} 
            disabled={!chapterPages.prevChapterPage} 
            ariaLabel="Previous chapter"
          >
            <DoubleChevronLeftIcon />
          </NavigationButton>
        )}
        <NavigationButton onClick={() => onNavigate(currentPage - 1)} disabled={currentPage <= 1} ariaLabel="Previous page">
          <ChevronLeftIcon /> <span className="hidden sm:inline ml-1">Prev</span>
        </NavigationButton>
        <NavigationButton 
          onClick={handleNextPage} 
          disabled={isNextButtonActuallyDisabled() || isCheckingNextPage} 
          ariaLabel="Next page"
          className={shouldNextButtonAppearDisabled() ? 
            "px-2 py-2 bg-comic-disabled text-white rounded-md transition-colors duration-200 flex items-center justify-center" : undefined}
        >
          {isCheckingNextPage ? (
            <SpinnerIcon />
          ) : (
            <>
              <span className="hidden sm:inline mr-1">Next</span> <ChevronRightIcon />
            </>
          )}
        </NavigationButton>
        {hasChapters && (
          <NavigationButton 
            onClick={() => chapterPages.nextChapterPage && onNavigate(chapterPages.nextChapterPage)} 
            disabled={!chapterPages.nextChapterPage} 
            ariaLabel="Next chapter"
          >
            <DoubleChevronRightIcon />
          </NavigationButton>
        )}
        <NavigationButton onClick={() => onNavigate(comicConfig.totalPages)} disabled={currentPage === comicConfig.totalPages || Boolean(isSecretPage(currentPage))} ariaLabel="Last known page">
          <SkipToEndIcon />
        </NavigationButton>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-comic-dark font-sans" style={{ padding: '4px', paddingTop: 'max(16px, env(safe-area-inset-top))', paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
      {/* Rant Sidebar for landscape desktop only */}
      <RantSidebar />
      
      {/* Bookmark Sidebar for landscape desktop only */}
      <BookmarkSidebar 
        bookmarks={bookmarks}
        onNavigate={onNavigateToBookmark || (() => {})}
        onEditBookmarkRequest={onEditBookmarkRequest || (() => {})}
        onRemoveBookmark={onRemoveBookmark}
      />
      
      <div className="w-full max-w-5xl">
        <Header 
          chapters={comicConfig.chapters || []} 
          currentPage={currentPage}
          onChapterSelect={onChapterSelect}
          view={(isDemoComic || isMiniArcComic || isWryComic) ? "demo" : (isExtrasComic ? "comic" : ((comicConfig.chapters?.length ?? 0) > 0 ? "comic" : "no-chapters"))}
          onToggleView={() => {}}
          onToggleMenu={onToggleMenu}
          onGoHome={onGoHome}
          customSelector={(isDemoComic && onComicSelect) ? (
            <ComicSelector
              currentComic={comicConfig.id}
              availableComics={demoComics}
              onComicSelect={onComicSelect}
            />
          ) : (isMiniArcComic && onComicSelect) ? (
            <ComicSelector
              currentComic={comicConfig.id}
              availableComics={miniArcComics}
              onComicSelect={onComicSelect}
            />
          ) : (isExtrasComic && onComicSelect) ? (
            <div className="flex items-center gap-4">
              <ChapterSelector 
                chapters={comicConfig.chapters || []} 
                currentPage={currentPage}
                onChapterSelect={onChapterSelect} 
              />
              <ComicSelector
                currentComic={comicConfig.id}
                availableComics={extrasComics}
                onComicSelect={onComicSelect}
              />
            </div>
          ) : (isWryComic && onBackToWryCollections) ? (
            <button
              onClick={onBackToWryCollections}
              className="px-4 py-2 bg-comic-accent text-white font-bold rounded-md transition-colors duration-200 hover:bg-comic-accent-hover flex items-center gap-2"
            >
              ← Back to WRY Collections
            </button>
          ) : undefined}
        />
        <main className="mt-4 flex flex-col items-center space-y-4">
          <NavControls />
        
          <div className="flex items-center justify-center gap-4">
            <div className="text-lg font-semibold text-comic-light/90 flex items-center gap-1">
              Page{' '}
              <button
                onClick={() => setIsJumpModalOpen(true)}
                className="px-2 py-1 bg-comic-accent/20 rounded hover:bg-comic-accent/40 transition-colors"
                aria-label="Click to jump to page"
              >
                {getDisplayPageNumber(currentPage)}
              </button>
              {' '}of {comicConfig.isDynamicPageCount && currentPage > comicConfig.totalPages ? 
                `${comicConfig.totalPages}+` : 
                comicConfig.totalPages
              }
              {comicConfig.isDynamicPageCount && currentPage > comicConfig.totalPages && (
                <span className="text-sm text-comic-accent ml-1">(exploring!)</span>
              )}
            </div>
            <button 
              onClick={handleBookmarkClick} 
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'} 
              className="text-comic-accent transition-colors duration-200 hover:text-indigo-400 p-1"
            >
              <BookmarkIcon filled={isBookmarked} />
            </button>
          </div>

          {isMobileLayout && isWideImage && !isFocusMode && currentPage === 1 && (
            <div className="text-sm text-comic-light/70 text-center">
              💡 Tap image to open in full-screen focus mode • Swipe to navigate pages
            </div>
          )}

          <div
            className={`w-full max-w-4xl bg-comic-secondary rounded-lg flex items-center justify-center p-2 shadow-inner ${
              (isLoading || hasError) ? 'min-h-[400px]' : ''
            } ${isMobileLayout && isWideImage && !isFocusMode ? 'cursor-pointer relative' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {isLoading && !hasError && (
              <div className="flex flex-col items-center text-comic-light/70">
                <SpinnerIcon />
                <span>Loading Page...</span>
              </div>
            )}
            {hasError && (
              <div className="text-red-400 text-center">
                <p>Failed to load comic image.</p>
                <p>Please check your connection and try again.</p>
              </div>
            )}
            <img
              src={imageSrc}
              alt={`${comicConfig.title} Page ${currentPage}`}
              className={`rounded transition-all duration-300 ${
                isMobileLayout && isWideImage && !isFocusMode ? 'w-full h-auto cursor-pointer' : 'w-full h-auto'
              }`}
              style={{
                display: isLoading || hasError ? 'none' : 'block',
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
              onClick={(e) => {
                console.log('Image element clicked');
                e.stopPropagation(); // Prevent event from bubbling up
                handleImageClick();
              }}
            />
            
            {/* Tap overlay for better touch detection */}
            {isMobileLayout && isWideImage && !isFocusMode && (
              <div 
                className="absolute inset-0 cursor-pointer"
                onClick={(e) => {
                  console.log('Tap overlay clicked');
                  e.stopPropagation(); // Prevent event from bubbling up
                  handleImageClick();
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
            )}
          </div>

          {comicConfig.commentaryEnabled && commentaryStatus === 'loaded' && (
            <div className="w-full max-w-4xl bg-comic-secondary rounded-lg p-4 mt-4 shadow-inner">
              <div className="prose-styles text-comic-light/90 text-center" dangerouslySetInnerHTML={{ __html: commentary }} />
            </div>
          )}

          <NavControls />
          <style>{`
            .prose-styles a { text-decoration: underline; color: #818cf8; }
            .prose-styles a:hover { color: #a5b4fc; }
            .prose-styles p, .prose-styles div, .prose-styles font { margin-bottom: 1em; line-height: 1.6; }
            .prose-styles b, .prose-styles strong { font-weight: bold; }
            .prose-styles i, .prose-styles em { font-style: italic; }
          `}</style>
        </main>
      </div>

      {/* Full-screen focus mode overlay */}
      {isFocusMode && (
        <>
          {/* Background layer - clickable to close focus mode */}
          <div 
            className="fixed inset-0 z-[100] bg-black/90 cursor-pointer"
            style={{ touchAction: 'none' }}
            onClick={() => {
              if (justOpenedFocusMode) {
                console.log('Background click ignored - just opened focus mode');
                return;
              }
              console.log('Background clicked - closing focus mode');
              exitFocusMode();
            }}
            onTouchStart={(e) => {
              console.log('Background touch start');
              e.stopPropagation();
              e.preventDefault();
            }}
            onTouchMove={(e) => {
              console.log('Background touch move');
              e.stopPropagation();
              e.preventDefault();
            }}
            onTouchEnd={() => {
              if (justOpenedFocusMode) {
                console.log('Background touch ignored - just opened focus mode');
                return;
              }
              console.log('Background touched - closing focus mode');
              exitFocusMode();
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseMove={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onWheel={(e) => e.preventDefault()}
          />

          {/* Image layer - separate fixed layer above background */}
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none">
            {/* Zoomable image */}
            <img
              src={imageSrc}
              alt={`${comicConfig.title} Page ${currentPage}`}
              className="max-w-full max-h-full object-contain rounded pointer-events-auto cursor-move"
              style={{
                transform: `scale(${imageScale}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                transformOrigin: 'center',
                touchAction: imageScale > 1 ? 'none' : 'auto',
              }}
              onTouchStart={(e) => {
                console.log('Image touch start - blocking propagation');
                e.stopPropagation();
                e.preventDefault();
                handleTouchStart(e);
              }}
              onTouchMove={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleTouchMove(e);
              }}
              onTouchEnd={(e) => {
                console.log('Image touch end - blocking propagation');
                e.stopPropagation();
                e.preventDefault();
                handleTouchEnd();
              }}
              onClick={(e) => {
                console.log('Focus mode image clicked');
                e.stopPropagation();
              }}
            />
          </div>

          {/* Commentary layer - highest priority */}
          {comicConfig.commentaryEnabled && commentaryStatus === 'loaded' && commentary && (
            <div 
              className="fixed left-4 right-4 z-[300] bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white max-h-32 overflow-y-auto pointer-events-auto"
              style={{ bottom: `max(1rem, calc(1rem + env(safe-area-inset-bottom)))` }}
              onClick={(e) => {
                console.log('Commentary clicked');
                e.stopPropagation();
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <div className="text-sm prose-styles text-center" dangerouslySetInnerHTML={{ __html: commentary }} />
            </div>
          )}
        </>
      )}

      <JumpToPageModal
        isOpen={isJumpModalOpen}
        onClose={() => setIsJumpModalOpen(false)}
        currentPage={currentPage}
        totalPages={comicConfig.totalPages}
        onJump={onNavigate}
      />
    </div>
  );
};