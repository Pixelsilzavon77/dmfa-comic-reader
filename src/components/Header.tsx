import React from 'react';
import type { Chapter } from '../types';
import { ChapterSelector } from './ChapterSelector';
import { MenuIcon } from './icons/MenuIcon';

interface HeaderProps {
  chapters: Chapter[];
  currentPage: number;
  onChapterSelect: (startPage: number) => void;
  view: 'comic' | 'archive' | 'no-chapters' | 'demo';
  onToggleView: () => void;
  onToggleMenu: () => void;
  onGoHome: () => void;
  customSelector?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ chapters, currentPage, onChapterSelect, view, onToggleView, onToggleMenu, onGoHome, customSelector }) => {
  return (
    <header className="bg-comic-secondary p-4 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-center w-full gap-4">
      <button onClick={onGoHome} className="text-left transition-opacity duration-200 hover:opacity-80">
        <h1 className="text-2xl sm:text-3xl font-bold text-comic-light">
          Unofficial DMFA Reader
        </h1>
      </button>
      <div className="flex items-center gap-2 sm:gap-4">
        {view === 'demo' && customSelector ? (
          customSelector
        ) : view !== 'no-chapters' ? (
          <ChapterSelector 
            chapters={chapters} 
            currentPage={currentPage}
            onChapterSelect={onChapterSelect} 
          />
        ) : null}
        {view === 'archive' && (
          <button 
            onClick={onToggleView}
            className="px-4 py-2 bg-comic-accent text-white rounded-md transition-colors duration-200 hover:bg-comic-accent-hover whitespace-nowrap"
          >
            Back to Comic
          </button>
        )}
        <button
          onClick={onToggleMenu}
          className="p-2 bg-comic-accent text-white rounded-md transition-colors duration-200 hover:bg-comic-accent-hover"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </div>
    </header>
  );
};