'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import {
  Search,
  X,
  GraduationCap,
  FileText,
  Newspaper,
  ArrowRight,
} from 'lucide-react';
import { PROGRAMS } from '@/lib/constants';
import { NAVIGATION_ITEMS } from '@/lib/navigation';
import { NEWS_ARTICLES } from '@/lib/news-data';
import type { Locale } from '@/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface SearchResult {
  id: string;
  title: string;
  description: string;
  href: string;
  category: 'programs' | 'pages' | 'news';
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ------------------------------------------------------------------ */
/*  Category labels & icons                                            */
/* ------------------------------------------------------------------ */
const CATEGORY_META: Record<
  SearchResult['category'],
  { label: string; icon: typeof GraduationCap }
> = {
  programs: { label: '\u041f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u044b', icon: GraduationCap },
  pages: { label: '\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u044b', icon: FileText },
  news: { label: '\u041d\u043e\u0432\u043e\u0441\u0442\u0438', icon: Newspaper },
};

const MAX_PER_CATEGORY = 5;

/* ------------------------------------------------------------------ */
/*  Quick links shown when the input is empty                          */
/* ------------------------------------------------------------------ */
const QUICK_LINKS: { label: string; href: string }[] = [
  { label: '\u041f\u043e\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u0435', href: '/admission' },
  { label: '\u041f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u044b', href: '/academics' },
  { label: 'AI-\u0426\u0435\u043d\u0442\u0440', href: '/ai-center' },
  { label: '\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b', href: '/admission/contact' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const t = useTranslations('megaNav');
  const { locale } = useParams() as { locale: Locale };

  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);

  /* ---------- build a flat searchable index ---------- */
  const searchIndex = useMemo<SearchResult[]>(() => {
    const items: SearchResult[] = [];

    // Programs
    for (const program of PROGRAMS) {
      items.push({
        id: `program-${program.id}`,
        title: program.name[locale] ?? program.name.ru,
        description: program.description[locale] ?? program.description.ru,
        href: `/academics/${program.id}`,
        category: 'programs',
      });
    }

    // Navigation items (flatten all sub-links)
    for (const navItem of NAVIGATION_ITEMS) {
      for (const column of navItem.columns) {
        for (const link of column.links) {
          items.push({
            id: `page-${link.href}`,
            title: t(link.labelKey),
            description: t(column.titleKey),
            href: link.href,
            category: 'pages',
          });
        }
      }
    }

    // News articles
    for (const article of NEWS_ARTICLES) {
      items.push({
        id: `news-${article.id}`,
        title: article.title[locale] ?? article.title.ru,
        description: article.excerpt[locale] ?? article.excerpt.ru,
        href: `/life/news/${article.id}`,
        category: 'news',
      });
    }

    return items;
  }, [locale, t]);

  /* ---------- filter results ---------- */
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase().trim();

    const matched = searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );

    // Group by category and cap at MAX_PER_CATEGORY
    const grouped: Record<SearchResult['category'], SearchResult[]> = {
      programs: [],
      pages: [],
      news: [],
    };

    for (const item of matched) {
      if (grouped[item.category].length < MAX_PER_CATEGORY) {
        grouped[item.category].push(item);
      }
    }

    return grouped;
  }, [query, searchIndex]);

  /* ---------- flat list for keyboard navigation ---------- */
  const flatResults = useMemo(() => {
    if (!query.trim()) return [];
    const list: SearchResult[] = [];
    const categories: SearchResult['category'][] = ['programs', 'pages', 'news'];
    for (const cat of categories) {
      list.push(...(filteredResults as Record<SearchResult['category'], SearchResult[]>)[cat]);
    }
    return list;
  }, [filteredResults, query]);

  const totalResults = flatResults.length;
  const hasQuery = query.trim().length > 0;

  /* ---------- focus input when overlay opens ---------- */
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(-1);
      // Small delay so the DOM is rendered before we focus
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  /* ---------- keyboard shortcuts ---------- */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev < totalResults - 1 ? prev + 1 : 0));
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalResults - 1));
        return;
      }

      if (e.key === 'Enter' && activeIndex >= 0 && activeIndex < totalResults) {
        e.preventDefault();
        // Programmatic navigation: we click the active link
        const linkEl = document.querySelector(
          `[data-search-index="${activeIndex}"]`
        ) as HTMLAnchorElement | null;
        linkEl?.click();
      }
    },
    [isOpen, onClose, activeIndex, totalResults]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  /* ---------- reset active index when query changes ---------- */
  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  /* ---------- don't render when closed ---------- */
  if (!isOpen) return null;

  /* ---------- render helpers ---------- */
  let runningIndex = 0;

  function renderCategory(category: SearchResult['category']) {
    const items = (filteredResults as Record<SearchResult['category'], SearchResult[]>)[category];
    if (!items || items.length === 0) return null;

    const { label, icon: Icon } = CATEGORY_META[category];

    return (
      <div key={category} className="mb-2">
        {/* Category header */}
        <div className="flex items-center gap-2 px-5 py-2">
          <Icon
            size={14}
            className="text-primary dark:text-primary-light shrink-0"
          />
          <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary-light dark:text-text-secondary-dark">
            {label}
          </span>
          <span className="text-xs text-text-secondary-light/60 dark:text-text-secondary-dark/60">
            ({items.length})
          </span>
        </div>

        {/* Results */}
        {items.map((item) => {
          const idx = runningIndex++;
          return (
            <Link
              key={item.id}
              href={item.href}
              data-search-index={idx}
              onClick={onClose}
              className={`flex items-center gap-3 px-5 py-3 transition-colors duration-150 ${
                idx === activeIndex
                  ? 'bg-primary/10 dark:bg-primary-light/10'
                  : 'hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark'
              }`}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark truncate">
                  {item.title}
                </p>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate mt-0.5">
                  {item.description}
                </p>
              </div>
              <ArrowRight
                size={14}
                className="shrink-0 text-text-secondary-light/40 dark:text-text-secondary-dark/40"
              />
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-32">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl mx-4 bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
        {/* Search input row */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border-light/50 dark:border-border-dark/50">
          <Search
            size={20}
            className="text-text-secondary-light dark:text-text-secondary-dark shrink-0"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="flex-1 bg-transparent text-lg text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light/60 dark:placeholder:text-text-secondary-dark/60 outline-none"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X
              size={18}
              className="text-text-secondary-light dark:text-text-secondary-dark"
            />
          </button>
        </div>

        {/* Results area */}
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {hasQuery && totalResults === 0 && (
            <div className="px-5 py-10 text-center">
              <Search
                size={40}
                className="mx-auto mb-3 text-text-secondary-light/30 dark:text-text-secondary-dark/30"
              />
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                {'\u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e'}
              </p>
              <p className="text-xs text-text-secondary-light/60 dark:text-text-secondary-dark/60 mt-1">
                {'\u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u0437\u0430\u043f\u0440\u043e\u0441'}
              </p>
            </div>
          )}

          {hasQuery && totalResults > 0 && (
            <>
              {/* Reset running index for each render */}
              {(() => {
                runningIndex = 0;
                return null;
              })()}
              {renderCategory('programs')}
              {renderCategory('pages')}
              {renderCategory('news')}
            </>
          )}

          {!hasQuery && (
            <div className="px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary-light dark:text-text-secondary-dark mb-3">
                {'\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0435 \u0437\u0430\u043f\u0440\u043e\u0441\u044b'}
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light hover:bg-primary/20 dark:hover:bg-primary-light/20 transition-colors"
                  >
                    {link.label}
                    <ArrowRight size={12} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between px-5 py-2.5 border-t border-border-light/50 dark:border-border-dark/50 text-[11px] text-text-secondary-light/60 dark:text-text-secondary-dark/60">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-hover-light dark:bg-surface-hover-dark text-text-secondary-light dark:text-text-secondary-dark font-mono text-[10px]">
                &uarr;&darr;
              </kbd>{' '}
              {'\u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044f'}
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-hover-light dark:bg-surface-hover-dark text-text-secondary-light dark:text-text-secondary-dark font-mono text-[10px]">
                Enter
              </kbd>{' '}
              {'\u043e\u0442\u043a\u0440\u044b\u0442\u044c'}
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-hover-light dark:bg-surface-hover-dark text-text-secondary-light dark:text-text-secondary-dark font-mono text-[10px]">
                Esc
              </kbd>{' '}
              {'\u0437\u0430\u043a\u0440\u044b\u0442\u044c'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
