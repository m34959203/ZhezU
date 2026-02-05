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

const CATEGORY_ICONS: Record<string, React.ComponentType<any>> = {
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
  const featuredBadges = BADGES.filter((b) => b.rarity === 'rare' || b.rarity === 'epic').slice(0, 4);

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* ═══════ Hero Section ═══════ */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Mesh background */}
        <div className="absolute inset-0 mesh-gradient" />

        {/* Floating orbs */}
        <div className="absolute top-[-10%] left-[15%] w-[500px] h-[500px] rounded-full bg-primary/4 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gold/3 blur-[100px] pointer-events-none" />
        <div className="absolute top-[30%] right-[25%] w-[200px] h-[200px] rounded-full bg-[#22C55E]/4 blur-[80px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/8 border border-gold/20 mb-8 backdrop-blur-sm">
              <Gamepad2 size={16} className="text-gold-dark dark:text-gold" />
              <span className="text-xs font-semibold text-gold-dark dark:text-gold uppercase tracking-widest">
                {t('badge')}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gradient mb-5 leading-[1.1] tracking-tight">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/admission"
                className="btn-premium inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-gold to-gold-light text-white dark:text-bg-dark font-bold text-sm tracking-wide"
              >
                <Zap size={18} />
                {t('startJourney')}
              </Link>
              <Link
                href="/skill-map"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border-2 border-border-light dark:border-border-dark text-text-primary-light dark:text-white font-semibold text-sm hover:border-primary/50 dark:hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <Target size={18} />
                {t('exploreSkills')}
              </Link>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {[
              { icon: Users, value: `${APPLICANTS.length * 100}+`, label: t('statsApplicants'), color: '#3B82F6' },
              { icon: Trophy, value: `${BADGES.length}`, label: t('statsBadges'), color: '#E6B325' },
              { icon: Target, value: `${QUESTS.length}`, label: t('statsQuests'), color: '#22C55E' },
              { icon: GraduationCap, value: '22', label: t('statsPrograms'), color: '#8B5CF6' },
            ].map((stat) => (
              <div key={stat.label} className="premium-card flex flex-col items-center gap-2 p-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-1"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon size={20} style={{ color: stat.color }} />
                </div>
                <span className="text-3xl font-display font-bold text-text-primary-light dark:text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[11px] text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Quest Categories ═══════ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold text-text-primary-light dark:text-white flex items-center gap-3">
            <Target size={24} className="text-primary dark:text-primary-light" />
            {t('questsTitle')}
          </h2>
        </div>

        {/* Category pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {questCategories.map((category) => {
            const Icon = CATEGORY_ICONS[category];
            const color = CATEGORY_COLORS[category];
            const questCount = QUESTS.filter((q) => q.category === category).length;

            return (
              <div
                key={category}
                className="premium-card p-5 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon size={24} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary-light dark:text-white text-sm">
                      {t(`category.${category}`)}
                    </h3>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      {questCount} {t('questsCount')}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Quests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredQuests.map((quest) => {
            const color = CATEGORY_COLORS[quest.category];

            return (
              <div key={quest.id} className="premium-card p-5 group hover:premium-card-gold cursor-pointer">
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Zap size={20} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-text-primary-light dark:text-white text-sm truncate">
                        {quest.title[locale]}
                      </h4>
                      {quest.required && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-error/10 text-error uppercase">
                          {t('required')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark line-clamp-2 mb-3">
                      {quest.description[locale]}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-gold-dark dark:text-gold">
                        <Sparkles size={12} />
                        +{quest.xpReward} XP
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase"
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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-gold-light to-gold" />
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
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-hover-light dark:hover:bg-surface-elevated-dark/30 transition-all group"
                    >
                      {/* Rank */}
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
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
                      <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-border-light dark:ring-border-dark/30">
                        <Image src={applicant.photo} alt={applicant.name} fill className="object-cover" sizes="44px" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-text-primary-light dark:text-white text-sm truncate group-hover:text-gold-dark dark:group-hover:text-gold transition-colors">
                          {applicant.name}
                        </p>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                          {dept?.shortName[locale]} · {applicant.city}
                        </p>
                      </div>

                      {/* Level & XP */}
                      <div className="text-right">
                        <div className="flex items-center gap-1.5 justify-end mb-0.5">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-bold"
                            style={{ backgroundColor: `${level.color}20`, color: level.color }}
                          >
                            LVL {applicant.level}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-gold-dark dark:text-gold tabular-nums">
                          {applicant.xp.toLocaleString()} XP
                        </p>
                      </div>

                      <ChevronRight size={16} className="text-text-secondary-light/40 dark:text-text-secondary-dark/40" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Badges showcase */}
          <div className="space-y-6">
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white flex items-center gap-3">
                  <Medal size={18} className="text-primary dark:text-primary-light" />
                  {t('badgesTitle')}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {featuredBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="p-4 rounded-xl bg-surface-light dark:bg-surface-elevated-dark/30 border border-border-light dark:border-border-dark/25 text-center group hover:border-opacity-50 transition-all cursor-pointer"
                  >
                    <div
                      className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${badge.color}15` }}
                    >
                      <Trophy size={24} style={{ color: badge.color }} />
                    </div>
                    <p className="text-xs font-bold text-text-primary-light dark:text-white truncate">
                      {badge.title[locale]}
                    </p>
                    <p
                      className="text-[10px] font-semibold uppercase mt-1"
                      style={{ color: badge.color }}
                    >
                      {t(`rarity.${badge.rarity}`)}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark text-center mt-4">
                {t('totalBadges', { count: BADGES.length })}
              </p>
            </div>

            {/* Levels preview */}
            <div className="premium-card p-6">
              <h3 className="text-sm font-bold text-text-primary-light dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-success" />
                {t('levelsTitle')}
              </h3>

              <div className="space-y-2">
                {LEVELS.slice(0, 5).map((level) => (
                  <div key={level.level} className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold"
                      style={{ backgroundColor: `${level.color}15`, color: level.color }}
                    >
                      {level.level}
                    </div>
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark flex-1">
                      {level.title[locale]}
                    </span>
                    <span className="text-[10px] font-mono text-text-secondary-light/50 dark:text-text-secondary-dark/50">
                      {level.minXp}+ XP
                    </span>
                  </div>
                ))}
                <p className="text-[10px] text-text-secondary-light/50 dark:text-text-secondary-dark/50 text-center pt-2">
                  +{LEVELS.length - 5} {t('moreLevels')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA Section ═══════ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="premium-card p-10 md:p-14 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.06] via-transparent to-gold/[0.06] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-gold-dark dark:text-gold" />
              <span className="text-[10px] font-semibold text-gold-dark dark:text-gold uppercase tracking-widest">
                {t('ctaBadge')}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary-light dark:text-white mb-3">
              {t('ctaTitle')}
            </h3>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-lg mx-auto leading-relaxed">
              {t('ctaDesc')}
            </p>

            <Link
              href="/admission"
              className="btn-premium inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-white dark:text-bg-dark font-bold text-sm tracking-wide"
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
