'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/types';
import type { UniversityData } from '@/lib/admin/types';

const DEGREE_COLORS: Record<string, string> = {
  bachelor: 'bg-[#e6b325]',
  master: 'bg-purple-600',
  doctorate: 'bg-emerald-600',
};

interface ProgramsBlockProps {
  programs: UniversityData['programs'];
  programImages: Record<string, string>;
  maxItems?: number;
}

export default function ProgramsBlock({ programs, programImages, maxItems = 4 }: ProgramsBlockProps) {
  const t = useTranslations('home');
  const tActions = useTranslations('actions');
  const locale = useLocale() as Locale;

  const featuredPrograms = programs
    .filter((p) => Object.keys(programImages).includes(p.id))
    .slice(0, maxItems);

  return (
    <section className="bg-bg-light dark:bg-bg-dark overflow-hidden py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-text-primary-light dark:text-text-primary-dark mb-2 text-3xl font-bold md:text-4xl">
              {t('programs.title')}
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              {t('programs.subtitle')}
            </p>
          </div>
          <Link
            href="/academics"
            className="text-primary dark:text-primary-light hidden items-center gap-1 font-semibold transition-all hover:gap-2 md:flex"
          >
            {tActions('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8">
          {featuredPrograms.map((program) => (
            <div
              key={program.id}
              className="group relative min-w-[280px] cursor-pointer snap-center overflow-hidden rounded-2xl shadow-md md:min-w-[340px]"
            >
              <div className="aspect-[4/5] w-full">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${programImages[program.id]})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <span
                  className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold text-white ${DEGREE_COLORS[program.degree] || 'bg-blue-600'}`}
                >
                  {program.degree === 'bachelor'
                    ? 'Bachelor'
                    : program.degree === 'master'
                      ? 'Master'
                      : 'PhD'}
                </span>
                <h3 className="mb-1 text-xl font-bold text-white">{program.name[locale]}</h3>
                <p className="line-clamp-2 text-sm text-gray-300">
                  {program.description[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center md:hidden">
          <Link href="/academics">
            <Button variant="ghost" icon={<ArrowRight size={16} />} iconPosition="right">
              {tActions('viewAll')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
