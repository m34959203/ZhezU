'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { PROGRAMS } from '@/lib/constants';
import { Search, SlidersHorizontal, BookOpen, Clock, Languages, X } from 'lucide-react';
import type { Locale } from '@/types';

const FACULTIES = ['it', 'engineering', 'business', 'education', 'humanities', 'law', 'natural', 'medicine'] as const;
const DEGREES = ['bachelor', 'master', 'doctorate'] as const;

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
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-gold/5 dark:from-primary/10 dark:via-bg-dark dark:to-gold/5 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-3">
            {t('title')}
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
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
            <div className="mb-8 space-y-4 p-4 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark">
              <div>
                <p className="text-sm font-medium mb-2">{t('filters.degree')}</p>
                <div className="flex flex-wrap gap-2">
                  {DEGREES.map((deg) => (
                    <button
                      key={deg}
                      onClick={() => setSelectedDegree(selectedDegree === deg ? null : deg)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                        selectedDegree === deg
                          ? 'bg-primary text-white dark:bg-primary-light'
                          : 'bg-surface-hover-light dark:bg-surface-hover-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10'
                      }`}
                    >
                      {t(`filters.${deg === 'bachelor' ? 'all' : 'all'}` as any) || deg}
                      {deg === 'bachelor' ? '🎓' : deg === 'master' ? '📚' : '🔬'}
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
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                        selectedFaculty === fac
                          ? 'bg-primary text-white dark:bg-primary-light'
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

          {/* Program cards */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((program) => (
                <Card key={program.id} hover padding="none">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge>
                        {program.degree === 'bachelor' ? '🎓' : program.degree === 'master' ? '📚' : '🔬'}{' '}
                        {program.degree.charAt(0).toUpperCase() + program.degree.slice(1)}
                      </Badge>
                      <Badge variant="info">{t(`faculties.${program.faculty}` as any)}</Badge>
                    </div>
                    <h3 className="text-lg font-display font-semibold mb-2">
                      {program.name[locale]}
                    </h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-3">
                      {program.description[locale]}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-text-secondary-light dark:text-text-secondary-dark mb-4">
                      <span className="flex items-center gap-1"><Clock size={12} /> {program.duration} {t('card.years')}</span>
                      <span className="flex items-center gap-1"><BookOpen size={12} /> {program.credits} {t('card.credits')}</span>
                      <span className="flex items-center gap-1"><Languages size={12} /> {program.languages.join(', ').toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="px-6 pb-5 flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1">{t('card.apply')}</Button>
                    <Button variant="outline" size="sm" className="flex-1">{t('card.details')}</Button>
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
