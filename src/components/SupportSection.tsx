import React from 'react';

interface SupportSectionProps {
  className?: string;
  isCompact?: boolean;
}

const SupportSection: React.FC<SupportSectionProps> = ({ className = '', isCompact = false }) => {
  return (
    <div className={className}>
      {/* Support Section */}
      <div className="mb-6">
        <h3 className={`font-bold text-comic-light mb-4 text-center ${isCompact ? 'text-lg' : 'text-xl'}`}>
          Support the Author
        </h3>
        
        <div className="space-y-3">
          <a
            href="https://www.paypal.com/webapps/shoppingcart?flowlogging_id=c985795ab19b1&mfid=1758940285077_c985795ab19b1#/checkout/openButton"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 text-center"
          >
            💙 Donate via PayPal
          </a>
          
          <a
            href="https://www.patreon.com/Ambaaargh"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 text-center"
          >
            🧡 Support on Patreon
          </a>

          <a
            href="mailto:amber@mabsland.com"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 text-center"
          >
            📧 Email the Author
          </a>
          
          <a
            href="https://missmab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-comic-accent hover:bg-comic-accent-hover text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-center"
          >
            Visit Official Site
          </a>

          <div className="text-xs text-comic-light/70 text-center bg-comic-secondary/30 p-3 rounded-lg">
            <p className="mb-2">This reader is unofficial and fan-made.</p>
            <p>Please support Amber Williams (Ambaaargh) directly through their official channels!</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className={`font-bold text-comic-light mb-3 ${isCompact ? 'text-base' : 'text-lg'}`}>
          Official Links
        </h3>
        <div className={`space-y-2 ${isCompact ? 'text-sm' : 'text-base'}`}>
          <a
            href="https://picarto.tv/Ambaaargh"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-comic-light/80 hover:text-comic-accent transition-colors duration-200"
          >
            → Live Art Streams (Tuesdays 5PM EST)
          </a>
          <a
            href="https://missmab.com/arch.php"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-comic-light/80 hover:text-comic-accent transition-colors duration-200"
          >
            → Official Comic Archive
          </a>
          <a
            href="https://missmab.com/cast.php"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-comic-light/80 hover:text-comic-accent transition-colors duration-200"
          >
            → Character Cast
          </a>
          <a
            href="https://missmab.com/demonology.php"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-comic-light/80 hover:text-comic-accent transition-colors duration-200"
          >
            → Demonology 101
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;