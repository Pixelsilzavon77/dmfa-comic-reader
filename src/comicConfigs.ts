import type { ComicConfig } from './types';
import { BASE_CHAPTERS } from './constants';
import { ABEL_CHAPTERS } from './abelConstants';
import { MATILDA_TOTAL_PAGES, MATILDA_CHAPTERS } from './matildaConstants';

const BASE_URL = 'https://missmab.com/Comics/';

export const DEFAULT_DMFA_PAGES = 2162; // Starting point, will be updated dynamically

// Create an event system for config updates
export const configUpdateEvents = new EventTarget();
export const CONFIG_UPDATE_EVENT = 'dmfa-config-update';

export const updateDmfaTotalPages = (newTotal: number) => {
  localStorage.setItem('dmfa-total-pages', String(newTotal));
  configUpdateEvents.dispatchEvent(new CustomEvent(CONFIG_UPDATE_EVENT, { detail: { newTotal } }));
};

// Get the current total pages, either from localStorage or default
const getCurrentDmfaPages = () => {
  const stored = localStorage.getItem('dmfa-total-pages');
  return stored ? parseInt(stored, 10) : DEFAULT_DMFA_PAGES;
};

export const comicConfigs: Record<string, ComicConfig> = {
  dmfa: {
    id: 'dmfa',
    title: 'Dan and Mab\'s Furry Adventures',
    totalPages: getCurrentDmfaPages(),
    chapters: BASE_CHAPTERS,
    imageBaseUrl: BASE_URL,
    getImageFilename: (page: number) => {
      if (page >= 1578) {
        // After 1578, format is Vol1578.png
        return `Vol${page}.png`;
      }
      // Before 1578, format is Vol01.jpg or Vol1.jpg
      const pageNum = page < 10 ? String(page).padStart(2, '0') : String(page);
      return `Vol${pageNum}.jpg`;
    },
    storageKey: 'dmfa-reader-progress',
    commentaryEnabled: true,
    getCommentaryUrl: (page: number) => {
      const proxy = 'https://corsproxy.io/?';
      const pageId = String(page).padStart(3, '0');
      return `${proxy}https://missmab.com/Comics/Vol_${pageId}.php`;
    },
    // Dynamic page checking - allow navigation beyond current known total
    isDynamicPageCount: true,
    checkPageExists: async (page: number) => {
      try {
        const filename = page >= 1578 ? `Vol${page}.png` : 
                         page < 10 ? `Vol${String(page).padStart(2, '0')}.jpg` : `Vol${page}.jpg`;
        
        const response = await fetch(`${BASE_URL}${filename}`, { method: 'HEAD' });
        
        if (response.ok) {
          // Update our stored max if we found a higher page
          const currentMax = getCurrentDmfaPages();
          if (page > currentMax) {
            updateDmfaTotalPages(page);
          }
          return true;
        }
        return false;
      } catch {
        return false;
      }
    }
  },
  abel: {
    id: 'abel',
    title: 'Abel\'s Story',
    totalPages: 217,
    chapters: ABEL_CHAPTERS,
    imageBaseUrl: BASE_URL,
    getImageFilename: (page: number) => {
      const PART1_PAGES = 111;
      if (page <= PART1_PAGES) {
        return `Abel${String(page).padStart(2, '0')}.jpg`;
      } else {
        const pageInPart2 = page - PART1_PAGES;
        return `Ab_${String(pageInPart2).padStart(3, '0')}.jpg`;
      }
    },
    storageKey: 'dmfa-abel-reader-progress',
    commentaryEnabled: false
  },
  matilda: {
    id: 'matilda',
    title: 'Matilda',
    totalPages: MATILDA_TOTAL_PAGES,
    chapters: MATILDA_CHAPTERS,
    imageBaseUrl: BASE_URL,
    getImageFilename: (page: number) => {
      // Matilda uses format Mat_001.jpg
      return `Mat_${String(page).padStart(3, '0')}.jpg`;
    },
    storageKey: 'dmfa-matilda-reader-progress',
    commentaryEnabled: false
  },
  cubiMindAbilities: {
    id: 'cubiMindAbilities',
    title: 'Cubi Mind Abilities',
    totalPages: 5,
    chapters: [{ title: 'Cubi Mind Abilities', startPage: 1, endPage: 5, description: 'Educational comic about the mental abilities of Cubi.' }],
    imageBaseUrl: 'https://missmab.com/Demo/Images/',
    getImageFilename: (page: number) => {
      return `Cubi${String(page).padStart(2, '0')}.jpg`;
    },
    storageKey: 'dmfa-cubi-mind-abilities-progress',
    commentaryEnabled: false
  },
  furraaeFashionLaws: {
    id: 'furraaeFashionLaws',
    title: 'Furrae Fashion Laws',
    totalPages: 4,
    chapters: [{ title: 'Furrae Fashion Laws', startPage: 1, endPage: 4, description: 'The do\'s and don\'ts of fashion in Furrae.' }],
    imageBaseUrl: 'https://missmab.com/Demo/Images/',
    getImageFilename: (page: number) => {
      return `Fashion${String(page).padStart(2, '0')}.jpg`;
    },
    storageKey: 'dmfa-furrae-fashion-laws-progress',
    commentaryEnabled: false
  },
  hybridGenetics: {
    id: 'hybridGenetics',
    title: 'Hybrid Genetics',
    totalPages: 14,
    chapters: [{ title: 'Hybrid Genetics', startPage: 1, endPage: 14, description: 'Understanding mixed heritage in Furrae.' }],
    imageBaseUrl: 'https://missmab.com/Demo/Images/',
    getImageFilename: (page: number) => {
      if (page === 15) {
        // Secret easter egg page
        return 'HG_15.jpg';
      }
      return `HG_${String(page).padStart(2, '0')}.jpg`;
    },
    storageKey: 'dmfa-hybrid-genetics-progress',
    commentaryEnabled: false,
    // Special property to indicate this comic has a secret page
    hasSecretPage: true,
    secretPageNumber: 15
  },
  cubiClanLeaders: {
    id: 'cubiClanLeaders',
    title: 'Cubi Clan Leaders',
    totalPages: 15,
    chapters: [{ title: 'Cubi Clan Leaders', startPage: 1, endPage: 15, description: 'Meet the leaders of the Cubi clans.' }],
    imageBaseUrl: 'https://missmab.com/Demo/Images/',
    getImageFilename: (page: number) => {
      return `CL_${String(page).padStart(2, '0')}.jpg`;
    },
    storageKey: 'dmfa-cubi-clan-leaders-progress',
    commentaryEnabled: false
  },
  perfectDate: {
    id: 'perfectDate',
    title: 'Perfect Date',
    totalPages: 18,
    imageBaseUrl: BASE_URL,
    getImageFilename: (page: number) => {
      const pageNum = String(page).padStart(2, '0');
      return `PD_${pageNum}.jpg`;
    },
    storageKey: 'perfect-date-progress',
    commentaryEnabled: false
  },
  takingPride: {
    id: 'takingPride',
    title: 'Taking Pride',
    totalPages: 8,
    imageBaseUrl: BASE_URL,
    getImageFilename: (page: number) => {
      const pageNum = String(page).padStart(2, '0');
      return `P_${pageNum}.png`;
    },
    storageKey: 'taking-pride-progress',
    commentaryEnabled: false
  },
  borkedWrist: {
    id: 'borkedWrist',
    title: 'Borked Wrist Sketchapalooza',
    totalPages: 24,
    imageBaseUrl: BASE_URL,
    getImageFilename: (page: number) => {
      const pageNum = String(page).padStart(2, '0');
      return `DMFAD_${pageNum}.png`;
    },
    storageKey: 'borked-wrist-progress',
    commentaryEnabled: false
  },
  uncanonChristmas: {
    id: 'uncanonChristmas',
    title: 'Have yourself an un-canon little Christmas',
    totalPages: 6,
    imageBaseUrl: BASE_URL,
    getImageFilename: (page: number) => {
      return `Holly_Jolly${page}.jpg`;
    },
    storageKey: 'uncanon-christmas-progress',
    commentaryEnabled: false
  },
  bonusComics: {
    id: 'bonusComics',
    title: 'Bonus Comics',
    totalPages: 58,
    chapters: [
      { title: "Valentine's Day Comics", startPage: 1, endPage: 6, description: "Valentine's Day themed comics" },
      { title: "April Fools Comics", startPage: 7, endPage: 10, description: "April Fools themed comics" },
      { title: "Guest Comics", startPage: 11, endPage: 40, description: "Comics by guest artists" },
      { title: "Bonus Materials", startPage: 41, endPage: 58, description: "Various bonus comics and sketches" }
    ],
    imageBaseUrl: 'https://missmab.com/Bonus/',
    getImageFilename: (page: number) => {
      // Manual mapping of each page to its specific filename
      const pageFilenames: Record<number, string> = {
        // Valentine's Day Comics (1-6)
        1: 'Vol_Vday01.jpg',
        2: 'Vol_Vday02.jpg',
        3: 'Vol_Vday03.jpg',
        4: 'Vol_Vday04.jpg',
        5: 'Vol_Vday04b.jpg',
        6: 'Vol_Vday05.jpg',
        
        // April Fools Comics (7-10)
        7: 'Vol20a.jpg',
        8: 'Vol220.jpg',
        9: 'April_05.jpg',
        10: 'April_06.jpg',
        
        // Guest Comics (11-41)
        11: 'VolG001.jpg',
        12: 'VolG002.jpg',
        13: 'couch.jpg',
        14: 'Vol194.jpg',
        15: 'awwww.jpg',
        16: 'Bad_Amber.jpg',
        17: 'dmfacaves.jpg',
        18: 'Equidna.jpg',
        19: 'Larceny.gif',
        20: 'Steve.jpg',
        21: 'Steve_Gift.jpg',
        22: 'terrance_isabel.jpg',
        23: 'Comic_Caine.jpg',
        24: 'Co_Sera.gif',
        25: 'EnterFluffy.jpg',
        26: 'KK.jpg',
        27: 'guest.jpg',
        28: 'DMFAGuest2.jpg',
        29: 'DMFAGuest3.jpg',
        30: 'DMFAGuest4.jpg',
        31: '01.JPG',
        32: '02.JPG',
        33: '03.JPG',
        34: '04.JPG',
        35: '05.JPG',
        36: 'finepilotdanger.gif',
        37: 'GuestComicTaskiAndCap.jpg',
        38: 'messy.jpg',
        39: 'foramber-1.jpg',
        40: 'foramber-2.jpg',
        
        // Bonus Materials (41-58)
        41: 'Back.jpg',
        42: 'Badge.jpg',
        43: 'Bebe_Matilda.jpg',
        44: 'BFTP.jpg',
        45: 'Birthday.jpg',
        46: 'Bleh.jpg',
        47: 'Con_Mab.jpg',
        48: 'Hack.jpg',
        49: 'MIA.jpg',
        50: 'Necro.jpg',
        51: 'Previews.jpg',
        52: 'Returning.jpg',
        53: 'The_Light.jpg',
        54: 'NASBLAR.jpg',
        55: 'Gay4Abel.jpg',
        56: 'Mab_Moon.jpg',
        57: 'MomDay.jpg',
        58: 'Woo.jpg'
      };
      
      return pageFilenames[page] || `unknown_${page}.jpg`;
    },
    storageKey: 'bonus-comics-progress',
    commentaryEnabled: true,
    getCommentaryUrl: (page: number) => {
      const proxy = 'https://corsproxy.io/?';
      // Map pages to their actual comic URLs for commentary
      const pageUrls: Record<number, string> = {
        // Valentine's Day Comics
        1: 'https://missmab.com/Comics/Vol_VDay001.php',
        2: 'https://missmab.com/Comics/Vol_VDay002.php',
        3: 'https://missmab.com/Comics/Vol_VDay003.php',
        4: 'https://missmab.com/Comics/Vol_VDay004.php',
        5: 'https://missmab.com/Comics/Vol_VDay005.php',
        6: 'https://missmab.com/Comics/Vol_VDaylast.php',
        
        // April Fools Comics
        7: 'https://missmab.com/Comics/Vol_Fools001.php',
        8: 'https://missmab.com/Comics/Vol_220.php',
        9: 'https://missmab.com/Comics/Vol_Fools003.php',
        10: 'https://missmab.com/Comics/Vol_Foolslast.php',
        
        // Guest Comics
        11: 'https://missmab.com/Comics/Vol_Guest001.php',
        12: 'https://missmab.com/Comics/Vol_Guest002.php',
        13: 'https://missmab.com/Comics/Vol_Guest003.php',
        14: 'https://missmab.com/Comics/Vol_194.php',
        15: 'https://missmab.com/Comics/Vol_Guest005.php',
        16: 'https://missmab.com/Comics/Vol_Guest006.php',
        17: 'https://missmab.com/Comics/Vol_Guest007.php',
        18: 'https://missmab.com/Comics/Vol_Guest008.php',
        19: 'https://missmab.com/Comics/Vol_Guest009.php',
        20: 'https://missmab.com/Comics/Vol_Guest010.php',
        21: 'https://missmab.com/Comics/Vol_Guest011.php',
        22: 'https://missmab.com/Comics/Vol_Guest012.php',
        23: 'https://missmab.com/Comics/Vol_Guest013.php',
        24: 'https://missmab.com/Comics/Vol_Guest014.php',
        25: 'https://missmab.com/Comics/Vol_Guest015.php',
        26: 'https://missmab.com/Comics/Vol_Guest016.php',
        27: 'https://missmab.com/Comics/Vol_Guest017.php',
        28: 'https://missmab.com/Comics/Vol_Guest018.php',
        29: 'https://missmab.com/Comics/Vol_Guest019.php',
        30: 'https://missmab.com/Comics/Vol_Guest020.php',
        31: 'https://missmab.com/Comics/Vol_Guest021.php',
        32: 'https://missmab.com/Comics/Vol_Guest022.php',
        33: 'https://missmab.com/Comics/Vol_Guest023.php',
        34: 'https://missmab.com/Comics/Vol_Guest024.php',
        35: 'https://missmab.com/Comics/Vol_Guest025.php',
        36: 'https://missmab.com/Comics/Vol_Guest026.php',
        37: 'https://missmab.com/Comics/Vol_Guest027.php',
        38: 'https://missmab.com/Comics/Vol_Guest028.php',
        39: 'https://missmab.com/Comics/Vol_Guest029.php',
        40: 'https://missmab.com/Comics/Vol_Guest030.php',
        
        // Bonus Materials
        41: 'https://missmab.com/Comics/Vol_Bonus001.php',
        42: 'https://missmab.com/Comics/Vol_Bonus002.php',
        43: 'https://missmab.com/Comics/Vol_Bonus003.php',
        44: 'https://missmab.com/Comics/Vol_Bonus004.php',
        45: 'https://missmab.com/Comics/Vol_Bonus005.php',
        46: 'https://missmab.com/Comics/Vol_Bonus006.php',
        47: 'https://missmab.com/Comics/Vol_Bonus007.php',
        48: 'https://missmab.com/Comics/Vol_Bonus008.php',
        49: 'https://missmab.com/Comics/Vol_Bonus009.php',
        50: 'https://missmab.com/Comics/Vol_Bonus010.php',
        51: 'https://missmab.com/Comics/Vol_Bonus011.php',
        52: 'https://missmab.com/Comics/Vol_Bonus012.php',
        53: 'https://missmab.com/Comics/Vol_Bonus013.php',
        54: 'https://missmab.com/Comics/Vol_Bonus014.php',
        55: 'https://missmab.com/Comics/Vol_Bonus015.php',
        56: 'https://missmab.com/Comics/Vol_Bonus016.php',
        57: 'https://missmab.com/Comics/Vol_Bonus017.php',
        58: 'https://missmab.com/Comics/Vol_Bonuslast.php'
      };
      
      const url = pageUrls[page];
      return url ? `${proxy}${url}` : null;
    }
  },
  wallpaperWars: {
    id: 'wallpaperWars',
    title: 'Wallpaper Wars',
    totalPages: 120,
    chapters: [
      { title: "Wedding VS. Shonen", startPage: 1, endPage: 3, description: "Wedding wallpaper contest entries" },
      { title: "Cosplay VS. DDR", startPage: 4, endPage: 14, description: "Dance Dance Revolution vs Cosplay contest" },
      { title: "Pirates VS. Ninjas", startPage: 15, endPage: 28, description: "The classic battle of Pirates vs Ninjas" },
      { title: "Alien Dice VS. DMFA", startPage: 29, endPage: 53, description: "DMFA vs Alien Dice wallpaper contest" },
      { title: "Alien Dice VS. DMFA: The Alien Dice Meters", startPage: 54, endPage: 73, description: "Alternative entries for Alien Dice vs DMFA" },
      { title: "Abel VS. Regina", startPage: 74, endPage: 88, description: "Backstory wallpaper entries" },
      { title: "SAIA Librarian VS. Fa'lina's Dance No.", startPage: 89, endPage: 96, description: "Succubus and Incubus Academy themed entries" },
      { title: "Wildy VS. Jyrras", startPage: 97, endPage: 107, description: "Wildy vs Jyrras themed wallpaper contest" },
      { title: "Tag Team Battle", startPage: 108, endPage: 120, description: "Tag Team Battle entries" }
    ],
    imageBaseUrl: 'https://missmab.com/WW/',
    getImageFilename: (page: number) => {
      // Manual mapping of each page to its specific filename based on official archive
      const pageFilenames: Record<number, string> = {
        // Section 1: Wedding VS. Shonen (Wedding_ prefix) - Pages 1-3
        1: 'Wedding_0302.gif',
        2: 'Wedding_0552.gif',
        3: 'Wedding_0751.gif',
        
        // Section 2: Cosplay VS. DDR (DDR_ prefix) - Pages 4-14 (11 total)
        4: 'DDR_0000.gif',
        5: 'DDR_0160.gif',
        6: 'DDR_0180.gif',
        7: 'DDR_0260.gif',
        8: 'DDR_0300.gif',
        9: 'DDR_0520.gif',
        10: 'DDR_0520b.gif',
        11: 'DDR_0595.gif',
        12: 'DDR_0635.gif',
        13: 'DDR_0655.gif',
        14: 'DDR_1095.gif',
        
        // Section 3: Pirates VS. Ninjas (Ninjas_ prefix) - Pages 15-28 (14 total)
        15: 'Ninjas_0000.gif',
        16: 'Ninjas_0110.gif',
        17: 'Ninjas_0220.gif',
        18: 'Ninjas_0270.gif',
        19: 'Ninjas_0280.gif',
        20: 'Ninjas_0311.gif',
        21: 'Ninjas_0340.gif',
        22: 'Ninjas_0351.gif',
        23: 'Ninjas_0400.gif',
        24: 'Ninjas_0425.gif',
        25: 'Ninjas_0465.gif',
        26: 'Ninjas_0485.gif',
        27: 'Ninjas_0546.gif',
        28: 'Ninjas_0567.gif',
        
        // Section 4: Alien Dice VS. DMFA (AlienDice_ prefix) - Pages 29-53 (25 total)
        29: 'AlienDice_0000.gif',
        30: 'AlienDice_0010.gif',
        31: 'AlienDice_0105.gif',
        32: 'AlienDice_0145.gif',
        33: 'AlienDice_0160.gif',
        34: 'AlienDice_0160b.gif',
        35: 'AlienDice_0170.gif',
        36: 'AlienDice_0190.gif',
        37: 'AlienDice_0190b.gif',
        38: 'AlienDice_0335.gif',
        39: 'AlienDice_0392.gif',
        40: 'AlienDice_0392b.gif',
        41: 'AlienDice_0427.gif',
        42: 'AlienDice_0437.gif',
        43: 'AlienDice_0547.gif',
        44: 'AlienDice_0547b.gif',
        45: 'AlienDice_0552.gif',
        46: 'AlienDice_0552b.gif',
        47: 'AlienDice_0612.gif',
        48: 'AlienDice_0744.gif',
        49: 'AlienDice_0764.gif',
        50: 'AlienDice_0890.gif',
        51: 'AlienDice_0890b.gif',
        52: 'AlienDice_0890c.gif',
        53: 'AlienDice_1030.gif',
        
        // Section 4a: Alien Dice VS. DMFA: The Alien Dice Meters (AlienDiceAlt_ prefix) - Pages 54-73 (20 total)
        54: 'AlienDiceAlt_0000.gif',
        55: 'AlienDiceAlt_0090.gif',
        56: 'AlienDiceAlt_0105.gif',
        57: 'AlienDiceAlt_0190.gif',
        58: 'AlienDiceAlt_0335.gif',
        59: 'AlienDiceAlt_0392.gif',
        60: 'AlienDiceAlt_0392b.gif',
        61: 'AlienDiceAlt_0392c.gif',
        62: 'AlienDiceAlt_0437.gif',
        63: 'AlienDiceAlt_0437b.gif',
        64: 'AlienDiceAlt_0547.gif',
        65: 'AlienDiceAlt_0547b.gif',
        66: 'AlienDiceAlt_0552.gif',
        67: 'AlienDiceAlt_0612.gif',
        68: 'AlienDiceAlt_0612b.gif',
        69: 'AlienDiceAlt_0744.gif',
        70: 'AlienDiceAlt_0744b.gif',
        71: 'AlienDiceAlt_0764.gif',
        72: 'AlienDiceAlt_0890.gif',
        73: 'AlienDiceAlt_1030.gif',
        
        // Section 5: Abel VS. Regina (Backstory_ prefix) - Pages 74-88 (15 total)
        74: 'Backstory_0065.gif',
        75: 'Backstory_0410.gif',
        76: 'Backstory_0530.gif',
        77: 'Backstory_0650.gif',
        78: 'Backstory_0720.gif',
        79: 'Backstory_0840.gif',
        80: 'Backstory_1110.gif',
        81: 'Backstory_1150.gif',
        82: 'Backstory_1570.gif',
        83: 'Backstory_1630.gif',
        84: 'Backstory_1640.gif',
        85: 'Backstory_1670.gif',
        86: 'Backstory_1675.gif',
        87: 'Backstory_1805.gif',
        88: 'Backstory_2275.gif',
        
        // Section 6: SAIA Librarian VS. Fa'lina's Dance No. (SAIA_ prefix) - Pages 89-96 (8 total)
        89: 'SAIA_025.gif',
        90: 'SAIA_185.gif',
        91: 'SAIA_341.gif',
        92: 'SAIA_417.gif',
        93: 'SAIA_447.gif',
        94: 'SAIA_487.gif',
        95: 'SAIA_522.gif',
        96: 'SAIA_638.gif',
        
        // Section 7: Wildy VS. Jyrras (Random_ prefix) - Pages 97-107 (11 total)
        97: 'Random_000.gif',
        98: 'Random_020.gif',
        99: 'Random_085.gif',
        100: 'Random_175.gif',
        101: 'Random_185.gif',
        102: 'Random_345.gif',
        103: 'Random_490.gif',
        104: 'Random_540.gif',
        105: 'Random_605.gif',
        106: 'Random_807.gif',
        107: 'Random_900.gif',
        
        // Section 8: Tag Team Battle (TT_ prefix) - Pages 108-120 (13 total)
        108: 'TT_000.gif',
        109: 'TT_075.gif',
        110: 'TT_145.gif',
        111: 'TT_245.gif',
        112: 'TT_380.gif',
        113: 'TT_390.gif',
        114: 'TT_0b.gif',
        115: 'TT_1145.gif',
        116: 'TT_1273.gif',
        117: 'TT_1280.gif',
        118: 'TT_1360.gif',
        119: 'TT_1375.gif',
        120: 'TT_End.gif'
      };
      
      return pageFilenames[page] || `unknown_${page}.gif`;
    },
    storageKey: 'wallpaper-wars-progress',
    commentaryEnabled: true,
    getCommentaryUrl: (page: number) => {
      const proxy = 'https://corsproxy.io/?';
      // Map pages to their actual comic URLs for commentary based on official archive
      const pageUrls: Record<number, string> = {
        // Section 1: Wedding VS. Shonen - Pages 1-3
        1: 'https://missmab.com/Comics/WW01_0302.php',
        2: 'https://missmab.com/Comics/WW01_0552.php',
        3: 'https://missmab.com/Comics/WW01_0751.php',
        
        // Section 2: Cosplay VS. DDR - Pages 4-14
        4: 'https://missmab.com/Comics/WW02_0000.php',
        5: 'https://missmab.com/Comics/WW02_0160.php',
        6: 'https://missmab.com/Comics/WW02_0180.php',
        7: 'https://missmab.com/Comics/WW02_0260.php',
        8: 'https://missmab.com/Comics/WW02_0300.php',
        9: 'https://missmab.com/Comics/WW02_0520.php',
        10: 'https://missmab.com/Comics/WW02_0520b.php',
        11: 'https://missmab.com/Comics/WW02_0595.php',
        12: 'https://missmab.com/Comics/WW02_0635.php',
        13: 'https://missmab.com/Comics/WW02_0655.php',
        14: 'https://missmab.com/Comics/WW02_1095.php',
        
        // Section 3: Pirates VS. Ninjas - Pages 15-28
        15: 'https://missmab.com/Comics/WW03_0000.php',
        16: 'https://missmab.com/Comics/WW03_0110.php',
        17: 'https://missmab.com/Comics/WW03_0220.php',
        18: 'https://missmab.com/Comics/WW03_0270.php',
        19: 'https://missmab.com/Comics/WW03_0280.php',
        20: 'https://missmab.com/Comics/WW03_0311.php',
        21: 'https://missmab.com/Comics/WW03_0340.php',
        22: 'https://missmab.com/Comics/WW03_0351.php',
        23: 'https://missmab.com/Comics/WW03_0400.php',
        24: 'https://missmab.com/Comics/WW03_0425.php',
        25: 'https://missmab.com/Comics/WW03_0465.php',
        26: 'https://missmab.com/Comics/WW03_0485.php',
        27: 'https://missmab.com/Comics/WW03_0546.php',
        28: 'https://missmab.com/Comics/WW03_0567.php',
        
        // Section 4: Alien Dice VS. DMFA - Pages 29-53
        29: 'https://missmab.com/Comics/WW04_0000.php',
        30: 'https://missmab.com/Comics/WW04_0010.php',
        31: 'https://missmab.com/Comics/WW04_0105.php',
        32: 'https://missmab.com/Comics/WW04_0145.php',
        33: 'https://missmab.com/Comics/WW04_0160.php',
        34: 'https://missmab.com/Comics/WW04_0160b.php',
        35: 'https://missmab.com/Comics/WW04_0170.php',
        36: 'https://missmab.com/Comics/WW04_0190.php',
        37: 'https://missmab.com/Comics/WW04_0190b.php',
        38: 'https://missmab.com/Comics/WW04_0335.php',
        39: 'https://missmab.com/Comics/WW04_0392.php',
        40: 'https://missmab.com/Comics/WW04_0392b.php',
        41: 'https://missmab.com/Comics/WW04_0427.php',
        42: 'https://missmab.com/Comics/WW04_0437.php',
        43: 'https://missmab.com/Comics/WW04_0547.php',
        44: 'https://missmab.com/Comics/WW04_0547b.php',
        45: 'https://missmab.com/Comics/WW04_0552.php',
        46: 'https://missmab.com/Comics/WW04_0552b.php',
        47: 'https://missmab.com/Comics/WW04_0612.php',
        48: 'https://missmab.com/Comics/WW04_0744.php',
        49: 'https://missmab.com/Comics/WW04_0764.php',
        50: 'https://missmab.com/Comics/WW04_0890.php',
        51: 'https://missmab.com/Comics/WW04_0890b.php',
        52: 'https://missmab.com/Comics/WW04_0890c.php',
        53: 'https://missmab.com/Comics/WW04_1030.php',
        
        // Section 4a: Alien Dice VS. DMFA: The Alien Dice Meters - Pages 54-73
        54: 'https://missmab.com/Comics/WW04Alt_0000.php',
        55: 'https://missmab.com/Comics/WW04Alt_0090.php',
        56: 'https://missmab.com/Comics/WW04Alt_0105.php',
        57: 'https://missmab.com/Comics/WW04Alt_0190.php',
        58: 'https://missmab.com/Comics/WW04Alt_0335.php',
        59: 'https://missmab.com/Comics/WW04Alt_0392.php',
        60: 'https://missmab.com/Comics/WW04Alt_0392b.php',
        61: 'https://missmab.com/Comics/WW04Alt_0392c.php',
        62: 'https://missmab.com/Comics/WW04Alt_0437.php',
        63: 'https://missmab.com/Comics/WW04Alt_0437b.php',
        64: 'https://missmab.com/Comics/WW04Alt_0547.php',
        65: 'https://missmab.com/Comics/WW04Alt_0547b.php',
        66: 'https://missmab.com/Comics/WW04Alt_0552.php',
        67: 'https://missmab.com/Comics/WW04Alt_0612.php',
        68: 'https://missmab.com/Comics/WW04Alt_0612b.php',
        69: 'https://missmab.com/Comics/WW04Alt_0744.php',
        70: 'https://missmab.com/Comics/WW04Alt_0744b.php',
        71: 'https://missmab.com/Comics/WW04Alt_0764.php',
        72: 'https://missmab.com/Comics/WW04Alt_0890.php',
        73: 'https://missmab.com/Comics/WW04Alt_1030.php',
        
        // Section 5: Abel VS. Regina - Pages 74-88
        74: 'https://missmab.com/Comics/WW05_0065.php',
        75: 'https://missmab.com/Comics/WW05_0410.php',
        76: 'https://missmab.com/Comics/WW05_0530.php',
        77: 'https://missmab.com/Comics/WW05_0650.php',
        78: 'https://missmab.com/Comics/WW05_0720.php',
        79: 'https://missmab.com/Comics/WW05_0840.php',
        80: 'https://missmab.com/Comics/WW05_1110.php',
        81: 'https://missmab.com/Comics/WW05_1150.php',
        82: 'https://missmab.com/Comics/WW05_1570.php',
        83: 'https://missmab.com/Comics/WW05_1630.php',
        84: 'https://missmab.com/Comics/WW05_1640.php',
        85: 'https://missmab.com/Comics/WW05_1670.php',
        86: 'https://missmab.com/Comics/WW05_1675.php',
        87: 'https://missmab.com/Comics/WW05_1805.php',
        88: 'https://missmab.com/Comics/WW05_2275.php',
        
        // Section 6: SAIA Librarian VS. Fa'lina's Dance No. - Pages 89-96
        89: 'https://missmab.com/Comics/WW06_025.php',
        90: 'https://missmab.com/Comics/WW06_185.php',
        91: 'https://missmab.com/Comics/WW06_341.php',
        92: 'https://missmab.com/Comics/WW06_417.php',
        93: 'https://missmab.com/Comics/WW06_447.php',
        94: 'https://missmab.com/Comics/WW06_487.php',
        95: 'https://missmab.com/Comics/WW06_522.php',
        96: 'https://missmab.com/Comics/WW06_638.php',
        
        // Section 7: Wildy VS. Jyrras - Pages 97-107
        97: 'https://missmab.com/Comics/WW07_000.php',
        98: 'https://missmab.com/Comics/WW07_020.php',
        99: 'https://missmab.com/Comics/WW07_085.php',
        100: 'https://missmab.com/Comics/WW07_175.php',
        101: 'https://missmab.com/Comics/WW07_185.php',
        102: 'https://missmab.com/Comics/WW07_345.php',
        103: 'https://missmab.com/Comics/WW07_490.php',
        104: 'https://missmab.com/Comics/WW07_540.php',
        105: 'https://missmab.com/Comics/WW07_605.php',
        106: 'https://missmab.com/Comics/WW07_807.php',
        107: 'https://missmab.com/Comics/WW07_900.php',
        
        // Section 8: Tag Team Battle - Pages 108-120
        108: 'https://missmab.com/Comics/WW08_000.php',
        109: 'https://missmab.com/Comics/WW08_075.php',
        110: 'https://missmab.com/Comics/WW08_145.php',
        111: 'https://missmab.com/Comics/WW08_245.php',
        112: 'https://missmab.com/Comics/WW08_380.php',
        113: 'https://missmab.com/Comics/WW08_390.php',
        114: 'https://missmab.com/Comics/WW08_0b.php',
        115: 'https://missmab.com/Comics/WW08_1145.php',
        116: 'https://missmab.com/Comics/WW08_1273.php',
        117: 'https://missmab.com/Comics/WW08_1280.php',
        118: 'https://missmab.com/Comics/WW08_1360.php',
        119: 'https://missmab.com/Comics/WW08_1375.php',
        120: 'https://missmab.com/Comics/WW08_End.php'
      };
      
      const url = pageUrls[page];
      return url ? `${proxy}${url}` : null;
    }
  },
  wryMain: {
    id: 'wryMain',
    title: 'WRY - Main Collection',
    totalPages: 136, // Total number of image files in main WRY directory
    chapters: [{ title: 'WRY - Main Collection', startPage: 1, endPage: 136, description: 'Hidden Easter egg collection from the WRY folder' }],
    imageBaseUrl: 'https://missmab.xepher.net/WRY/',
    getImageFilename: (page: number) => {
      // Alphabetically sorted filenames
      const pageFilenames: Record<number, string> = {
        1: '10kbaybee.jpg',
        2: 'Affection.jpg',
        3: 'Also_Lily.jpg',
        4: 'Amber_Possum.gif',
        5: 'Aurile_Coon.jpg',
        6: 'Beep.jpg',
        7: 'Better.jpg',
        8: 'Birfday.jpg',
        9: 'BrickWall.jpg',
        10: 'Bwahaha.jpg',
        11: 'CableSnatcher.jpg',
        12: 'Carriond.jpg',
        13: 'Cassidy.jpg',
        14: 'Chaz_NyaHaHa.gif',
        15: 'Chibs_Staci_Sketch.jpg',
        16: 'ChickenScratch_Bunny.jpg',
        17: 'DMFA_Abel_Jyrras.jpg',
        18: 'Default.jpg',
        19: 'Dewm_Kitteh.jpg',
        20: 'Diabeetus.jpg',
        21: 'Die-HTML.jpg',
        22: 'DrTran.jpg',
        23: 'Drift.jpg',
        24: 'Drive_Stealer.jpg',
        25: 'Drunken_Llamas.jpg',
        26: 'Elenore.jpg',
        27: 'Escher_Abel.jpg',
        28: 'FU.gif',
        29: 'FingerNomnomn.jpg',
        30: 'Fjorleif.jpg',
        31: 'Fjorleif_Sketch.jpg',
        32: 'FriendThanku.jpg',
        33: 'Furrlock.jpg',
        34: 'Gadam_Test.jpg',
        35: 'Godkitten.jpg',
        36: 'GrrBun.jpg',
        37: 'GudArtist.jpg',
        38: 'GutterCat.jpg',
        39: 'HD_Icon.gif',
        40: 'Helli_Ball.jpg',
        41: 'IRegretnotheeng2.jpg',
        42: 'Interests_Relevent.jpg',
        43: 'Invisible.jpg',
        44: 'Invisible_Parachute.jpg',
        45: 'Jaded.jpg',
        46: 'K_Preview.jpg',
        47: 'K_Sketch1.jpg',
        48: 'Keaton_t1.jpg',
        49: 'KingMaker.jpg',
        50: 'KingMaker_Future.jpg',
        51: 'KingMaker_Oleg.jpg',
        52: 'Kitty_eyes.jpg',
        53: 'Level_6_MRR.jpg',
        54: 'Love_Thread.jpg',
        55: 'Luvmyowl.jpg',
        56: 'MYS_WiP.jpg',
        57: 'M_Prev.jpg',
        58: 'Mah_Bad.jpg',
        59: 'Megahutz.jpg',
        60: 'Mel_Test.jpg',
        61: 'Mida_Proto.jpg',
        62: 'Minkzillarghs.jpg',
        63: 'MittsMap.jpg',
        64: 'Mwee.rar',
        65: 'NO.jpg',
        66: 'NP_Previews.jpg',
        67: 'NP_Previews2.jpg',
        68: 'NoFunAllowed.png',
        69: 'OhMyPonyPronz.jpg',
        70: 'Omn_Hair.jpg',
        71: 'PD_10.jpg',
        72: 'Palette_Attempt.jpg',
        73: 'Panel_Cam.jpg',
        74: 'Phase_One.png',
        75: 'Pillows.jpg',
        76: 'Pix_Frame.gif',
        77: 'Purfussionals.jpg',
        78: 'Purty.jpg',
        79: 'PythonBedlam.jpg',
        80: 'RegretNotheeeng.jpg',
        81: 'Rivercrest.jpg',
        82: 'Samson.jpg',
        83: 'SeriouserCat.jpg',
        84: 'Silly_Faces2.jpg',
        85: 'Size_ref.jpg',
        86: 'Sloth_Leader.jpg',
        87: 'SnW.jpg',
        88: 'Snowboop.jpg',
        89: 'Snurh.png',
        90: 'SoVerySorryD.jpg',
        91: 'Soon.png',
        92: 'Sorry_Tape.jpg',
        93: 'Staoe1.jpg',
        94: 'Staoe2.jpg',
        95: 'Stela.jpg',
        96: 'Super_Kitty.jpg',
        97: 'ThisThread.jpg',
        98: 'Umad.jpg',
        99: 'Venn_Cute.jpg',
        100: 'WAAARGH.gif',
        101: 'WTF.jpg',
        102: 'Wehehehehehehe.gif',
        103: 'WonderLand.jpg',
        104: 'YHelloThar.jpg',
        105: 'Yukiko_Test2.jpg',
        106: 'Zina_Guard.jpg',
        107: 'catgirls.gif',
        108: 'damn.gif',
        109: 'ddr_abel_new.gif',
        110: 'doll.jpg',
        111: 'fat_bird.jpg',
        112: 'gaycopy.jpg',
        113: 'gaydragon.jpg',
        114: 'itty_violin.jpg',
        115: 'kitten_765.jpg',
        116: 'kneerawr.jpg',
        117: 'lonely_Garfield.png',
        118: 'lovey-dovey.JPG',
        119: 'magic_hat.gif',
        120: 'manatee2st.jpg',
        121: 'memento.png',
        122: 'myadoptable.png',
        123: 'omg.gif',
        124: 'omg_panicked.jpg',
        125: 'padlock.gif',
        126: 'pedobear32le.jpg',
        127: 'rape_lol.gif',
        128: 'sales.gif',
        129: 'shiitake.jpg',
        130: 'sign20.jpg',
        131: 'spicecat.jpg',
        132: 'tetris.gif',
        133: 'vakaworld_050320.gif',
        134: 'wha.jpg',
        135: 'wtfwhyphotoshopwhy.jpg',
        136: 'zai2.jpg'
      };
      
      return pageFilenames[page] || `unknown_${page}.jpg`;
    },
    storageKey: 'wry-main-progress',
    commentaryEnabled: true,
    getCommentaryUrl: (page: number) => {
      // Return the image title in a format the parser can understand
      const config = comicConfigs.wryMain;
      const filename = config.getImageFilename(page);
      const title = filename.replace(/\.[^/.]+$/, ''); // Remove file extension
      return `data:text/html,<html><body><img src="${filename}"><i>${title}</i></body></html>`;
    }
  },
  wryStuff: {
    id: 'wryStuff',
    title: 'WRY - Stuff',
    totalPages: 4,
    chapters: [{ title: 'WRY - Stuff', startPage: 1, endPage: 4, description: 'Hidden Easter egg collection from the WRY/Stuff folder' }],
    imageBaseUrl: 'https://missmab.xepher.net/WRY/Stuff/',
    getImageFilename: (page: number) => {
      // Alphabetically sorted
      const pageFilenames: Record<number, string> = {
        1: 'Gordan.jpg',
        2: 'Kimmy_BadgeB.png',
        3: 'Viper.png',
        4: 'Viper_Bonus.jpg'
      };
      
      return pageFilenames[page] || `unknown_${page}.jpg`;
    },
    storageKey: 'wry-stuff-progress',
    commentaryEnabled: true,
    getCommentaryUrl: (page: number) => {
      const config = comicConfigs.wryStuff;
      const filename = config.getImageFilename(page);
      const title = filename.replace(/\.[^/.]+$/, ''); // Remove file extension
      return `data:text/html,<html><body><img src="${filename}"><i>${title}</i></body></html>`;
    }
  },
  wryNP: {
    id: 'wryNP',
    title: 'WRY - NP',
    totalPages: 18,
    chapters: [{ title: 'WRY - NP', startPage: 1, endPage: 18, description: 'Hidden Easter egg collection from the WRY/NP folder' }],
    imageBaseUrl: 'https://missmab.xepher.net/WRY/NP/',
    getImageFilename: (page: number) => {
      // Alphabetically sorted
      const pageFilenames: Record<number, string> = {
        1: 'Art_01.jpg',
        2: 'Art_02.jpg',
        3: 'Art_03.jpg',
        4: 'Art_04.jpg',
        5: 'Art_04b.jpg',
        6: 'Art_04c.jpg',
        7: 'Art_05.jpg',
        8: 'Art_05b.jpg',
        9: 'Art_06.jpg',
        10: 'Art_06b.jpg',
        11: 'Art_07.jpg',
        12: 'Art_08.jpg',
        13: 'Art_09.jpg',
        14: 'Art_10.jpg',
        15: 'Mhal1.jpg',
        16: 'Mhal2.jpg',
        17: 'Mhal3.jpg',
        18: 'Pro1_Jhaynea.jpg'
      };
      
      return pageFilenames[page] || `unknown_${page}.jpg`;
    },
    storageKey: 'wry-np-progress',
    commentaryEnabled: true,
    getCommentaryUrl: (page: number) => {
      const config = comicConfigs.wryNP;
      const filename = config.getImageFilename(page);
      const title = filename.replace(/\.[^/.]+$/, ''); // Remove file extension
      return `data:text/html,<html><body><img src="${filename}"><i>${title}</i></body></html>`;
    }
  },
  wrySketches: {
    id: 'wrySketches',
    title: 'WRY - Sketches',
    totalPages: 33,
    chapters: [{ title: 'WRY - Sketches', startPage: 1, endPage: 33, description: 'Hidden Easter egg collection from the WRY/Sketches folder' }],
    imageBaseUrl: 'https://missmab.xepher.net/WRY/Sketches/',
    getImageFilename: (page: number) => {
      // Alphabetically sorted
      const pageFilenames: Record<number, string> = {
        1: 'Alec_V2.jpg',
        2: 'Ann_Attempt.jpg',
        3: 'Ann_Headshot.jpg',
        4: 'Arashi_Test.jpg',
        5: 'Arka_Is_Not_Amused.jpg',
        6: 'Arka_Tats.jpg',
        7: 'Arka_Test.jpg',
        8: 'Bhana.jpg',
        9: 'Bhana_Fashion1.jpg',
        10: 'Bhana_Fashion2.jpg',
        11: 'Bhana_HK51.jpg',
        12: 'Chibi_Kitsune.jpg',
        13: 'Clarvala_Profile.jpg',
        14: 'Commitment.jpg',
        15: 'DD_Faces.jpg',
        16: 'Festival_MingKai.jpg',
        17: 'H_01.jpg',
        18: 'H_02.jpg',
        19: 'Helli_Fluffy.jpg',
        20: 'Helli_Hat.jpg',
        21: 'Helli_Redux.jpg',
        22: 'Jackie_Finale.jpg',
        23: 'Katrina_V2.jpg',
        24: 'Maevahn_Tea.jpg',
        25: 'Maevahn_Tohti.jpg',
        26: 'SrsCarrion.jpg',
        27: 'TikTi1.jpg',
        28: 'Venus_Lisky.jpg',
        29: 'Weekly_P1.jpg',
        30: 'Weekly_P2.jpg',
        31: 'Yukiko_Festival.jpg',
        32: 'Yukiko_Festive.jpg',
        33: 'Yukiko_Test.jpg'
      };
      
      return pageFilenames[page] || `unknown_${page}.jpg`;
    },
    storageKey: 'wry-sketches-progress',
    commentaryEnabled: true,
    getCommentaryUrl: (page: number) => {
      const config = comicConfigs.wrySketches;
      const filename = config.getImageFilename(page);
      const title = filename.replace(/\.[^/.]+$/, ''); // Remove file extension
      return `data:text/html,<html><body><img src="${filename}"><i>${title}</i></body></html>`;
    }
  }
};