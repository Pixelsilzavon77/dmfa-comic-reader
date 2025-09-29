import React, { useState, useEffect } from 'react';
import type { Bookmark, ComicIdentifier } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { SkipToStartIcon } from './icons/SkipToStartIcon';
import { SkipToEndIcon } from './icons/SkipToEndIcon';
import { DoubleChevronLeftIcon } from './icons/DoubleChevronLeftIcon';
import { DoubleChevronRightIcon } from './icons/DoubleChevronRightIcon';

interface PopupMenuProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onNavigate: (bookmark: Bookmark) => void;
  onEditBookmarkRequest: (bookmark: Bookmark) => void;
  onRemoveBookmark: (bookmark: Bookmark) => void;
  onViewArchive: () => void;
  onViewCast: () => void;
  onViewDemonology: () => void;
  // Navigation props (mobile only)
  isMobile?: boolean;
  currentPage?: number;
  totalPages?: number;
  hasChapters?: boolean;
  onPageNavigate?: (page: number) => void;
  prevChapterPage?: number | null;
  nextChapterPage?: number | null;
}

const formatTimestamp = (timestamp: number): string => {
  const now = new Date();
  const then = new Date(timestamp);

  const datePart = then.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });
  const timePart = then.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const absolute = `${datePart} @ ${timePart}`;

  const diffSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffSeconds < 60) return `${absolute} (${diffSeconds}s ago)`;
  
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${absolute} (${diffMinutes}m ago)`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${absolute} (${diffHours}h ago)`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${absolute} (${diffDays}d ago)`;
  
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 5) return `${absolute} (${diffWeeks}w ago)`;
  
  const diffMonths = Math.floor(diffDays / 30.44); // Average days in month
  if (diffMonths < 12) return `${absolute} (${diffMonths}mo ago)`;

  const diffYears = Math.floor(diffDays / 365.25);
  return `${absolute} (${diffYears}y ago)`;
};

export const PopupMenu: React.FC<PopupMenuProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onNavigate,
  onEditBookmarkRequest,
  onRemoveBookmark,
  onViewArchive,
  onViewCast,
  onViewDemonology,
  isMobile = false,
  currentPage = 1,
  totalPages = 1,
  hasChapters = false,
  onPageNavigate,
  prevChapterPage,
  nextChapterPage,
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    dmfa: true,
    abel: true,
    matilda: true,
    bonus: true,
    'bonus-demo101': true,
    'bonus-extras': true,
    'bonus-miniarcs': true,
  });

  useEffect(() => {
    let timeoutId: number;
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
      timeoutId = window.setTimeout(() => {
        setIsVisible(true);
      }, 20);
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
      timeoutId = window.setTimeout(() => {
        setIsRendered(false);
      }, 300);
    }
    
    return () => window.clearTimeout(timeoutId);
  }, [isOpen]);

  useEffect(() => {
    if (isRendered) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isRendered, onClose]);

  const handleToggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const groupedBookmarks = bookmarks.reduce((acc, bookmark) => {
    (acc[bookmark.comic] = acc[bookmark.comic] || []).push(bookmark);
    return acc;
  }, {} as Record<ComicIdentifier, Bookmark[]>);

    const comicDisplayTitles: Record<ComicIdentifier, string> = {
      dmfa: "Dan and Mab's Furry Adventures",
      abel: "Abel's Story",
      matilda: "Matilda",
      cubiMindAbilities: "Cubi Mind Abilities",
      furraaeFashionLaws: "Furrae Fashion Laws", 
      hybridGenetics: "Hybrid Genetics",
      cubiClanLeaders: "Cubi Clan Leaders",
      perfectDate: "Perfect Date",
      takingPride: "Taking Pride",
      borkedWrist: "Borked Wrist Sketchapalooza",
      uncanonChristmas: "Un-canon Christmas",
      bonusComics: "Bonus Comics",
      wallpaperWars: "Wallpaper Wars",
      wryMain: "WRY - Main Collection",
      wryStuff: "WRY - Stuff",
      wryNP: "WRY - NP",
      wrySketches: "WRY - Sketches"
    };  // Define bonus comic categories
  const bonusComicCategories: Partial<Record<ComicIdentifier, string>> = {
    cubiMindAbilities: "Demo. 101",
    furraaeFashionLaws: "Demo. 101",
    hybridGenetics: "Demo. 101", 
    cubiClanLeaders: "Demo. 101",
    perfectDate: "Mini Arcs",
    takingPride: "Mini Arcs",
    borkedWrist: "Mini Arcs",
    uncanonChristmas: "Mini Arcs",
    bonusComics: "Extras",
    wallpaperWars: "Extras"
  };
  
  const isBonusComic = (comic: ComicIdentifier): boolean => {
    return comic in bonusComicCategories;
  };
  
  const mainComicOrder: ComicIdentifier[] = ['dmfa', 'abel', 'matilda'];
  const bonusComics = Object.keys(groupedBookmarks).filter(comic => 
    isBonusComic(comic as ComicIdentifier)
  ) as ComicIdentifier[];

  if (!isRendered) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`fixed top-0 right-0 bottom-0 w-80 sm:w-96 max-w-[calc(100vw-1rem)] bg-comic-dark shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
        style={{ 
          paddingTop: 'max(24px, calc(24px + env(safe-area-inset-top)))', 
          paddingBottom: 'max(24px, calc(24px + env(safe-area-inset-bottom)))',
          paddingLeft: '24px',
          paddingRight: 'max(24px, calc(24px + env(safe-area-inset-right)))'
        }}
      >
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-comic-light mb-4 border-b border-comic-accent/30 pb-2">
              My Bookmarks
            </h2>
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
              {bookmarks.length > 0 ? (
                <div className="space-y-2">
                  {/* Main Comics */}
                  {mainComicOrder.map((comicKey) => {
                    const comicBookmarks = groupedBookmarks[comicKey];
                    if (!comicBookmarks || comicBookmarks.length === 0) {
                      return null;
                    }
                    const isExpanded = !!expandedSections[comicKey];

                    return (
                      <div key={comicKey} className="bg-comic-secondary/50 rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleToggleSection(comicKey)}
                          className="w-full flex justify-between items-center p-3 text-lg font-semibold text-comic-light bg-comic-secondary hover:bg-comic-accent/50 transition-colors duration-200 focus:outline-none"
                          aria-expanded={isExpanded}
                        >
                          <span>{comicDisplayTitles[comicKey]}</span>
                          <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${!isExpanded ? '-rotate-90' : ''}`} />
                        </button>
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="p-3 pt-2 space-y-3">
                              {comicBookmarks.map((bookmark) => (
                                <div key={bookmark.page} className="bg-comic-secondary p-4 rounded-lg flex flex-col gap-2">
                                  <div className="flex justify-between items-baseline">
                                    <button
                                      onClick={() => onNavigate(bookmark)}
                                      className="text-lg font-bold text-comic-light hover:underline focus:outline-none focus:ring-2 focus:ring-comic-accent rounded text-left"
                                    >
                                      Page {bookmark.page}
                                    </button>
                                    <span className="text-xs text-comic-light/50 whitespace-nowrap pl-4">{formatTimestamp(bookmark.timestamp)}</span>
                                  </div>
                                  
                                  <div className="flex justify-between items-end gap-4 min-h-[2.25rem]">
                                    <div className="flex-grow">
                                      {bookmark.note && (
                                        <p className="text-comic-light/80 italic text-sm">"{bookmark.note}"</p>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                      <button onClick={() => onEditBookmarkRequest(bookmark)} aria-label="Edit bookmark note" className="p-2 rounded-full text-comic-light/70 hover:bg-comic-accent hover:text-white transition-colors">
                                        <PencilIcon />
                                      </button>
                                      <button onClick={() => onRemoveBookmark(bookmark)} aria-label="Delete bookmark" className="p-2 rounded-full text-comic-light/70 hover:bg-red-500 hover:text-white transition-colors">
                                        <TrashIcon />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Bonus Comics Section */}
                  {bonusComics.length > 0 && (
                    <div className="bg-comic-secondary/50 rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleToggleSection('bonus')}
                        className="w-full flex justify-between items-center p-3 text-lg font-semibold text-comic-light bg-comic-secondary hover:bg-comic-accent/50 transition-colors duration-200 focus:outline-none"
                        aria-expanded={!!expandedSections['bonus']}
                      >
                        <span>Bonus Comics</span>
                        <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${!expandedSections['bonus'] ? '-rotate-90' : ''}`} />
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          expandedSections['bonus'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="p-3 pt-2 space-y-2">
                            {/* Group bonus comics by category */}
                            {['Demo. 101', 'Extras', 'Mini Arcs'].map((category) => {
                              const categoryComics = bonusComics.filter(comic => 
                                bonusComicCategories[comic] === category
                              );
                              
                              if (categoryComics.length === 0) return null;
                              
                              const sectionKey = `bonus-${category.toLowerCase().replace(/\s+/g, '').replace('.', '')}`;
                              const isExpanded = !!expandedSections[sectionKey];
                              
                              return (
                                <div key={category} className="bg-comic-secondary/30 rounded-lg overflow-hidden">
                                  <button
                                    onClick={() => handleToggleSection(sectionKey)}
                                    className="w-full flex justify-between items-center p-2 text-sm font-medium text-comic-light bg-comic-secondary/50 hover:bg-comic-accent/30 transition-colors duration-200 focus:outline-none"
                                    aria-expanded={isExpanded}
                                  >
                                    <span>{category}</span>
                                    <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${!isExpanded ? '-rotate-90' : ''}`} />
                                  </button>
                                  <div
                                    className={`grid transition-all duration-300 ease-in-out ${
                                      isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                                  >
                                    <div className="overflow-hidden">
                                      <div className="p-2 pt-1 space-y-2">
                                        {categoryComics.map((comicKey) => {
                                          const comicBookmarks = groupedBookmarks[comicKey];
                                          return comicBookmarks?.map((bookmark) => (
                                            <div key={`${comicKey}-${bookmark.page}`} className="bg-comic-secondary p-3 rounded-lg flex flex-col gap-2">
                                              <div className="flex justify-between items-baseline">
                                                <button
                                                  onClick={() => onNavigate(bookmark)}
                                                  className="text-sm font-bold text-comic-light hover:underline focus:outline-none focus:ring-2 focus:ring-comic-accent rounded text-left"
                                                >
                                                  {comicDisplayTitles[comicKey]} - Page {bookmark.page}
                                                </button>
                                                <span className="text-xs text-comic-light/50 whitespace-nowrap pl-2">{formatTimestamp(bookmark.timestamp)}</span>
                                              </div>
                                              
                                              <div className="flex justify-between items-end gap-2 min-h-[2rem]">
                                                <div className="flex-grow">
                                                  {bookmark.note && (
                                                    <p className="text-comic-light/80 italic text-xs">"{bookmark.note}"</p>
                                                  )}
                                                </div>
                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                  <button onClick={() => onEditBookmarkRequest(bookmark)} aria-label="Edit bookmark note" className="p-1 rounded-full text-comic-light/70 hover:bg-comic-accent hover:text-white transition-colors">
                                                    <PencilIcon />
                                                  </button>
                                                  <button onClick={() => onRemoveBookmark(bookmark)} aria-label="Delete bookmark" className="p-1 rounded-full text-comic-light/70 hover:bg-red-500 hover:text-white transition-colors">
                                                    <TrashIcon />
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          ));
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-comic-light/70 bg-comic-secondary p-6 rounded-lg">
                  You haven't added any bookmarks yet.
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-comic-light mb-4 border-b border-comic-accent/30 pb-2">
              Resources
            </h2>
            <div className="space-y-2">
                <button onClick={onViewCast} className="w-full text-left p-3 bg-comic-secondary rounded-lg text-comic-light hover:bg-comic-accent transition-colors">
                    Cast
                </button>
                <button onClick={onViewDemonology} className="w-full text-left p-3 bg-comic-secondary rounded-lg text-comic-light hover:bg-comic-accent transition-colors">
                    Demonology 101
                </button>
                 <button onClick={onViewArchive} className="w-full text-left p-3 bg-comic-secondary rounded-lg text-comic-light hover:bg-comic-accent transition-colors">
                    Archive
                </button>
            </div>
          </div>

          {/* Mobile Navigation Controls */}
          {isMobile && onPageNavigate && (
            <div>
              <h2 className="text-2xl font-bold text-comic-light mb-4 border-b border-comic-accent/30 pb-2">
                Navigation
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {/* First Row */}
                <button
                  onClick={() => onPageNavigate(1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center p-3 bg-comic-secondary rounded-lg text-comic-light hover:bg-comic-accent transition-colors disabled:bg-comic-secondary/50 disabled:text-comic-light/50 disabled:cursor-not-allowed"
                  aria-label="First page"
                >
                  <SkipToStartIcon />
                  <span className="ml-2 text-sm">First Page</span>
                </button>
                <button
                  onClick={() => onPageNavigate(totalPages)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center p-3 bg-comic-secondary rounded-lg text-comic-light hover:bg-comic-accent transition-colors disabled:bg-comic-secondary/50 disabled:text-comic-light/50 disabled:cursor-not-allowed"
                  aria-label="Last page"
                >
                  <SkipToEndIcon />
                  <span className="ml-2 text-sm">Last Page</span>
                </button>
                
                {/* Chapter Navigation (if available) */}
                {hasChapters && (
                  <>
                    <button
                      onClick={() => prevChapterPage && onPageNavigate(prevChapterPage)}
                      disabled={!prevChapterPage}
                      className="flex items-center justify-center p-3 bg-comic-secondary rounded-lg text-comic-light hover:bg-comic-accent transition-colors disabled:bg-comic-secondary/50 disabled:text-comic-light/50 disabled:cursor-not-allowed"
                      aria-label="Previous chapter"
                    >
                      <DoubleChevronLeftIcon />
                      <span className="ml-2 text-sm">Prev Chapter</span>
                    </button>
                    <button
                      onClick={() => nextChapterPage && onPageNavigate(nextChapterPage)}
                      disabled={!nextChapterPage}
                      className="flex items-center justify-center p-3 bg-comic-secondary rounded-lg text-comic-light hover:bg-comic-accent transition-colors disabled:bg-comic-secondary/50 disabled:text-comic-light/50 disabled:cursor-not-allowed"
                      aria-label="Next chapter"
                    >
                      <DoubleChevronRightIcon />
                      <span className="ml-2 text-sm">Next Chapter</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};