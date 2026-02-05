import { useTranslations, useLocale } from 'next-intl';
import { Search, Filter, Users, TrendingUp, Award, Building2 } from 'lucide-react';
import { STUDENTS } from '@/lib/talent-data';
import { StudentCard } from '@/components/talent/StudentCard';
import type { Locale } from '@/types';

export default function TalentPoolPage() {
  const t = useTranslations('talent');
  const locale = useLocale() as Locale;

  const stats = [
    { icon: Users, value: '1,370', labelKey: 'statsStudents' },
    { icon: TrendingUp, value: '87%', labelKey: 'statsEmployment' },
    { icon: Award, value: '150+', labelKey: 'statsAchievements' },
    { icon: Building2, value: '45+', labelKey: 'statsPartners' },
  ];

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-sm font-medium text-gold">{t('badge')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-text-secondary-dark max-w-2xl mx-auto mb-8">
              {t('subtitle')}
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl mx-auto">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-dark" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-full pl-12 pr-24 py-3.5 rounded-xl bg-surface-dark/80 border border-border-dark text-white placeholder:text-text-secondary-dark focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 backdrop-blur-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors flex items-center gap-1.5">
                <Filter size={14} />
                {t('filter')}
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.labelKey}
                className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-surface-dark/50 border border-border-dark/50 backdrop-blur-sm"
              >
                <stat.icon size={20} className="text-gold" />
                <span className="text-2xl font-display font-bold text-white">{stat.value}</span>
                <span className="text-xs text-text-secondary-dark">{t(stat.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter chips */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-text-secondary-dark mr-2">{t('filterBy')}:</span>
          {['Mining', 'Metallurgy', 'Energy', 'Law', 'Engineering', 'IT'].map((chip) => (
            <button
              key={chip}
              className="px-3 py-1.5 rounded-full text-xs font-medium border border-border-dark/60 text-text-secondary-dark hover:border-gold/40 hover:text-gold transition-colors cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>
      </section>

      {/* Student cards grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {STUDENTS.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      </section>
    </div>
  );
}
