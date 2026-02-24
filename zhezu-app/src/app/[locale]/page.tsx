'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { PROGRAMS, DEPARTMENTS } from '@/lib/constants';
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
import type { Locale } from '@/types';

/* ------------------------------------------------------------------ */
/*  Static Data                                                        */
/* ------------------------------------------------------------------ */

const PROGRAM_IMAGES: Record<string, string> = {
  mining: 'https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=600&q=80',
  'foreign-languages': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80',
  metallurgy: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
  construction: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
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

const NEWS_ITEMS = [
  {
    id: 'conference',
    date: { day: '15', month: 'Oct' },
    category: 'University Life',
    readTime: '5 min',
    title:
      'International Scientific Conference "Science and Education in the 21st Century" Held at ZhezU',
    excerpt:
      'The university hosted over 200 delegates from 15 countries to discuss the future of education and scientific innovation.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    featured: true,
  },
  {
    id: 'hackathon',
    category: 'Student Life',
    title: 'ZhezU Students Win National Hackathon',
    date: { day: '12', month: 'Oct' },
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&q=80',
  },
  {
    id: 'robotics',
    category: 'Research',
    title: 'Opening of the New Advanced Robotics Lab',
    date: { day: '08', month: 'Oct' },
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&q=80',
  },
  {
    id: 'alumni',
    category: 'Alumni',
    title: 'Alumni Meetup scheduled for next month',
    date: { day: '01', month: 'Oct' },
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=200&q=80',
  },
];

/* ================================================================== */
/*  HOME PAGE                                                          */
/* ================================================================== */

export default function HomePage() {
  const t = useTranslations('home');
  const tActions = useTranslations('actions');
  const locale = useLocale() as Locale;

  const featuredPrograms = PROGRAMS.filter((p) => Object.keys(PROGRAM_IMAGES).includes(p.id)).slice(
    0,
    4,
  );

  const featured = NEWS_ITEMS.find((n) => n.featured);
  const sideNews = NEWS_ITEMS.filter((n) => !n.featured);

  return (
    <div className="flex flex-col">
      {/* ═══════════════════ HERO — Bold Typography + Stats Grid ═══════════════════ */}
      <section className="bg-bg-light dark:bg-bg-dark relative overflow-hidden">
        {/* Background decorations — stronger in light mode */}
        <div className="mesh-gradient absolute inset-0" />
        <div className="bg-primary/[0.07] dark:bg-primary-light/[0.05] absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full blur-3xl" />
        <div className="bg-gold/[0.08] dark:bg-gold/[0.04] absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full blur-3xl" />
        {/* Decorative geometric shapes */}
        <div className="pointer-events-none absolute top-16 right-[10%] hidden lg:block">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            className="animate-float text-primary/[0.06] dark:text-primary-light/[0.08]"
          >
            <rect
              width="80"
              height="80"
              x="20"
              y="20"
              rx="16"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              width="50"
              height="50"
              x="35"
              y="35"
              rx="10"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="pointer-events-none absolute bottom-24 left-[5%] hidden lg:block">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            className="animate-float text-gold/[0.1] dark:text-gold/[0.08]"
            style={{ animationDelay: '3s' }}
          >
            <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="40" cy="40" r="16" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-20 lg:pb-28">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left: Bold Typography */}
            <div>
              <div className="border-primary/20 bg-primary/5 text-primary dark:border-primary-light/20 dark:bg-primary-light/5 dark:text-primary-light mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold">
                <span className="bg-gold h-2 w-2 animate-pulse rounded-full" />
                {t('heroBadge')}
              </div>

              <h1 className="font-display mb-6 text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                <span className="text-primary dark:text-primary-light">ZhezU</span>
                <span className="text-gold ml-1 inline-block h-3 w-3 rounded-full align-super sm:h-4 sm:w-4" />
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

            {/* Right: Stats Premium Cards */}
            <div className="relative">
              {/* Glow behind cards */}
              <div className="bg-primary/[0.03] dark:bg-primary-light/[0.04] absolute inset-0 -m-4 rounded-3xl blur-2xl" />
              <div className="relative grid grid-cols-2 gap-4">
                {[
                  {
                    value: '1370+',
                    label: t('stats.students'),
                    icon: Users,
                    color: 'text-primary dark:text-primary-light',
                    bg: 'bg-primary/8 dark:bg-primary-light/10',
                  },
                  {
                    value: '24+',
                    label: t('stats.programs'),
                    icon: BookOpen,
                    color: 'text-gold dark:text-gold-light',
                    bg: 'bg-gold/8 dark:bg-gold/10',
                  },
                  {
                    value: '87%',
                    label: t('stats.employment'),
                    icon: TrendingUp,
                    color: 'text-success',
                    bg: 'bg-success/8 dark:bg-success/10',
                  },
                  {
                    value: '65+',
                    label: t('stats.years'),
                    icon: Award,
                    color: 'text-purple-600 dark:text-purple-400',
                    bg: 'bg-purple-600/8 dark:bg-purple-400/10',
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="premium-card p-5 text-center shadow-[0_4px_24px_rgba(0,0,0,0.08)] sm:p-6 dark:shadow-none"
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
                  <div className="dark:bg-surface-dark/90 absolute top-4 left-4 min-w-[60px] rounded-lg bg-white/90 px-4 py-2 text-center backdrop-blur">
                    <span className="text-text-primary-light dark:text-text-primary-dark block text-xl leading-none font-bold">
                      {featured.date.day}
                    </span>
                    <span className="text-text-secondary-light dark:text-text-secondary-dark block text-xs font-medium uppercase">
                      {featured.date.month}
                    </span>
                  </div>
                </div>
                <div className="pr-4">
                  <div className="text-text-secondary-light dark:text-text-secondary-dark mb-2 flex items-center gap-3 text-sm">
                    <span className="text-gold font-semibold">{featured.category}</span>
                    <span>&middot;</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {featured.readTime}
                    </span>
                  </div>
                  <h3 className="text-text-primary-light dark:text-text-primary-dark group-hover:text-primary dark:group-hover:text-primary-light mb-3 text-2xl font-bold transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">
                    {featured.excerpt}
                  </p>
                </div>
              </div>
            )}

            {/* Side News List */}
            <div className="flex flex-col gap-6">
              {sideNews.map((item, i) => (
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
                      {item.category}
                    </span>
                    <h4 className="text-text-primary-light dark:text-text-primary-dark group-hover:text-primary dark:group-hover:text-primary-light mb-1 text-lg leading-tight font-bold transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1 text-xs">
                      <Calendar size={10} /> {item.date.month} {item.date.day}, 2025
                    </span>
                  </div>
                </div>
              ))}
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
