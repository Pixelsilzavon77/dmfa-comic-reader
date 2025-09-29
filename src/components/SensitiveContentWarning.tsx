import React from 'react';

interface SensitiveContentWarningProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const SensitiveContentWarning: React.FC<SensitiveContentWarningProps> = ({
  isOpen,
  onAccept,
  onDecline
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-comic-module/95 backdrop-blur-sm rounded-lg shadow-2xl max-w-md w-full p-6 border border-comic-accent/20">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">⚠️</div>
          <h2 className="text-2xl font-bold text-comic-light mb-2">
            Content Warning
          </h2>
          <p className="text-comic-light/80 text-sm">
            You've discovered a hidden archive
          </p>
        </div>

        <div className="mb-6 space-y-3">
          <p className="text-comic-light text-sm leading-relaxed">
            The WRY folder contains historical content from the early 2000s-2010s internet culture. 
            Some images contain:
          </p>
          <ul className="text-comic-light/80 text-sm space-y-1 list-disc list-inside ml-4">
            <li>Nudity and sexual references</li>
            <li>Dark humor including offensive jokes</li>
            <li>Controversial memes from that era</li>
            <li>Content that would be considered inappropriate by today's standards</li>
          </ul>
          <p className="text-comic-light text-sm leading-relaxed">
            This content is preserved as part of the complete DMFA collection and Amber's artistic archive. 
            <strong className="text-white"> Viewer discretion advised.</strong>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onDecline}
            className="flex-1 px-4 py-2 bg-comic-dark text-comic-light rounded-md hover:bg-comic-dark/80 transition-colors duration-200 font-semibold"
          >
            Go Back
          </button>
          <button
            onClick={onAccept}
            className="flex-1 px-4 py-2 bg-comic-accent text-white rounded-md hover:bg-comic-accent-hover transition-colors duration-200 font-semibold"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};