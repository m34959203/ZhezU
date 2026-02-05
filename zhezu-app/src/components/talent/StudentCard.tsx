'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { MapPin, Star, Briefcase, ChevronRight } from 'lucide-react';
import type { StudentProfile, Locale } from '@/types';
import { RadarChart } from './RadarChart';

interface StudentCardProps {
  student: StudentProfile;
}

export function StudentCard({ student }: StudentCardProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('talent');

  return (
    <Link
      href={`/talent-pool/${student.id}`}
      className="block group"
    >
      <div className="rounded-2xl border border-border-dark/60 bg-surface-dark/50 backdrop-blur-sm p-5 hover:border-gold/30 hover:bg-surface-dark/80 transition-all duration-300 hover:-translate-y-1">
        <div className="flex gap-4">
          {/* Photo + basic info */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-gold/30">
              <Image
                src={student.photo}
                alt={student.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex items-center gap-1 text-gold text-xs font-semibold">
              <Star size={12} className="fill-gold" />
              {student.gpa}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-white text-base group-hover:text-gold transition-colors truncate">
              {student.name}
            </h3>
            <p className="text-sm text-primary-light font-medium">{student.major[locale]}</p>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-text-secondary-dark">
              <span className="flex items-center gap-1">
                <MapPin size={11} />
                {student.classRank}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase size={11} />
                {student.internships} {t('internships')}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {student.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/15 text-primary-light border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Match score + arrow */}
          <div className="flex flex-col items-center justify-center gap-1 shrink-0">
            <div className="w-12 h-12 rounded-full border-2 border-success flex items-center justify-center">
              <span className="text-sm font-bold text-success">{student.matchScore}%</span>
            </div>
            <span className="text-[9px] text-text-secondary-dark">{t('match')}</span>
            <ChevronRight size={16} className="text-text-secondary-dark group-hover:text-gold transition-colors mt-1" />
          </div>
        </div>

        {/* Mini radar preview */}
        <div className="flex items-center justify-center mt-3 pt-3 border-t border-border-dark/40">
          <RadarChart skills={student.skills} size={130} />
        </div>
      </div>
    </Link>
  );
}
