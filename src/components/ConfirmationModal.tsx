import React, { useState, useEffect } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    let timeoutId: number;
    if (isOpen) {
      setIsRendered(true);
      timeoutId = window.setTimeout(() => {
        setIsVisible(true);
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
          onCancel();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isRendered, onCancel]);
  
  if (!isRendered) {
    return null;
  }
  
  return (
    <div 
      className={`fixed inset-0 bg-black/60 z-50 p-4 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onCancel}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className={`bg-comic-secondary rounded-lg shadow-xl w-full max-w-md p-6 transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-comic-light mb-4">{title}</h2>
        <p className="text-comic-light/90">{message}</p>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded-md transition-colors duration-200 hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md transition-colors duration-200 hover:bg-red-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};