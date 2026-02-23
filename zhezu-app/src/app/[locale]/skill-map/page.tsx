'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Network, ArrowRight, BookOpen, Pickaxe, Scale, Zap, Cog, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SkillMap } from '@/components/talent/SkillMap';
import { SKILL_MAPS } from '@/lib/talent-data';
import { DEPARTMENTS } from '@/lib/constants';
import type { Locale } from '@/types';

const DEPT_ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Pickaxe,
  Scale,
  Zap,
  Cog,
};

export default function SkillMapPage() {
  const t = useTranslations('skillMap');
  const locale = useLocale() as Locale;

  const [activeDept, setActiveDept] = useState<string>(DEPARTMENTS[0].id);
  const activeData = SKILL_MAPS[activeDept];
  const activeDeptObj = DEPARTMENTS.find((d) => d.id === activeDept)!;

  return (
    <div className="bg-bg-light dark:bg-bg-dark relative min-h-screen overflow-hidden">
      {/* ── Ambient background ── */}
      <div className="mesh-gradient pointer-events-none fixed inset-0" />
      <div className="bg-primary/[0.04] pointer-events-none fixed top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full blur-[150px]" />
      <div className="bg-gold/[0.03] pointer-events-none fixed right-[-5%] bottom-[-15%] h-[600px] w-[600px] rounded-full blur-[150px]" />
      <div className="pointer-events-none fixed top-[40%] left-[60%] h-[350px] w-[350px] rounded-full bg-[#8B5CF6]/[0.03] blur-[150px]" />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-50 dark:opacity-100"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            {/* Badge */}
            <div className="bg-primary/8 border-primary/20 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5">
              <Network size={14} className="text-primary dark:text-primary-light" />
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

          {/* ── Department selection cards ── */}
          <div className="mx-auto mb-14 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {DEPARTMENTS.map((dept) => {
              const isActive = dept.id === activeDept;
              const Icon = DEPT_ICONS[dept.icon] || BookOpen;

              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveDept(dept.id)}
                  className={`group/card relative flex cursor-pointer flex-col items-center gap-2.5 rounded-2xl border p-4 transition-all duration-300 ${
                    isActive
                      ? 'border-opacity-40 bg-gradient-to-b shadow-lg'
                      : 'border-border-light dark:border-border-dark/50 bg-surface-light/50 dark:bg-surface-dark/30 hover:border-primary/30 dark:hover:border-border-dark hover:bg-surface-light dark:hover:bg-surface-dark/50'
                  }`}
                  style={
                    isActive
                      ? {
                          borderColor: `${dept.color}66`,
                          background: `linear-gradient(to bottom, ${dept.color}18, ${dept.color}08)`,
                          boxShadow: `0 0 30px ${dept.color}18`,
                        }
                      : undefined
                  }
                >
                  {/* Active glow */}
                  {isActive && (
                    <div
                      className="animate-pulse-glow pointer-events-none absolute inset-0 rounded-2xl"
                      style={{ backgroundColor: `${dept.color}08` }}
                    />
                  )}

                  <div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? ''
                        : 'bg-surface-hover-light dark:bg-surface-dark/60 group-hover/card:bg-surface-light dark:group-hover/card:bg-surface-dark/80'
                    }`}
                    style={isActive ? { backgroundColor: `${dept.color}20` } : undefined}
                  >
                    <Icon
                      size={20}
                      style={{ color: isActive ? dept.color : undefined }}
                      className={
                        isActive
                          ? ''
                          : 'text-text-secondary-light dark:text-text-secondary-dark transition-colors duration-300'
                      }
                    />
                  </div>

                  <span
                    className={`text-center text-xs leading-tight font-bold tracking-wide ${
                      isActive
                        ? 'text-text-primary-light dark:text-white'
                        : 'text-text-secondary-light dark:text-text-secondary-dark group-hover/card:text-text-primary-light dark:group-hover/card:text-white/80'
                    } transition-colors duration-300`}
                  >
                    {dept.shortName[locale]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Skill Map Visualization ── */}
      <section className="relative mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="premium-card p-5 md:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="font-display text-text-primary-light flex items-center gap-3 text-lg font-bold dark:text-white">
              <div
                className="h-6 w-1 rounded-full"
                style={{
                  background: `linear-gradient(to bottom, ${activeDeptObj.color}, ${activeDeptObj.color}30)`,
                }}
              />
              {activeDeptObj.shortName[locale]} — {t('mapTitleSuffix')}
            </h2>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
              {[
                { color: '#3B82F6', key: 'legendUNT' },
                { color: '#22C55E', key: 'legendHard' },
                { color: '#8B5CF6', key: 'legendSoft' },
                { color: '#F59E0B', key: 'legendCareer' },
              ].map((item) => (
                <span
                  key={item.key}
                  className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-2"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 0 8px ${item.color}40`,
                    }}
                  />
                  <span className="font-medium">{t(item.key)}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="relative">
            {/* Subtle inner glow at center */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div
                className="h-40 w-40 rounded-full blur-[60px]"
                style={{ backgroundColor: `${activeDeptObj.color}08` }}
              />
            </div>
            {activeData && (
              <SkillMap key={activeDept} nodes={activeData.nodes} edges={activeData.edges} />
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="premium-card overflow-hidden p-10 text-center md:p-14">
          {/* Background accent */}
          <div className="from-primary/[0.06] to-gold/[0.06] pointer-events-none absolute inset-0 bg-gradient-to-r via-transparent" />
          <div className="via-gold/30 absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2">
              <Sparkles size={16} className="text-gold-dark dark:text-gold" />
              <span className="text-gold-dark dark:text-gold text-[10px] font-semibold tracking-widest uppercase">
                ZhezU Talent
              </span>
            </div>

            <h3 className="font-display text-text-primary-light mb-3 text-2xl font-bold md:text-3xl dark:text-white">
              {t('ctaTitle')}
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-8 max-w-lg text-sm leading-relaxed">
              {t('ctaDesc')}
            </p>

            <Link
              href="/talent-pool"
              className="btn-premium from-gold to-gold-light dark:text-bg-dark inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r px-8 py-3.5 text-sm font-bold tracking-wide text-white"
            >
              {t('ctaButton')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
