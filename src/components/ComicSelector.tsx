import React, { useState, useEffect, useRef } from 'react';
import type { ComicIdentifier } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface Comic {
  id: ComicIdentifier;
  title: string;
  totalPages: number;
}

interface ComicSelectorProps {
  currentComic: ComicIdentifier;
  availableComics: Comic[];
  onComicSelect: (comicId: ComicIdentifier) => void;
}

export const ComicSelector: React.FC<ComicSelectorProps> = ({
  currentComic,
  availableComics,
  onComicSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentComicData = availableComics.find(comic => comic.id === currentComic);

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

  const handleComicSelect = (comicId: ComicIdentifier) => {
    onComicSelect(comicId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-comic-secondary text-comic-light rounded-lg border border-comic-accent/30 hover:bg-comic-accent/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-comic-accent"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="font-semibold">
          {currentComicData ? currentComicData.title : 'Select Comic'}
        </span>
        <ChevronDownIcon 
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-comic-secondary border border-comic-accent/30 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="py-1">
            {availableComics.map((comic) => (
              <button
                key={comic.id}
                onClick={() => handleComicSelect(comic.id)}
                className={`w-full text-left px-4 py-2 hover:bg-comic-accent/20 transition-colors duration-150 ${
                  comic.id === currentComic 
                    ? 'bg-comic-accent/30 text-comic-light font-semibold' 
                    : 'text-comic-light/90'
                }`}
                role="option"
                aria-selected={comic.id === currentComic}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{comic.title}</span>
                  <span className="text-sm text-comic-light/60">
                    {comic.totalPages} page{comic.totalPages !== 1 ? 's' : ''}
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