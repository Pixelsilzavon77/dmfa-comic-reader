import React from 'react';
import RantContent from './RantContent';
import SupportSection from './SupportSection';

interface RantSidebarProps {}

const RantSidebar: React.FC<RantSidebarProps> = () => {
  return (
    <div className="hidden xl:block fixed left-4 top-4 bottom-4 w-80 bg-comic-module/95 backdrop-blur-sm rounded-lg shadow-2xl overflow-y-auto z-50">
      <div className="p-6 space-y-6">
        <RantContent />

        <div className="border-t border-comic-accent/30 pt-4">
          <SupportSection />
        </div>
      </div>
    </div>
  );
};

export default RantSidebar;