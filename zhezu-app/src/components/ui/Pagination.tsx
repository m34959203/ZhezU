'use client';

import { useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

const ELLIPSIS = '...' as const;

type PageItem = number | typeof ELLIPSIS;

function generatePageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): PageItem[] {
  // Total page numbers to show: first + last + current + 2*siblings + 2 ellipses
  const totalPageNumbers = siblingCount * 2 + 5;

  // If total pages fits within the range, show all pages
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, ELLIPSIS, totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + 1 + i
    );
    return [1, ELLIPSIS, ...rightRange];
  }

  // Both ellipses
  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  );
  return [1, ELLIPSIS, ...middleRange, ELLIPSIS, totalPages];
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const pages = useMemo(
    () => generatePageRange(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount]
  );

  const goToPrevious = useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const goToNext = useCallback(() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  }, [currentPage, totalPages, onPageChange]);

  if (totalPages <= 1) return null;

  const buttonBase = cn(
    'inline-flex items-center justify-center h-9 min-w-9 rounded-lg text-sm font-medium',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
  );

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <button
        type="button"
        onClick={goToPrevious}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className={cn(
          buttonBase,
          'px-2',
          'text-text-secondary-light dark:text-text-secondary-dark',
          'hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark',
          'disabled:opacity-40 disabled:pointer-events-none',
          'cursor-pointer'
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page, index) => {
        if (page === ELLIPSIS) {
          return (
            <span
              key={`ellipsis-${index}`}
              className={cn(
                buttonBase,
                'pointer-events-none text-text-secondary-light dark:text-text-secondary-dark'
              )}
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              buttonBase,
              'cursor-pointer',
              isActive
                ? 'bg-primary text-white dark:bg-primary-light dark:text-bg-dark'
                : cn(
                    'text-text-secondary-light dark:text-text-secondary-dark',
                    'hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark',
                    'hover:text-text-primary-light dark:hover:text-text-primary-dark'
                  )
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={goToNext}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className={cn(
          buttonBase,
          'px-2',
          'text-text-secondary-light dark:text-text-secondary-dark',
          'hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark',
          'disabled:opacity-40 disabled:pointer-events-none',
          'cursor-pointer'
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
