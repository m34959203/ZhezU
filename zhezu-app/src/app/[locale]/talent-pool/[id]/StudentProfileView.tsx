'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import {
  Star,
  MapPin,
  Building2,
  Calendar,
  Trophy,
  FileText,
  Award,
  Zap,
  Scale,
  Download,
  MessageSquare,
  Send,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Briefcase,
} from 'lucide-react';
import type { StudentProfile, Locale } from '@/types';
import { RadarChart } from '@/components/talent/RadarChart';
import { STUDENTS } from '@/lib/talent-data';

const iconMap: Record<string, React.ComponentType<any>> = {
  Trophy, FileText, Briefcase, Award, Zap, Scale,
};

const ACHIEVEMENT_COLORS = ['#3B82F6', '#22C55E', '#E6B325', '#8B5CF6', '#F43F5E', '#06B6D4'];

interface Props {
  student: StudentProfile;
}

function getLevel(percentage: number): { label: string; color: string } {
  if (percentage >= 90) return { label: 'Expert', color: '#22C55E' };
  if (percentage >= 80) return { label: 'Advanced', color: '#3B82F6' };
  if (percentage >= 65) return { label: 'Intermediate', color: '#F59E0B' };
  return { label: 'Certified', color: '#8B5CF6' };
}

function formatYear(year: number, locale: Locale): string {
  if (locale === 'en') {
    const suffix = year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th';
    return `${year}${suffix} Year`;
  }
  if (locale === 'kk') return `${year}-курс`;
  return `${year} курс`;
}

export function StudentProfileView({ student }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations('talent');
  const tNav = useTranslations('nav');
  const similarStudents = STUDENTS.filter((s) => s.id !== student.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] rounded-full bg-primary/[0.03] dark:bg-primary/[0.03] blur-[150px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gold/[0.02] dark:bg-gold/[0.02] blur-[120px]" />
        <div className="absolute top-[50%] left-[50%] w-[350px] h-[350px] rounded-full bg-[#8B5CF6]/[0.02] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark mb-8 flex-wrap">
          <Link href="/" className="hover:text-primary dark:hover:text-white transition-colors">{tNav('home')}</Link>
          <ChevronRight size={14} className="text-text-secondary-light/40 dark:text-text-secondary-dark/40" />
          <Link href="/talent-pool" className="hover:text-primary dark:hover:text-white transition-colors">{t('title')}</Link>
          <ChevronRight size={14} className="text-text-secondary-light/40 dark:text-text-secondary-dark/40" />
          <span className="text-text-primary-light/60 dark:text-white/60">{student.major[locale]}</span>
          <ChevronRight size={14} className="text-text-secondary-light/40 dark:text-text-secondary-dark/40" />
          <span className="text-gold-dark dark:text-gold font-medium">
            {t('profileId')} #{student.id.replace(/[^a-z0-9]/gi, '').slice(-4).toUpperCase()}
          </span>
        </nav>

        {/* ── Profile Header Card ── */}
        <div className="premium-card p-7 md:p-10 mb-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
            {/* Photo with gold badge */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-gold/30 ring-offset-4 ring-offset-bg-light dark:ring-offset-[#0B1121]">
                <Image
                  src={student.photo}
                  alt={student.name}
                  width={144}
                  height={144}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Gold status badge */}
              <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-lg shadow-gold/30">
                <Star size={18} className="text-white dark:text-bg-dark fill-white dark:fill-bg-dark" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary-light dark:text-white tracking-tight">
                  {student.name}
                </h1>
                <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-[10px] font-bold text-gold-dark dark:text-gold uppercase tracking-[0.15em]">
                  {t('topTalent')}
                </span>
              </div>

              <p className="text-lg text-primary dark:text-primary-light font-semibold">
                {t('bsc')} {student.major[locale]}, {formatYear(student.year, locale)}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 mt-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                <span className="flex items-center gap-1.5">
                  <Building2 size={14} className="text-text-secondary-light/60 dark:text-text-secondary-dark/60" />
                  {t('universityName')}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-text-secondary-light/60 dark:text-text-secondary-dark/60" />
                  Zhezkazgan, Kazakhstan
                </span>
              </div>

              {/* Availability badge */}
              <div className="mt-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-success/10 border border-success/25 text-xs font-semibold text-success">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  {t('availableForInternship')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { value: `${student.gpa}/4.0`, label: t('cumGpa'), color: '#E6B325' },
            { value: student.classRank, label: t('classRankLabel'), color: '#3B82F6' },
            { value: student.englishLevel, label: t('englishLevelLabel'), color: '#8B5CF6' },
            { value: `${student.internships}`, label: t('internshipsLabel'), color: '#22C55E' },
          ].map((stat) => (
            <div key={stat.label} className="premium-card p-5 text-center">
              <p className="text-2xl md:text-3xl font-display font-bold text-text-primary-light dark:text-white mb-1">
                {stat.value}
              </p>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.15em]"
                style={{ color: stat.color }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ═══ LEFT / MAIN COLUMN ═══ */}
          <div className="lg:col-span-2 space-y-6">
            {/* Professional Summary */}
            <div className="premium-card p-7">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary-light to-primary" />
                  {t('summary')}
                </h2>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 text-[10px] font-semibold text-primary dark:text-primary-light/70">
                  <Sparkles size={10} />
                  {t('aiGenerated')}
                </span>
              </div>
              <p className="text-sm text-text-secondary-light dark:text-text-primary-dark leading-[1.85]">
                {student.summary[locale]}
              </p>
            </div>

            {/* Competencies + Skill Profile side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Core Competencies */}
              <div className="premium-card p-7">
                <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary-light to-primary" />
                  {t('competencies')}
                </h2>
                <div className="space-y-5">
                  {student.competencies.map((comp) => {
                    const level = getLevel(comp.percentage);
                    return (
                      <div key={comp.name.en} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                            {comp.name[locale]}
                          </span>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[10px] font-bold uppercase tracking-wider"
                              style={{ color: level.color }}
                            >
                              {level.label}
                            </span>
                            <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark tabular-nums">
                              {comp.percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="relative h-2.5 rounded-full bg-border-light dark:bg-surface-dark/80 overflow-hidden">
                          <div
                            className="absolute inset-0 rounded-full"
                            style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15)' }}
                          />
                          <div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                              width: `${comp.percentage}%`,
                              background: `linear-gradient(90deg, ${comp.color}cc, ${comp.color})`,
                              boxShadow: `0 0 12px ${comp.color}30`,
                              transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Skill Profile (Radar) */}
              <div className="premium-card p-7">
                <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white mb-5 flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#8B5CF6]/60" />
                  {t('skillProfile')}
                </h2>
                <div className="flex justify-center">
                  <RadarChart skills={student.skills} size={220} />
                </div>
              </div>
            </div>

            {/* Verified Achievements */}
            <div className="premium-card p-7">
              <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-gold-light to-gold" />
                {t('achievements')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {student.achievements.map((ach, idx) => {
                  const Icon = iconMap[ach.icon] || Award;
                  const color = ACHIEVEMENT_COLORS[idx % ACHIEVEMENT_COLORS.length];
                  return (
                    <div
                      key={ach.id}
                      className="p-5 rounded-xl bg-surface-light dark:bg-surface-elevated-dark/30 border border-border-light dark:border-border-dark/25 hover:border-opacity-50 transition-colors duration-300 text-center"
                    >
                      <div
                        className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                        style={{ backgroundColor: `${color}12` }}
                      >
                        <Icon size={24} style={{ color }} />
                      </div>
                      <div className="flex items-center justify-center gap-1.5 mb-2">
                        <h4 className="text-sm font-semibold text-text-primary-light dark:text-white">
                          {ach.title[locale]}
                        </h4>
                        {ach.verified && (
                          <CheckCircle2 size={14} className="text-success shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{ach.issuer[locale]}</p>
                      <p className="text-xs text-text-secondary-light/50 dark:text-text-secondary-dark/50 mt-2 flex items-center justify-center gap-1">
                        <Calendar size={10} />
                        {ach.date}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Portfolio & Research */}
            {student.portfolio.length > 0 && (
              <div className="premium-card p-7">
                <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-success to-success/60" />
                  {t('portfolio')}
                </h2>
                <div className="space-y-4">
                  {student.portfolio.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start gap-4 p-5 rounded-xl bg-surface-light dark:bg-surface-elevated-dark/30 border border-border-light dark:border-border-dark/25 group hover:border-primary/20 transition-all duration-300"
                    >
                      {/* Thumbnail placeholder */}
                      <div className="w-full sm:w-24 h-20 sm:h-16 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                        <FileText size={20} className="text-primary/50 dark:text-primary-light/50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h4 className="text-sm font-semibold text-text-primary-light dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                            {item.title[locale]}
                          </h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/8 text-primary dark:text-primary-light/70 uppercase tracking-wider">
                            {item.date.split('-')[0]}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1.5 line-clamp-2 leading-relaxed">
                          {item.description[locale]}
                        </p>
                        <div className="mt-3 flex items-center gap-4">
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary dark:text-primary-light font-medium flex items-center gap-1 hover:underline"
                            >
                              <ExternalLink size={11} />
                              {item.type === 'research'
                                ? t('readPaper')
                                : item.type === 'project'
                                  ? t('viewProject')
                                  : t('viewItem')}
                            </a>
                          )}
                          <span className="text-[10px] font-bold text-text-secondary-light/40 dark:text-text-secondary-dark/40 uppercase tracking-wider">
                            {item.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ═══ RIGHT SIDEBAR ═══ */}
          <div className="space-y-6">
            {/* Recruiter Actions */}
            <div className="premium-card premium-card-gold p-7">
              <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white mb-1 flex items-center gap-3">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-gold-light to-gold" />
                {t('recruiterActions')}
              </h2>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-5 ml-4">
                {t('officialPortal')}
              </p>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-all btn-premium cursor-pointer">
                  <MessageSquare size={16} />
                  {t('scheduleInterview')}
                </button>
                <button className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-surface-hover-light dark:bg-surface-elevated-dark/50 border border-border-light dark:border-border-dark/50 text-text-primary-light dark:text-white text-sm font-semibold hover:border-primary/30 dark:hover:border-border-dark transition-all cursor-pointer">
                  <Download size={16} />
                  {t('downloadCV')}
                </button>
                <button className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gold/8 dark:bg-gold/6 border border-gold/25 dark:border-gold/20 text-gold-dark dark:text-gold text-sm font-semibold hover:bg-gold/15 dark:hover:bg-gold/12 hover:border-gold/40 dark:hover:border-gold/30 transition-all cursor-pointer">
                  <Send size={16} />
                  {t('sendOffer')}
                </button>
              </div>

              {/* Privacy note */}
              <div className="mt-5 pt-5 border-t border-border-light dark:border-border-dark/25">
                <p className="text-[10px] text-text-secondary-light/50 dark:text-text-secondary-dark/50 flex items-start gap-2 leading-relaxed">
                  <ShieldCheck size={12} className="shrink-0 mt-0.5" />
                  {t('privacyNote')}
                </p>
              </div>
            </div>

            {/* Similar Top Talent */}
            <div className="premium-card p-7">
              <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white mb-5 flex items-center gap-3">
                <Sparkles size={16} className="text-gold-dark dark:text-gold" />
                {t('similarTalent')}
              </h2>
              <div className="space-y-3">
                {similarStudents.map((s) => (
                  <Link
                    key={s.id}
                    href={`/talent-pool/${s.id}`}
                    className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-surface-hover-light dark:hover:bg-surface-elevated-dark/30 transition-all duration-200 group"
                  >
                    <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-border-light dark:ring-border-dark/30">
                      <Image
                        src={s.photo}
                        alt={s.name}
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text-primary-light dark:text-white truncate group-hover:text-gold-dark dark:group-hover:text-gold transition-colors">
                        {s.name}
                      </p>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{s.major[locale]}</p>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <div className="text-xs font-bold text-gold-dark dark:text-gold tabular-nums">{s.gpa}</div>
                      <ChevronRight size={14} className="text-text-secondary-light/30 dark:text-text-secondary-dark/30" />
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href="/talent-pool"
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border-light dark:border-border-dark/30 text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium hover:text-primary dark:hover:text-white hover:border-primary/30 dark:hover:border-border-dark/60 transition-all"
              >
                {t('viewAllCandidates')}
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
