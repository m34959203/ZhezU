'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Users, BookOpen, TrendingUp, Award } from 'lucide-react';
import type { ResolvedHomepageStat } from '@/lib/admin/types';

const FALLBACK_STATS = [
  { key: 'students', value: '1370+' },
  { key: 'programs', value: '24+' },
  { key: 'employment', value: '87%' },
  { key: 'years', value: '65+' },
];

const STAT_ICONS: Record<string, typeof Users> = {
  students: Users,
  programs: BookOpen,
  employment: TrendingUp,
  years: Award,
};

const STAT_STYLES: Record<string, { color: string; bg: string }> = {
  students: {
    color: 'text-primary dark:text-primary-light',
    bg: 'bg-primary/8 dark:bg-primary-light/10',
  },
  programs: {
    color: 'text-gold dark:text-gold-light',
    bg: 'bg-gold/8 dark:bg-gold/10',
  },
  employment: { color: 'text-success', bg: 'bg-success/8 dark:bg-success/10' },
  years: {
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-600/8 dark:bg-purple-400/10',
  },
};

interface HeroBlockProps {
  heroTitle: string;
  heroStats: ResolvedHomepageStat[];
  admissionOpen?: boolean;
}

export default function HeroBlock({ heroTitle, heroStats, admissionOpen = true }: HeroBlockProps) {
  const t = useTranslations('home');
  const stats = heroStats.length > 0 ? heroStats : FALLBACK_STATS;

  return (
    <section className="to-bg-light dark:from-bg-dark dark:via-bg-dark dark:to-bg-dark relative overflow-hidden bg-gradient-to-b from-[#eef2fa] via-[#f3f6fc]">
      <div className="mesh-gradient absolute inset-0" />
      <div className="bg-primary/[0.10] dark:bg-primary-light/[0.05] absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full blur-3xl" />
      <div className="bg-gold/[0.10] dark:bg-gold/[0.04] absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full blur-3xl" />
      <div className="from-primary/[0.04] dark:from-primary-light/[0.03] absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="relative">
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
              {admissionOpen && (
                <div className="border-primary/20 bg-primary/5 text-primary dark:border-primary-light/20 dark:bg-primary-light/5 dark:text-primary-light mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold">
                  <span className="bg-gold h-2 w-2 animate-pulse rounded-full" />
                  {t('heroBadge')}
                </div>
              )}

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

              {admissionOpen && (
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
              )}
            </div>
          </div>

          <div className="relative">
            <div className="bg-primary/[0.03] dark:bg-primary-light/[0.04] absolute inset-0 -m-4 rounded-3xl blur-2xl" />
            <div className="relative grid grid-cols-2 gap-4">
              {stats.map((s) => {
                const Icon = STAT_ICONS[s.key] || Users;
                const style = STAT_STYLES[s.key] || {
                  color: 'text-primary dark:text-primary-light',
                  bg: 'bg-primary/8 dark:bg-primary-light/10',
                };
                return (
                  <div
                    key={s.key}
                    className="dark:border-border-dark dark:bg-surface-dark/90 rounded-2xl border border-white/80 bg-white/90 p-5 text-center shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-6 dark:shadow-none"
                  >
                    <div
                      className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${style.bg}`}
                    >
                      <Icon size={22} className={style.color} />
                    </div>
                    <p className={`font-display mb-1 text-3xl font-bold sm:text-4xl ${style.color}`}>
                      {s.value}
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-[11px] font-medium tracking-wide uppercase">
                      {t(`stats.${s.key}`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
