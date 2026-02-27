'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import {
  ChevronRight,
  MapPin,
  School,
  Calendar,
  Target,
  Star,
  CheckCircle2,
  Circle,
  Sparkles,
  Crown,
  Medal,
  TrendingUp,
  GraduationCap,
  FileCheck,
  ClipboardList,
  BookOpen,
  MessageCircle,
  Mail,
  Award,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Applicant, Locale } from '@/types';
import {
  APPLICANTS,
  QUESTS,
  BADGES,
  LEVELS,
  getLevelInfo,
  getXpProgress,
  getRequiredQuestsCompleted,
} from '@/lib/talapker-data';
import { PROGRAMS, DEPARTMENTS } from '@/lib/constants';

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

const RARITY_COLORS: Record<string, string> = {
  common: '#22C55E',
  rare: '#3B82F6',
  epic: '#8B5CF6',
  legendary: '#E6B325',
};

interface Props {
  applicant: Applicant;
}

export function ApplicantProfileView({ applicant }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations('talapker');
  const tNav = useTranslations('nav');

  const level = getLevelInfo(applicant.xp);
  const nextLevel = LEVELS.find((l) => l.level === level.level + 1);
  const xpProgress = getXpProgress(applicant.xp);
  const requiredProgress = getRequiredQuestsCompleted(applicant);
  const program = PROGRAMS.find((p) => p.code === applicant.targetProgram);
  const department = DEPARTMENTS.find((d) => d.id === applicant.targetDepartment);

  // Get completed and pending quests
  const completedQuests = QUESTS.filter((q) => applicant.completedQuests.includes(q.id));
  const pendingQuests = QUESTS.filter((q) => !applicant.completedQuests.includes(q.id));
  const requiredPendingQuests = pendingQuests.filter((q) => q.required);

  // Get earned badges
  const earnedBadges = BADGES.filter((b) => applicant.earnedBadges.includes(b.id));
  const lockedBadges = BADGES.filter((b) => !applicant.earnedBadges.includes(b.id)).slice(0, 4);

  // Similar applicants
  const similarApplicants = APPLICANTS.filter(
    (a) => a.id !== applicant.id && a.targetDepartment === applicant.targetDepartment,
  ).slice(0, 3);

  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="bg-primary/[0.03] absolute top-0 left-[20%] h-[600px] w-[600px] rounded-full blur-[150px]" />
        <div className="bg-gold/[0.02] absolute right-[10%] bottom-[20%] h-[400px] w-[400px] rounded-full blur-[120px]" />
        <div className="absolute top-[50%] left-[50%] h-[350px] w-[350px] rounded-full bg-[#8B5CF6]/[0.02] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-text-secondary-light dark:text-text-secondary-dark mb-8 flex flex-wrap items-center gap-2 text-sm">
          <Link href="/" className="hover:text-primary transition-colors dark:hover:text-white">
            {tNav('home')}
          </Link>
          <ChevronRight
            size={14}
            className="text-text-secondary-light/40 dark:text-text-secondary-dark/40"
          />
          <Link
            href="/talent-pool"
            className="hover:text-primary transition-colors dark:hover:text-white"
          >
            {t('title')}
          </Link>
          <ChevronRight
            size={14}
            className="text-text-secondary-light/40 dark:text-text-secondary-dark/40"
          />
          <span className="text-gold-dark dark:text-gold font-medium">{applicant.name}</span>
        </nav>

        {/* Profile Header */}
        <div className="premium-card mb-6 p-7 md:p-10">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
            {/* Photo with level badge */}
            <div className="relative shrink-0">
              <div
                className="ring-offset-bg-light h-32 w-32 overflow-hidden rounded-full ring-4 ring-offset-4 md:h-36 md:w-36 dark:ring-offset-[#0B1121]"
                style={{ borderColor: `${level.color}50` }}
              >
                <Image
                  src={applicant.photo}
                  alt={applicant.name}
                  width={144}
                  height={144}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Level badge */}
              <div
                className="absolute -right-1 -bottom-1 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${level.color}, ${level.color}cc)`,
                  boxShadow: `0 4px 20px ${level.color}40`,
                }}
              >
                {applicant.level}
              </div>
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1 text-center md:text-left">
              <div className="mb-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <h1 className="font-display text-text-primary-light text-3xl font-bold tracking-tight md:text-4xl dark:text-white">
                  {applicant.name}
                </h1>
                <span
                  className="rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase"
                  style={{
                    backgroundColor: `${level.color}15`,
                    borderColor: `${level.color}30`,
                    color: level.color,
                  }}
                >
                  {level.title[locale]}
                </span>
              </div>

              {program && (
                <p className="text-primary dark:text-primary-light text-lg font-semibold">
                  {t('targetProgram')}: {program.name[locale]}
                </p>
              )}

              <div className="text-text-secondary-light dark:text-text-secondary-dark mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm md:justify-start">
                <span className="flex items-center gap-1.5">
                  <School
                    size={14}
                    className="text-text-secondary-light/60 dark:text-text-secondary-dark/60"
                  />
                  {applicant.school}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin
                    size={14}
                    className="text-text-secondary-light/60 dark:text-text-secondary-dark/60"
                  />
                  {applicant.city}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar
                    size={14}
                    className="text-text-secondary-light/60 dark:text-text-secondary-dark/60"
                  />
                  {t('graduationYear')}: {applicant.graduationYear}
                </span>
              </div>

              {/* XP Progress Bar */}
              <div className="mx-auto mt-5 max-w-md md:mx-0">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-semibold">
                    {applicant.xp.toLocaleString()} XP
                  </span>
                  {nextLevel && (
                    <span className="text-text-secondary-light/60 dark:text-text-secondary-dark/60 text-xs">
                      {t('nextLevel')}: {nextLevel.title[locale]} ({nextLevel.minXp} XP)
                    </span>
                  )}
                </div>
                <div className="bg-border-light dark:bg-surface-dark/80 relative h-3 overflow-hidden rounded-full">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                    style={{
                      width: `${xpProgress.percentage}%`,
                      background: `linear-gradient(90deg, ${level.color}cc, ${level.color})`,
                      boxShadow: `0 0 12px ${level.color}40`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            {
              value: `${applicant.level}`,
              label: t('levelLabel'),
              color: level.color,
              icon: TrendingUp,
            },
            { value: `${applicant.xp}`, label: 'XP', color: '#E6B325', icon: Sparkles },
            {
              value: applicant.untScore ? `${applicant.untScore}` : '—',
              label: t('untScore'),
              color: '#3B82F6',
              icon: Target,
            },
            {
              value: `${completedQuests.length}/${QUESTS.length}`,
              label: t('questsCompleted'),
              color: '#22C55E',
              icon: CheckCircle2,
            },
          ].map((stat) => (
            <div key={stat.label} className="premium-card p-5 text-center">
              <div
                className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <p className="font-display text-text-primary-light mb-1 text-2xl font-bold tabular-nums md:text-3xl dark:text-white">
                {stat.value}
              </p>
              <p
                className="text-[10px] font-bold tracking-[0.15em] uppercase"
                style={{ color: stat.color }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Required Quests Progress */}
            {requiredPendingQuests.length > 0 && (
              <div className="premium-card premium-card-gold p-7">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-display text-text-primary-light flex items-center gap-3 text-lg font-bold dark:text-white">
                    <div className="from-error to-error/60 h-6 w-1 rounded-full bg-gradient-to-b" />
                    {t('requiredQuests')}
                  </h2>
                  <span className="text-gold-dark dark:text-gold text-sm font-bold">
                    {requiredProgress.completed}/{requiredProgress.total}
                  </span>
                </div>

                <div className="space-y-3">
                  {requiredPendingQuests.map((quest) => {
                    const color = CATEGORY_COLORS[quest.category];
                    const Icon = CATEGORY_ICONS[quest.category];

                    return (
                      <div
                        key={quest.id}
                        className="bg-surface-light dark:bg-surface-elevated-dark/30 border-error/20 flex items-center gap-4 rounded-xl border p-4"
                      >
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${color}15` }}
                        >
                          <Icon size={18} style={{ color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-text-primary-light text-sm font-semibold dark:text-white">
                            {quest.title[locale]}
                          </p>
                          <p className="text-text-secondary-light dark:text-text-secondary-dark line-clamp-1 text-xs">
                            {quest.description[locale]}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-error/10 text-error rounded px-1.5 py-0.5 text-[9px] font-bold uppercase">
                            {t('required')}
                          </span>
                          <span className="text-gold-dark dark:text-gold text-xs font-bold">
                            +{quest.xpReward} XP
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Completed Quests */}
            <div className="premium-card p-7">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-text-primary-light flex items-center gap-3 text-lg font-bold dark:text-white">
                  <div className="from-success to-success/60 h-6 w-1 rounded-full bg-gradient-to-b" />
                  {t('completedQuests')}
                </h2>
                <span className="text-success text-sm font-bold">{completedQuests.length}</span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {completedQuests.map((quest) => {
                  const color = CATEGORY_COLORS[quest.category];
                  const Icon = CATEGORY_ICONS[quest.category];

                  return (
                    <div
                      key={quest.id}
                      className="bg-success/5 border-success/15 flex items-center gap-3 rounded-xl border p-3"
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <Icon size={16} style={{ color }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-text-primary-light truncate text-sm font-medium dark:text-white">
                          {quest.title[locale]}
                        </p>
                        <p className="text-success text-[10px] font-semibold">
                          +{quest.xpReward} XP
                        </p>
                      </div>
                      <CheckCircle2 size={16} className="text-success shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pending Quests */}
            {pendingQuests.filter((q) => !q.required).length > 0 && (
              <div className="premium-card p-7">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-display text-text-primary-light flex items-center gap-3 text-lg font-bold dark:text-white">
                    <div className="from-primary-light to-primary h-6 w-1 rounded-full bg-gradient-to-b" />
                    {t('availableQuests')}
                  </h2>
                  <span className="text-primary dark:text-primary-light text-sm font-bold">
                    {pendingQuests.filter((q) => !q.required).length}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {pendingQuests
                    .filter((q) => !q.required)
                    .slice(0, 6)
                    .map((quest) => {
                      const color = CATEGORY_COLORS[quest.category];
                      const Icon = CATEGORY_ICONS[quest.category];

                      return (
                        <div
                          key={quest.id}
                          className="bg-surface-light dark:bg-surface-elevated-dark/30 border-border-light dark:border-border-dark/25 flex items-center gap-3 rounded-xl border p-3"
                        >
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${color}15` }}
                          >
                            <Icon size={16} style={{ color }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-text-primary-light truncate text-sm font-medium dark:text-white">
                              {quest.title[locale]}
                            </p>
                            <p className="text-gold-dark dark:text-gold text-[10px] font-semibold">
                              +{quest.xpReward} XP
                            </p>
                          </div>
                          <Circle
                            size={16}
                            className="text-text-secondary-light/30 dark:text-text-secondary-dark/30 shrink-0"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Earned Badges */}
            <div className="premium-card p-7">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-text-primary-light flex items-center gap-3 text-lg font-bold dark:text-white">
                  <div className="from-gold-light to-gold h-6 w-1 rounded-full bg-gradient-to-b" />
                  {t('earnedBadges')}
                </h2>
                <span className="text-gold-dark dark:text-gold text-sm font-bold">
                  {earnedBadges.length}/{BADGES.length}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {earnedBadges.map((badge) => {
                  const rarityColor = RARITY_COLORS[badge.rarity];

                  return (
                    <div
                      key={badge.id}
                      className="bg-surface-light dark:bg-surface-elevated-dark/30 border-border-light dark:border-border-dark/25 rounded-xl border p-4 text-center"
                    >
                      <div
                        className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${badge.color}15` }}
                      >
                        <Award size={28} style={{ color: badge.color }} />
                      </div>
                      <p className="text-text-primary-light truncate text-xs font-bold dark:text-white">
                        {badge.title[locale]}
                      </p>
                      <p
                        className="mt-1 text-[10px] font-semibold uppercase"
                        style={{ color: rarityColor }}
                      >
                        {t(`rarity.${badge.rarity}`)}
                      </p>
                    </div>
                  );
                })}

                {/* Locked badges preview */}
                {lockedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-surface-light/50 dark:bg-surface-elevated-dark/10 border-border-light/50 dark:border-border-dark/15 rounded-xl border p-4 text-center opacity-50"
                  >
                    <div className="bg-border-light/50 dark:bg-surface-dark/30 mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl">
                      <Award
                        size={28}
                        className="text-text-secondary-light/30 dark:text-text-secondary-dark/30"
                      />
                    </div>
                    <p className="text-text-secondary-light/50 dark:text-text-secondary-dark/50 text-xs font-medium">
                      {t('locked')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Target Program Card */}
            {program && department && (
              <div className="premium-card p-7">
                <h2 className="font-display text-text-primary-light mb-5 flex items-center gap-3 text-lg font-bold dark:text-white">
                  <GraduationCap size={18} className="text-primary dark:text-primary-light" />
                  {t('targetProgram')}
                </h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-1 text-xs tracking-wider uppercase">
                      {t('program')}
                    </p>
                    <p className="text-text-primary-light font-semibold dark:text-white">
                      {program.name[locale]}
                    </p>
                    <span
                      className="mt-2 inline-flex rounded-lg px-2.5 py-1 font-mono text-xs font-bold"
                      style={{
                        backgroundColor: `${department.color}10`,
                        color: department.color,
                      }}
                    >
                      {program.code}
                    </span>
                  </div>

                  <div>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-1 text-xs tracking-wider uppercase">
                      {t('department')}
                    </p>
                    <p className="text-text-primary-light text-sm dark:text-white">
                      {department.name[locale]}
                    </p>
                  </div>

                  <Link
                    href="/academics"
                    className="border-border-light dark:border-border-dark/30 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary hover:border-primary/30 dark:hover:border-border-dark/60 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all dark:hover:text-white"
                  >
                    {t('viewPrograms')}
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            )}

            {/* Applicant Info */}
            <div className="premium-card p-7">
              <h2 className="font-display text-text-primary-light mb-5 flex items-center gap-3 text-lg font-bold dark:text-white">
                <Medal size={18} className="text-gold-dark dark:text-gold" />
                {t('applicantInfo')}
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail
                    size={16}
                    className="text-text-secondary-light/60 dark:text-text-secondary-dark/60"
                  />
                  <span className="text-text-primary-light text-sm dark:text-white">
                    {applicant.email}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin
                    size={16}
                    className="text-text-secondary-light/60 dark:text-text-secondary-dark/60"
                  />
                  <span className="text-text-primary-light text-sm dark:text-white">
                    {applicant.city}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <School
                    size={16}
                    className="text-text-secondary-light/60 dark:text-text-secondary-dark/60"
                  />
                  <span className="text-text-primary-light text-sm dark:text-white">
                    {applicant.school}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar
                    size={16}
                    className="text-text-secondary-light/60 dark:text-text-secondary-dark/60"
                  />
                  <span className="text-text-primary-light text-sm dark:text-white">
                    {t('registeredOn')}{' '}
                    {new Date(applicant.registrationDate).toLocaleDateString(locale)}
                  </span>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="premium-card p-7">
              <h2 className="font-display text-text-primary-light mb-5 flex items-center gap-3 text-lg font-bold dark:text-white">
                <TrendingUp size={18} className="text-success" />
                {t('levelProgress')}
              </h2>

              <div className="space-y-3">
                {LEVELS.slice(0, 6).map((lvl) => {
                  const isCurrentOrPast = applicant.level >= lvl.level;
                  const isCurrent = applicant.level === lvl.level;

                  return (
                    <div
                      key={lvl.level}
                      className={`flex items-center gap-3 rounded-lg p-2 ${isCurrent ? 'bg-surface-hover-light dark:bg-surface-elevated-dark/30' : ''}`}
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                          isCurrentOrPast ? '' : 'opacity-40'
                        }`}
                        style={{
                          backgroundColor: isCurrentOrPast ? `${lvl.color}15` : undefined,
                          color: isCurrentOrPast ? lvl.color : undefined,
                        }}
                      >
                        {isCurrent ? <Crown size={14} /> : lvl.level}
                      </div>
                      <span
                        className={`flex-1 text-xs ${isCurrentOrPast ? 'text-text-primary-light dark:text-white' : 'text-text-secondary-light/50 dark:text-text-secondary-dark/50'}`}
                      >
                        {lvl.title[locale]}
                      </span>
                      {isCurrentOrPast && <CheckCircle2 size={14} className="text-success" />}
                    </div>
                  );
                })}
                {LEVELS.length > 6 && (
                  <p className="text-text-secondary-light/50 dark:text-text-secondary-dark/50 pt-2 text-center text-[10px]">
                    +{LEVELS.length - 6} {t('moreLevels')}
                  </p>
                )}
              </div>
            </div>

            {/* Similar Applicants */}
            {similarApplicants.length > 0 && (
              <div className="premium-card p-7">
                <h2 className="font-display text-text-primary-light mb-5 flex items-center gap-3 text-lg font-bold dark:text-white">
                  <Sparkles size={16} className="text-gold-dark dark:text-gold" />
                  {t('similarApplicants')}
                </h2>

                <div className="space-y-3">
                  {similarApplicants.map((a) => {
                    const aLevel = getLevelInfo(a.xp);

                    return (
                      <Link
                        key={a.id}
                        href={`/talent-pool/${a.id}`}
                        className="hover:bg-surface-hover-light dark:hover:bg-surface-elevated-dark/30 group flex items-center gap-3.5 rounded-xl p-3 transition-all duration-200"
                      >
                        <div className="ring-border-light dark:ring-border-dark/30 relative h-11 w-11 overflow-hidden rounded-full ring-2">
                          <Image
                            src={a.photo}
                            alt={a.name}
                            fill
                            className="object-cover"
                            sizes="44px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-text-primary-light group-hover:text-gold-dark dark:group-hover:text-gold truncate text-sm font-semibold transition-colors dark:text-white">
                            {a.name}
                          </p>
                          <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                            {a.city}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                          <span
                            className="rounded px-2 py-0.5 text-[10px] font-bold"
                            style={{ backgroundColor: `${aLevel.color}20`, color: aLevel.color }}
                          >
                            LVL {a.level}
                          </span>
                          <ChevronRight
                            size={14}
                            className="text-text-secondary-light/30 dark:text-text-secondary-dark/30"
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <Link
                  href="/talent-pool"
                  className="border-border-light dark:border-border-dark/30 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary hover:border-primary/30 dark:hover:border-border-dark/60 mt-4 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all dark:hover:text-white"
                >
                  {t('viewAllApplicants')}
                  <ChevronRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
