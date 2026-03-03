'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Locale } from '@/types';
import type { UniversityData, BlockSize } from '@/lib/admin/types';
import { BLOCK_SIZE_CLS } from '@/lib/admin/types';

const DEGREE_COLORS: Record<string, string> = {
  bachelor: 'bg-[#e6b325]',
  master: 'bg-purple-600',
  doctorate: 'bg-emerald-600',
};

interface ProgramsBlockProps {
  programs: UniversityData['programs'];
  programImages: Record<string, string>;
  maxItems?: number;
  size?: BlockSize;
}

export default function ProgramsBlock({ programs, programImages, maxItems = 4, size = 'full' }: ProgramsBlockProps) {
  const t = useTranslations('home');
  const tActions = useTranslations('actions');
  const locale = useLocale() as Locale;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredPrograms = programs
    .filter((p) => Object.keys(programImages).includes(p.id))
    .slice(0, maxItems);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 24 : 1;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 24 : 340;
    el.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scroll('left');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scroll('right');
      }
    },
    [scroll],
  );

  return (
    <section className="bg-bg-light dark:bg-bg-dark overflow-hidden py-16">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${BLOCK_SIZE_CLS[size]}`}>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-text-primary-light dark:text-text-primary-dark mb-2 text-3xl font-bold md:text-4xl">
              {t('programs.title')}
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              {t('programs.subtitle')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden gap-2 md:flex">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <Link
              href="/academics"
              className="text-primary dark:text-primary-light hidden items-center gap-1 font-semibold transition-all hover:gap-2 md:flex"
            >
              {tActions('viewAll')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div
          ref={scrollRef}
          role="region"
          aria-label={t('programs.title')}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 focus:outline-none"
        >
          {featuredPrograms.map((program) => (
            <Link
              key={program.id}
              href={`/academics/${program.id}`}
              className="group relative min-w-[280px] snap-center overflow-hidden rounded-2xl shadow-md transition-shadow hover:shadow-xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none md:min-w-[340px]"
            >
              <div className="aspect-[4/5] w-full">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${programImages[program.id]})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <span
                  className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold text-white ${DEGREE_COLORS[program.degree] || 'bg-blue-600'}`}
                >
                  {program.degree === 'bachelor'
                    ? 'Bachelor'
                    : program.degree === 'master'
                      ? 'Master'
                      : 'PhD'}
                </span>
                <h3 className="mb-1 text-xl font-bold text-white">{program.name[locale]}</h3>
                <p className="line-clamp-2 text-sm text-gray-300">
                  {program.description[locale]}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll position indicators */}
        {featuredPrograms.length > 1 && (
          <div className="mt-2 flex justify-center gap-1.5">
            {featuredPrograms.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === activeIndex ? 'bg-primary dark:bg-primary-light w-6' : 'bg-border-light dark:bg-border-dark w-1.5'}`}
              />
            ))}
          </div>
        )}

        <div className="mt-4 text-center md:hidden">
          <Link href="/academics">
            <Button variant="ghost" icon={<ArrowRight size={16} />} iconPosition="right">
              {tActions('viewAll')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
