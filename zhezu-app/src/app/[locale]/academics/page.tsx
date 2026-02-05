'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { PROGRAMS } from '@/lib/constants';
import { Search, SlidersHorizontal, BookOpen, Clock, Languages, X, GraduationCap, FlaskConical, ArrowRight } from 'lucide-react';
import type { Locale } from '@/types';

const FACULTIES = ['it', 'engineering', 'business', 'education', 'humanities', 'law', 'natural', 'medicine'] as const;
const DEGREES = ['bachelor', 'master', 'doctorate'] as const;

const DEGREE_ICONS: Record<string, React.ReactNode> = {
  bachelor: <GraduationCap size={14} />,
  master: <BookOpen size={14} />,
  doctorate: <FlaskConical size={14} />,
};

const PROGRAM_IMAGES: Record<string, string> = {
  'preschool-education': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80',
  'art-drawing': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80',
  'physical-culture': 'https://images.unsplash.com/photo-1461896836934-bd45ea8b6c8a?w=400&q=80',
  'biology-teacher': 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&q=80',
  'informatics-teacher': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80',
  'math-teacher': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80',
  'physics-teacher': 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&q=80',
  'foreign-languages': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=80',
  'kazakh-language': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
  'economics': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80',
  'finance': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80',
  'law': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80',
  'tech-machines': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80',
  'transport': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80',
  'electrical-engineering': 'https://images.unsplash.com/photo-1509390144018-eeaf65052242?w=400&q=80',
  'geology': 'https://images.unsplash.com/photo-1518704618243-b719dde1ef65?w=400&q=80',
  'mining': 'https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=400&q=80',
  'metallurgy': 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80',
  'construction': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
  'occupational-safety': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80',
};

export default function AcademicsPage() {
  const t = useTranslations('academics');
  const tActions = useTranslations('actions');
  const locale = useLocale() as Locale;

  const [search, setSearch] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = PROGRAMS.filter((p) => {
    const matchesSearch = !search || p.name[locale].toLowerCase().includes(search.toLowerCase()) || p.description[locale].toLowerCase().includes(search.toLowerCase());
    const matchesFaculty = !selectedFaculty || p.faculty === selectedFaculty;
    const matchesDegree = !selectedDegree || p.degree === selectedDegree;
    return matchesSearch && matchesFaculty && matchesDegree;
  });

  const hasFilters = !!selectedFaculty || !!selectedDegree || !!search;

  return (
    <div className="flex flex-col">
      {/* Hero — dark */}
      <section className="relative overflow-hidden bg-bg-dark py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,14,23,0.9)] to-[rgba(10,14,23,0.8)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-3 text-white">
            {t('title')}
          </h1>
          <p className="text-lg text-white/60 max-w-2xl">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search & Filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex-1">
              <Input
                icon={<Search size={16} />}
                placeholder={tActions('search')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              icon={<SlidersHorizontal size={16} />}
              onClick={() => setShowFilters(!showFilters)}
            >
              {tActions('filter')}
            </Button>
            {hasFilters && (
              <Button
                variant="ghost"
                icon={<X size={16} />}
                onClick={() => { setSearch(''); setSelectedFaculty(null); setSelectedDegree(null); }}
              >
                {t('filters.clearAll')}
              </Button>
            )}
          </div>

          {/* Filter chips */}
          {showFilters && (
            <div className="mb-8 space-y-4 p-5 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark">
              <div>
                <p className="text-sm font-medium mb-2">{t('filters.degree')}</p>
                <div className="flex flex-wrap gap-2">
                  {DEGREES.map((deg) => (
                    <button
                      key={deg}
                      onClick={() => setSelectedDegree(selectedDegree === deg ? null : deg)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        selectedDegree === deg
                          ? 'bg-primary text-white dark:bg-primary-light shadow-md'
                          : 'bg-surface-hover-light dark:bg-surface-hover-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10'
                      }`}
                    >
                      {DEGREE_ICONS[deg]}
                      {deg.charAt(0).toUpperCase() + deg.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">{t('filters.faculty')}</p>
                <div className="flex flex-wrap gap-2">
                  {FACULTIES.map((fac) => (
                    <button
                      key={fac}
                      onClick={() => setSelectedFaculty(selectedFaculty === fac ? null : fac)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                        selectedFaculty === fac
                          ? 'bg-primary text-white dark:bg-primary-light shadow-md'
                          : 'bg-surface-hover-light dark:bg-surface-hover-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10'
                      }`}
                    >
                      {t(`faculties.${fac}` as any)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results count */}
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-6">
            {filtered.length} {t('filters.all').toLowerCase()}
          </p>

          {/* Program cards — with images */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((program) => (
                <Card
                  key={program.id}
                  hover
                  glow
                  padding="none"
                  image={PROGRAM_IMAGES[program.id]}
                  imageAlt={program.name[locale]}
                  imageHeight="h-40"
                >
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge>
                        <span className="flex items-center gap-1">
                          {DEGREE_ICONS[program.degree]}
                          {program.degree.charAt(0).toUpperCase() + program.degree.slice(1)}
                        </span>
                      </Badge>
                      <Badge variant="info">{t(`faculties.${program.faculty}` as any)}</Badge>
                    </div>
                    <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                      {program.name[locale]}
                    </h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-2">
                      {program.description[locale]}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-text-secondary-light dark:text-text-secondary-dark mb-4">
                      <span className="flex items-center gap-1"><Clock size={12} /> {program.duration} {t('card.years')}</span>
                      <span className="flex items-center gap-1"><BookOpen size={12} /> {program.credits} {t('card.credits')}</span>
                      <span className="flex items-center gap-1"><Languages size={12} /> {program.languages.join(', ').toUpperCase()}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="primary" size="sm" className="flex-1">{t('card.apply')}</Button>
                      <Button variant="outline" size="sm" className="flex-1" icon={<ArrowRight size={14} />} iconPosition="right">{t('card.details')}</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen size={48} className="mx-auto text-text-secondary-light dark:text-text-secondary-dark mb-4 opacity-50" />
              <p className="text-text-secondary-light dark:text-text-secondary-dark">{t('noResults')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
