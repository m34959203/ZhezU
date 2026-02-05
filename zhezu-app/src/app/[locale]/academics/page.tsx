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
import type { Locale } from '@/types';

const DEPT_ICONS: Record<string, React.ComponentType<any>> = {
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
    new Set(DEPARTMENTS.map((d) => d.id))
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
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark relative overflow-hidden">
      {/* ── Ambient background ── */}
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />
      <div className="fixed top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-15%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-[150px] pointer-events-none" />
      <div className="fixed top-[40%] left-[60%] w-[350px] h-[350px] rounded-full bg-[#8B5CF6]/[0.03] blur-[150px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-50 dark:opacity-100"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Hero ── */}
      <section className="relative py-16 md:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 mb-8">
              <GraduationCap size={14} className="text-primary dark:text-primary-light" />
              <span className="text-[11px] font-semibold text-primary dark:text-primary-light uppercase tracking-widest">
                {t('badge')}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-5 leading-[1.1]">
              {t('title')}
            </h1>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-14">
            <div className="premium-card p-4 text-center">
              <div className="text-3xl font-bold text-text-primary-light dark:text-white tabular-nums mb-1">{totalPrograms}</div>
              <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">{t('statPrograms')}</div>
            </div>
            <div className="premium-card p-4 text-center">
              <div className="text-3xl font-bold text-text-primary-light dark:text-white tabular-nums mb-1">{totalDepts}</div>
              <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">{t('statDepts')}</div>
            </div>
            <div className="premium-card p-4 text-center">
              <div className="text-3xl font-bold text-text-primary-light dark:text-white tabular-nums mb-1">4</div>
              <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">{t('statYears')}</div>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute -inset-1 rounded-2xl bg-primary/10 blur-xl opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 pointer-events-none" />
            <div className="relative group">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark pointer-events-none"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-surface-light/80 dark:bg-surface-dark/50 border border-border-light dark:border-border-dark/60 text-text-primary-light dark:text-white placeholder:text-text-secondary-light/60 dark:placeholder:text-text-secondary-dark/60 focus:outline-none focus:border-primary/40 focus:bg-surface-light dark:focus:bg-surface-dark/70 transition-all duration-300 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Departments & Programs ── */}
      <section className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-24">
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
                  className="w-full flex items-center justify-between p-5 md:p-6 cursor-pointer group/dept"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${dept.color}15` }}
                    >
                      <Icon size={20} style={{ color: dept.color }} />
                    </div>
                    <div className="text-left">
                      <h2 className="text-base md:text-lg font-display font-bold text-text-primary-light dark:text-white group-hover/dept:text-primary dark:group-hover/dept:text-primary-light transition-colors">
                        {dept.name[locale]}
                      </h2>
                      <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
                        МОП, КЭД · {deptPrograms.length}{' '}
                        {deptPrograms.length === 1
                          ? t('programSingular')
                          : t('programPlural')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${dept.color}15`,
                        color: dept.color,
                      }}
                    >
                      {dept.shortName[locale]}
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={18} className="text-text-secondary-light dark:text-text-secondary-dark" />
                    ) : (
                      <ChevronDown size={18} className="text-text-secondary-light dark:text-text-secondary-dark" />
                    )}
                  </div>
                </button>

                {/* Programs table */}
                {isExpanded && deptPrograms.length > 0 && (
                  <div className="border-t border-border-light dark:border-border-dark/30">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-surface-hover-light dark:bg-surface-dark/30">
                            <th className="text-left text-[10px] uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-semibold px-5 md:px-6 py-3 w-[120px]">
                              {t('tableCode')}
                            </th>
                            <th className="text-left text-[10px] uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-semibold px-3 py-3">
                              {t('tableName')}
                            </th>
                            <th className="text-left text-[10px] uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-semibold px-3 py-3 hidden md:table-cell w-[100px]">
                              {t('tableDuration')}
                            </th>
                            <th className="text-left text-[10px] uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-semibold px-3 py-3 hidden md:table-cell w-[100px]">
                              {t('tableCredits')}
                            </th>
                            <th className="text-left text-[10px] uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-semibold px-3 py-3 hidden lg:table-cell w-[100px]">
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
                                  ? 'border-b border-border-light dark:border-border-dark/20'
                                  : ''
                              }`}
                            >
                              <td className="px-5 md:px-6 py-4">
                                <span
                                  className="inline-flex px-2.5 py-1 rounded-lg text-xs font-mono font-bold"
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
                                  <p className="text-sm font-semibold text-text-primary-light dark:text-white group-hover/row:text-primary dark:group-hover/row:text-primary-light transition-colors">
                                    {program.name[locale]}
                                  </p>
                                  <p className="text-xs text-text-secondary-light/70 dark:text-text-secondary-dark/70 mt-0.5 line-clamp-1 max-w-md">
                                    {program.description[locale]}
                                  </p>
                                </div>
                              </td>
                              <td className="px-3 py-4 hidden md:table-cell">
                                <span className="flex items-center gap-1.5 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                                  <Clock size={12} />
                                  {program.duration} {t('years')}
                                </span>
                              </td>
                              <td className="px-3 py-4 hidden md:table-cell">
                                <span className="flex items-center gap-1.5 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                                  <BookOpen size={12} />
                                  {program.credits}
                                </span>
                              </td>
                              <td className="px-3 py-4 hidden lg:table-cell">
                                <span className="flex items-center gap-1.5 text-xs text-text-secondary-light dark:text-text-secondary-dark">
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
                  <div className="border-t border-border-light dark:border-border-dark/30 px-6 py-8 text-center">
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{t('noResults')}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* No results */}
        {search && filteredPrograms.length === 0 && (
          <div className="premium-card p-12 text-center mt-6">
            <GraduationCap size={48} className="mx-auto text-text-secondary-light/40 dark:text-text-secondary-dark/40 mb-4" />
            <p className="text-text-secondary-light dark:text-text-secondary-dark">{t('noResults')}</p>
          </div>
        )}

        {/* CTA */}
        <div className="premium-card p-10 md:p-14 text-center overflow-hidden mt-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.06] via-transparent to-gold/[0.06] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-gold-dark dark:text-gold" />
              <span className="text-[10px] font-semibold text-gold-dark dark:text-gold uppercase tracking-widest">
                ZhezU
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary-light dark:text-white mb-3">
              {t('ctaTitle')}
            </h3>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-lg mx-auto leading-relaxed">
              {t('ctaDesc')}
            </p>

            <a
              href="https://zhezu.edu.kz"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-white dark:text-bg-dark font-bold text-sm tracking-wide"
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
