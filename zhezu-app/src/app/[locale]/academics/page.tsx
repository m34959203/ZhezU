'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { PROGRAMS, DEPARTMENTS } from '@/lib/constants';
import { SectionHero } from '@/components/SectionHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Pagination } from '@/components/ui/Pagination';
import { Link } from '@/i18n/navigation';
import {
  Search,
  GraduationCap,
  BookOpen,
  Pickaxe,
  Scale,
  Zap,
  Cog,
  Clock,
  Globe,
  Building2,
  BookMarked,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Locale } from '@/types';

/* ─── Constants ─── */

const ITEMS_PER_PAGE = 6;

const DEPT_ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Pickaxe,
  Scale,
  Zap,
  Cog,
};

const DEPT_GRADIENTS: Record<string, string> = {
  'pedagogy-philology': 'from-amber-400 to-orange-500',
  'mining-metallurgy-science': 'from-blue-600 to-indigo-700',
  'history-economics-law': 'from-emerald-500 to-teal-700',
  'electrical-safety': 'from-purple-500 to-violet-700',
  'machines-construction': 'from-slate-600 to-slate-800',
};

const DEPT_ACCENT_TEXT: Record<string, string> = {
  'pedagogy-philology': 'text-amber-500',
  'mining-metallurgy-science': 'text-primary dark:text-primary-light',
  'history-economics-law': 'text-emerald-600',
  'electrical-safety': 'text-purple-600',
  'machines-construction': 'text-slate-600 dark:text-slate-400',
};

const DEPT_ICON_COLORS: Record<string, string> = {
  'pedagogy-philology': 'text-amber-500',
  'mining-metallurgy-science': 'text-primary',
  'history-economics-law': 'text-emerald-600',
  'electrical-safety': 'text-purple-600',
  'machines-construction': 'text-slate-700 dark:text-slate-300',
};

const DEGREE_TYPES = ['bachelor', 'master', 'doctorate'] as const;

const LANG_CODES = ['kk', 'ru', 'en'] as const;

/* ─── Page Component ─── */

export default function AcademicsPage() {
  const t = useTranslations('academics');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;

  // Filter state
  const [selectedDepts, setSelectedDepts] = useState<Set<string>>(new Set());
  const [selectedLevels, setSelectedLevels] = useState<Set<string>>(new Set());
  const [selectedLangs, setSelectedLangs] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Toggle helpers
  const toggleFilter = (
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    value: string,
  ) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  // Filtered programs
  const filteredPrograms = useMemo(() => {
    return PROGRAMS.filter((p) => {
      // Search filter
      if (search) {
        const q = search.toLowerCase();
        const matches =
          p.name[locale].toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.description[locale].toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Department filter
      if (selectedDepts.size > 0 && !selectedDepts.has(p.department)) return false;

      // Level filter
      if (selectedLevels.size > 0 && !selectedLevels.has(p.degree)) return false;

      // Language filter
      if (selectedLangs.size > 0 && !p.languages.some((l) => selectedLangs.has(l))) return false;

      return true;
    });
  }, [search, selectedDepts, selectedLevels, selectedLangs, locale]);

  // Reset page when filters change
  const handleFilterChange = (
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    value: string,
  ) => {
    toggleFilter(setter, value);
    setCurrentPage(1);
  };

  // Department program counts (based on all programs, not filtered)
  const deptCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of PROGRAMS) {
      counts[p.department] = (counts[p.department] || 0) + 1;
    }
    return counts;
  }, []);

  // Pagination
  const totalPages = Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE);
  const paginatedPrograms = filteredPrograms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Degree label helper
  const degreeLabel = (degree: string): string => {
    switch (degree) {
      case 'bachelor':
        return t('levelBachelor');
      case 'master':
        return t('levelMaster');
      case 'doctorate':
        return t('levelPhd');
      default:
        return degree;
    }
  };

  // Short degree label for badge on card
  const degreeBadgeLabel = (degree: string): string => {
    switch (degree) {
      case 'bachelor':
        return locale === 'en' ? "Bachelor's" : locale === 'ru' ? 'Бакалавр' : 'Бакалавр';
      case 'master':
        return locale === 'en' ? "Master's" : locale === 'ru' ? 'Магистр' : 'Магистр';
      case 'doctorate':
        return locale === 'en' ? 'PhD' : locale === 'ru' ? 'PhD' : 'PhD';
      default:
        return degree;
    }
  };

  // Language label helper
  const langLabel = (code: string): string => {
    switch (code) {
      case 'kk':
        return t('langKk');
      case 'ru':
        return t('langRu');
      case 'en':
        return t('langEn');
      default:
        return code;
    }
  };

  return (
    <main className="bg-bg-light dark:bg-bg-dark min-h-screen">
      {/* Hero */}
      <SectionHero
        section="academics"
        className="py-16 lg:py-20"
        overlay="bg-gradient-to-b from-[rgba(10,14,23,0.88)] to-[rgba(10,14,23,0.8)]"
        accent="bg-[radial-gradient(circle_at_80%_30%,rgba(29,86,201,0.1),transparent_50%)]"
      >
        <div className="mx-auto max-w-[1440px] px-4 md:px-10">
          <Breadcrumb
            items={[{ label: tNav('home'), href: '/' }, { label: tNav('academics') }]}
            className="mb-6 [&_a]:text-slate-400 [&_a:hover]:text-white [&_span]:text-slate-400 [&_li:last-child_span]:text-white"
          />
          <h1 className="font-display mb-2 text-4xl leading-tight font-black tracking-[-0.033em] text-white md:text-5xl">
            {t('title')}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
            {t('subtitle')}
          </p>
        </div>
      </SectionHero>

      <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-10">
        {/* ── Search & Filters ── */}
        <div className="mb-8 flex flex-col gap-6">
          <div className="flex items-end justify-end">
            {/* Search bar */}
            <div className="relative w-full min-w-[200px] md:w-auto md:min-w-[280px]">
              <Search
                size={18}
                className="text-text-secondary-light dark:text-text-secondary-dark pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={t('searchPlaceholder')}
                className="border-border-light bg-surface-light text-text-primary-light placeholder:text-text-secondary-light/60 focus:border-primary/40 focus:ring-primary/20 dark:border-border-dark dark:bg-surface-dark dark:placeholder:text-text-secondary-dark/60 h-10 w-full rounded-lg border pr-4 pl-10 text-sm focus:ring-2 focus:outline-none dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* ── Sidebar Filters ── */}
          <aside className="space-y-6 lg:col-span-3">
            {/* Department Filter */}
            <Card padding="none" className="p-5 shadow-sm">
              <h3 className="font-display text-text-primary-light mb-4 flex items-center gap-2 text-base font-bold dark:text-white">
                <Building2 size={18} className="text-primary dark:text-primary-light" />
                {t('filterDepartment')}
              </h3>
              <div className="space-y-3">
                {DEPARTMENTS.map((dept) => (
                  <label key={dept.id} className="group flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedDepts.has(dept.id)}
                      onChange={() => handleFilterChange(setSelectedDepts, dept.id)}
                      className="text-primary focus:ring-primary/25 border-border-light dark:border-border-dark h-5 w-5 cursor-pointer rounded transition-all"
                    />
                    <span className="text-text-primary-light group-hover:text-primary dark:group-hover:text-primary-light dark:text-text-primary-dark text-sm font-medium transition-colors">
                      {dept.shortName[locale]}
                    </span>
                    <span className="bg-bg-light text-text-secondary-light dark:bg-surface-dark dark:text-text-secondary-dark ml-auto rounded-full px-2 py-0.5 text-xs">
                      {deptCounts[dept.id] || 0}
                    </span>
                  </label>
                ))}
              </div>
            </Card>

            {/* Level Filter */}
            <Card padding="none" className="p-5 shadow-sm">
              <h3 className="font-display text-text-primary-light mb-4 flex items-center gap-2 text-base font-bold dark:text-white">
                <GraduationCap size={18} className="text-primary dark:text-primary-light" />
                {t('filterLevel')}
              </h3>
              <div className="space-y-3">
                {DEGREE_TYPES.map((level) => (
                  <label key={level} className="group flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedLevels.has(level)}
                      onChange={() => handleFilterChange(setSelectedLevels, level)}
                      className="text-primary focus:ring-primary/25 border-border-light dark:border-border-dark h-5 w-5 cursor-pointer rounded transition-all"
                    />
                    <span className="text-text-primary-light group-hover:text-primary dark:group-hover:text-primary-light dark:text-text-primary-dark text-sm font-medium transition-colors">
                      {degreeLabel(level)}
                    </span>
                  </label>
                ))}
              </div>
            </Card>

            {/* Language Filter */}
            <Card padding="none" className="p-5 shadow-sm">
              <h3 className="font-display text-text-primary-light mb-4 flex items-center gap-2 text-base font-bold dark:text-white">
                <Globe size={18} className="text-primary dark:text-primary-light" />
                {t('filterLanguage')}
              </h3>
              <div className="space-y-3">
                {LANG_CODES.map((lang) => (
                  <label key={lang} className="group flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedLangs.has(lang)}
                      onChange={() => handleFilterChange(setSelectedLangs, lang)}
                      className="text-primary focus:ring-primary/25 border-border-light dark:border-border-dark h-5 w-5 cursor-pointer rounded transition-all"
                    />
                    <span className="text-text-primary-light group-hover:text-primary dark:group-hover:text-primary-light dark:text-text-primary-dark text-sm font-medium transition-colors">
                      {langLabel(lang)}
                    </span>
                  </label>
                ))}
              </div>
            </Card>
          </aside>

          {/* ── Programs Grid ── */}
          <div className="lg:col-span-9">
            {/* Results count */}
            {filteredPrograms.length > 0 && (
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                {t('showing')}{' '}
                <span className="text-text-primary-light font-semibold dark:text-white">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                  &ndash;
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredPrograms.length)}
                </span>{' '}
                {t('of')}{' '}
                <span className="text-text-primary-light font-semibold dark:text-white">
                  {filteredPrograms.length}
                </span>{' '}
                {t('statPrograms').toLowerCase()}
              </p>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {paginatedPrograms.map((program) => {
                const dept = DEPARTMENTS.find((d) => d.id === program.department);
                const gradient =
                  DEPT_GRADIENTS[program.department] || 'from-blue-600 to-indigo-700';
                const accentText = DEPT_ACCENT_TEXT[program.department] || 'text-primary';
                const iconColor = DEPT_ICON_COLORS[program.department] || 'text-primary';
                const DeptIcon = dept ? DEPT_ICONS[dept.icon] || BookOpen : BookOpen;

                return (
                  <Link
                    key={program.id}
                    href={`/academics/${program.id}`}
                    className="group border-border-light bg-surface-light hover:border-primary/50 dark:border-border-dark dark:bg-surface-dark flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg"
                  >
                    {/* Gradient header */}
                    <div className={`relative h-32 overflow-hidden bg-gradient-to-r ${gradient}`}>
                      {/* Subtle pattern overlay */}
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                        }}
                      />
                      {/* Degree badge */}
                      <div className="absolute top-4 right-4 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                        {degreeBadgeLabel(program.degree)}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="relative flex flex-1 flex-col p-6">
                      {/* Floating icon */}
                      <div className="border-border-light dark:border-border-dark dark:bg-surface-dark bg-surface-light absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-lg border shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <DeptIcon size={24} className={iconColor} />
                      </div>

                      <div className="mt-4 mb-2">
                        {/* Department label */}
                        <span
                          className={`mb-1 block text-xs font-bold tracking-wider uppercase ${accentText}`}
                        >
                          {dept?.shortName[locale]}
                        </span>
                        {/* Program title */}
                        <h3 className="font-display text-text-primary-light group-hover:text-primary dark:group-hover:text-primary-light text-lg font-bold transition-colors dark:text-white">
                          {program.name[locale]}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 line-clamp-2 text-sm">
                        {program.description[locale]}
                      </p>

                      {/* Footer */}
                      <div className="border-border-light text-text-secondary-light dark:border-border-dark dark:text-text-secondary-dark mt-auto flex items-center justify-between border-t pt-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Clock size={16} />
                          <span>
                            {program.duration} {t('years')}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BookMarked size={16} />
                          <span>
                            {program.credits} {t('tableCredits')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* No results */}
            {filteredPrograms.length === 0 && (
              <div className="border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark rounded-xl border p-12 text-center">
                <GraduationCap
                  size={48}
                  className="text-text-secondary-light/40 dark:text-text-secondary-dark/40 mx-auto mb-4"
                />
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  {t('noResults')}
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
