import type { Chapter } from './types';

export const ABEL_IMAGE_BASE_URL = 'https://missmab.com/Comics/';
export const ABEL_PART1_PAGES = 111;
export const ABEL_PART2_PAGES = 106;
export const ABEL_TOTAL_PAGES = ABEL_PART1_PAGES + ABEL_PART2_PAGES; // 217

export const ABEL_CHAPTERS: Chapter[] = [
    { 
        title: "Part 1", 
        startPage: 1, 
        endPage: ABEL_PART1_PAGES,
        description: ""
    },
    { 
        title: "Part 2", 
        startPage: ABEL_PART1_PAGES + 1, 
        endPage: ABEL_TOTAL_PAGES,
        description: ""
    },
];
