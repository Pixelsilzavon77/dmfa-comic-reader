import React, { useState, useEffect } from 'react';
import { demonologyData, Species } from '../demonologyData';
import { EnhancedImageViewer } from './EnhancedImageViewer';

interface DemonologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fluffyText = `
  <p class="text-comic-light/90 leading-relaxed text-left"><b>Fluffy:</b> I take it from you clicking here you are curious about some of the things that exist in the the comic. That or Amber did something stupid and you are hoping there is an answer here to cover where she lazily left off...</p>
  <p class="text-comic-light/90 leading-relaxed text-left">Either way, this is more or less my little guide to help you out. On the left are various subjects of things that may or may not be important. I doubt I need to hold your hand while you click on various links. So go. Check them out. Stop reading what I have to say cause all I'm going to do is insult you the longer you stick around here.</p>
  <p class="text-comic-light/90 leading-relaxed text-left">(BTW, It can be easily said this list will grow as Amber remembers things she has currently forgotten, or thinks is shiny enough to add.)</p>
`;

export const DemonologyModal: React.FC<DemonologyModalProps> = ({ isOpen, onClose }) => {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHumanFlashing, setIsHumanFlashing] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'details'>('list');
  
  // Window width tracking for mobile detection (same as CastModal)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileLayout = windowWidth <= 768;

  useEffect(() => {
    let timeoutId: number;
    if (isOpen) {
      setIsRendered(true);
      
      // Add modal-open class to body to prevent background scrolling
      document.body.classList.add('modal-open');
      
      timeoutId = window.setTimeout(() => {
        setIsVisible(true);
      }, 20);
    } else {
      setIsVisible(false);
      
      // Remove modal-open class from body
      document.body.classList.remove('modal-open');
      
      timeoutId = window.setTimeout(() => {
        setIsRendered(false);
        setSelectedSpecies(null); // Reset selection on close
      }, 300);
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
    if (isRendered) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !lightboxImage) {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isRendered, onClose, lightboxImage]);

  // Setup global function for sub-entry navigation
  useEffect(() => {
    if (isOpen) {
      (window as any).setSelectedSpecies = (speciesName: string) => {
        const species = demonologyData.find(s => s.name === speciesName);
        if (species) {
          setSelectedSpecies(species);
        }
      };
    } else {
      delete (window as any).setSelectedSpecies;
    }
    
    return () => {
      delete (window as any).setSelectedSpecies;
    };
  }, [isOpen]);

  if (!isRendered) {
    return null;
  }

  const handleSpeciesClick = (species: Species) => {
    if (species.name === 'Human') {
      if (isHumanFlashing) return;
      setIsHumanFlashing(true);
      setTimeout(() => {
        setIsHumanFlashing(false);
      }, 300);
    } else {
      setSelectedSpecies(species);
      // Switch to details view on mobile when species is selected
      if (isMobileLayout) {
        setMobileView('details');
      }
    }
  };
  
  const races = demonologyData.filter(s => s.type === 'race' && !s.hidden);
  const classes = demonologyData.filter(s => s.type === 'class' && !s.hidden);
  
  const renderSpeciesButton = (species: Species) => {
    const isHuman = species.name === 'Human';
    const isFlashing = isHuman && isHumanFlashing;

    return (
      <li key={species.name}>
        <button 
          onClick={() => handleSpeciesClick(species)}
          className={`w-full text-left p-3 rounded-md transition-colors duration-150 ${
            selectedSpecies?.name === species.name 
            ? 'bg-comic-accent text-white font-semibold' 
            : 'text-comic-light/80 hover:bg-comic-dark/80'
          } ${
            isFlashing ? '!bg-red-600' : ''
          }`}
        >
          {species.name}
        </button>
      </li>
    );
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/70 z-50 p-4 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <div 
          className={`bg-comic-module/95 rounded-lg shadow-xl w-full max-w-6xl h-[85vh] flex flex-col p-6 transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${isOpen ? 'pointer-events-auto' : ''}`}
          onClick={e => e.stopPropagation()}
        >
          <h2 className="text-3xl font-bold text-comic-light mb-4 flex-shrink-0">Demonology 101</h2>
          
          {/* Mobile Back Button */}
          {isMobileLayout && mobileView === 'details' ? (
            <button
              onClick={() => setMobileView('list')}
              className="mb-4 px-4 py-2 bg-comic-accent text-white rounded-md transition-colors duration-200 hover:bg-comic-accent/80 flex items-center gap-2 w-fit"
            >
              ← Back to List
            </button>
          ) : null}
          
          <div className="flex-grow flex flex-col lg:flex-row gap-6 overflow-hidden min-h-0">
            {/* Species List */}
            <div className={`${isMobileLayout && mobileView === 'details' ? 'hidden' : 'block'} w-full lg:w-1/4 flex-shrink-0 bg-comic-secondary rounded-lg p-2 overflow-y-auto max-h-full`}>
              <ul className="space-y-1">
                {races.length > 0 && (
                  <div className="px-2 py-2 text-xs font-bold text-comic-light/80 uppercase tracking-wide border-b border-comic-accent/30 mb-2">
                    Races
                  </div>
                )}
                {races.map(renderSpeciesButton)}
                
                {classes.length > 0 && (
                  <div className="px-2 py-2 text-xs font-bold text-comic-light/80 uppercase tracking-wide border-b border-comic-accent/30 mb-2 mt-4">
                    Classes
                  </div>
                )}
                {classes.map(renderSpeciesButton)}
              </ul>
            </div>
            {/* Details Panel */}
                        {/* Species Details */}
            <div className={`species-details-panel ${isMobileLayout && mobileView === 'list' ? 'hidden' : 'block'} w-full lg:w-3/4 bg-comic-secondary rounded-lg p-6 overflow-y-auto max-h-full`}>
              {selectedSpecies ? (
                <div className="space-y-6">
                  {/* Header with portrait and name - Same layout as CastModal */}
                  <div className={`flex gap-6 items-start ${isMobileLayout ? 'flex-col items-center text-center' : 'flex-col md:flex-row'}`}>
                    {selectedSpecies.image && (
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => setLightboxImage(selectedSpecies.image!)}
                          className="block w-48 rounded-lg border-4 border-comic-accent overflow-hidden focus:outline-none focus:ring-4 focus:ring-comic-accent focus:ring-inset group"
                          aria-label={`View larger image for ${selectedSpecies.name}`}
                        >
                          <img
                            src={selectedSpecies.image}
                            alt={`Portrait of ${selectedSpecies.name}`}
                            className="w-full h-auto object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                          />
                        </button>
                      </div>
                    )}
                    <div className="flex-grow">
                      {!isMobileLayout && <h3 className="text-3xl font-bold text-comic-light mb-4">{selectedSpecies.name}</h3>}
                      {selectedSpecies.attributes.length > 0 && (
                        <div>
                          <h4 className="text-lg font-bold text-comic-light mb-3 border-b border-comic-accent/30 pb-1">Species Details</h4>
                          <div className="space-y-2 text-sm text-comic-light/80">
                            {selectedSpecies.attributes.map(attr => (
                              <div key={attr.label} className="flex">
                                <span className="font-semibold text-comic-light/80 w-32 flex-shrink-0">{attr.label}:</span>
                                <span className="flex-grow">{attr.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Species Sections */}
                  {selectedSpecies.sections.map(section => {
                    // Check if this is a Notable Figure section
                    const isNotableFigure = section.title.startsWith('Notable Figure');
                    
                    if (isNotableFigure) {
                      // Extract the name from the title (e.g., "Notable Figure: Akaen" -> "Akaen")
                      const figureName = section.title.replace('Notable Figure: ', '').replace('Notable Figure (', '').replace(')', '');
                      
                      return (
                        <div key={section.title} className="border-t border-comic-accent/20 pt-4">
                          <div className="bg-comic-dark/50 rounded-lg p-4 border-l-4 border-comic-accent">
                            <h4 className="text-sm font-bold text-comic-light mb-2">Notable Figure: {figureName}</h4>
                            <p className="text-comic-light/80 leading-relaxed text-justify">{section.content}</p>
                          </div>
                        </div>
                      );
                    } else {
                      // Check if this is the Extended Information section with clickable links
                      const isExtendedInfo = section.title === 'Extended Information';
                      
                      // Regular section styling
                      return (
                        <div key={section.title} className="border-t border-comic-accent/20 pt-4">
                          <h4 className="text-lg font-bold text-comic-light mb-3 border-b border-comic-accent/30 pb-1">{section.title}</h4>
                          {isExtendedInfo ? (
                            <div 
                              className="text-comic-light/80 leading-relaxed text-justify"
                              dangerouslySetInnerHTML={{ __html: section.content }}
                              onClick={(e) => {
                                const target = e.target as HTMLElement;
                                if (target.classList.contains('cubi-link')) {
                                  const speciesName = target.getAttribute('data-target');
                                  if (speciesName) {
                                    const species = demonologyData.find(s => s.name === speciesName);
                                    if (species) {
                                      setSelectedSpecies(species);
                                      // Scroll to top
                                      setTimeout(() => {
                                        const rightPanel = document.querySelector('.species-details-panel');
                                        if (rightPanel) {
                                          rightPanel.scrollTop = 0;
                                        }
                                      }, 50);
                                    }
                                  }
                                }
                              }}
                            />
                          ) : (
                            <p className="text-comic-light/80 leading-relaxed text-justify">{section.content}</p>
                          )}
                        </div>
                      );
                    }
                  })}

                </div>
              ) : (
                <div className="text-center p-4">
                  <img
                    src="https://missmab.com/Images/DemoHead.gif"
                    alt="Demonology 101"
                    className="mx-auto mb-6 rounded-lg"
                  />
                  <div className="space-y-4" dangerouslySetInnerHTML={{ __html: fluffyText }} />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-6 flex-shrink-0">
            {selectedSpecies?.name.includes(' - ') ? (
              <button
                onClick={() => {
                  const mainCubi = demonologyData.find(s => s.name === 'Cubi (Succubus/Incubus)');
                  if (mainCubi) {
                    setSelectedSpecies(mainCubi);
                    // Scroll to bottom to show Extended Information buttons
                    setTimeout(() => {
                      const rightPanel = document.querySelector('.species-details-panel');
                      if (rightPanel) {
                        rightPanel.scrollTop = rightPanel.scrollHeight;
                      }
                    }, 50);
                  }
                }}
                className="px-4 py-2 bg-comic-accent text-white rounded-md transition-colors duration-200 hover:bg-comic-accent/80 flex items-center gap-2"
              >
                ← Back
              </button>
            ) : (
              <div></div>
            )}
            <button
              onClick={onClose}
              className="px-6 py-2 bg-comic-accent text-white rounded-md transition-colors duration-200 hover:bg-comic-accent-hover"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <EnhancedImageViewer
        isOpen={!!lightboxImage}
        src={lightboxImage || ''}
        alt={selectedSpecies ? `Full view of ${selectedSpecies.name}` : ''}
        onClose={() => setLightboxImage(null)}
      />
    </>
  );
};