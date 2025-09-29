import React, { useState } from 'react';
import type { Bookmark, ComicIdentifier } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface BookmarkSidebarProps {
  bookmarks: Bookmark[];
  onNavigate: (bookmark: Bookmark) => void;
  onEditBookmarkRequest: (bookmark: Bookmark) => void;
  onRemoveBookmark: (bookmark: Bookmark) => void;
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

export const BookmarkSidebar: React.FC<BookmarkSidebarProps> = ({
  bookmarks,
  onNavigate,
  onEditBookmarkRequest,
  onRemoveBookmark,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    dmfa: true,
    abel: true,
    matilda: true,
    bonus: true,
    'bonus-demo101': true,
    'bonus-extras': true,
    'bonus-miniarcs': true,
  });

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
      dmfa: 'DMFA',
      abel: 'Abel',
      matilda: 'Matilda',
      cubiMindAbilities: 'Cubi Mind Abilities',
      furraaeFashionLaws: 'Furrae Fashion Laws',
      hybridGenetics: 'Hybrid Genetics',
      cubiClanLeaders: 'Cubi Clan Leaders',
      perfectDate: 'Perfect Date',
      takingPride: 'Taking Pride',
      borkedWrist: 'Borked Wrist',
      uncanonChristmas: 'Uncanon Christmas',
      bonusComics: 'Bonus Comics',
      wallpaperWars: 'Wallpaper Wars',
      wryMain: 'WRY - Main Collection',
      wryStuff: 'WRY - Stuff',
      wryNP: 'WRY - NP',
      wrySketches: 'WRY - Sketches'
    };// Define bonus comic categories
  // Define bonus comic categories (unified structure)
  const bonusComicCategories: Partial<Record<ComicIdentifier, string>> = {
    cubiMindAbilities: "Demo. 101",
    furraaeFashionLaws: "Demo. 101",
    hybridGenetics: "Demo. 101", 
    cubiClanLeaders: "Demo. 101"
  };
  
  const miniArcCategories: Partial<Record<ComicIdentifier, string>> = {
    perfectDate: "Mini Arcs",
    takingPride: "Mini Arcs",
    borkedWrist: "Mini Arcs",
    uncanonChristmas: "Mini Arcs"
  };

  const extrasCategories: Partial<Record<ComicIdentifier, string>> = {
    bonusComics: "Extras",
    wallpaperWars: "Extras"
  };
  
  const isBonusComic = (comic: ComicIdentifier): boolean => {
    return comic in bonusComicCategories;
  };
  
  const isMiniArc = (comic: ComicIdentifier): boolean => {
    return comic in miniArcCategories;
  };

  const isExtra = (comic: ComicIdentifier): boolean => {
    return comic in extrasCategories;
  };
  
  const mainComicOrder: ComicIdentifier[] = ['dmfa', 'abel', 'matilda'];
  const bonusComics = Object.keys(groupedBookmarks).filter(comic => 
    isBonusComic(comic as ComicIdentifier)
  ) as ComicIdentifier[];
  const miniArcs = Object.keys(groupedBookmarks).filter(comic => 
    isMiniArc(comic as ComicIdentifier)
  ) as ComicIdentifier[];
  const extras = Object.keys(groupedBookmarks).filter(comic => 
    isExtra(comic as ComicIdentifier)
  ) as ComicIdentifier[];

  return (
    <div className="hidden xl:block fixed right-4 top-4 bottom-4 w-80 bg-comic-module/95 backdrop-blur-sm rounded-lg shadow-2xl overflow-y-auto z-30">
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-bold text-comic-light border-b border-comic-accent/30 pb-2">
          My Bookmarks
        </h2>
        <div className="space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
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
                      className="w-full flex justify-between items-center p-3 text-sm font-semibold text-comic-light bg-comic-secondary hover:bg-comic-accent/50 transition-colors duration-200 focus:outline-none"
                      aria-expanded={isExpanded}
                    >
                      <span>{comicDisplayTitles[comicKey]}</span>
                      <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${!isExpanded ? '-rotate-90' : ''}`} />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="p-2 space-y-2">
                          {comicBookmarks.map((bookmark) => (
                            <div key={bookmark.page} className="bg-comic-secondary p-3 rounded-lg flex flex-col gap-2">
                              <div className="flex justify-between items-baseline">
                                <button
                                  onClick={() => onNavigate(bookmark)}
                                  className="text-sm font-bold text-comic-light hover:underline focus:outline-none focus:ring-2 focus:ring-comic-accent rounded text-left"
                                >
                                  Page {bookmark.page}
                                </button>
                                <span className="text-xs text-comic-light/50 whitespace-nowrap pl-2">{formatTimestamp(bookmark.timestamp)}</span>
                              </div>
                              
                              <div className="flex justify-between items-end gap-2 min-h-[1.5rem]">
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
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Bonus Comics Section */}
              {(bonusComics.length > 0 || miniArcs.length > 0 || extras.length > 0) && (
                <div className="bg-comic-secondary/50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleToggleSection('bonus')}
                    className="w-full flex justify-between items-center p-3 text-sm font-semibold text-comic-light bg-comic-secondary hover:bg-comic-accent/50 transition-colors duration-200 focus:outline-none"
                    aria-expanded={!!expandedSections['bonus']}
                  >
                    <span>Bonus Comics</span>
                    <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${!expandedSections['bonus'] ? '-rotate-90' : ''}`} />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      expandedSections['bonus'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-2 space-y-2">
                        {/* Group bonus comics by category */}
                        {['Demo. 101', 'Extras', 'Mini Arcs'].map((category) => {
                          const categoryComics = [...bonusComics, ...miniArcs, ...extras].filter(comic => {
                            const comicCategory = bonusComicCategories[comic] || miniArcCategories[comic] || extrasCategories[comic];
                            return comicCategory === category;
                          });
                          
                          if (categoryComics.length === 0) return null;
                          
                          const sectionKey = `bonus-${category.toLowerCase().replace(/\\s+/g, '').replace('.', '')}`;
                          const isExpanded = !!expandedSections[sectionKey];
                          
                          return (
                            <div key={category} className="bg-comic-secondary/30 rounded-lg overflow-hidden">
                              <button
                                onClick={() => handleToggleSection(sectionKey)}
                                className="w-full flex justify-between items-center p-2 text-xs font-medium text-comic-light bg-comic-secondary/50 hover:bg-comic-accent/30 transition-colors duration-200 focus:outline-none"
                                aria-expanded={isExpanded}
                              >
                                <span>{category}</span>
                                <ChevronDownIcon className={`h-3 w-3 transition-transform duration-200 ${!isExpanded ? '-rotate-90' : ''}`} />
                              </button>
                              <div
                                className={`grid transition-all duration-300 ease-in-out ${
                                  isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                }`}
                              >
                                <div className="overflow-hidden">
                                  <div className="p-2 space-y-1">
                                    {categoryComics.map((comicKey) => {
                                      const comicBookmarks = groupedBookmarks[comicKey];
                                      return comicBookmarks?.map((bookmark) => (
                                        <div key={`${comicKey}-${bookmark.page}`} className="bg-comic-secondary p-2 rounded-lg flex flex-col gap-2">
                                          <div className="flex justify-between items-baseline">
                                            <button
                                              onClick={() => onNavigate(bookmark)}
                                              className="text-xs font-bold text-comic-light hover:underline focus:outline-none focus:ring-2 focus:ring-comic-accent rounded text-left"
                                            >
                                              {comicDisplayTitles[comicKey]} - Page {bookmark.page}
                                            </button>
                                            <span className="text-xs text-comic-light/50 whitespace-nowrap pl-2">{formatTimestamp(bookmark.timestamp)}</span>
                                          </div>
                                          
                                          <div className="flex justify-between items-end gap-2 min-h-[1.5rem]">
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
            <div className="text-center text-comic-light/70 bg-comic-secondary p-4 rounded-lg">
              No bookmarks yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};