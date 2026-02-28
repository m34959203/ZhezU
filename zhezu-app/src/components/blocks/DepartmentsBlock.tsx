'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { BookOpen, Zap, Wrench, Mountain, Landmark } from 'lucide-react';
import type { Locale } from '@/types';
import type { UniversityData } from '@/lib/admin/types';

const DEPT_ICON_MAP: Record<string, typeof BookOpen> = {
  'pedagogy-philology': BookOpen,
  'mining-metallurgy-science': Mountain,
  'history-economics-law': Landmark,
  'electrical-safety': Zap,
  'machines-construction': Wrench,
};

const DEPT_COLORS: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
  'pedagogy-philology': { bg: 'bg-yellow-50', text: 'text-yellow-600', darkBg: 'dark:bg-yellow-900/20', darkText: 'dark:text-yellow-400' },
  'mining-metallurgy-science': { bg: 'bg-blue-50', text: 'text-blue-600', darkBg: 'dark:bg-blue-900/20', darkText: 'dark:text-blue-400' },
  'history-economics-law': { bg: 'bg-green-50', text: 'text-green-600', darkBg: 'dark:bg-green-900/20', darkText: 'dark:text-green-400' },
  'electrical-safety': { bg: 'bg-purple-50', text: 'text-purple-600', darkBg: 'dark:bg-purple-900/20', darkText: 'dark:text-purple-400' },
  'machines-construction': { bg: 'bg-orange-50', text: 'text-orange-600', darkBg: 'dark:bg-orange-900/20', darkText: 'dark:text-orange-400' },
};

interface DepartmentsBlockProps {
  departments: UniversityData['departments'];
  columns?: number;
}

export default function DepartmentsBlock({ departments, columns }: DepartmentsBlockProps) {
  const t = useTranslations('home');
  const locale = useLocale() as Locale;
  const cols = columns || 5;
  const gridCls =
    cols === 3
      ? 'grid-cols-2 sm:grid-cols-3'
      : cols === 4
        ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
        : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5';

  return (
    <section className="bg-bg-light dark:bg-bg-dark py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-text-primary-light dark:text-text-primary-dark mb-10 text-3xl font-bold md:text-4xl">
          {t('departments.title')}
        </h2>
        <div className={`grid ${gridCls} gap-4`}>
          {departments.map((dept) => {
            const IconComp = DEPT_ICON_MAP[dept.id] || BookOpen;
            const colors = DEPT_COLORS[dept.id] || {
              bg: 'bg-gray-50', text: 'text-gray-400',
              darkBg: 'dark:bg-gray-800/20', darkText: 'dark:text-gray-400',
            };
            return (
              <Link
                key={dept.id}
                href="/academics"
                className="group border-border-light bg-surface-light hover:border-primary/30 dark:border-border-dark dark:bg-surface-dark dark:hover:border-primary-light/30 flex flex-col items-center rounded-xl border p-6 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div
                  className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText} group-hover:text-primary dark:group-hover:text-primary-light transition-all group-hover:scale-110`}
                >
                  <IconComp size={28} />
                </div>
                <h3 className="text-text-primary-light dark:text-text-primary-dark text-sm font-bold">
                  {dept.shortName[locale]}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
