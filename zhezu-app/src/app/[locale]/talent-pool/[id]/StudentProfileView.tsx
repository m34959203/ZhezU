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
  Sparkles,
} from 'lucide-react';
import type { StudentProfile, Locale } from '@/types';
import { RadarChart } from '@/components/talent/RadarChart';
import { CircularProgress } from '@/components/talent/CircularProgress';
import { ProgressBar } from '@/components/talent/ProgressBar';
import { STUDENTS } from '@/lib/talent-data';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Trophy, FileText, Briefcase, Award, Zap, Scale,
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
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] rounded-full bg-primary/3 blur-[150px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gold/2 blur-[120px]" />
      </div>

      <div className="relative">
        {/* Back nav */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
          <Link
            href="/talent-pool"
            className="inline-flex items-center gap-2 text-sm text-text-secondary-dark hover:text-white transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            {t('backToPool')}
          </Link>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ═══════ LEFT COLUMN ═══════ */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header */}
              <div className="premium-card p-7">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Photo */}
                  <div className="flex flex-col items-center gap-3 shrink-0">
                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden avatar-ring">
                      <Image
                        src={student.photo}
                        alt={student.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/8 border border-gold/15">
                      <Star size={12} className="text-gold fill-gold" />
                      <span className="text-sm font-bold text-gold tabular-nums">GPA {student.gpa}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">{student.name}</h1>
                    <p className="text-base text-primary-light font-semibold mt-1">{student.major[locale]}</p>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-text-secondary-dark">
                      <span className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-gold/8 flex items-center justify-center">
                          <MapPin size={12} className="text-gold" />
                        </div>
                        {student.classRank}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-primary/8 flex items-center justify-center">
                          <Globe size={12} className="text-primary-light" />
                        </div>
                        {student.englishLevel}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-success/8 flex items-center justify-center">
                          <Briefcase size={12} className="text-success" />
                        </div>
                        {student.internships} {t('internships')}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {student.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-[11px] font-semibold bg-primary/8 text-primary-light/80 border border-primary/12 tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-6 pt-6 border-t border-border-dark/30">
                  <h3 className="text-[11px] font-bold text-text-secondary-dark uppercase tracking-[0.15em] mb-3">
                    {t('summary')}
                  </h3>
                  <p className="text-sm text-text-primary-dark leading-[1.7]">
                    {student.summary[locale]}
                  </p>
                </div>
              </div>

              {/* Core Competencies */}
              <div className="premium-card p-7">
                <h2 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary-light to-primary" />
                  {t('competencies')}
                </h2>
                <div className="space-y-5">
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
              <div className="premium-card p-7">
                <h2 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-gold-light to-gold" />
                  {t('achievements')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {student.achievements.map((ach) => {
                    const Icon = iconMap[ach.icon] || Award;
                    return (
                      <div
                        key={ach.id}
                        className="flex items-start gap-4 p-4 rounded-xl bg-surface-elevated-dark/30 border border-border-dark/25 hover:border-gold/20 transition-colors duration-300"
                      >
                        <div className="w-11 h-11 rounded-xl bg-gold/8 flex items-center justify-center shrink-0">
                          <Icon size={18} className="text-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-white truncate">
                              {ach.title[locale]}
                            </h4>
                            {ach.verified && (
                              <CheckCircle2 size={14} className="text-success shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-text-secondary-dark mt-1">{ach.issuer[locale]}</p>
                          <p className="text-xs text-text-secondary-dark/60 flex items-center gap-1.5 mt-1.5">
                            <Calendar size={10} />
                            {ach.date}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Portfolio */}
              {student.portfolio.length > 0 && (
                <div className="premium-card p-7">
                  <h2 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-1 h-6 rounded-full bg-gradient-to-b from-success to-success/60" />
                    {t('portfolio')}
                  </h2>
                  <div className="space-y-4">
                    {student.portfolio.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 p-5 rounded-xl bg-surface-elevated-dark/30 border border-border-dark/25 group hover:border-primary/20 transition-all duration-300"
                      >
                        <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                          <FileText size={18} className="text-primary-light" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2.5">
                            <h4 className="text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                              {item.title[locale]}
                            </h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/8 text-primary-light/70 uppercase tracking-wider">
                              {item.type}
                            </span>
                          </div>
                          <p className="text-xs text-text-secondary-dark mt-1.5 line-clamp-2 leading-relaxed">
                            {item.description[locale]}
                          </p>
                          <p className="text-xs text-text-secondary-dark/50 flex items-center gap-1.5 mt-2">
                            <Calendar size={10} />
                            {item.date}
                          </p>
                        </div>
                        {item.link && (
                          <ExternalLink size={14} className="text-text-secondary-dark/30 shrink-0 mt-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ═══════ RIGHT COLUMN ═══════ */}
            <div className="space-y-6">
              {/* Match Analysis */}
              <div className="premium-card p-7">
                <h2 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-success to-success/60" />
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

              {/* Skill Profile */}
              <div className="premium-card p-7">
                <h2 className="text-lg font-display font-bold text-white mb-5 flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary-light to-primary" />
                  {t('skillProfile')}
                </h2>
                <div className="flex justify-center">
                  <RadarChart skills={student.skills} size={230} />
                </div>
              </div>

              {/* Recruiter Actions */}
              <div className="premium-card premium-card-gold p-7">
                <h2 className="text-lg font-display font-bold text-white mb-5 flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-gold-light to-gold" />
                  {t('recruiterActions')}
                </h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-all btn-premium cursor-pointer">
                    <MessageSquare size={16} />
                    {t('scheduleInterview')}
                  </button>
                  <button className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-surface-elevated-dark/50 border border-border-dark/50 text-white text-sm font-semibold hover:border-border-dark transition-all cursor-pointer">
                    <Download size={16} />
                    {t('downloadCV')}
                  </button>
                  <button className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gold/6 border border-gold/20 text-gold text-sm font-semibold hover:bg-gold/12 hover:border-gold/30 transition-all cursor-pointer">
                    <Send size={16} />
                    {t('sendOffer')}
                  </button>
                </div>

                {/* Contact */}
                <div className="mt-5 pt-5 border-t border-border-dark/25 space-y-2.5">
                  <a
                    href={`mailto:${student.email}`}
                    className="flex items-center gap-2.5 text-sm text-text-secondary-dark hover:text-primary-light transition-colors"
                  >
                    <Mail size={14} />
                    {student.email}
                  </a>
                  {student.linkedin && (
                    <a
                      href={student.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-sm text-text-secondary-dark hover:text-primary-light transition-colors"
                    >
                      <Linkedin size={14} />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>

              {/* Similar Talent */}
              <div className="premium-card p-7">
                <h2 className="text-lg font-display font-bold text-white mb-5 flex items-center gap-3">
                  <Sparkles size={16} className="text-gold" />
                  {t('similarTalent')}
                </h2>
                <div className="space-y-3">
                  {similarStudents.map((s) => (
                    <Link
                      key={s.id}
                      href={`/talent-pool/${s.id}`}
                      className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-surface-elevated-dark/30 transition-all duration-200 group"
                    >
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden avatar-ring">
                        <Image
                          src={s.photo}
                          alt={s.name}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate group-hover:text-gold transition-colors">
                          {s.name}
                        </p>
                        <p className="text-xs text-text-secondary-dark">{s.major[locale]}</p>
                      </div>
                      <div className="text-xs font-bold text-success tabular-nums">{s.matchScore}%</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
