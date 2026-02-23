'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { PROGRAMS, DEPARTMENTS } from '@/lib/constants';
import {
  Search,
  GraduationCap,
  BookOpen,
  Pickaxe,
  Scale,
  Zap,
  Cog,
  Clock,
  Languages,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Locale } from '@/types';

const DEPT_ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Pickaxe,
  Scale,
  Zap,
  Cog,
};

export default function AcademicsPage() {
  const t = useTranslations('academics');
  const locale = useLocale() as Locale;

  const [search, setSearch] = useState('');
  const [expandedDepts, setExpandedDepts] = useState<Set<string>>(
    new Set(DEPARTMENTS.map((d) => d.id)),
  );

  const toggleDept = (id: string) => {
    setExpandedDepts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredPrograms = PROGRAMS.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.name[locale].toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.description[locale].toLowerCase().includes(q)
    );
  });

  const getProgramsForDept = (deptId: string) =>
    filteredPrograms.filter((p) => p.department === deptId);

  const totalPrograms = PROGRAMS.length;
  const totalDepts = DEPARTMENTS.length;

  return (
    <div className="bg-bg-light dark:bg-bg-dark relative min-h-screen overflow-hidden">
      {/* ── Ambient background ── */}
      <div className="mesh-gradient pointer-events-none fixed inset-0" />
      <div className="bg-primary/[0.04] pointer-events-none fixed top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full blur-[150px]" />
      <div className="bg-gold/[0.03] pointer-events-none fixed right-[-5%] bottom-[-15%] h-[600px] w-[600px] rounded-full blur-[150px]" />
      <div className="pointer-events-none fixed top-[40%] left-[60%] h-[350px] w-[350px] rounded-full bg-[#8B5CF6]/[0.03] blur-[150px]" />

      {/* Grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-50 dark:opacity-100"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Hero ── */}
      <section className="relative py-16 md:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="bg-primary/8 border-primary/20 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5">
              <GraduationCap size={14} className="text-primary dark:text-primary-light" />
              <span className="text-primary dark:text-primary-light text-[11px] font-semibold tracking-widest uppercase">
                {t('badge')}
              </span>
            </div>

            <h1 className="font-display text-gradient mb-5 text-5xl leading-[1.1] font-bold md:text-7xl">
              {t('title')}
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto max-w-2xl text-lg leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Stats */}
          <div className="mx-auto mb-14 grid max-w-2xl grid-cols-3 gap-4">
            <div className="premium-card p-4 text-center">
              <div className="text-text-primary-light mb-1 text-3xl font-bold tabular-nums dark:text-white">
                {totalPrograms}
              </div>
              <div className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">
                {t('statPrograms')}
              </div>
            </div>
            <div className="premium-card p-4 text-center">
              <div className="text-text-primary-light mb-1 text-3xl font-bold tabular-nums dark:text-white">
                {totalDepts}
              </div>
              <div className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">
                {t('statDepts')}
              </div>
            </div>
            <div className="premium-card p-4 text-center">
              <div className="text-text-primary-light mb-1 text-3xl font-bold tabular-nums dark:text-white">
                4
              </div>
              <div className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">
                {t('statYears')}
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mx-auto max-w-2xl">
            <div className="bg-primary/10 pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-focus-within:opacity-100" />
            <div className="group relative">
              <Search
                size={18}
                className="text-text-secondary-light dark:text-text-secondary-dark pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="bg-surface-light/80 dark:bg-surface-dark/50 border-border-light dark:border-border-dark/60 text-text-primary-light placeholder:text-text-secondary-light/60 dark:placeholder:text-text-secondary-dark/60 focus:border-primary/40 focus:bg-surface-light dark:focus:bg-surface-dark/70 w-full rounded-2xl border py-4 pr-5 pl-12 text-sm transition-all duration-300 focus:outline-none dark:text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Departments & Programs ── */}
      <section className="relative mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {DEPARTMENTS.map((dept) => {
            const deptPrograms = getProgramsForDept(dept.id);
            const isExpanded = expandedDepts.has(dept.id);
            const Icon = DEPT_ICONS[dept.icon] || BookOpen;

            if (search && deptPrograms.length === 0) return null;

            return (
              <div key={dept.id} className="premium-card overflow-hidden">
                {/* Department header */}
                <button
                  onClick={() => toggleDept(dept.id)}
                  className="group/dept flex w-full cursor-pointer items-center justify-between p-5 md:p-6"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${dept.color}15` }}
                    >
                      <Icon size={20} style={{ color: dept.color }} />
                    </div>
                    <div className="text-left">
                      <h2 className="font-display text-text-primary-light group-hover/dept:text-primary dark:group-hover/dept:text-primary-light text-base font-bold transition-colors md:text-lg dark:text-white">
                        {dept.name[locale]}
                      </h2>
                      <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">
                        МОП, КЭД · {deptPrograms.length}{' '}
                        {deptPrograms.length === 1 ? t('programSingular') : t('programPlural')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="hidden rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase sm:inline-flex"
                      style={{
                        backgroundColor: `${dept.color}15`,
                        color: dept.color,
                      }}
                    >
                      {dept.shortName[locale]}
                    </span>
                    {isExpanded ? (
                      <ChevronUp
                        size={18}
                        className="text-text-secondary-light dark:text-text-secondary-dark"
                      />
                    ) : (
                      <ChevronDown
                        size={18}
                        className="text-text-secondary-light dark:text-text-secondary-dark"
                      />
                    )}
                  </div>
                </button>

                {/* Programs table */}
                {isExpanded && deptPrograms.length > 0 && (
                  <div className="border-border-light dark:border-border-dark/30 border-t">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-surface-hover-light dark:bg-surface-dark/30">
                            <th className="text-text-secondary-light dark:text-text-secondary-dark w-[120px] px-5 py-3 text-left text-[10px] font-semibold tracking-wider uppercase md:px-6">
                              {t('tableCode')}
                            </th>
                            <th className="text-text-secondary-light dark:text-text-secondary-dark px-3 py-3 text-left text-[10px] font-semibold tracking-wider uppercase">
                              {t('tableName')}
                            </th>
                            <th className="text-text-secondary-light dark:text-text-secondary-dark hidden w-[100px] px-3 py-3 text-left text-[10px] font-semibold tracking-wider uppercase md:table-cell">
                              {t('tableDuration')}
                            </th>
                            <th className="text-text-secondary-light dark:text-text-secondary-dark hidden w-[100px] px-3 py-3 text-left text-[10px] font-semibold tracking-wider uppercase md:table-cell">
                              {t('tableCredits')}
                            </th>
                            <th className="text-text-secondary-light dark:text-text-secondary-dark hidden w-[100px] px-3 py-3 text-left text-[10px] font-semibold tracking-wider uppercase lg:table-cell">
                              {t('tableLang')}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {deptPrograms.map((program, idx) => (
                            <tr
                              key={program.id}
                              className={`group/row hover:bg-surface-hover-light dark:hover:bg-surface-dark/40 transition-colors duration-200 ${
                                idx !== deptPrograms.length - 1
                                  ? 'border-border-light dark:border-border-dark/20 border-b'
                                  : ''
                              }`}
                            >
                              <td className="px-5 py-4 md:px-6">
                                <span
                                  className="inline-flex rounded-lg px-2.5 py-1 font-mono text-xs font-bold"
                                  style={{
                                    backgroundColor: `${dept.color}10`,
                                    color: dept.color,
                                  }}
                                >
                                  {program.code}
                                </span>
                              </td>
                              <td className="px-3 py-4">
                                <div>
                                  <p className="text-text-primary-light group-hover/row:text-primary dark:group-hover/row:text-primary-light text-sm font-semibold transition-colors dark:text-white">
                                    {program.name[locale]}
                                  </p>
                                  <p className="text-text-secondary-light/70 dark:text-text-secondary-dark/70 mt-0.5 line-clamp-1 max-w-md text-xs">
                                    {program.description[locale]}
                                  </p>
                                </div>
                              </td>
                              <td className="hidden px-3 py-4 md:table-cell">
                                <span className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1.5 text-xs">
                                  <Clock size={12} />
                                  {program.duration} {t('years')}
                                </span>
                              </td>
                              <td className="hidden px-3 py-4 md:table-cell">
                                <span className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1.5 text-xs">
                                  <BookOpen size={12} />
                                  {program.credits}
                                </span>
                              </td>
                              <td className="hidden px-3 py-4 lg:table-cell">
                                <span className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1.5 text-xs">
                                  <Languages size={12} />
                                  {program.languages.join(', ').toUpperCase()}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {isExpanded && deptPrograms.length === 0 && (
                  <div className="border-border-light dark:border-border-dark/30 border-t px-6 py-8 text-center">
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                      {t('noResults')}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* No results */}
        {search && filteredPrograms.length === 0 && (
          <div className="premium-card mt-6 p-12 text-center">
            <GraduationCap
              size={48}
              className="text-text-secondary-light/40 dark:text-text-secondary-dark/40 mx-auto mb-4"
            />
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              {t('noResults')}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="premium-card mt-12 overflow-hidden p-10 text-center md:p-14">
          <div className="from-primary/[0.06] to-gold/[0.06] pointer-events-none absolute inset-0 bg-gradient-to-r via-transparent" />
          <div className="via-gold/30 absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2">
              <Sparkles size={16} className="text-gold-dark dark:text-gold" />
              <span className="text-gold-dark dark:text-gold text-[10px] font-semibold tracking-widest uppercase">
                ZhezU
              </span>
            </div>

            <h3 className="font-display text-text-primary-light mb-3 text-2xl font-bold md:text-3xl dark:text-white">
              {t('ctaTitle')}
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-8 max-w-lg text-sm leading-relaxed">
              {t('ctaDesc')}
            </p>

            <a
              href="https://zhezu.edu.kz"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium from-gold to-gold-light dark:text-bg-dark inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r px-8 py-3.5 text-sm font-bold tracking-wide text-white"
            >
              {t('ctaButton')}
              <Users size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
