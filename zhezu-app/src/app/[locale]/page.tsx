'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { PROGRAMS as FALLBACK_PROGRAMS, DEPARTMENTS as FALLBACK_DEPARTMENTS } from '@/lib/constants';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  Brain,
  Zap,
  Wrench,
  Mountain,
  Landmark,
  Calendar,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import type { Locale } from '@/types';
import type { NewsArticle, HomepageData, UniversityData } from '@/lib/admin/types';

/* ------------------------------------------------------------------ */
/*  Fallback Data (overridden by admin panel at runtime)                */
/* ------------------------------------------------------------------ */

const FALLBACK_PROGRAM_IMAGES: Record<string, string> = {
  mining: 'https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=600&q=80',
  'foreign-languages': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80',
  metallurgy: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
  construction: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
};

const FALLBACK_STATS = [
  { key: 'students', value: '1370+' },
  { key: 'programs', value: '24+' },
  { key: 'employment', value: '87%' },
  { key: 'years', value: '65+' },
];

const FALLBACK_CATEGORY_LABELS: Record<string, string> = {
  news: 'Новости',
  announcement: 'Объявления',
  event: 'События',
  achievement: 'Достижения',
  university: 'Университет',
  science: 'Наука',
  students: 'Студенты',
  sport: 'Спорт',
  culture: 'Культура',
};

const DEGREE_COLORS: Record<string, string> = {
  bachelor: 'bg-[#e6b325]',
  master: 'bg-purple-600',
  doctorate: 'bg-emerald-600',
};

const DEPT_ICON_MAP: Record<string, typeof BookOpen> = {
  'pedagogy-philology': BookOpen,
  'mining-metallurgy-science': Mountain,
  'history-economics-law': Landmark,
  'electrical-safety': Zap,
  'machines-construction': Wrench,
};

const DEPT_COLORS: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> =
  {
    'pedagogy-philology': {
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      darkBg: 'dark:bg-yellow-900/20',
      darkText: 'dark:text-yellow-400',
    },
    'mining-metallurgy-science': {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      darkBg: 'dark:bg-blue-900/20',
      darkText: 'dark:text-blue-400',
    },
    'history-economics-law': {
      bg: 'bg-green-50',
      text: 'text-green-600',
      darkBg: 'dark:bg-green-900/20',
      darkText: 'dark:text-green-400',
    },
    'electrical-safety': {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      darkBg: 'dark:bg-purple-900/20',
      darkText: 'dark:text-purple-400',
    },
    'machines-construction': {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      darkBg: 'dark:bg-orange-900/20',
      darkText: 'dark:text-orange-400',
    },
  };

/* ================================================================== */
/*  HOME PAGE                                                          */
/* ================================================================== */

export default function HomePage() {
  const t = useTranslations('home');
  const tActions = useTranslations('actions');
  const locale = useLocale() as Locale;
  const [newsItems, setNewsItems] = useState<NewsArticle[]>([]);
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [uniData, setUniData] = useState<UniversityData | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch('/api/public/news?limit=4', { signal: controller.signal }).then((r) => (r.ok ? r.json() : [])),
      fetch('/api/public/homepage', { signal: controller.signal }).then((r) => (r.ok ? r.json() : null)),
      fetch('/api/public/university', { signal: controller.signal }).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([news, hp, uni]) => {
        setNewsItems(news);
        if (hp) setHomepageData(hp);
        if (uni) setUniData(uni);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const PROGRAM_IMAGES = homepageData?.programImages && Object.keys(homepageData.programImages).length > 0
    ? homepageData.programImages
    : FALLBACK_PROGRAM_IMAGES;
  const heroStats = homepageData?.stats && homepageData.stats.length > 0
    ? homepageData.stats
    : FALLBACK_STATS;
  const CATEGORY_LABELS = homepageData?.categoryLabels && Object.keys(homepageData.categoryLabels).length > 0
    ? homepageData.categoryLabels
    : FALLBACK_CATEGORY_LABELS;
  const heroTitle = homepageData?.heroTitle || 'Жезказганский университет';

  const PROGRAMS = uniData?.programs && uniData.programs.length > 0 ? uniData.programs : FALLBACK_PROGRAMS;
  const DEPARTMENTS = uniData?.departments && uniData.departments.length > 0 ? uniData.departments : FALLBACK_DEPARTMENTS;

  const featuredPrograms = PROGRAMS.filter((p) => Object.keys(PROGRAM_IMAGES).includes(p.id)).slice(
    0,
    4,
  );

  const featured = newsItems[0] ?? null;
  const sideNews = newsItems.slice(1);

  return (
    <div className="flex flex-col">
      {/* ═══════════════════ HERO — Bold Typography + Stats Grid ═══════════════════ */}
      <section className="to-bg-light dark:from-bg-dark dark:via-bg-dark dark:to-bg-dark relative overflow-hidden bg-gradient-to-b from-[#eef2fa] via-[#f3f6fc]">
        {/* Background decorations */}
        <div className="mesh-gradient absolute inset-0" />
        <div className="bg-primary/[0.10] dark:bg-primary-light/[0.05] absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full blur-3xl" />
        <div className="bg-gold/[0.10] dark:bg-gold/[0.04] absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full blur-3xl" />
        <div className="from-primary/[0.04] dark:from-primary-light/[0.03] absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-20 lg:pb-28">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left: Bold Typography with watermark emblem */}
            <div className="relative">
              {/* Watermark emblem behind text */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-emblem.png"
                alt=""
                aria-hidden="true"
                width={320}
                height={286}
                className="pointer-events-none absolute top-1/2 left-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.12] dark:opacity-[0.08]"
              />
              <div className="relative">
                <div className="border-primary/20 bg-primary/5 text-primary dark:border-primary-light/20 dark:bg-primary-light/5 dark:text-primary-light mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold">
                  <span className="bg-gold h-2 w-2 animate-pulse rounded-full" />
                  {t('heroBadge')}
                </div>

                <h1 className="font-display mb-6 leading-[1.1] font-bold tracking-tight">
                  <span className="text-primary dark:text-primary-light text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                    {heroTitle}
                  </span>
                  <span className="border-gold/40 text-text-primary-light dark:text-text-primary-dark mt-3 block border-l-2 pl-4 text-xl font-medium tracking-normal sm:text-2xl lg:text-3xl">
                    {t('hero.subtitle')}
                  </span>
                </h1>

                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-lg text-lg leading-relaxed">
                  {t('hero.description')}
                </p>

                <Link href="/admission">
                  <Button
                    variant="secondary"
                    size="lg"
                    icon={<ArrowRight size={18} />}
                    iconPosition="right"
                    className="shadow-gold/20 shadow-xl"
                  >
                    {t('hero.cta')}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Stats Premium Cards */}
            <div className="relative">
              <div className="bg-primary/[0.03] dark:bg-primary-light/[0.04] absolute inset-0 -m-4 rounded-3xl blur-2xl" />
              <div className="relative grid grid-cols-2 gap-4">
                {(() => {
                  const STAT_ICONS: Record<string, typeof Users> = {
                    students: Users,
                    programs: BookOpen,
                    employment: TrendingUp,
                    years: Award,
                  };
                  const STAT_STYLES: Record<string, { color: string; bg: string }> = {
                    students: { color: 'text-primary dark:text-primary-light', bg: 'bg-primary/8 dark:bg-primary-light/10' },
                    programs: { color: 'text-gold dark:text-gold-light', bg: 'bg-gold/8 dark:bg-gold/10' },
                    employment: { color: 'text-success', bg: 'bg-success/8 dark:bg-success/10' },
                    years: { color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-600/8 dark:bg-purple-400/10' },
                  };
                  return heroStats.map((s) => ({
                    value: s.value,
                    label: t(`stats.${s.key}`),
                    icon: STAT_ICONS[s.key] || Users,
                    ...(STAT_STYLES[s.key] || { color: 'text-primary dark:text-primary-light', bg: 'bg-primary/8 dark:bg-primary-light/10' }),
                  }));
                })().map((stat) => (
                  <div
                    key={stat.label}
                    className="dark:border-border-dark dark:bg-surface-dark/90 rounded-2xl border border-white/80 bg-white/90 p-5 text-center shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-6 dark:shadow-none"
                  >
                    <div
                      className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${stat.bg}`}
                    >
                      <stat.icon size={22} className={stat.color} />
                    </div>
                    <p className={`font-display mb-1 text-3xl font-bold sm:text-4xl ${stat.color}`}>
                      {stat.value}
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-[11px] font-medium tracking-wide uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ WHY CHOOSE ZHEZU — Asymmetric Layout ═══════════════════ */}
      <section className="bg-surface-light dark:bg-surface-dark py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-text-primary-light dark:text-text-primary-dark mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {t('features.title')}
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Featured AI Card — spans 2 columns */}
            <div className="premium-card premium-card-gold group relative overflow-hidden p-8 md:col-span-2 md:p-10">
              <div className="bg-gold/5 group-hover:bg-gold/10 absolute top-0 right-0 h-40 w-40 rounded-full blur-3xl transition-all" />
              <div className="relative">
                <div className="bg-gold/10 dark:bg-gold/20 mb-6 flex h-14 w-14 items-center justify-center rounded-xl">
                  <Brain size={28} className="text-gold dark:text-gold-light" />
                </div>
                <div className="text-gold dark:text-gold-light bg-gold/10 dark:bg-gold/20 mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
                  <Sparkles size={12} />
                  AI-Центр
                </div>
                <h3 className="text-text-primary-light dark:text-text-primary-dark mb-3 text-2xl font-bold lg:text-3xl">
                  {t('features.ai')}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 max-w-lg text-base leading-relaxed lg:text-lg">
                  {t('features.aiDesc')}
                </p>
                <Link
                  href="/ai-center"
                  className="text-gold dark:text-gold-light group/link inline-flex items-center gap-1.5 text-sm font-bold"
                >
                  {tActions('learnMore')}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover/link:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>

            {/* Two smaller stacked cards */}
            <div className="flex flex-col gap-6">
              <div className="premium-card group flex-1 p-6 lg:p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition-transform group-hover:scale-110 dark:bg-blue-900/20">
                  <GraduationCap size={24} className="text-primary dark:text-primary-light" />
                </div>
                <h3 className="text-text-primary-light dark:text-text-primary-dark mb-2 text-lg font-bold">
                  {t('features.faculty')}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                  {t('features.facultyDesc')}
                </p>
              </div>

              <div className="premium-card group flex-1 p-6 lg:p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 transition-transform group-hover:scale-110 dark:bg-green-900/20">
                  <Briefcase size={24} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-text-primary-light dark:text-text-primary-dark mb-2 text-lg font-bold">
                  {t('features.career')}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                  {t('features.careerDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ POPULAR PROGRAMS — Horizontal Scroll ═══════════════════ */}
      <section className="bg-bg-light dark:bg-bg-dark overflow-hidden py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-text-primary-light dark:text-text-primary-dark mb-2 text-3xl font-bold md:text-4xl">
                {t('programs.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                {t('programs.subtitle')}
              </p>
            </div>
            <Link
              href="/academics"
              className="text-primary dark:text-primary-light hidden items-center gap-1 font-semibold transition-all hover:gap-2 md:flex"
            >
              {tActions('viewAll')} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8">
            {featuredPrograms.map((program) => (
              <div
                key={program.id}
                className="group relative min-w-[280px] cursor-pointer snap-center overflow-hidden rounded-2xl shadow-md md:min-w-[340px]"
              >
                <div className="aspect-[4/5] w-full">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${PROGRAM_IMAGES[program.id]})` }}
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
              </div>
            ))}
          </div>

          <div className="mt-4 text-center md:hidden">
            <Link href="/academics">
              <Button variant="ghost" icon={<ArrowRight size={16} />} iconPosition="right">
                {tActions('viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ NEWS & EVENTS ═══════════════════ */}
      <section className="bg-surface-light dark:bg-surface-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-text-primary-light dark:text-text-primary-dark mb-10 text-center text-3xl font-bold md:text-4xl">
            {t('news.title')}
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main News Item */}
            {featured && (
              <div className="group cursor-pointer lg:col-span-2">
                <div className="relative mb-4 h-[300px] overflow-hidden rounded-2xl md:h-[400px]">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${featured.image})` }}
                  />
                  {(() => {
                    const d = new Date(featured.createdAt);
                    return (
                      <div className="dark:bg-surface-dark/90 absolute top-4 left-4 min-w-[60px] rounded-lg bg-white/90 px-4 py-2 text-center backdrop-blur">
                        <span className="text-text-primary-light dark:text-text-primary-dark block text-xl leading-none font-bold">
                          {d.getDate()}
                        </span>
                        <span className="text-text-secondary-light dark:text-text-secondary-dark block text-xs font-medium uppercase">
                          {d.toLocaleString(locale, { month: 'short' })}
                        </span>
                      </div>
                    );
                  })()}
                </div>
                <div className="pr-4">
                  <div className="text-text-secondary-light dark:text-text-secondary-dark mb-2 flex items-center gap-3 text-sm">
                    <span className="text-gold font-semibold">
                      {CATEGORY_LABELS[featured.category] ?? featured.category}
                    </span>
                  </div>
                  <h3 className="text-text-primary-light dark:text-text-primary-dark group-hover:text-primary dark:group-hover:text-primary-light mb-3 text-2xl font-bold transition-colors">
                    {featured.title[locale]}
                  </h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">
                    {featured.excerpt[locale]}
                  </p>
                </div>
              </div>
            )}

            {/* Side News List */}
            <div className="flex flex-col gap-6">
              {sideNews.map((item, i) => {
                const d = new Date(item.createdAt);
                return (
                  <div
                    key={item.id}
                    className={`group flex cursor-pointer gap-4 ${i < sideNews.length - 1 ? 'border-border-light dark:border-border-dark border-b pb-6' : ''}`}
                  >
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                      <div
                        className="h-full w-full bg-cover bg-center transition-transform group-hover:scale-110"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                    </div>
                    <div>
                      <span className="text-primary dark:text-primary-light mb-1 block text-xs font-bold">
                        {CATEGORY_LABELS[item.category] ?? item.category}
                      </span>
                      <h4 className="text-text-primary-light dark:text-text-primary-dark group-hover:text-primary dark:group-hover:text-primary-light mb-1 text-lg leading-tight font-bold transition-colors">
                        {item.title[locale]}
                      </h4>
                      <span className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1 text-xs">
                        <Calendar size={10} /> {d.toLocaleString(locale, { month: 'short' })}{' '}
                        {d.getDate()}, {d.getFullYear()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link href="/life/news">
              <Button variant="outline" size="md">
                {t('news.viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ DEPARTMENTS ═══════════════════ */}
      <section className="bg-bg-light dark:bg-bg-dark py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-text-primary-light dark:text-text-primary-dark mb-10 text-3xl font-bold md:text-4xl">
            {t('departments.title')}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {DEPARTMENTS.map((dept) => {
              const IconComp = DEPT_ICON_MAP[dept.id] || BookOpen;
              const colors = DEPT_COLORS[dept.id] || {
                bg: 'bg-gray-50',
                text: 'text-gray-400',
                darkBg: 'dark:bg-gray-800/20',
                darkText: 'dark:text-gray-400',
              };
              return (
                <Link
                  key={dept.id}
                  href="/academics"
                  className="group border-border-light bg-surface-light hover:border-primary/30 dark:border-border-dark dark:bg-surface-dark dark:hover:border-primary-light/30 flex flex-col items-center rounded-xl border p-6 text-center shadow-sm transition-all hover:shadow-md"
                >
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText} group-hover:text-primary dark:group-hover:text-primary-light transition-all group-hover:scale-110`}
                  >
                    <IconComp size={28} />
                  </div>
                  <h3 className="text-text-primary-light dark:text-text-primary-dark text-sm font-bold">
                    {dept.shortName[locale]}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="bg-surface-light dark:bg-surface-dark py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="from-primary via-primary relative overflow-hidden rounded-2xl bg-gradient-to-br to-blue-900 p-8 text-center text-white sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(230,179,37,0.2),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_50%)]" />
            <div className="relative">
              <h2 className="font-display mb-4 text-3xl font-bold sm:text-4xl">{t('cta.title')}</h2>
              <p className="mx-auto mb-8 max-w-xl leading-relaxed text-white/70">
                {t('cta.description')}
              </p>
              <Link href="/admission">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  {t('cta.button')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
