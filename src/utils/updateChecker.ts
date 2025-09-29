import type { ComicConfig, ComicIdentifier } from '../types';

interface ComicUpdateState {
  latestCheckedPage: number;
  lastCheckTime: number;
  hasNewPages: boolean;
  highestReadPage: number;
  newIndicatorAcknowledged?: boolean; // Track if the "New!" indicator has been seen
}

// Exclude bonusComics and wallpaperWars from update tracking since they have no regular updates
type UpdateableComics = Exclude<ComicIdentifier, 'bonusComics' | 'wallpaperWars'>;
type UpdateStates = Record<UpdateableComics, ComicUpdateState>;

const UPDATE_STATES_KEY = 'dmfa-update-states';
const CHECK_INTERVAL = 1000 * 60 * 5; // Check every 5 minutes when actively using

interface UpdateCheckResult {
  hasUpdate: boolean;
  newTotal: number;
}

export function getUpdateStates(): UpdateStates {
  try {
    const stored = localStorage.getItem(UPDATE_STATES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading update states:', e);
  }
  
  // Initialize with default values
  return {
    dmfa: {
      latestCheckedPage: 2162,
      lastCheckTime: 0,
      hasNewPages: false,
      highestReadPage: 0,
      newIndicatorAcknowledged: false
    },
    abel: {
      latestCheckedPage: 217,
      lastCheckTime: 0,
      hasNewPages: false,
      highestReadPage: 0,
      newIndicatorAcknowledged: false
    },
    matilda: {
      latestCheckedPage: 0,
      lastCheckTime: 0,
      hasNewPages: false,
      highestReadPage: 0,
      newIndicatorAcknowledged: false
    },
    cubiMindAbilities: {
      latestCheckedPage: 7,
      lastCheckTime: 0,
      hasNewPages: false,
      highestReadPage: 0,
      newIndicatorAcknowledged: false
    },
    furraaeFashionLaws: {
      latestCheckedPage: 6,
      lastCheckTime: 0,
      hasNewPages: false,
      highestReadPage: 0,
      newIndicatorAcknowledged: false
    },
    hybridGenetics: {
      latestCheckedPage: 4,
      lastCheckTime: 0,
      hasNewPages: false,
      highestReadPage: 0,
      newIndicatorAcknowledged: false
    },
    cubiClanLeaders: {
      latestCheckedPage: 4,
      lastCheckTime: 0,
      hasNewPages: false,
      highestReadPage: 0,
      newIndicatorAcknowledged: false
    },
    perfectDate: {
      latestCheckedPage: 18,
      lastCheckTime: 0,
      hasNewPages: false,
      highestReadPage: 0,
      newIndicatorAcknowledged: false
    },
    takingPride: {
      latestCheckedPage: 8,
      lastCheckTime: 0,
      hasNewPages: false,
      highestReadPage: 0,
      newIndicatorAcknowledged: false
    },
    borkedWrist: {
      latestCheckedPage: 24,
      lastCheckTime: 0,
      hasNewPages: false,
      highestReadPage: 0,
      newIndicatorAcknowledged: false
    },
    uncanonChristmas: {
      latestCheckedPage: 6,
      lastCheckTime: 0,
      hasNewPages: false,
      highestReadPage: 0,
      newIndicatorAcknowledged: false
    },
    wryMain: {
      latestCheckedPage: 136,
      lastCheckTime: 0,
      hasNewPages: false,
      highestReadPage: 0,
      newIndicatorAcknowledged: false
    },
    wryStuff: {
      latestCheckedPage: 4,
      lastCheckTime: 0,
      hasNewPages: false,
      highestReadPage: 0,
      newIndicatorAcknowledged: false
    },
    wryNP: {
      latestCheckedPage: 18,
      lastCheckTime: 0,
      hasNewPages: false,
      highestReadPage: 0,
      newIndicatorAcknowledged: false
    },
    wrySketches: {
      latestCheckedPage: 33,
      lastCheckTime: 0,
      hasNewPages: false,
      highestReadPage: 0,
      newIndicatorAcknowledged: false
    }
  };
}

function saveUpdateStates(states: UpdateStates) {
  try {
    localStorage.setItem(UPDATE_STATES_KEY, JSON.stringify(states));
  } catch (e) {
    console.error('Error saving update states:', e);
  }
}

async function findLatestPageFromIndex(): Promise<number> {
  try {
    const proxy = 'https://corsproxy.io/?';
    const response = await fetch(`${proxy}https://missmab.com/index.php`);
    const text = await response.text();
    
    // Look for Vol####.png in the page content
    const match = text.match(/Vol(\d+)\.png/i);
    if (match && match[1]) {
      const pageNumber = parseInt(match[1], 10);
      if (!isNaN(pageNumber)) {
        return pageNumber;
      }
    }
    
    // If we couldn't find the page number, return current known total
    return 2160;
  } catch (error) {
    console.error('Error checking index page:', error);
    return 2160;
  }
}

export async function checkForUpdates(config: ComicConfig): Promise<UpdateCheckResult> {
  // Skip update checking for bonus comics
  if (config.id === 'bonusComics') {
    return { hasUpdate: false, newTotal: config.totalPages };
  }
  
  const states = getUpdateStates();
  const state = states[config.id as UpdateableComics];
  
  // Check if we've checked recently
  if (Date.now() - state.lastCheckTime < CHECK_INTERVAL) {
    return { 
      hasUpdate: state.hasNewPages && !state.newIndicatorAcknowledged, 
      newTotal: state.latestCheckedPage 
    };
  }

  try {
    const latestPage = await findLatestPageFromIndex();
    
    // Determine if there are actually new pages
    const hasActualNewPages = latestPage > state.highestReadPage;
    
    // Reset acknowledgment if there are truly new pages (higher than what was previously acknowledged)
    const shouldResetAcknowledgment = latestPage > state.latestCheckedPage;
    
    // Update state
    states[config.id as UpdateableComics] = {
      ...state,
      latestCheckedPage: latestPage,
      lastCheckTime: Date.now(),
      hasNewPages: hasActualNewPages,
      newIndicatorAcknowledged: shouldResetAcknowledgment ? false : (state.newIndicatorAcknowledged || false)
    };
    
    saveUpdateStates(states);

    return {
      hasUpdate: hasActualNewPages && !states[config.id as UpdateableComics].newIndicatorAcknowledged,
      newTotal: latestPage
    };
  } catch (error) {
    console.error('Error checking for updates:', error);
    return { 
      hasUpdate: state.hasNewPages && !state.newIndicatorAcknowledged, 
      newTotal: state.latestCheckedPage 
    };
  }
}

export function markPageAsRead(comicId: ComicConfig['id'], page: number): void {
  // Skip for bonus comics
  if (comicId === 'bonusComics') {
    return;
  }
  
  const states = getUpdateStates();
  const state = states[comicId as UpdateableComics];
  
  if (page >= state.highestReadPage) {
    states[comicId as UpdateableComics] = {
      ...state,
      highestReadPage: page,
      hasNewPages: page < state.latestCheckedPage
    };
    saveUpdateStates(states);
  }
}

export function acknowledgeNewIndicator(comicId: ComicConfig['id']): void {
  // Skip for bonus comics
  if (comicId === 'bonusComics') {
    return;
  }
  
  const states = getUpdateStates();
  const state = states[comicId as UpdateableComics];
  
  states[comicId as UpdateableComics] = {
    ...state,
    newIndicatorAcknowledged: true
  };
  
  saveUpdateStates(states);
}