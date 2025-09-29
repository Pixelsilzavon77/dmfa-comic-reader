import React, { useState, useEffect, useRef } from 'react';

interface JumpToPageModalProps {
  isOpen: boolean;
  currentPage: number;
  totalPages: number;
  onJump: (page: number) => void;
  onClose: () => void;
}

export const JumpToPageModal: React.FC<JumpToPageModalProps> = ({ isOpen, currentPage, totalPages, onJump, onClose }) => {
  const [pageInput, setPageInput] = useState(currentPage.toString());
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timeoutId: number;
    if (isOpen) {
      setIsRendered(true);
      timeoutId = window.setTimeout(() => {
        setIsVisible(true);
        inputRef.current?.focus();
        inputRef.current?.select();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNumber = parseInt(pageInput, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onJump(pageNumber);
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setPageInput(value);
    }
  };

  if (!isRendered) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 bg-black/60 z-50 p-4 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className={`bg-comic-secondary rounded-lg shadow-xl w-full max-w-md p-6 transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-comic-light mb-4">Jump to Page</h2>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={pageInput}
            onChange={handleInputChange}
            className="w-full p-3 bg-comic-secondary border border-comic-accent/50 text-comic-light rounded-md focus:ring-2 focus:ring-comic-accent focus:outline-none"
            placeholder={`Enter page number (1-${totalPages})`}
            aria-label="Page number"
          />
          <div className="mt-2 text-comic-light/70 text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md transition-colors duration-200 hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-comic-accent text-white rounded-md transition-colors duration-200 hover:bg-comic-accent-hover"
            >
              Go to Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};