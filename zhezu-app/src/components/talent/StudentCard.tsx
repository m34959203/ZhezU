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
    <Link href={`/talent-pool/${student.id}`} className="group block">
      <div className="premium-card group-hover:premium-card p-6">
        {/* Top section */}
        <div className="flex gap-5">
          {/* Photo + GPA */}
          <div className="flex shrink-0 flex-col items-center gap-2.5">
            <div className="avatar-ring relative h-[72px] w-[72px] overflow-hidden rounded-2xl">
              <Image
                src={student.photo}
                alt={student.name}
                fill
                className="object-cover"
                sizes="72px"
              />
            </div>
            <div className="bg-gold/8 border-gold/15 flex items-center gap-1 rounded-full border px-2.5 py-1">
              <Star
                size={11}
                className="text-gold-dark dark:text-gold fill-gold-dark dark:fill-gold"
              />
              <span className="text-gold-dark dark:text-gold text-xs font-bold tabular-nums">
                {student.gpa}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-text-primary-light group-hover:text-gold-dark dark:group-hover:text-gold truncate text-[15px] leading-tight font-bold transition-colors duration-300 dark:text-white">
              {student.name}
            </h3>
            <p className="text-primary dark:text-primary-light mt-0.5 text-sm font-semibold">
              {student.major[locale]}
            </p>

            <div className="text-text-secondary-light dark:text-text-secondary-dark mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
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
            <div className="mt-3 flex flex-wrap gap-1.5">
              {student.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="bg-primary/8 text-primary dark:text-primary-light/80 border-primary/15 rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Match score */}
          <div className="flex shrink-0 flex-col items-center justify-between py-1">
            <div className="relative">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: `0 0 15px rgba(34,197,94,${student.matchScore > 90 ? 0.2 : 0.1})`,
                }}
              />
              <div className="border-success/50 bg-success/5 flex h-14 w-14 items-center justify-center rounded-full border-2">
                <span className="text-success text-base font-bold tabular-nums">
                  {student.matchScore}%
                </span>
              </div>
            </div>
            <span className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-[9px] font-medium tracking-wider uppercase">
              {t('match')}
            </span>
            <ChevronRight
              size={18}
              className="text-text-secondary-light/40 dark:text-text-secondary-dark/40 group-hover:text-gold-dark dark:group-hover:text-gold mt-1 transition-all duration-300 group-hover:translate-x-0.5"
            />
          </div>
        </div>

        {/* Radar preview */}
        <div className="border-border-light dark:border-border-dark/30 mt-4 flex items-center justify-center border-t pt-4">
          <RadarChart skills={student.skills} size={140} />
        </div>
      </div>
    </Link>
  );
}
