import { Chapter } from '../types';

export function getChaptersWithDynamicEnd(baseChapters: Chapter[], currentTotalPages: number): Chapter[] {
    // All chapters except the last one stay the same
    const chaptersExceptLast = baseChapters.slice(0, -1);
    const lastChapter = baseChapters[baseChapters.length - 1];
    
    // Update the last chapter to extend to the current total pages
    return [
        ...chaptersExceptLast,
        {
            ...lastChapter,
            endPage: currentTotalPages
        }
    ];
}