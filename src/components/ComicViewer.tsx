import React, { useState, useEffect, useMemo } from 'react';
import { IMAGE_BASE_URL } from '../constants';
import type { Bookmark, Chapter } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { DoubleChevronLeftIcon } from './icons/DoubleChevronLeftIcon';
import { DoubleChevronRightIcon } from './icons/DoubleChevronRightIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { SkipToStartIcon } from './icons/SkipToStartIcon';
import { SkipToEndIcon } from './icons/SkipToEndIcon';
import { JumpToPageModal } from './JumpToPageModal';

interface ComicViewerProps {
  currentPage: number;
  totalPages: number;
  chapters: Chapter[];
  onNavigate: (page: number) => void;
  bookmarks: Bookmark[];
  onAddBookmark: (page: number, comic: 'dmfa' | 'abel') => void;
  onRemoveBookmark: (bookmark: Bookmark) => void;
}

const NavigationButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode; ariaLabel: string }> = ({ onClick, disabled, children, ariaLabel }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className="px-2 py-2 bg-comic-accent text-white rounded-md transition-colors duration-200 enabled:hover:bg-comic-accent-hover disabled:bg-comic-disabled disabled:cursor-not-allowed flex items-center justify-center"
    >
        {children}
    </button>
);

export const ComicViewer: React.FC<ComicViewerProps> = ({ currentPage, totalPages, chapters, onNavigate, bookmarks, onAddBookmark, onRemoveBookmark }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [commentary, setCommentary] = useState('');
    const [commentaryStatus, setCommentaryStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
    const [isJumpModalOpen, setIsJumpModalOpen] = useState(false);

    const isBookmarked = useMemo(() => bookmarks.some(b => b.page === currentPage && b.comic === 'dmfa'), [bookmarks, currentPage]);

    const chapterPages = useMemo(() => {
        const currentChapterIndex = chapters.findIndex(c => currentPage >= c.startPage && currentPage <= c.endPage);
        if (currentChapterIndex === -1) {
            return { prevChapterPage: null, nextChapterPage: null };
        }
        const prevChapterPage = currentChapterIndex > 0 ? chapters[currentChapterIndex - 1].startPage : null;
        const nextChapterPage = currentChapterIndex < chapters.length - 1 ? chapters[currentChapterIndex + 1].startPage : null;
        return { prevChapterPage, nextChapterPage };
    }, [chapters, currentPage]);

    useEffect(() => {
        setIsLoading(true);
        setHasError(false);
        setCommentaryStatus('loading');
        setCommentary('');
        
        const imageFilePageNumber = currentPage < 10 ? String(currentPage).padStart(2, '0') : String(currentPage);
        const initialImageSrc = `${IMAGE_BASE_URL}Vol${imageFilePageNumber}.jpg`;
        setImageSrc(initialImageSrc);

        const getCommentaryPageUrl = () => {
            const proxy = 'https://corsproxy.io/?';
            
            if (currentPage === totalPages) {
                return `${proxy}https://missmab.com/index.php`;
            }
            const pageId = String(currentPage).padStart(3, '0');
            return `${proxy}https://missmab.com/Comics/Vol_${pageId}.php`;
        };

        const fetchCommentary = async () => {
            try {
                const response = await fetch(getCommentaryPageUrl());
                if (!response.ok) throw new Error('Network response was not ok');
                
                const htmlText = await response.text();
                let foundCommentary: string | null = null;
                
                const pageId = currentPage < 10 ? String(currentPage).padStart(2, '0') : String(currentPage);
                const imageFileBase = `Vol${pageId}`;
                
                const imageTagRegex = new RegExp(`<img[^>]*src\\s*=\\s*["'][^"']*${imageFileBase}\\.(png|jpg|gif)["'][^>]*>`, 'i');
                const imageTagMatch = htmlText.match(imageTagRegex);

                if (imageTagMatch) {
                    const imageTagEndIndex = (imageTagMatch.index || 0) + imageTagMatch[0].length;
                    const searchArea = htmlText.substring(imageTagEndIndex);
                    
                    // Try to find commentary in <i> tags (older format)
                    const iTagStart = searchArea.toLowerCase().indexOf('<i>');
                    if (iTagStart !== -1) {
                        const iTagEnd = searchArea.toLowerCase().indexOf('</i>', iTagStart);
                        if (iTagEnd !== -1) {
                            foundCommentary = searchArea.substring(iTagStart + 3, iTagEnd).trim();
                        }
                    }
                    
                    // If not found in <i> tags, look for the #number: format (newer format)
                    if (!foundCommentary) {
                        const commentRegex = new RegExp(`#${currentPage}:\\s*(.+?)(?=\\s*<|$)`, 'i');
                        const commentMatch = searchArea.match(commentRegex);
                        if (commentMatch && commentMatch[1]) {
                            foundCommentary = commentMatch[1].trim();
                        }
                    }
                }
                
                if (foundCommentary) {
                    const cleanedText = foundCommentary.replace(/^#\d+:\s*/, '');
                    const sanitizedHtml = cleanedText.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                    setCommentary(sanitizedHtml);
                } else {
                    setCommentary('No commentary found for this page.');
                }
                setCommentaryStatus('loaded');
            } catch (error) {
                console.error("Failed to fetch commentary:", error);
                setCommentaryStatus('error');
            }
        };

        fetchCommentary();

    }, [currentPage, totalPages]);

    const handleImageError = () => {
        const imageFilePageNumber = currentPage < 10 ? String(currentPage).padStart(2, '0') : String(currentPage);
        if (imageSrc.endsWith('.jpg')) {
            setImageSrc(`${IMAGE_BASE_URL}Vol${imageFilePageNumber}.png`);
        } else if (imageSrc.endsWith('.png')) {
            setImageSrc(`${IMAGE_BASE_URL}Vol${imageFilePageNumber}.gif`);
        } else {
            setIsLoading(false);
            setHasError(true);
        }
    };

    const handleBookmarkClick = () => {
        if (isBookmarked) {
            const bookmarkToRemove = bookmarks.find(b => b.page === currentPage && b.comic === 'dmfa');
            if (bookmarkToRemove) {
                onRemoveBookmark(bookmarkToRemove);
            }
        } else {
            onAddBookmark(currentPage, 'dmfa');
        }
    };

    const NavControls = () => (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full max-w-2xl">
            <NavigationButton onClick={() => onNavigate(1)} disabled={currentPage === 1} ariaLabel="First page">
                <SkipToStartIcon />
            </NavigationButton>
            <NavigationButton onClick={() => chapterPages.prevChapterPage && onNavigate(chapterPages.prevChapterPage)} disabled={!chapterPages.prevChapterPage} ariaLabel="Previous chapter">
                <DoubleChevronLeftIcon />
            </NavigationButton>
            <NavigationButton onClick={() => onNavigate(currentPage - 1)} disabled={currentPage <= 1} ariaLabel="Previous page">
                <ChevronLeftIcon /> <span className="hidden sm:inline ml-1">Prev</span>
            </NavigationButton>
            <NavigationButton onClick={() => onNavigate(currentPage + 1)} disabled={currentPage >= totalPages} ariaLabel="Next page">
                <span className="hidden sm:inline mr-1">Next</span> <ChevronRightIcon />
            </NavigationButton>
            <NavigationButton onClick={() => chapterPages.nextChapterPage && onNavigate(chapterPages.nextChapterPage)} disabled={!chapterPages.nextChapterPage} ariaLabel="Next chapter">
                <DoubleChevronRightIcon />
            </NavigationButton>
            <NavigationButton onClick={() => onNavigate(totalPages)} disabled={currentPage === totalPages} ariaLabel="Last page">
                <SkipToEndIcon />
            </NavigationButton>
        </div>
    );

    return (
        <div className="flex flex-col items-center space-y-4">
            <NavControls />
          
            <div className="flex items-center justify-center gap-4">
                <div className="text-lg font-semibold text-comic-light/90 flex items-center gap-1">
                    Page{' '}
                    <button
                        onClick={() => setIsJumpModalOpen(true)}
                        className="px-2 py-1 bg-comic-accent/20 rounded hover:bg-comic-accent/40 transition-colors"
                        aria-label="Click to jump to page"
                    >
                        {currentPage}
                    </button>
                    {' '}of {totalPages}
                </div>
                <button 
                    onClick={handleBookmarkClick} 
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'} 
                    className="text-comic-accent transition-colors duration-200 hover:text-indigo-400 p-1"
                >
                    <BookmarkIcon filled={isBookmarked} />
                </button>
            </div>
            <JumpToPageModal
                isOpen={isJumpModalOpen}
                onClose={() => setIsJumpModalOpen(false)}
                onJump={onNavigate}
                currentPage={currentPage}
                totalPages={totalPages}
            />

            <div className={`w-full max-w-4xl bg-comic-secondary rounded-lg flex items-center justify-center p-2 shadow-inner ${(isLoading || hasError) ? 'min-h-[400px]' : ''}`}>
                {isLoading && !hasError && (
                    <div className="flex flex-col items-center text-comic-light/70">
                        <SpinnerIcon />
                        <span>Loading Page...</span>
                    </div>
                )}
                {hasError && (
                    <div className="text-red-400 text-center">
                        <p>Failed to load comic image.</p>
                        <p>Please check your connection and try again.</p>
                    </div>
                )}
                <img
                    src={imageSrc}
                    alt={`Comic Page ${currentPage}`}
                    className="w-full h-auto rounded"
                    onLoad={() => setIsLoading(false)}
                    onError={handleImageError}
                    style={{ display: isLoading || hasError ? 'none' : 'block' }}
                />
            </div>

            <div className="w-full max-w-4xl p-4 bg-comic-secondary rounded-lg shadow-inner min-h-[100px] text-comic-light/90">
                <h3 className="text-xl font-bold mb-2 border-b border-comic-accent/30 pb-2">Author's Commentary</h3>
                {commentaryStatus === 'loading' && (
                    <div className="flex items-center justify-center pt-4">
                        <SpinnerIcon /> <span className="ml-2">Loading commentary...</span>
                    </div>
                )}
                {commentaryStatus === 'error' && (
                    <div className="text-red-400 text-center pt-4">
                        <p>Failed to load commentary.</p>
                        <p>The original site may be down or blocking the request.</p>
                    </div>
                )}
                {commentaryStatus === 'loaded' && (
                    <div className="prose-styles pt-2" dangerouslySetInnerHTML={{ __html: commentary }} />
                )}
            </div>

            <NavControls />
            <style>{`
                .prose-styles a { text-decoration: underline; color: #818cf8; }
                .prose-styles a:hover { color: #a5b4fc; }
                .prose-styles p, .prose-styles div, .prose-styles font { margin-bottom: 1em; line-height: 1.6; }
                .prose-styles b, .prose-styles strong { font-weight: bold; }
                .prose-styles i, .prose-styles em { font-style: italic; }
            `}</style>
        </div>
    );
};