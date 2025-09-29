import React from 'react';
import { Header } from './Header';
import type { ComicIdentifier } from '../types';
import { comicConfigs } from '../comicConfigs';

interface WryEasterEggProps {
  onComicSelect: (comicId: ComicIdentifier) => void;
  onGoHome: () => void;
  onToggleMenu: () => void;
}

const ComicCard: React.FC<{
  title: string; 
  description: string; 
  pages: number;
  onButtonClick: () => void; 
}> = ({title, description, pages, onButtonClick}) => {
  return (
    <div className="bg-comic-secondary rounded-lg shadow-lg p-6 text-left flex flex-col h-full">
      <div className="flex items-center gap-3 justify-start">
        <h2 className="font-bold text-comic-light text-2xl">{title}</h2>
      </div>
      <p className="mt-3 text-comic-light/80 flex-grow">{description}</p>
      <p className="mt-2 text-comic-light/60 text-sm">{pages} images</p>
      <div className="mt-6 flex justify-center">
        <button
          onClick={onButtonClick}
          className="bg-comic-accent text-white font-bold rounded-md transition-colors duration-200 hover:bg-comic-accent-hover px-8 py-3"
        >
          View Collection
        </button>
      </div>
    </div>
  );
};

export const WryEasterEgg: React.FC<WryEasterEggProps> = ({
  onComicSelect,
  onGoHome,
  onToggleMenu
}) => {
  const wryComics = [
    {
      id: 'wryMain' as ComicIdentifier,
      title: 'WRY - Main Collection',
      description: 'The main WRY folder - a hidden collection of random art, sketches, and memes.',
      pages: comicConfigs.wryMain.totalPages
    },
    {
      id: 'wryStuff' as ComicIdentifier,
      title: 'WRY - Stuff',
      description: 'Additional content from the Stuff subfolder.',
      pages: comicConfigs.wryStuff.totalPages
    },
    {
      id: 'wryNP' as ComicIdentifier,
      title: 'WRY - NP',
      description: 'Art and previews from the NP subfolder.',
      pages: comicConfigs.wryNP.totalPages
    },
    {
      id: 'wrySketches' as ComicIdentifier,
      title: 'WRY - Sketches',
      description: 'Various character sketches and artwork.',
      pages: comicConfigs.wrySketches.totalPages
    }
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-comic-dark p-4 font-sans">
      <div className="w-full max-w-5xl">
        <Header 
          chapters={[]}
          currentPage={1}
          onChapterSelect={() => {}}
          view={'no-chapters'}
          onToggleView={() => {}}
          onToggleMenu={onToggleMenu}
          onGoHome={onGoHome}
        />
        
        <div className="mt-8 mb-8 text-center">
          <h1 className="text-4xl font-bold text-comic-light mb-4">
            🎉 WRY Easter Egg! 🎉
          </h1>
          <p className="text-xl text-comic-light/80 mb-2">
            You found Amber's secret WRY folder!
          </p>
          <p className="text-lg text-comic-light/60">
            This hidden collection contains random artwork, sketches, and miscellaneous images 
            that have been tucked away on the server for years.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {wryComics.map((comic) => (
            <ComicCard
              key={comic.id}
              title={comic.title}
              description={comic.description}
              pages={comic.pages}
              onButtonClick={() => onComicSelect(comic.id)}
            />
          ))}
        </div>
        
        <div className="text-center">
          <button
            onClick={onGoHome}
            className="px-8 py-3 bg-comic-accent text-white font-bold rounded-md transition-colors duration-200 hover:bg-comic-accent-hover"
          >
            Back to Main Collection
          </button>
        </div>
      </div>
    </div>
  );
};