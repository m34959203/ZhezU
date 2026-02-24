'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { UNIVERSITY, PROGRAMS, DEPARTMENTS } from '@/lib/constants';
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
  Eye,
  Calendar,
  Clock,
} from 'lucide-react';
import type { Locale } from '@/types';

const PROGRAM_IMAGES: Record<string, string> = {
  'informatics-teacher': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
  mining: 'https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=600&q=80',
  'foreign-languages': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80',
  law: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
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

export default function HomePage() {
  const t = useTranslations('home');
  const tActions = useTranslations('actions');
  const locale = 'ru' as Locale;

  const featuredPrograms = PROGRAMS.filter((p) => Object.keys(PROGRAM_IMAGES).includes(p.id)).slice(
    0,
    4,
  );

  const featured = NEWS_ITEMS.find((n) => n.featured);
  const sideNews = NEWS_ITEMS.filter((n) => !n.featured);

  return (
    <div className="flex flex-col">
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative flex h-[600px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#1d56c9]/90 to-blue-900/80 mix-blend-multiply" />
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80')",
            }}
          />
        </div>
        <div className="from-bg-light dark:from-bg-dark absolute bottom-0 left-0 z-20 h-24 w-full bg-gradient-to-t to-transparent" />

        <div className="relative z-20 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <span className="bg-gold h-2 w-2 animate-pulse rounded-full" />
            {t('heroBadge')}
          </div>

          <h1 className="font-display mb-4 text-4xl leading-tight font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            ZhezU / {t('hero.title')}
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-xl font-light text-gray-200 md:text-2xl">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission">
              <Button
                variant="secondary"
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                className="shadow-gold/20 shadow-xl transition-all hover:-translate-y-1"
              >
                {t('hero.cta')}
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="!border-2 !border-white !text-white hover:!bg-white/10"
              icon={<Eye size={18} />}
            >
              {t('hero.virtualTour')}
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════ STATS BAR ═══════════════════ */}
      <section className="relative z-30 -mt-16 mb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark grid grid-cols-2 gap-4 rounded-2xl border p-6 shadow-xl shadow-gray-200/50 md:grid-cols-4 md:gap-6 md:p-10 dark:shadow-black/30">
            {[
              {
                value: `${UNIVERSITY.stats.students.toLocaleString()}+`,
                label: t('stats.students'),
                icon: Users,
              },
              {
                value: `${UNIVERSITY.stats.programs + UNIVERSITY.stats.masterPrograms}+`,
                label: t('stats.programs'),
                icon: BookOpen,
              },
              {
                value: `${UNIVERSITY.stats.employmentRate}%`,
                label: t('stats.employment'),
                icon: TrendingUp,
              },
              {
                value: `${UNIVERSITY.stats.yearsOfExperience}+`,
                label: t('stats.years'),
                icon: Award,
              },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                className={`p-2 text-center ${idx > 0 ? 'border-border-light dark:border-border-dark border-l' : ''}`}
              >
                <stat.icon
                  size={20}
                  className="text-primary dark:text-primary-light mx-auto mb-2"
                />
                <p className="font-display text-primary dark:text-primary-light mb-2 text-4xl font-bold md:text-5xl">
                  {stat.value}
                </p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ WHY CHOOSE ZHEZU ═══════════════════ */}
      <section className="bg-surface-light dark:bg-surface-dark py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display text-text-primary-light dark:text-text-primary-dark mb-4 text-3xl font-bold md:text-4xl">
              {t('features.title')}
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto max-w-2xl">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Brain,
                title: t('features.ai'),
                desc: t('features.aiDesc'),
                iconBg: 'bg-blue-50 dark:bg-blue-900/20',
                iconColor: 'text-primary dark:text-primary-light',
              },
              {
                icon: GraduationCap,
                title: t('features.faculty'),
                desc: t('features.facultyDesc'),
                iconBg: 'bg-yellow-50 dark:bg-yellow-900/20',
                iconColor: 'text-gold dark:text-gold-light',
              },
              {
                icon: Briefcase,
                title: t('features.career'),
                desc: t('features.careerDesc'),
                iconBg: 'bg-green-50 dark:bg-green-900/20',
                iconColor: 'text-green-600 dark:text-green-400',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group bg-bg-light hover:border-border-light hover:bg-surface-light hover:shadow-primary/5 dark:bg-bg-dark dark:hover:border-border-dark dark:hover:bg-surface-dark dark:hover:shadow-primary-light/5 rounded-2xl border border-transparent p-8 transition-all duration-300 hover:shadow-xl"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${feature.iconBg} transition-transform group-hover:scale-110`}
                >
                  <feature.icon size={28} className={feature.iconColor} />
                </div>
                <h3 className="text-text-primary-light dark:text-text-primary-dark mb-3 text-xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ POPULAR PROGRAMS — image overlay cards ═══════════════════ */}
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
                      <Calendar size={10} /> {item.date.month} {item.date.day}, 2023
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

      {/* ═══════════════════ AUDIENCE QUICK LINKS ═══════════════════ */}
      <section className="bg-primary dark:bg-primary-dark py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { label: t('audience.applicants'), href: '/admission' },
              { label: t('audience.students'), href: '/academics' },
              { label: t('audience.staff'), href: '/contact' },
              { label: t('audience.alumni'), href: '/life/news' },
              { label: t('audience.partners'), href: '/contact' },
            ].map((link, i) => (
              <span key={link.label} className="flex items-center gap-4 md:gap-8">
                {i > 0 && <span className="hidden text-white/30 md:inline">|</span>}
                <Link
                  href={link.href}
                  className="hover:border-gold border-b-2 border-transparent pb-1 text-lg font-medium text-white/80 transition-all hover:text-white"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="bg-bg-light dark:bg-bg-dark py-16 lg:py-24">
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
