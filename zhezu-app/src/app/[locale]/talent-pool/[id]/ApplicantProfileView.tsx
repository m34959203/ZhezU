'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import {
  ChevronRight,
  MapPin,
  School,
  Calendar,
  Trophy,
  Target,
  Zap,
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
    (a) => a.id !== applicant.id && a.targetDepartment === applicant.targetDepartment
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[150px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gold/[0.02] blur-[120px]" />
        <div className="absolute top-[50%] left-[50%] w-[350px] h-[350px] rounded-full bg-[#8B5CF6]/[0.02] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark mb-8 flex-wrap">
          <Link href="/" className="hover:text-primary dark:hover:text-white transition-colors">
            {tNav('home')}
          </Link>
          <ChevronRight size={14} className="text-text-secondary-light/40 dark:text-text-secondary-dark/40" />
          <Link href="/talent-pool" className="hover:text-primary dark:hover:text-white transition-colors">
            {t('title')}
          </Link>
          <ChevronRight size={14} className="text-text-secondary-light/40 dark:text-text-secondary-dark/40" />
          <span className="text-gold-dark dark:text-gold font-medium">{applicant.name}</span>
        </nav>

        {/* Profile Header */}
        <div className="premium-card p-7 md:p-10 mb-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
            {/* Photo with level badge */}
            <div className="relative shrink-0">
              <div
                className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-offset-4 ring-offset-bg-light dark:ring-offset-[#0B1121]"
                style={{ borderColor: `${level.color}50` }}
              >
                <Image
                  src={applicant.photo}
                  alt={applicant.name}
                  width={144}
                  height={144}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Level badge */}
              <div
                className="absolute -bottom-1 -right-1 w-12 h-12 rounded-full flex items-center justify-center shadow-lg font-bold text-white text-lg"
                style={{
                  background: `linear-gradient(135deg, ${level.color}, ${level.color}cc)`,
                  boxShadow: `0 4px 20px ${level.color}40`,
                }}
              >
                {applicant.level}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary-light dark:text-white tracking-tight">
                  {applicant.name}
                </h1>
                <span
                  className="px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-[0.15em]"
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
                <p className="text-lg text-primary dark:text-primary-light font-semibold">
                  {t('targetProgram')}: {program.name[locale]}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 mt-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                <span className="flex items-center gap-1.5">
                  <School size={14} className="text-text-secondary-light/60 dark:text-text-secondary-dark/60" />
                  {applicant.school}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-text-secondary-light/60 dark:text-text-secondary-dark/60" />
                  {applicant.city}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-text-secondary-light/60 dark:text-text-secondary-dark/60" />
                  {t('graduationYear')}: {applicant.graduationYear}
                </span>
              </div>

              {/* XP Progress Bar */}
              <div className="mt-5 max-w-md mx-auto md:mx-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark">
                    {applicant.xp.toLocaleString()} XP
                  </span>
                  {nextLevel && (
                    <span className="text-xs text-text-secondary-light/60 dark:text-text-secondary-dark/60">
                      {t('nextLevel')}: {nextLevel.title[locale]} ({nextLevel.minXp} XP)
                    </span>
                  )}
                </div>
                <div className="relative h-3 rounded-full bg-border-light dark:bg-surface-dark/80 overflow-hidden">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { value: `${applicant.level}`, label: t('levelLabel'), color: level.color, icon: TrendingUp },
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
                className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <p className="text-2xl md:text-3xl font-display font-bold text-text-primary-light dark:text-white mb-1 tabular-nums">
                {stat.value}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: stat.color }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Required Quests Progress */}
            {requiredPendingQuests.length > 0 && (
              <div className="premium-card premium-card-gold p-7">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white flex items-center gap-3">
                    <div className="w-1 h-6 rounded-full bg-gradient-to-b from-error to-error/60" />
                    {t('requiredQuests')}
                  </h2>
                  <span className="text-sm font-bold text-gold-dark dark:text-gold">
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
                        className="flex items-center gap-4 p-4 rounded-xl bg-surface-light dark:bg-surface-elevated-dark/30 border border-error/20"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${color}15` }}
                        >
                          <Icon size={18} style={{ color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-text-primary-light dark:text-white text-sm">
                            {quest.title[locale]}
                          </p>
                          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark line-clamp-1">
                            {quest.description[locale]}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-error/10 text-error uppercase">
                            {t('required')}
                          </span>
                          <span className="text-xs font-bold text-gold-dark dark:text-gold">+{quest.xpReward} XP</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Completed Quests */}
            <div className="premium-card p-7">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-success to-success/60" />
                  {t('completedQuests')}
                </h2>
                <span className="text-sm font-bold text-success">{completedQuests.length}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {completedQuests.map((quest) => {
                  const color = CATEGORY_COLORS[quest.category];
                  const Icon = CATEGORY_ICONS[quest.category];

                  return (
                    <div
                      key={quest.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-success/5 border border-success/15"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <Icon size={16} style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-text-primary-light dark:text-white text-sm truncate">
                          {quest.title[locale]}
                        </p>
                        <p className="text-[10px] text-success font-semibold">+{quest.xpReward} XP</p>
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
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white flex items-center gap-3">
                    <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary-light to-primary" />
                    {t('availableQuests')}
                  </h2>
                  <span className="text-sm font-bold text-primary dark:text-primary-light">
                    {pendingQuests.filter((q) => !q.required).length}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pendingQuests
                    .filter((q) => !q.required)
                    .slice(0, 6)
                    .map((quest) => {
                      const color = CATEGORY_COLORS[quest.category];
                      const Icon = CATEGORY_ICONS[quest.category];

                      return (
                        <div
                          key={quest.id}
                          className="flex items-center gap-3 p-3 rounded-xl bg-surface-light dark:bg-surface-elevated-dark/30 border border-border-light dark:border-border-dark/25"
                        >
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${color}15` }}
                          >
                            <Icon size={16} style={{ color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-text-primary-light dark:text-white text-sm truncate">
                              {quest.title[locale]}
                            </p>
                            <p className="text-[10px] text-gold-dark dark:text-gold font-semibold">
                              +{quest.xpReward} XP
                            </p>
                          </div>
                          <Circle size={16} className="text-text-secondary-light/30 dark:text-text-secondary-dark/30 shrink-0" />
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Earned Badges */}
            <div className="premium-card p-7">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-gold-light to-gold" />
                  {t('earnedBadges')}
                </h2>
                <span className="text-sm font-bold text-gold-dark dark:text-gold">
                  {earnedBadges.length}/{BADGES.length}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {earnedBadges.map((badge) => {
                  const rarityColor = RARITY_COLORS[badge.rarity];

                  return (
                    <div
                      key={badge.id}
                      className="p-4 rounded-xl bg-surface-light dark:bg-surface-elevated-dark/30 border border-border-light dark:border-border-dark/25 text-center"
                    >
                      <div
                        className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center"
                        style={{ backgroundColor: `${badge.color}15` }}
                      >
                        <Award size={28} style={{ color: badge.color }} />
                      </div>
                      <p className="text-xs font-bold text-text-primary-light dark:text-white truncate">
                        {badge.title[locale]}
                      </p>
                      <p className="text-[10px] font-semibold uppercase mt-1" style={{ color: rarityColor }}>
                        {t(`rarity.${badge.rarity}`)}
                      </p>
                    </div>
                  );
                })}

                {/* Locked badges preview */}
                {lockedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="p-4 rounded-xl bg-surface-light/50 dark:bg-surface-elevated-dark/10 border border-border-light/50 dark:border-border-dark/15 text-center opacity-50"
                  >
                    <div className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center bg-border-light/50 dark:bg-surface-dark/30">
                      <Award size={28} className="text-text-secondary-light/30 dark:text-text-secondary-dark/30" />
                    </div>
                    <p className="text-xs font-medium text-text-secondary-light/50 dark:text-text-secondary-dark/50">
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
                <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white mb-5 flex items-center gap-3">
                  <GraduationCap size={18} className="text-primary dark:text-primary-light" />
                  {t('targetProgram')}
                </h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-1">
                      {t('program')}
                    </p>
                    <p className="font-semibold text-text-primary-light dark:text-white">{program.name[locale]}</p>
                    <span
                      className="inline-flex mt-2 px-2.5 py-1 rounded-lg text-xs font-mono font-bold"
                      style={{
                        backgroundColor: `${department.color}10`,
                        color: department.color,
                      }}
                    >
                      {program.code}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-1">
                      {t('department')}
                    </p>
                    <p className="text-sm text-text-primary-light dark:text-white">{department.name[locale]}</p>
                  </div>

                  <Link
                    href="/academics"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border-light dark:border-border-dark/30 text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium hover:text-primary dark:hover:text-white hover:border-primary/30 dark:hover:border-border-dark/60 transition-all"
                  >
                    {t('viewPrograms')}
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            )}

            {/* Applicant Info */}
            <div className="premium-card p-7">
              <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white mb-5 flex items-center gap-3">
                <Medal size={18} className="text-gold-dark dark:text-gold" />
                {t('applicantInfo')}
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-text-secondary-light/60 dark:text-text-secondary-dark/60" />
                  <span className="text-sm text-text-primary-light dark:text-white">{applicant.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-text-secondary-light/60 dark:text-text-secondary-dark/60" />
                  <span className="text-sm text-text-primary-light dark:text-white">{applicant.city}</span>
                </div>
                <div className="flex items-center gap-3">
                  <School size={16} className="text-text-secondary-light/60 dark:text-text-secondary-dark/60" />
                  <span className="text-sm text-text-primary-light dark:text-white">{applicant.school}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-text-secondary-light/60 dark:text-text-secondary-dark/60" />
                  <span className="text-sm text-text-primary-light dark:text-white">
                    {t('registeredOn')} {new Date(applicant.registrationDate).toLocaleDateString(locale)}
                  </span>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="premium-card p-7">
              <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white mb-5 flex items-center gap-3">
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
                      className={`flex items-center gap-3 p-2 rounded-lg ${isCurrent ? 'bg-surface-hover-light dark:bg-surface-elevated-dark/30' : ''}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
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
                        className={`text-xs flex-1 ${isCurrentOrPast ? 'text-text-primary-light dark:text-white' : 'text-text-secondary-light/50 dark:text-text-secondary-dark/50'}`}
                      >
                        {lvl.title[locale]}
                      </span>
                      {isCurrentOrPast && <CheckCircle2 size={14} className="text-success" />}
                    </div>
                  );
                })}
                {LEVELS.length > 6 && (
                  <p className="text-[10px] text-text-secondary-light/50 dark:text-text-secondary-dark/50 text-center pt-2">
                    +{LEVELS.length - 6} {t('moreLevels')}
                  </p>
                )}
              </div>
            </div>

            {/* Similar Applicants */}
            {similarApplicants.length > 0 && (
              <div className="premium-card p-7">
                <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white mb-5 flex items-center gap-3">
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
                        className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-surface-hover-light dark:hover:bg-surface-elevated-dark/30 transition-all duration-200 group"
                      >
                        <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-border-light dark:ring-border-dark/30">
                          <Image src={a.photo} alt={a.name} fill className="object-cover" sizes="44px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-text-primary-light dark:text-white truncate group-hover:text-gold-dark dark:group-hover:text-gold transition-colors">
                            {a.name}
                          </p>
                          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{a.city}</p>
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-bold"
                            style={{ backgroundColor: `${aLevel.color}20`, color: aLevel.color }}
                          >
                            LVL {a.level}
                          </span>
                          <ChevronRight size={14} className="text-text-secondary-light/30 dark:text-text-secondary-dark/30" />
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <Link
                  href="/talent-pool"
                  className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border-light dark:border-border-dark/30 text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium hover:text-primary dark:hover:text-white hover:border-primary/30 dark:hover:border-border-dark/60 transition-all"
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
