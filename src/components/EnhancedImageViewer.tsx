import React, { useState, useEffect } from 'react';

interface EnhancedImageViewerProps {
  isOpen: boolean;
  src: string;
  alt: string;
  onClose: () => void;
}

export const EnhancedImageViewer: React.FC<EnhancedImageViewerProps> = ({ isOpen, src, alt, onClose }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null);
  const [justOpened, setJustOpened] = useState(false);

  // Helper function to calculate distance between two touch points
  const getTouchDistance = (touches: React.TouchList): number => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      // Single touch - start panning if zoomed
      if (imageScale > 1) {
        const touch = e.touches[0];
        setPanStart({ x: touch.clientX, y: touch.clientY });
      }
    } else if (e.touches.length === 2) {
      // Pinch gesture start
      const distance = getTouchDistance(e.touches);
      setLastTouchDistance(distance);
      setIsPanning(true);
      setPanStart(null); // Cancel panning when pinching
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      if (panStart && imageScale > 1) {
        // Pan the image when zoomed
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
      }
    } else if (e.touches.length === 2 && lastTouchDistance) {
      // Pinch zoom
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

  const handleTouchEnd = () => {
    if (isPanning) {
      setIsPanning(false);
      setLastTouchDistance(null);
      return;
    }

    if (panStart) {
      // End panning
      setPanStart(null);
      return;
    }
  };

  // Reset zoom/pan when image changes or closes
  const resetImageState = () => {
    setImageScale(1);
    setImagePosition({ x: 0, y: 0 });
    setPanStart(null);
    setIsPanning(false);
    setLastTouchDistance(null);
  };

  useEffect(() => {
    let timeoutId: number;
    if (isOpen) {
      setIsRendered(true);
      resetImageState();
      // Add modal-open class to body to prevent background scrolling
      document.body.classList.add('modal-open');
      setJustOpened(true);
      
      timeoutId = window.setTimeout(() => {
        setIsVisible(true);
        setJustOpened(false);
      }, 50);
    } else {
      setIsVisible(false);
      // Remove modal-open class from body
      document.body.classList.remove('modal-open');
      
      timeoutId = window.setTimeout(() => {
        setIsRendered(false);
        resetImageState();
      }, 300);
    }
    return () => {
      window.clearTimeout(timeoutId);
      // Cleanup: ensure class is removed if component unmounts while open
      if (isOpen) {
        document.body.classList.remove('modal-open');
      }
    };
  }, [isOpen, src]);

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
    <>
      {/* Background layer - clickable to close */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/90 cursor-pointer transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ touchAction: 'none' }}
        onClick={() => {
          if (justOpened) {
            console.log('Background click ignored - just opened');
            return;
          }
          onClose();
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onTouchMove={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onTouchEnd={() => {
          if (justOpened) {
            console.log('Background touch ignored - just opened');
            return;
          }
          onClose();
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseMove={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onWheel={(e) => e.preventDefault()}
        aria-modal="true"
        role="dialog"
        aria-label="Image viewer"
      />

      {/* Image layer - separate fixed layer above background */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
        {/* Zoomable image */}
        <img
          src={src}
          alt={alt}
          className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-auto cursor-move transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}
          style={{
            transform: `scale(${imageScale}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
            transformOrigin: 'center',
            touchAction: imageScale > 1 ? 'none' : 'auto',
          }}
          onTouchStart={(e) => {
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
            e.stopPropagation();
            e.preventDefault();
            handleTouchEnd();
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </div>

      {/* Instructions overlay for mobile */}
      <div className="fixed bottom-4 left-4 right-4 z-[80] pointer-events-none">
        <div className={`bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white text-sm text-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} lg:hidden`}>
          📱 Pinch to zoom • Drag to pan • Tap outside to close
        </div>
      </div>
    </>
  );
};