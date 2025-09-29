export interface Chapter {
  title: string;
  startPage: number;
  endPage: number;
  description: string;
}

export type ComicIdentifier = 'dmfa' | 'abel' | 'matilda' | 'cubiMindAbilities' | 'furraaeFashionLaws' | 'hybridGenetics' | 'cubiClanLeaders' | 'perfectDate' | 'takingPride' | 'borkedWrist' | 'uncanonChristmas' | 'bonusComics' | 'wallpaperWars' | 'wryMain' | 'wryStuff' | 'wryNP' | 'wrySketches';

export interface Bookmark {
  page: number;
  note: string;
  timestamp: number;
  comic: ComicIdentifier;
}

export interface ComicConfig {
  id: ComicIdentifier;
  title: string;
  totalPages: number;
  chapters?: Chapter[];
  imageBaseUrl: string;
  getImageFilename: (page: number) => string;
  storageKey: string;
  commentaryEnabled: boolean;
  getCommentaryUrl?: (page: number, totalPages: number) => string | null;
  // Easter egg support for comics with secret pages
  hasSecretPage?: boolean;
  secretPageNumber?: number;
  // Dynamic page count support
  isDynamicPageCount?: boolean;
  checkPageExists?: (page: number) => Promise<boolean>;
}