import React, { useState, useEffect } from 'react';

interface RantContentProps {
  className?: string;
  isCompact?: boolean;
}

const CACHE_KEY = 'dmfa-rant-cache';
const CACHE_DURATION = 30 * 1000; // 30 seconds for testing (change back to 12 * 60 * 60 * 1000 later)

interface RantCache {
  content: string;
  lastUpdated: string;
  timestamp: number;
}

const FALLBACK_RANT = `Next Comic ETA: September 17th-ish, 2025 (Current Stream Plan: Tuesdays: 5PM (EST).

Doing my best and feeling relatively okay. Can't believe summer is already winding down on this half of the world again. Been doing a lot of sketching, though nothing really substantial enough to show off at this time. Thinking I may end up compiling some of them into sketch pages to post free on the patronicus.

Mostly just been having a nice time just doing sketches and finding days where I'm wanting to push back working hours to draw more, something I haven't felt in a long while. Alongside working out a more balanced routine and spending more time appreciating the process.

My main goal is to get to a regular Wednesday update, but so far it seems to be aim for Wednesday and fall mark later in the weekend. Which isn't ideal but then again if it turns back into one a week then huzzah for counterclockwise solutions.

For now, I skitter away to the art mines.
- Ambaaargh`;

export const RantContent: React.FC<RantContentProps> = ({ className = '', isCompact = false }) => {
  const [rantContent, setRantContent] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string>('');

  const extractRantFromHTML = (html: string): { content: string; lastUpdated: string } => {
    try {
      const rantStartMarker = 'HeadRant.gif';
      const rantEndMarker = 'patreon.com/Ambaaargh';
      
      const startIndex = html.indexOf(rantStartMarker);
      const endIndex = html.indexOf(rantEndMarker);
      
      if (startIndex === -1 || endIndex === -1) {
        console.log('Could not find rant markers in HTML');
        throw new Error('Rant markers not found');
      }
      
      let rantSection = html.substring(startIndex + rantStartMarker.length, endIndex);
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(rantSection, 'text/html');
      let rantText = doc.body.textContent || '';
      
      rantText = rantText
        .replace(/\s+/g, ' ')
        .replace(/\n\s*\n/g, '\n\n')
        .replace(/WIDTH="?\d+"?\s*/gi, '')
        .replace(/HEIGHT="?\d+"?\s*/gi, '')
        .replace(/BORDER="?\d+"?\s*/gi, '')
        .replace(/VSPACE="?\d+"?\s*/gi, '')
        .replace(/HSPACE="?\d+"?\s*/gi, '')
        .replace(/^\s*[">]+\s*/, '')
        .trim();
      
      rantText = rantText
        .replace(/^\s*\.+/gm, '')
        .replace(/^Image$/gm, '')
        .replace(/\[.*?\]/g, '')
        .replace(/\s*\(\s*\)/g, '')
        .replace(/^\s*[<>="'\s]+/, '')
        .trim();
      
      if (rantText.length < 50) {
        throw new Error('Extracted rant text too short');
      }
      
      return {
        content: rantText,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };
    } catch (error) {
      console.error('Error parsing rant content:', error);
      return {
        content: FALLBACK_RANT,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) + ' (Fallback)'
      };
    }
  };

  const fetchLatestRant = async (): Promise<RantCache> => {
    const corsProxies = [
      '', // Direct request first
      'https://cors-anywhere.herokuapp.com/',
      'https://api.allorigins.win/raw?url=',
      'https://corsproxy.io/?'
    ];
    
    for (let i = 0; i < corsProxies.length; i++) {
      const proxy = corsProxies[i];
      const url = proxy + (proxy ? encodeURIComponent('https://missmab.com/') : 'https://missmab.com/');
      
      try {
        setFetchError('');
        console.log(`Attempting to fetch from: ${proxy || 'direct'}`);
        
        const response = await fetch(url, {
          method: 'GET',
          mode: proxy ? 'cors' : 'no-cors',
          headers: proxy ? {} : {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          }
        });
        
        if (!response.ok && response.status !== 0) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        
        if (!html || html.length < 100) {
          throw new Error('Response too short or empty');
        }
        
        const { content, lastUpdated } = extractRantFromHTML(html);
        
        const cache: RantCache = {
          content,
          lastUpdated,
          timestamp: Date.now()
        };
        
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
        console.log(`Successfully fetched rant using ${proxy || 'direct'} method`);
        
        return cache;
      } catch (error) {
        console.error(`Failed to fetch with ${proxy || 'direct'}:`, error);
        if (i === corsProxies.length - 1) {
          setFetchError(`Could not fetch from missmab.com (tried ${corsProxies.length} methods)`);
        }
      }
    }
    
    return {
      content: FALLBACK_RANT,
      lastUpdated: 'September 2025 (All fetch methods failed)',
      timestamp: Date.now()
    };
  };

  const loadRantContent = async () => {
    setIsLoading(true);
    
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const now = Date.now();
      
      if (cachedData) {
        const cache: RantCache = JSON.parse(cachedData);
        
        setRantContent(cache.content);
        setLastUpdated(cache.lastUpdated);
        setIsLoading(false);
        
        if (now - cache.timestamp < CACHE_DURATION) {
          console.log('Using fresh cached rant content');
          return;
        }
      }
      
      console.log('Attempting to fetch latest rant...');
      const freshData = await fetchLatestRant();
      
      setRantContent(freshData.content);
      setLastUpdated(freshData.lastUpdated);
      
    } catch (error) {
      console.error('Error loading rant content:', error);
      setRantContent(FALLBACK_RANT);
      setLastUpdated('September 2025 (Fallback)');
      setFetchError('Using fallback content');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRantContent();
  }, []);

  if (isLoading) {
    return (
      <div className={`text-center text-comic-light/70 bg-comic-secondary p-4 rounded-lg ${className}`}>
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-comic-accent mx-auto mb-2"></div>
        Loading latest rant...
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="text-center mb-4">
        <h2 className={`font-bold text-comic-light border-b border-comic-accent/30 pb-2 ${isCompact ? 'text-lg' : 'text-xl'}`}>
          Rant O Update
        </h2>
        {lastUpdated && (
          <p className="text-xs text-comic-light/60 mt-1">Last updated: {lastUpdated}</p>
        )}
      </div>

      {fetchError && (
        <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-3 text-xs text-yellow-200 mb-4">
          ⚠️ {fetchError} - Using cached/fallback content
        </div>
      )}

      <div className={`bg-comic-secondary/50 rounded-lg p-4 text-comic-light/90 leading-relaxed ${isCompact ? 'text-sm max-h-64' : 'text-sm max-h-96'} overflow-y-auto`}>
        {rantContent.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-3 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RantContent;