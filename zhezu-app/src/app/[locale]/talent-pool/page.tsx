'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import {
  Gamepad2,
  Trophy,
  Target,
  Star,
  Zap,
  ChevronRight,
  Sparkles,
  Medal,
  Flame,
  Users,
  BookOpen,
  FileCheck,
  ClipboardList,
  MessageCircle,
  Crown,
  TrendingUp,
  GraduationCap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Locale } from '@/types';
import {
  APPLICANTS,
  QUESTS,
  BADGES,
  LEVELS,
  getLevelInfo,
  getXpProgress,
} from '@/lib/talapker-data';
import { DEPARTMENTS } from '@/lib/constants';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  documents: FileCheck,
  tests: ClipboardList,
  explore: BookOpen,
  social: MessageCircle,
  special: Star,
};

const CATEGORY_COLORS: Record<string, string> = {
  documents: '#3B82F6',
  tests: '#F59E0B',
  explore: '#22C55E',
  social: '#8B5CF6',
  special: '#E6B325',
};

export default function TalapkerPage() {
  const t = useTranslations('talapker');
  const locale = useLocale() as Locale;

  // Sort applicants by XP for leaderboard
  const leaderboard = [...APPLICANTS].sort((a, b) => b.xp - a.xp).slice(0, 5);

  // Get quest categories
  const questCategories = ['documents', 'tests', 'explore', 'social'] as const;

  // Featured quests (show some required + popular)
  const featuredQuests = QUESTS.filter((q) => q.required || q.difficulty === 'easy').slice(0, 6);

  // Recent badges
  const featuredBadges = BADGES.filter((b) => b.rarity === 'rare' || b.rarity === 'epic').slice(
    0,
    4,
  );

  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen">
      {/* ═══════ Hero Section ═══════ */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Mesh background */}
        <div className="mesh-gradient absolute inset-0" />

        {/* Floating orbs */}
        <div className="bg-primary/4 pointer-events-none absolute top-[-10%] left-[15%] h-[500px] w-[500px] rounded-full blur-[120px]" />
        <div className="bg-gold/3 pointer-events-none absolute right-[10%] bottom-[-20%] h-[400px] w-[400px] rounded-full blur-[100px]" />
        <div className="pointer-events-none absolute top-[30%] right-[25%] h-[200px] w-[200px] rounded-full bg-[#22C55E]/4 blur-[80px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="bg-gold/8 border-gold/20 mb-8 inline-flex items-center gap-2 rounded-full border px-5 py-2 backdrop-blur-sm">
              <Gamepad2 size={16} className="text-gold-dark dark:text-gold" />
              <span className="text-gold-dark dark:text-gold text-xs font-semibold tracking-widest uppercase">
                {t('badge')}
              </span>
            </div>

            <h1 className="font-display text-gradient mb-5 text-5xl leading-[1.1] font-bold tracking-tight md:text-6xl lg:text-7xl">
              {t('title')}
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-lg leading-relaxed md:text-xl">
              {t('subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/admission"
                className="btn-premium from-gold to-gold-light dark:text-bg-dark inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r px-8 py-4 text-sm font-bold tracking-wide text-white"
              >
                <Zap size={18} />
                {t('startJourney')}
              </Link>
              <Link
                href="/skill-map"
                className="border-border-light dark:border-border-dark text-text-primary-light hover:border-primary/50 dark:hover:border-primary/50 hover:bg-primary/5 inline-flex items-center gap-2.5 rounded-xl border-2 px-8 py-4 text-sm font-semibold transition-all dark:text-white"
              >
                <Target size={18} />
                {t('exploreSkills')}
              </Link>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                icon: Users,
                value: `${APPLICANTS.length * 100}+`,
                label: t('statsApplicants'),
                color: '#3B82F6',
              },
              {
                icon: Trophy,
                value: `${BADGES.length}`,
                label: t('statsBadges'),
                color: '#E6B325',
              },
              {
                icon: Target,
                value: `${QUESTS.length}`,
                label: t('statsQuests'),
                color: '#22C55E',
              },
              { icon: GraduationCap, value: '22', label: t('statsPrograms'), color: '#8B5CF6' },
            ].map((stat) => (
              <div key={stat.label} className="premium-card flex flex-col items-center gap-2 p-5">
                <div
                  className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon size={20} style={{ color: stat.color }} />
                </div>
                <span className="font-display text-text-primary-light text-3xl font-bold tracking-tight dark:text-white">
                  {stat.value}
                </span>
                <span className="text-text-secondary-light dark:text-text-secondary-dark text-[11px] font-medium tracking-wider uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Quest Categories ═══════ */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-display text-text-primary-light flex items-center gap-3 text-2xl font-bold dark:text-white">
            <Target size={24} className="text-primary dark:text-primary-light" />
            {t('questsTitle')}
          </h2>
        </div>

        {/* Category pills */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {questCategories.map((category) => {
            const Icon = CATEGORY_ICONS[category];
            const color = CATEGORY_COLORS[category];
            const questCount = QUESTS.filter((q) => q.category === category).length;

            return (
              <div key={category} className="premium-card group cursor-pointer p-5">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon size={24} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="text-text-primary-light text-sm font-bold dark:text-white">
                      {t(`category.${category}`)}
                    </h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                      {questCount} {t('questsCount')}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Quests Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredQuests.map((quest) => {
            const color = CATEGORY_COLORS[quest.category];

            return (
              <div
                key={quest.id}
                className="premium-card group hover:premium-card-gold cursor-pointer p-5"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Zap size={20} style={{ color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h4 className="text-text-primary-light truncate text-sm font-bold dark:text-white">
                        {quest.title[locale]}
                      </h4>
                      {quest.required && (
                        <span className="bg-error/10 text-error rounded px-1.5 py-0.5 text-[9px] font-bold uppercase">
                          {t('required')}
                        </span>
                      )}
                    </div>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-3 line-clamp-2 text-xs">
                      {quest.description[locale]}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gold-dark dark:text-gold flex items-center gap-1.5 text-xs font-bold">
                        <Sparkles size={12} />+{quest.xpReward} XP
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
                        style={{
                          backgroundColor: `${color}15`,
                          color,
                        }}
                      >
                        {t(`difficulty.${quest.difficulty}`)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════ Leaderboard + Badges ═══════ */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <div className="premium-card p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-text-primary-light flex items-center gap-3 text-lg font-bold dark:text-white">
                  <div className="from-gold-light to-gold h-6 w-1 rounded-full bg-gradient-to-b" />
                  {t('leaderboardTitle')}
                </h2>
                <Flame size={20} className="text-gold-dark dark:text-gold" />
              </div>

              <div className="space-y-3">
                {leaderboard.map((applicant, idx) => {
                  const level = getLevelInfo(applicant.xp);
                  const dept = DEPARTMENTS.find((d) => d.id === applicant.targetDepartment);

                  return (
                    <Link
                      key={applicant.id}
                      href={`/talent-pool/${applicant.id}`}
                      className="hover:bg-surface-hover-light dark:hover:bg-surface-elevated-dark/30 group flex items-center gap-4 rounded-xl p-3 transition-all"
                    >
                      {/* Rank */}
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
                          idx === 0
                            ? 'bg-gold/15 text-gold-dark dark:text-gold'
                            : idx === 1
                              ? 'bg-[#C0C0C0]/15 text-[#71717A]'
                              : idx === 2
                                ? 'bg-[#CD7F32]/15 text-[#CD7F32]'
                                : 'bg-surface-hover-light dark:bg-surface-dark/50 text-text-secondary-light dark:text-text-secondary-dark'
                        }`}
                      >
                        {idx === 0 ? <Crown size={16} /> : idx + 1}
                      </div>

                      {/* Photo */}
                      <div className="ring-border-light dark:ring-border-dark/30 relative h-11 w-11 overflow-hidden rounded-full ring-2">
                        <Image
                          src={applicant.photo}
                          alt={applicant.name}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <p className="text-text-primary-light group-hover:text-gold-dark dark:group-hover:text-gold truncate text-sm font-semibold transition-colors dark:text-white">
                          {applicant.name}
                        </p>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                          {dept?.shortName[locale]} · {applicant.city}
                        </p>
                      </div>

                      {/* Level & XP */}
                      <div className="text-right">
                        <div className="mb-0.5 flex items-center justify-end gap-1.5">
                          <span
                            className="rounded px-2 py-0.5 text-[10px] font-bold"
                            style={{ backgroundColor: `${level.color}20`, color: level.color }}
                          >
                            LVL {applicant.level}
                          </span>
                        </div>
                        <p className="text-gold-dark dark:text-gold text-xs font-bold tabular-nums">
                          {applicant.xp.toLocaleString()} XP
                        </p>
                      </div>

                      <ChevronRight
                        size={16}
                        className="text-text-secondary-light/40 dark:text-text-secondary-dark/40"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Badges showcase */}
          <div className="space-y-6">
            <div className="premium-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-text-primary-light flex items-center gap-3 text-lg font-bold dark:text-white">
                  <Medal size={18} className="text-primary dark:text-primary-light" />
                  {t('badgesTitle')}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {featuredBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-surface-light dark:bg-surface-elevated-dark/30 border-border-light dark:border-border-dark/25 group hover:border-opacity-50 cursor-pointer rounded-xl border p-4 text-center transition-all"
                  >
                    <div
                      className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${badge.color}15` }}
                    >
                      <Trophy size={24} style={{ color: badge.color }} />
                    </div>
                    <p className="text-text-primary-light truncate text-xs font-bold dark:text-white">
                      {badge.title[locale]}
                    </p>
                    <p
                      className="mt-1 text-[10px] font-semibold uppercase"
                      style={{ color: badge.color }}
                    >
                      {t(`rarity.${badge.rarity}`)}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-4 text-center text-xs">
                {t('totalBadges', { count: BADGES.length })}
              </p>
            </div>

            {/* Levels preview */}
            <div className="premium-card p-6">
              <h3 className="text-text-primary-light mb-4 flex items-center gap-2 text-sm font-bold dark:text-white">
                <TrendingUp size={16} className="text-success" />
                {t('levelsTitle')}
              </h3>

              <div className="space-y-2">
                {LEVELS.slice(0, 5).map((level) => (
                  <div key={level.level} className="flex items-center gap-3">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold"
                      style={{ backgroundColor: `${level.color}15`, color: level.color }}
                    >
                      {level.level}
                    </div>
                    <span className="text-text-secondary-light dark:text-text-secondary-dark flex-1 text-xs">
                      {level.title[locale]}
                    </span>
                    <span className="text-text-secondary-light/50 dark:text-text-secondary-dark/50 font-mono text-[10px]">
                      {level.minXp}+ XP
                    </span>
                  </div>
                ))}
                <p className="text-text-secondary-light/50 dark:text-text-secondary-dark/50 pt-2 text-center text-[10px]">
                  +{LEVELS.length - 5} {t('moreLevels')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA Section ═══════ */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="premium-card overflow-hidden p-10 text-center md:p-14">
          <div className="from-primary/[0.06] to-gold/[0.06] pointer-events-none absolute inset-0 bg-gradient-to-r via-transparent" />
          <div className="via-gold/30 absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2">
              <Sparkles size={16} className="text-gold-dark dark:text-gold" />
              <span className="text-gold-dark dark:text-gold text-[10px] font-semibold tracking-widest uppercase">
                {t('ctaBadge')}
              </span>
            </div>

            <h3 className="font-display text-text-primary-light mb-3 text-2xl font-bold md:text-3xl dark:text-white">
              {t('ctaTitle')}
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-8 max-w-lg text-sm leading-relaxed">
              {t('ctaDesc')}
            </p>

            <Link
              href="/admission"
              className="btn-premium from-gold to-gold-light dark:text-bg-dark inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r px-8 py-3.5 text-sm font-bold tracking-wide text-white"
            >
              {t('ctaButton')}
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
