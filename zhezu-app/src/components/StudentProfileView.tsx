'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import {
  ChevronRight,
  MapPin,
  GraduationCap,
  Star,
  CheckCircle2,
  Sparkles,
  Trophy,
  Medal,
  TrendingUp,
  Briefcase,
  FileText,
  Download,
  Calendar,
  Send,
  ExternalLink,
  Shield,
  Code,
  Users,
  Award,
  BookOpen,
  Target,
  Globe,
  Building2,
} from 'lucide-react';
import type { Locale } from '@/types';
import type { StudentProfile, Achievement, LifecycleQuest } from '@/lib/student-lifecycle';
import { LIFECYCLE_LEVELS, getLifecycleLevel, calculateProfileCompleteness } from '@/lib/student-lifecycle';
import { ACHIEVEMENTS, ALL_QUESTS, ALL_PROFILES } from '@/lib/lifecycle-data';
import { PROGRAMS, DEPARTMENTS } from '@/lib/constants';

// ════════════════════════════════════════════════════════════════════════════
// RADAR CHART COMPONENT
// ════════════════════════════════════════════════════════════════════════════

interface RadarChartProps {
  data: {
    technical: number;
    tools: number;
    softSkills: number;
    leadership: number;
    language: number;
    safety: number;
  };
  size?: number;
}

function SkillRadarChart({ data, size = 200 }: RadarChartProps) {
  const center = size / 2;
  const radius = size * 0.4;

  const labels = [
    { key: 'technical', label: 'TECHNICAL', angle: -90 },
    { key: 'tools', label: 'TOOLS', angle: -30 },
    { key: 'softSkills', label: 'SOFT SKILLS', angle: 30 },
    { key: 'language', label: 'LANGUAGE', angle: 90 },
    { key: 'leadership', label: 'LEADERSHIP', angle: 150 },
    { key: 'safety', label: 'SAFETY', angle: 210 },
  ] as const;

  const getPoint = (angle: number, value: number) => {
    const rad = (angle * Math.PI) / 180;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  };

  const points = labels.map((l) => getPoint(l.angle, data[l.key]));
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // Grid circles
  const gridLevels = [25, 50, 75, 100];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      {/* Grid circles */}
      {gridLevels.map((level) => (
        <polygon
          key={level}
          points={labels.map((l) => {
            const p = getPoint(l.angle, level);
            return `${p.x},${p.y}`;
          }).join(' ')}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-border-light dark:text-border-dark/30"
          opacity={0.5}
        />
      ))}

      {/* Axis lines */}
      {labels.map((l) => {
        const p = getPoint(l.angle, 100);
        return (
          <line
            key={l.key}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="currentColor"
            strokeWidth="1"
            className="text-border-light dark:text-border-dark/30"
            opacity={0.5}
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={points.map((p) => `${p.x},${p.y}`).join(' ')}
        fill="rgba(230, 179, 37, 0.2)"
        stroke="#E6B325"
        strokeWidth="2"
      />

      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#E6B325" />
      ))}

      {/* Labels */}
      {labels.map((l) => {
        const p = getPoint(l.angle, 120);
        return (
          <text
            key={l.key}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[8px] fill-text-secondary-light dark:fill-text-secondary-dark font-semibold tracking-wide"
          >
            {l.label}
          </text>
        );
      })}
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════════════

interface Props {
  profile: StudentProfile;
}

export function StudentProfileView({ profile }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations('talent');
  const tNav = useTranslations('nav');

  const level = getLifecycleLevel(profile.gamification.xp, profile.stage);
  const program = PROGRAMS.find((p) => p.code === profile.education.program);
  const department = DEPARTMENTS.find((d) => d.id === profile.education.department);
  const completeness = calculateProfileCompleteness(profile);

  // Get earned achievements
  const earnedAchievements = ACHIEVEMENTS.filter((a) =>
    profile.gamification.earnedAchievements.includes(a.id)
  );

  // Get similar profiles
  const similarProfiles = ALL_PROFILES.filter(
    (p) => p.id !== profile.id && p.education.department === profile.education.department
  ).slice(0, 2);

  const stageLabel = profile.stage === 'applicant' ? 'Талапкер' :
    profile.stage === 'student' ? `${profile.year}-курс` : 'Түлек';

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[150px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gold/[0.02] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark mb-8 flex-wrap">
          <Link href="/" className="hover:text-primary dark:hover:text-white transition-colors">
            {tNav('home')}
          </Link>
          <ChevronRight size={14} className="opacity-40" />
          <Link href="/talent-pool" className="hover:text-primary dark:hover:text-white transition-colors">
            {t('title')}
          </Link>
          <ChevronRight size={14} className="opacity-40" />
          {program && (
            <>
              <span>{program.name[locale]}</span>
              <ChevronRight size={14} className="opacity-40" />
            </>
          )}
          <span className="text-gold-dark dark:text-gold font-medium">{t('profileId')} #{profile.id.slice(-4)}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ═══════ LEFT COLUMN ═══════ */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="premium-card p-7">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {/* Photo */}
                <div className="relative shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-gold/30 ring-offset-4 ring-offset-bg-light dark:ring-offset-[#0B1121]">
                    <Image
                      src={profile.photo}
                      alt={profile.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {profile.isTopTalent && (
                    <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-gold flex items-center justify-center shadow-lg">
                      <Star size={18} className="text-white" fill="white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-primary-light dark:text-white">
                      {profile.name}
                    </h1>
                    {profile.isTopTalent && (
                      <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold-dark dark:text-gold text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Star size={10} fill="currentColor" />
                        {t('topTalent')}
                      </span>
                    )}
                  </div>

                  {program && (
                    <p className="text-base text-text-secondary-light dark:text-text-secondary-dark mb-2">
                      {t('bsc')} {program.name[locale]}, {stageLabel}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap size={14} className="opacity-60" />
                      {t('universityName')}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="opacity-60" />
                      {profile.preUniversity.city}, Kazakhstan
                    </span>
                  </div>

                  {profile.availability.forInternship && (
                    <div className="mt-3 inline-flex items-center gap-1.5 text-success text-sm font-medium">
                      <CheckCircle2 size={14} />
                      {t('availableForInternship')}
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border-light dark:border-border-dark/30">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-display font-bold text-text-primary-light dark:text-white">
                    {profile.education.gpa?.toFixed(1) || '—'}
                    <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-normal">/4.0</span>
                  </p>
                  <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider font-medium mt-1">
                    {t('cumGpa')}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-display font-bold text-text-primary-light dark:text-white">
                    {profile.education.classRank || '—'}
                  </p>
                  <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider font-medium mt-1">
                    {t('classRankLabel')}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-display font-bold text-text-primary-light dark:text-white">
                    {profile.languages.find((l) => l.language === 'english')?.level || '—'}
                  </p>
                  <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider font-medium mt-1">
                    {t('englishLevelLabel')}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-display font-bold text-text-primary-light dark:text-white">
                    {profile.experiences.filter((e) => e.type === 'internship').length}
                  </p>
                  <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider font-medium mt-1">
                    {t('internshipsLabel')}
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            {profile.professionalSummary && (
              <div className="premium-card p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Sparkles size={18} className="text-gold-dark dark:text-gold" />
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white">
                      {t('summary')}
                    </h2>
                    <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                      ({t('aiGenerated')})
                    </p>
                  </div>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                  {profile.professionalSummary[locale]}
                </p>
              </div>
            )}

            {/* Core Competencies + Skill Radar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Core Competencies */}
              <div className="premium-card p-7">
                <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white mb-5 flex items-center gap-3">
                  <Target size={18} className="text-primary dark:text-primary-light" />
                  {t('competencies')}
                </h2>

                <div className="space-y-4">
                  {profile.skills.slice(0, 4).map((skill) => {
                    const levelColors: Record<string, string> = {
                      beginner: '#94A3B8',
                      intermediate: '#F59E0B',
                      advanced: '#3B82F6',
                      expert: '#22C55E',
                      certified: '#E6B325',
                    };
                    const color = levelColors[skill.level] || '#94A3B8';

                    return (
                      <div key={skill.id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-text-primary-light dark:text-white font-medium">
                            {skill.name[locale]}
                          </span>
                          <span className="text-xs font-bold capitalize" style={{ color }}>
                            {skill.level}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-border-light dark:bg-surface-dark/80 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${skill.percentage}%`, backgroundColor: color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Skill Radar */}
              <div className="premium-card p-7">
                <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white mb-5 flex items-center gap-3">
                  <Target size={18} className="text-gold-dark dark:text-gold" />
                  {t('skillProfile')}
                </h2>
                <SkillRadarChart data={profile.skillRadar} size={200} />
              </div>
            </div>

            {/* Verified Achievements */}
            {earnedAchievements.length > 0 && (
              <div className="premium-card p-7">
                <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white mb-5 flex items-center gap-3">
                  <Trophy size={18} className="text-gold-dark dark:text-gold" />
                  {t('achievements')}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {earnedAchievements.slice(0, 3).map((ach) => (
                    <div
                      key={ach.id}
                      className="p-4 rounded-xl bg-surface-light dark:bg-surface-elevated-dark/30 border border-border-light dark:border-border-dark/25"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${ach.color}15` }}
                        >
                          <Award size={22} style={{ color: ach.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-text-primary-light dark:text-white text-sm">
                            {ach.title[locale]}
                          </p>
                          {ach.verifiedBy && (
                            <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark mt-1">
                              {ach.verifiedBy}
                            </p>
                          )}
                        </div>
                        {ach.verification === 'partner' && (
                          <Shield size={14} className="text-success shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio & Research */}
            {profile.portfolio.length > 0 && (
              <div className="premium-card p-7">
                <h2 className="text-lg font-display font-bold text-text-primary-light dark:text-white mb-5 flex items-center gap-3">
                  <BookOpen size={18} className="text-primary dark:text-primary-light" />
                  {t('portfolio')}
                </h2>

                <div className="space-y-4">
                  {profile.portfolio.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-xl bg-surface-light dark:bg-surface-elevated-dark/30 border border-border-light dark:border-border-dark/25"
                    >
                      {item.thumbnail && (
                        <div className="w-32 h-24 rounded-lg overflow-hidden shrink-0 relative">
                          <Image
                            src={item.thumbnail}
                            alt={item.title[locale]}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-text-primary-light dark:text-white text-sm">
                            {item.title[locale]}
                          </h3>
                          <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                            {item.year}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark line-clamp-2 mb-3">
                          {item.description[locale]}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.links.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary dark:text-primary-light hover:underline"
                            >
                              {link.type === 'paper' && <FileText size={12} />}
                              {link.type === 'github' && <Code size={12} />}
                              {link.type === 'presentation' && <ExternalLink size={12} />}
                              {link.label[locale]}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ═══════ RIGHT SIDEBAR ═══════ */}
          <div className="space-y-6">
            {/* Recruiter Actions */}
            <div className="premium-card premium-card-gold p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center">
                  <Briefcase size={20} className="text-gold-dark dark:text-gold" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-text-primary-light dark:text-white">
                    {t('recruiterActions')}
                  </h2>
                  <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">
                    {t('officialPortal')}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gold text-bg-dark font-bold text-sm hover:bg-gold-light transition-colors">
                  <Calendar size={16} />
                  {t('scheduleInterview')}
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-light dark:bg-surface-elevated-dark/50 border border-border-light dark:border-border-dark/30 text-text-primary-light dark:text-white font-medium text-sm hover:bg-surface-hover-light dark:hover:bg-surface-elevated-dark transition-colors">
                  <Download size={16} />
                  {t('downloadCV')}
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-light dark:bg-surface-elevated-dark/50 border border-border-light dark:border-border-dark/30 text-text-primary-light dark:text-white font-medium text-sm hover:bg-surface-hover-light dark:hover:bg-surface-elevated-dark transition-colors">
                  <Send size={16} />
                  {t('sendOffer')}
                </button>
              </div>

              <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/60 text-center mt-4 flex items-center justify-center gap-1.5">
                <Shield size={10} />
                {t('privacyNote')}
              </p>
            </div>

            {/* Match Analysis */}
            {profile.isTopTalent && (
              <div className="premium-card p-7">
                <h2 className="text-base font-bold text-text-primary-light dark:text-white mb-4">
                  {t('matchAnalysis')}
                </h2>

                <div className="text-center mb-4">
                  <div className="relative w-24 h-24 mx-auto">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="text-border-light dark:text-surface-dark"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#E6B325"
                        strokeWidth="6"
                        strokeDasharray={`${completeness * 2.83} 283`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-text-primary-light dark:text-white">
                        {completeness}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-2">
                    {t('matchLabel')}
                  </p>
                  <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/60">
                    {t('matchSublabel')}
                  </p>
                </div>
              </div>
            )}

            {/* Similar Talent */}
            {similarProfiles.length > 0 && (
              <div className="premium-card p-7">
                <h2 className="text-base font-bold text-text-primary-light dark:text-white mb-4">
                  {t('similarTalent')}
                </h2>

                <div className="space-y-3">
                  {similarProfiles.map((p) => (
                    <Link
                      key={p.id}
                      href={`/talent-pool/${p.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover-light dark:hover:bg-surface-elevated-dark/30 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden relative">
                        <Image src={p.photo} alt={p.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary-light dark:text-white truncate group-hover:text-gold-dark dark:group-hover:text-gold transition-colors">
                          {p.name}
                        </p>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                          {PROGRAMS.find((pr) => pr.code === p.education.program)?.name[locale]?.split(' ').slice(0, 2).join(' ')}
                          {p.education.gpa && ` • GPA ${p.education.gpa.toFixed(1)}`}
                        </p>
                      </div>
                      <ChevronRight size={14} className="text-text-secondary-light/30 dark:text-text-secondary-dark/30" />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
