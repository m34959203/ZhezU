'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import {
  ArrowLeft,
  Star,
  MapPin,
  Briefcase,
  Globe,
  Mail,
  Linkedin,
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
} from 'lucide-react';
import type { StudentProfile, Locale } from '@/types';
import { RadarChart } from '@/components/talent/RadarChart';
import { CircularProgress } from '@/components/talent/CircularProgress';
import { ProgressBar } from '@/components/talent/ProgressBar';
import { STUDENTS } from '@/lib/talent-data';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Trophy,
  FileText,
  Briefcase,
  Award,
  Zap,
  Scale,
};

interface Props {
  student: StudentProfile;
}

export function StudentProfileView({ student }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations('talent');

  const similarStudents = STUDENTS.filter((s) => s.id !== student.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Back navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/talent-pool"
          className="inline-flex items-center gap-2 text-sm text-text-secondary-dark hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          {t('backToPool')}
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ==================== LEFT COLUMN ==================== */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header Card */}
            <div className="rounded-2xl border border-border-dark/60 bg-surface-dark/50 backdrop-blur-sm p-6">
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Photo */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-gold/30">
                    <Image
                      src={student.photo}
                      alt={student.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex items-center gap-1 text-gold text-sm font-bold">
                    <Star size={14} className="fill-gold" />
                    GPA {student.gpa}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h1 className="text-2xl font-display font-bold text-white">{student.name}</h1>
                  <p className="text-base text-primary-light font-semibold mt-1">
                    {student.major[locale]}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-text-secondary-dark">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-gold" />
                      {student.classRank}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Globe size={14} className="text-primary-light" />
                      {student.englishLevel}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={14} className="text-success" />
                      {student.internships} {t('internships')}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {student.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-5 pt-5 border-t border-border-dark/40">
                <h3 className="text-sm font-semibold text-text-secondary-dark uppercase tracking-wider mb-2">
                  {t('summary')}
                </h3>
                <p className="text-sm text-text-primary-dark leading-relaxed">
                  {student.summary[locale]}
                </p>
              </div>
            </div>

            {/* Core Competencies */}
            <div className="rounded-2xl border border-border-dark/60 bg-surface-dark/50 backdrop-blur-sm p-6">
              <h2 className="text-lg font-display font-bold text-white mb-5 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-primary" />
                {t('competencies')}
              </h2>
              <div className="space-y-4">
                {student.competencies.map((comp) => (
                  <ProgressBar
                    key={comp.name.en}
                    label={comp.name[locale]}
                    percentage={comp.percentage}
                    color={comp.color}
                  />
                ))}
              </div>
            </div>

            {/* Verified Achievements */}
            <div className="rounded-2xl border border-border-dark/60 bg-surface-dark/50 backdrop-blur-sm p-6">
              <h2 className="text-lg font-display font-bold text-white mb-5 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-gold" />
                {t('achievements')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {student.achievements.map((ach) => {
                  const Icon = iconMap[ach.icon] || Award;
                  return (
                    <div
                      key={ach.id}
                      className="flex items-start gap-3 p-4 rounded-xl bg-surface-elevated-dark/50 border border-border-dark/40"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-semibold text-white truncate">
                            {ach.title[locale]}
                          </h4>
                          {ach.verified && (
                            <CheckCircle2 size={14} className="text-success shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-text-secondary-dark mt-0.5">{ach.issuer[locale]}</p>
                        <p className="text-xs text-text-secondary-dark flex items-center gap-1 mt-1">
                          <Calendar size={10} />
                          {ach.date}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Portfolio & Research */}
            {student.portfolio.length > 0 && (
              <div className="rounded-2xl border border-border-dark/60 bg-surface-dark/50 backdrop-blur-sm p-6">
                <h2 className="text-lg font-display font-bold text-white mb-5 flex items-center gap-2">
                  <div className="w-1 h-5 rounded-full bg-success" />
                  {t('portfolio')}
                </h2>
                <div className="space-y-3">
                  {student.portfolio.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-4 rounded-xl bg-surface-elevated-dark/50 border border-border-dark/40 group hover:border-primary/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText size={18} className="text-primary-light" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                            {item.title[locale]}
                          </h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary-light capitalize">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary-dark mt-1 line-clamp-2">
                          {item.description[locale]}
                        </p>
                        <p className="text-xs text-text-secondary-dark flex items-center gap-1 mt-1.5">
                          <Calendar size={10} />
                          {item.date}
                        </p>
                      </div>
                      {item.link && (
                        <ExternalLink size={14} className="text-text-secondary-dark shrink-0 mt-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ==================== RIGHT COLUMN ==================== */}
          <div className="space-y-6">
            {/* Match Analysis */}
            <div className="rounded-2xl border border-border-dark/60 bg-surface-dark/50 backdrop-blur-sm p-6">
              <h2 className="text-lg font-display font-bold text-white mb-5 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-success" />
                {t('matchAnalysis')}
              </h2>
              <div className="flex justify-center">
                <CircularProgress
                  value={student.matchScore}
                  label={t('matchLabel')}
                  sublabel={t('matchSublabel')}
                />
              </div>
            </div>

            {/* Skill Profile (Radar) */}
            <div className="rounded-2xl border border-border-dark/60 bg-surface-dark/50 backdrop-blur-sm p-6">
              <h2 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-primary" />
                {t('skillProfile')}
              </h2>
              <div className="flex justify-center">
                <RadarChart skills={student.skills} size={220} />
              </div>
            </div>

            {/* Recruiter Actions */}
            <div className="rounded-2xl border border-gold/20 bg-surface-dark/50 backdrop-blur-sm p-6">
              <h2 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-gold" />
                {t('recruiterActions')}
              </h2>
              <div className="space-y-2.5">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors cursor-pointer">
                  <MessageSquare size={16} />
                  {t('scheduleInterview')}
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-elevated-dark border border-border-dark text-white text-sm font-semibold hover:border-gold/40 transition-colors cursor-pointer">
                  <Download size={16} />
                  {t('downloadCV')}
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gold/10 border border-gold/30 text-gold text-sm font-semibold hover:bg-gold/20 transition-colors cursor-pointer">
                  <Send size={16} />
                  {t('sendOffer')}
                </button>
              </div>

              {/* Contact info */}
              <div className="mt-4 pt-4 border-t border-border-dark/40 space-y-2">
                <a
                  href={`mailto:${student.email}`}
                  className="flex items-center gap-2 text-sm text-text-secondary-dark hover:text-primary-light transition-colors"
                >
                  <Mail size={14} />
                  {student.email}
                </a>
                {student.linkedin && (
                  <a
                    href={student.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-text-secondary-dark hover:text-primary-light transition-colors"
                  >
                    <Linkedin size={14} />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>

            {/* Similar Top Talent */}
            <div className="rounded-2xl border border-border-dark/60 bg-surface-dark/50 backdrop-blur-sm p-6">
              <h2 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-primary-light" />
                {t('similarTalent')}
              </h2>
              <div className="space-y-3">
                {similarStudents.map((s) => (
                  <Link
                    key={s.id}
                    href={`/talent-pool/${s.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-elevated-dark/50 transition-colors group"
                  >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-border-dark">
                      <Image
                        src={s.photo}
                        alt={s.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate group-hover:text-gold transition-colors">
                        {s.name}
                      </p>
                      <p className="text-xs text-text-secondary-dark">{s.major[locale]}</p>
                    </div>
                    <div className="text-xs font-bold text-success">{s.matchScore}%</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
