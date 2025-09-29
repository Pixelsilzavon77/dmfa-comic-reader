import React, { useState, useEffect } from 'react';

interface ImageLightboxProps {
  isOpen: boolean;
  src: string;
  alt: string;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({ isOpen, src, alt, onClose }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    if (isOpen) {
      setIsRendered(true);
      // Add modal-open class to body to prevent background scrolling
      document.body.classList.add('modal-open');
      timeoutId = window.setTimeout(() => setIsVisible(true), 20);
    } else {
      setIsVisible(false);
      // Remove modal-open class from body
      document.body.classList.remove('modal-open');
      timeoutId = window.setTimeout(() => setIsRendered(false), 300); // Match transition duration
    }
    return () => {
      window.clearTimeout(timeoutId);
      // Cleanup: ensure class is removed if component unmounts while open
      if (isOpen) {
        document.body.classList.remove('modal-open');
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isRendered) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRendered, onClose]);

  if (!isRendered) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-black/80 z-[60] p-4 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label="Image viewer"
    >
      <img
        src={src}
        alt={alt}
        className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
      />
    </div>
  );
};
