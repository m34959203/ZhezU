'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { MapPin, Star, Briefcase, ChevronRight, Globe } from 'lucide-react';
import type { StudentProfile, Locale } from '@/types';
import { RadarChart } from './RadarChart';

interface StudentCardProps {
  student: StudentProfile;
}

export function StudentCard({ student }: StudentCardProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('talent');

  return (
    <Link href={`/talent-pool/${student.id}`} className="block group">
      <div className="premium-card p-6 group-hover:premium-card">
        {/* Top section */}
        <div className="flex gap-5">
          {/* Photo + GPA */}
          <div className="flex flex-col items-center gap-2.5 shrink-0">
            <div className="relative w-[72px] h-[72px] rounded-2xl overflow-hidden avatar-ring">
              <Image
                src={student.photo}
                alt={student.name}
                fill
                className="object-cover"
                sizes="72px"
              />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold/8 border border-gold/15">
              <Star size={11} className="text-gold-dark dark:text-gold fill-gold-dark dark:fill-gold" />
              <span className="text-xs font-bold text-gold-dark dark:text-gold tabular-nums">{student.gpa}</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-text-primary-light dark:text-white text-[15px] leading-tight group-hover:text-gold-dark dark:group-hover:text-gold transition-colors duration-300 truncate">
              {student.name}
            </h3>
            <p className="text-sm text-primary dark:text-primary-light font-semibold mt-0.5">{student.major[locale]}</p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">
              <span className="flex items-center gap-1">
                <MapPin size={11} className="text-gold/70" />
                {student.classRank}
              </span>
              <span className="flex items-center gap-1">
                <Globe size={11} className="text-primary/70 dark:text-primary-light/70" />
                {student.englishLevel}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase size={11} className="text-success/70" />
                {student.internships} {t('internships')}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {student.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/8 text-primary dark:text-primary-light/80 border border-primary/15 tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Match score */}
          <div className="flex flex-col items-center justify-between shrink-0 py-1">
            <div className="relative">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: `0 0 15px rgba(34,197,94,${student.matchScore > 90 ? 0.2 : 0.1})`,
                }}
              />
              <div className="w-14 h-14 rounded-full border-2 border-success/50 flex items-center justify-center bg-success/5">
                <span className="text-base font-bold text-success tabular-nums">{student.matchScore}%</span>
              </div>
            </div>
            <span className="text-[9px] text-text-secondary-light dark:text-text-secondary-dark font-medium uppercase tracking-wider mt-1">{t('match')}</span>
            <ChevronRight
              size={18}
              className="text-text-secondary-light/40 dark:text-text-secondary-dark/40 group-hover:text-gold-dark dark:group-hover:text-gold group-hover:translate-x-0.5 transition-all duration-300 mt-1"
            />
          </div>
        </div>

        {/* Radar preview */}
        <div className="flex items-center justify-center mt-4 pt-4 border-t border-border-light dark:border-border-dark/30">
          <RadarChart skills={student.skills} size={140} />
        </div>
      </div>
    </Link>
  );
}
