import React, { useState, useEffect, useRef } from 'react';
import type { ComicIdentifier } from '../types';

interface BookmarkModalProps {
  isOpen: boolean;
  page: number;
  initialNote: string;
  comic: ComicIdentifier;
  onSave: (page: number, note: string, comic: ComicIdentifier) => void;
  onClose: () => void;
}

export const BookmarkModal: React.FC<BookmarkModalProps> = ({ isOpen, page, initialNote, comic, onSave, onClose }) => {
  const [note, setNote] = useState(initialNote);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setNote(initialNote);
  }, [initialNote]);
  
  useEffect(() => {
    let timeoutId: number;
    if (isOpen) {
      setIsRendered(true);
      timeoutId = window.setTimeout(() => {
        setIsVisible(true);
        textareaRef.current?.focus();
      }, 20);
    } else {
      setIsVisible(false);
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

  if (!isRendered) {
    return null;
  }
  
  const handleSave = () => {
    onSave(page, note, comic);
  };
  
  const handleTextAreaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };
  
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
    };const titlePrefix = comic === 'dmfa' ? '' : `${comicDisplayTitles[comic]}: `;
  const title = `Edit Bookmark for ${titlePrefix}Page ${page}`;

  return (
    <div 
      className={`fixed inset-0 bg-black/60 z-50 p-4 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className={`bg-comic-dark rounded-lg shadow-xl w-full max-w-md p-6 transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-comic-light mb-4">{title}</h2>
        <textarea
          ref={textareaRef}
          value={note}
          onChange={e => setNote(e.target.value)}
          onKeyDown={handleTextAreaKeyDown}
          placeholder="Enter a note (optional)"
          className="w-full h-32 p-3 bg-comic-secondary border border-comic-accent/50 text-comic-light rounded-md focus:ring-2 focus:ring-comic-accent focus:outline-none resize-none"
          aria-label="Bookmark note"
        />
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md transition-colors duration-200 hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-comic-accent text-white rounded-md transition-colors duration-200 hover:bg-comic-accent-hover"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};