import React from 'react';
import type { Chapter } from '../types';

interface ArchiveViewerProps {
  chapters: Chapter[];
  onNavigate: (page: number) => void;
}

export const ArchiveViewer: React.FC<ArchiveViewerProps> = ({ chapters, onNavigate }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-comic-light mb-6">Chapter Archive</h2>
      <div className="space-y-4">
        {chapters.map((chapter) => (
          <div key={chapter.startPage} className="bg-comic-secondary p-4 sm:p-6 rounded-lg shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-comic-light">
              <button
                onClick={() => onNavigate(chapter.startPage)}
                className="text-left hover:underline focus:outline-none focus:ring-2 focus:ring-comic-accent rounded"
              >
                {chapter.title}
              </button>
            </h3>
            <p className="text-sm text-comic-light/70 italic mt-1">
              Pages: {chapter.startPage} - {chapter.endPage}
            </p>
            {chapter.description && (
              <p className="mt-3 text-comic-light/90">
                {chapter.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};