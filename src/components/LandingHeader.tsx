import React, { useState, useRef } from 'react';

interface LandingHeaderProps {
  onViewCast: () => void;
  onViewDemonology: () => void;
  onWryEasterEgg: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ onViewCast, onViewDemonology, onWryEasterEgg }) => {
  const [clickCount, setClickCount] = useState(0);
  const lastClickTime = useRef(0);
  
  const handleTitleClick = () => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;
    
    // Reset counter if more than 3 seconds have passed since last click
    if (timeSinceLastClick > 3000) {
      setClickCount(1);
    } else {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      
      // Trigger easter egg on 5th click
      if (newCount >= 5) {
        onWryEasterEgg();
        setClickCount(0); // Reset counter
        return;
      }
    }
    
    lastClickTime.current = now;
  };

  const buttonClass = "px-4 py-2 bg-comic-accent text-white rounded-md transition-colors duration-200 hover:bg-comic-accent-hover font-semibold text-sm sm:text-base whitespace-nowrap";
  
  return (
    <header className="bg-comic-secondary p-4 rounded-lg shadow-lg w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
      <h1 
        className="text-3xl sm:text-4xl font-bold text-comic-light text-center sm:text-left cursor-default" 
        onClick={handleTitleClick}
      >
        Unofficial DMFA Reader
      </h1>
      <nav className="flex items-center gap-3 sm:gap-4">
        <button onClick={onViewCast} className={buttonClass}>
          View Cast
        </button>
        <button onClick={onViewDemonology} className={buttonClass}>
          Demonology 101
        </button>
      </nav>
    </header>
  );
};