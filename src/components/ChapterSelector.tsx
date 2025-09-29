import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { Chapter } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface ChapterSelectorProps {
  chapters: Chapter[];
  currentPage: number;
  onChapterSelect: (startPage: number) => void;
}

export const ChapterSelector: React.FC<ChapterSelectorProps> = ({ chapters, currentPage, onChapterSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentChapter = useMemo(() => {
    return chapters.find(c => currentPage >= c.startPage && currentPage <= c.endPage) || chapters[0];
  }, [chapters, currentPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleChapterSelect = (startPage: number) => {
    onChapterSelect(startPage);
    setIsOpen(false);
  };

  if (chapters.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-comic-secondary text-comic-light rounded-lg border border-comic-accent/30 hover:bg-comic-accent/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-comic-accent"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="font-semibold">
          {currentChapter ? currentChapter.title : 'Select Chapter'}
        </span>
        <ChevronDownIcon 
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-comic-secondary border border-comic-accent/30 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="py-1">
            {chapters.map((chapter) => (
              <button
                key={chapter.startPage}
                onClick={() => handleChapterSelect(chapter.startPage)}
                className={`w-full text-left px-4 py-2 hover:bg-comic-accent/20 transition-colors duration-150 ${
                  chapter.startPage === currentChapter?.startPage
                    ? 'bg-comic-accent/30 text-comic-light font-semibold' 
                    : 'text-comic-light/90'
                }`}
                role="option"
                aria-selected={chapter.startPage === currentChapter?.startPage}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{chapter.title}</span>
                  <span className="text-sm text-comic-light/60">
                    Pages {chapter.startPage}-{chapter.endPage}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};