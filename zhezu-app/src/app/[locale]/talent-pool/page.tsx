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
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* ═══════ Premium Hero ═══════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Mesh background */}
        <div className="absolute inset-0 mesh-gradient" />

        {/* Floating orbs */}
        <div className="absolute top-[-10%] left-[15%] w-[500px] h-[500px] rounded-full bg-primary/4 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gold/3 blur-[100px] pointer-events-none" />
        <div className="absolute top-[30%] right-[25%] w-[200px] h-[200px] rounded-full bg-[#8B5CF6]/4 blur-[80px] pointer-events-none" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-30 dark:opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/6 border border-gold/15 mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-semibold text-gold-dark dark:text-gold uppercase tracking-widest">{t('badge')}</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gradient mb-5 leading-[1.1] tracking-tight">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* Premium Search bar */}
            <div className="relative max-w-2xl mx-auto group">
              {/* Search glow */}
              <div className="absolute -inset-1 rounded-2xl bg-primary/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-xl" />

              <div className="relative">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary-light/60 dark:text-text-secondary-dark/60" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-13 pr-28 py-4 rounded-2xl bg-surface-light/80 dark:bg-surface-dark/60 border border-border-light dark:border-border-dark/50 text-text-primary-light dark:text-white placeholder:text-text-secondary-light/50 dark:placeholder:text-text-secondary-dark/50 focus:outline-none focus:border-primary/40 focus:bg-surface-light dark:focus:bg-surface-dark/80 backdrop-blur-md transition-all duration-300 text-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-all duration-200 flex items-center gap-2 btn-premium cursor-pointer">
                  <Filter size={14} />
                  {t('filter')}
                </button>
              </div>
            </div>
          </div>

          {/* Premium Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.labelKey}
                className="premium-card flex flex-col items-center gap-2 p-5"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/8 flex items-center justify-center mb-1">
                  <stat.icon size={20} className="text-gold-dark dark:text-gold" />
                </div>
                <span className="text-3xl font-display font-bold text-text-primary-light dark:text-white tracking-tight">{stat.value}</span>
                <span className="text-[11px] text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider font-medium">{t(stat.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Filter Chips ═══════ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark mr-2 uppercase tracking-wider font-medium">{t('filterBy')}:</span>
          {['Mining', 'Metallurgy', 'Energy', 'Law', 'Engineering', 'IT'].map((chip) => (
            <button
              key={chip}
              className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold border border-border-light dark:border-border-dark/40 text-text-secondary-light dark:text-text-secondary-dark hover:border-gold/30 hover:text-gold-dark dark:hover:text-gold hover:bg-gold/5 transition-all duration-200 cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>
      </section>

      {/* ═══════ Student Cards Grid ═══════ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STUDENTS.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      </section>
    </div>
  );
}
