import React, { useEffect, useState } from 'react';
import { LandingHeader } from './LandingHeader';
import { BookmarkSidebar } from './BookmarkSidebar';
import RantSidebar from './RantSidebar';
import RantContent from './RantContent';
import SupportSection from './SupportSection';
import type { Bookmark } from '../types';

interface LandingPageProps {
  lastPage: number;
  abelLastPage: number;
  matildaLastPage: number;
  hasNewPages: {
    dmfa: boolean;
    abel: boolean;
    matilda: boolean;
  };
  bookmarks: Bookmark[];
  onStart: () => void;
  onStartAbel: () => void;
  onStartMatilda: () => void;
  onStartCubiMindAbilities: () => void;
  onStartFurraaeFashionLaws: () => void;
  onStartHybridGenetics: () => void;
  onStartCubiClanLeaders: () => void;
  onStartPerfectDate: () => void;
  onStartTakingPride: () => void;
  onStartBorkedWrist: () => void;
  onStartUncanonChristmas: () => void;
  onStartBonusComics: () => void;
  onStartWallpaperWars: () => void;
  onStartWryEasterEgg: () => void;
  onViewCast: () => void;
  onViewDemonology: () => void;
  onCheckUpdates: () => void;
  onAcknowledgeNewIndicator: (comicId: string) => void; // New function to acknowledge the indicator
  onNavigateToBookmark: (bookmark: Bookmark) => void;
  onEditBookmarkRequest: (bookmark: Bookmark) => void;
  onRemoveBookmark: (bookmark: Bookmark) => void;
}

const ComicCard: React.FC<{
  title: string; 
  description: string; 
  buttonText: string; 
  onButtonClick: () => void; 
  disabled?: boolean; 
  hasNew?: boolean;
  size?: 'large' | 'medium' | 'small';
}> = ({title, description, buttonText, onButtonClick, disabled = false, hasNew = false, size = 'medium'}) => {
  const sizeClasses = {
    large: 'p-10 text-center',
    medium: 'p-8 text-left',
    small: 'p-6 text-left'
  };
  
  const titleSizes = {
    large: 'text-4xl md:text-5xl',
    medium: 'text-3xl',
    small: 'text-2xl'
  };

  const titleAlignment = size === 'large' ? 'justify-center' : 'justify-start';
  const buttonAlignment = size === 'large' ? 'flex justify-center' : 'flex justify-center';

  return (
    <div className={`bg-comic-secondary rounded-lg shadow-lg ${sizeClasses[size]} ${disabled ? 'opacity-50' : ''} flex flex-col h-full`}>
      <div className={`flex items-center gap-3 ${titleAlignment}`}>
        <h2 className={`font-bold text-comic-light ${titleSizes[size]}`}>{title}</h2>
        {hasNew && (
          <span className="bg-comic-accent text-white text-sm px-2 py-1 rounded-full animate-pulse">
            New!
          </span>
        )}
      </div>
      <p className={`mt-3 text-comic-light/80 flex-grow ${size === 'large' ? 'text-lg max-w-2xl mx-auto' : ''}`}>{description}</p>
      <div className={`mt-6 ${buttonAlignment}`}>
        <button
          onClick={onButtonClick}
          disabled={disabled}
          className={`bg-comic-accent text-white font-bold rounded-md transition-colors duration-200 enabled:hover:bg-comic-accent-hover disabled:cursor-not-allowed ${
            size === 'large' ? 'px-12 py-4 text-lg' : 'px-8 py-3'
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};


export const LandingPage: React.FC<LandingPageProps> = ({ 
  lastPage, 
  abelLastPage, 
  matildaLastPage,
  hasNewPages,
  bookmarks,
  onStart, 
  onStartAbel, 
  onStartMatilda,
  onStartCubiMindAbilities,
  onStartFurraaeFashionLaws,
  onStartHybridGenetics,
  onStartCubiClanLeaders,
  onStartPerfectDate,
  onStartTakingPride,
  onStartBorkedWrist,
  onStartUncanonChristmas,
  onStartBonusComics,
  onStartWallpaperWars,
  onStartWryEasterEgg,
  onViewCast, 
  onViewDemonology,
  onCheckUpdates,
  onAcknowledgeNewIndicator,
  onNavigateToBookmark,
  onEditBookmarkRequest,
  onRemoveBookmark
}) => {
  
  // Check for updates when landing page is shown
  useEffect(() => {
    // Use RAF to prevent blocking the UI
    requestAnimationFrame(() => {
      onCheckUpdates();
      
      // Acknowledge the NEW indicator for DMFA since user has now seen the landing page
      // This happens after a brief delay to ensure the indicator is actually visible first
      setTimeout(() => {
        onAcknowledgeNewIndicator('dmfa');
      }, 1000); // 1 second delay to let user see the indicator
    });
  }, [onCheckUpdates, onAcknowledgeNewIndicator]);
  
  const [expandedSection, setExpandedSection] = useState<'demo101' | 'extras' | 'miniarcs' | null>(null);
  
  const continueText = lastPage > 1 ? `Continue Reading (Page ${lastPage})` : 'Start Reading';
  const abelContinueText = abelLastPage > 1 ? `Continue (Page ${abelLastPage})` : 'Start Reading';
  const matildaContinueText = matildaLastPage > 1 ? `Continue (Page ${matildaLastPage})` : 'Start Reading';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-comic-dark font-sans" style={{ padding: '16px', paddingTop: 'max(16px, env(safe-area-inset-top))', paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
      {/* Rant Sidebar for landscape desktop only */}
      <RantSidebar />
      
      {/* Bookmark Sidebar for landscape desktop only */}
      <BookmarkSidebar 
        bookmarks={bookmarks}
        onNavigate={onNavigateToBookmark}
        onEditBookmarkRequest={onEditBookmarkRequest}
        onRemoveBookmark={onRemoveBookmark}
      />
      
      <LandingHeader onViewCast={onViewCast} onViewDemonology={onViewDemonology} onWryEasterEgg={onStartWryEasterEgg} />
      <div className="w-full max-w-4xl">
        {/* Main Series - Featured prominently */}
        <div className="mb-12">
          <ComicCard
            title="Dan and Mab's Furry Adventures"
            description="A long-running fantasy webcomic following the whimsical adventures of Dan, an adventurer for hire, and Mab, his fae friend, along with their colorful friends in the realm of Furrae."
            buttonText={continueText}
            onButtonClick={onStart}
            hasNew={hasNewPages.dmfa}
            size="large"
          />
        </div>

        {/* Side Stories - Grouped together but still prominent */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-comic-light mb-6 text-center">Side Stories</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ComicCard
              title="Abel's Story"
              description="A deeper, more dramatic story revolving around Abel's past and the mysteries surrounding him. Recommended reading after Chapter 18."
              buttonText={abelContinueText}
              onButtonClick={onStartAbel}
              hasNew={hasNewPages.abel}
              size="medium"
            />
            <ComicCard
              title="Matilda"
              description="An in-depth backstory exploring one of the most unique and mysterious characters in the DMFA universe."
              buttonText={matildaContinueText}
              onButtonClick={onStartMatilda}
              hasNew={hasNewPages.matilda}
              size="medium"
            />
          </div>
        </div>

        {/* Bonus Comics & Extras Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-comic-light mb-6">Bonus Comics & Extras</h3>
          
          {!expandedSection ? (
            // Main three-card view
            <div className="grid md:grid-cols-3 gap-4">
              <ComicCard
                title="Mini Arcs"
                description="Short story arcs and special mini-series."
                buttonText="View Arcs"
                onButtonClick={() => setExpandedSection('miniarcs')}
                size="small"
              />
              <ComicCard
                title="Demo. 101 Comics"
                description="Educational comics about the creatures and world of Furrae."
                buttonText="Start Learning"
                onButtonClick={() => setExpandedSection('demo101')}
                size="small"
              />
              <ComicCard
                title="Extras" 
                description="Wallpaper Wars, Bonus Comics, and other special content."
                buttonText="Browse Extras"
                onButtonClick={() => setExpandedSection('extras')}
                size="small"
              />
            </div>
          ) : (
            // Expanded section view
            <div className="space-y-6">
              <button
                onClick={() => setExpandedSection(null)}
                className="px-6 py-2 bg-comic-accent text-white font-bold rounded-md transition-colors duration-200 hover:bg-comic-accent-hover"
              >
                ← Back to Extras
              </button>
              
              {expandedSection === 'demo101' && (
                <div>
                  <h4 className="text-xl font-bold text-comic-light mb-4">Demonology 101 Comics</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ComicCard
                      title="Cubi Mind-Abilities"
                      description="Learn about the mental powers of Cubi."
                      buttonText="Start Reading"
                      onButtonClick={onStartCubiMindAbilities}
                      size="small"
                    />
                    <ComicCard
                      title="Furrae Fashion Laws"
                      description="The do's and don'ts of fashion in Furrae."
                      buttonText="Start Reading"
                      onButtonClick={onStartFurraaeFashionLaws}
                      size="small"
                    />
                    <ComicCard
                      title="Hybrid Genetics"
                      description="Understanding mixed heritage in Furrae."
                      buttonText="Start Reading"
                      onButtonClick={onStartHybridGenetics}
                      size="small"
                    />
                    <ComicCard
                      title="Cubi Clan Leaders"
                      description="Meet the leaders of the Cubi clans."
                      buttonText="Start Reading"
                      onButtonClick={onStartCubiClanLeaders}
                      size="small"
                    />
                  </div>
                </div>
              )}
              
              {expandedSection === 'extras' && (
                <div>
                  <h4 className="text-xl font-bold text-comic-light mb-4">Extras</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ComicCard
                      title="Wallpaper Wars"
                      description="Classic contest entries and community creations."
                      buttonText="Browse"
                      onButtonClick={onStartWallpaperWars}
                      size="small"
                    />
                    <ComicCard
                      title="Bonus Comics"
                      description="A collection of Valentine's Day comics, April Fools comics, guest comics by other artists, and various bonus materials and sketches."
                      buttonText="Start Reading"
                      onButtonClick={onStartBonusComics}
                      size="small"
                    />
                  </div>
                </div>
              )}
              
              {expandedSection === 'miniarcs' && (
                <div>
                  <h4 className="text-xl font-bold text-comic-light mb-4">Mini Arcs</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 items-stretch">
                    <ComicCard
                      title="Perfect Date"
                      description="What does the cast of DMFA look for when looking for love? Find out via one player's game-save."
                      buttonText="Start Reading"
                      onButtonClick={onStartPerfectDate}
                      size="small"
                    />
                    <ComicCard
                      title="Taking Pride"
                      description="A focus on the various DMFA cast regarding their LGBTQ+ influences."
                      buttonText="Start Reading"
                      onButtonClick={onStartTakingPride}
                      size="small"
                    />
                    <ComicCard
                      title="Borked Wrist Sketchapalooza"
                      description="Various doodles/sketches drawn while Amber works on getting their hands to stop being so wiggly."
                      buttonText="Start Reading"
                      onButtonClick={onStartBorkedWrist}
                      size="small"
                    />
                    <ComicCard
                      title="Un-canon Christmas"
                      description="Twas the night before Christmas. And all through the lab. Was a bubblegum bunny making Christmas less drab..."
                      buttonText="Start Reading"
                      onButtonClick={onStartUncanonChristmas}
                      size="small"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Rant Content for Mobile/Portrait - Only show below xl breakpoint */}
        <div className="xl:hidden mt-12 space-y-6">
          <RantContent 
            className="bg-comic-secondary/30 rounded-lg p-6"
            isCompact={true}
          />
          
          <SupportSection 
            className="bg-comic-secondary/30 rounded-lg p-6"
            isCompact={true}
          />
        </div>
      </div>
    </div>
  );
};