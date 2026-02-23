import { Link } from '@/i18n/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DEPARTMENTS, PROGRAMS } from '@/lib/constants';
import { ArrowRight, Clock, BookOpen, Globe } from 'lucide-react';
import type { Locale } from '@/types';

type Program = (typeof PROGRAMS)[number];

interface ProgramCardProps {
  program: Program;
  locale: Locale;
}

const DEGREE_LABELS: Record<string, Record<Locale, string>> = {
  bachelor: { kk: 'Бакалавриат', ru: 'Бакалавриат', en: 'Bachelor' },
  master: { kk: 'Магистратура', ru: 'Магистратура', en: 'Master' },
  doctorate: { kk: 'Докторантура', ru: 'Докторантура', en: 'Doctorate' },
};

const LANGUAGE_LABELS: Record<string, string> = {
  kk: 'QAZ',
  ru: 'RUS',
  en: 'ENG',
};

export function ProgramCard({ program, locale }: ProgramCardProps) {
  const department = DEPARTMENTS.find((d) => d.id === program.department);

  return (
    <Link href={`/academics/${program.id}`} className="block group">
      <Card hover className="h-full">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="primary">
            {DEGREE_LABELS[program.degree]?.[locale] ?? program.degree}
          </Badge>
          {department && (
            <Badge
              className="border"
              style={{
                backgroundColor: `${department.color}15`,
                color: department.color,
                borderColor: `${department.color}30`,
              }}
            >
              {department.shortName[locale]}
            </Badge>
          )}
        </div>

        {/* Title & description */}
        <CardHeader>
          <CardTitle className="group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
            {program.name[locale]}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {program.description[locale]}
          </CardDescription>
        </CardHeader>

        {/* Compact info row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-4 border-t border-border-light dark:border-border-dark text-xs text-text-secondary-light dark:text-text-secondary-dark">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} className="text-primary/60 dark:text-primary-light/60" />
            {program.duration} {locale === 'en' ? 'years' : locale === 'ru' ? 'года' : 'жыл'}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen size={13} className="text-primary/60 dark:text-primary-light/60" />
            {program.credits} {locale === 'en' ? 'credits' : locale === 'ru' ? 'кредитов' : 'кредит'}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Globe size={13} className="text-primary/60 dark:text-primary-light/60" />
            {program.languages.map((l) => LANGUAGE_LABELS[l] || l).join(' / ')}
          </span>
        </div>

        {/* Link */}
        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary dark:text-primary-light group-hover:gap-2.5 transition-all duration-300">
          {locale === 'en' ? 'Learn more' : locale === 'kk' ? 'Толығырақ' : 'Подробнее'}
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </Card>
    </Link>
  );
}
