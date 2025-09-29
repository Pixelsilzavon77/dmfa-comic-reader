import type { ComicIdentifier } from '../types';

export interface ComicUpdateState {
  latestCheckedPage: number;
  lastCheckTime: number;
  hasNewPages: boolean;
  highestReadPage: number;
}

export type UpdateStates = Record<ComicIdentifier, ComicUpdateState>;