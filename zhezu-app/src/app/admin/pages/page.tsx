'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FileEdit,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Building2,
  Microscope,
  Brain,
  Heart,
  BookOpen,
} from 'lucide-react';

interface PageSection {
  title: string;
  icon: React.ReactNode;
  color: string;
  pages: { path: string; namespace: string; label: string }[];
}

const SECTIONS: PageSection[] = [
  {
    title: 'Университет',
    icon: <Building2 size={18} />,
    color: 'text-blue-500 bg-blue-500/10',
    pages: [
      { path: '/university', namespace: 'university.hub', label: 'О вузе — хаб' },
      { path: '/university/about', namespace: 'university.about', label: 'История' },
      { path: '/university/mission', namespace: 'university.mission', label: 'Миссия' },
      { path: '/university/rector', namespace: 'university.rector', label: 'Ректор' },
      {
        path: '/university/administration',
        namespace: 'university.administration',
        label: 'Администрация',
      },
      { path: '/university/senate', namespace: 'university.senate', label: 'Сенат' },
      {
        path: '/university/accreditation',
        namespace: 'university.accreditation',
        label: 'Аккредитация',
      },
      { path: '/university/rankings', namespace: 'university.rankings', label: 'Рейтинги' },
      { path: '/university/partners', namespace: 'university.partners', label: 'Партнёры' },
    ],
  },
  {
    title: 'Поступление',
    icon: <GraduationCap size={18} />,
    color: 'text-emerald-500 bg-emerald-500/10',
    pages: [
      { path: '/admission', namespace: 'admission', label: 'Хаб поступления' },
      { path: '/admission/programs', namespace: 'admission.programs', label: 'Программы' },
      { path: '/admission/requirements', namespace: 'admission.requirements', label: 'Требования' },
      { path: '/admission/apply', namespace: 'admission.apply', label: 'Подать заявку' },
      { path: '/admission/scholarships', namespace: 'admission.scholarships', label: 'Стипендии' },
      { path: '/admission/contact', namespace: 'admission.contact', label: 'FAQ и контакты' },
    ],
  },
  {
    title: 'Образование',
    icon: <BookOpen size={18} />,
    color: 'text-purple-500 bg-purple-500/10',
    pages: [
      { path: '/academics/bachelor', namespace: 'academics.bachelor', label: 'Бакалавриат' },
      { path: '/academics/master', namespace: 'academics.master', label: 'Магистратура' },
      { path: '/academics/departments', namespace: 'academics.departments', label: 'Кафедры' },
      { path: '/academics/faculty', namespace: 'academics.faculty', label: 'ППС' },
      { path: '/academics/schedule', namespace: 'academics.schedule', label: 'Расписание' },
      { path: '/academics/library', namespace: 'academics.library', label: 'Библиотека' },
    ],
  },
  {
    title: 'Наука',
    icon: <Microscope size={18} />,
    color: 'text-amber-500 bg-amber-500/10',
    pages: [
      { path: '/research/publications', namespace: 'research.publications', label: 'Публикации' },
      { path: '/research/conferences', namespace: 'research.conferences', label: 'Конференции' },
      { path: '/research/labs', namespace: 'research.labs', label: 'Лаборатории' },
      { path: '/research/grants', namespace: 'research.grants', label: 'Гранты' },
    ],
  },
  {
    title: 'AI-Центр',
    icon: <Brain size={18} />,
    color: 'text-cyan-500 bg-cyan-500/10',
    pages: [
      { path: '/ai-center', namespace: 'aiCenter', label: 'Главная AI' },
      { path: '/ai-center/projects', namespace: 'aiCenter.projectsPage', label: 'Проекты' },
      { path: '/ai-center/agents/talapker', namespace: 'aiCenter.talapker', label: 'Talapker' },
      { path: '/ai-center/tools', namespace: 'aiCenter.aiTools', label: 'AI-инструменты' },
      { path: '/ai-center/lab', namespace: 'aiCenter.labPage', label: 'Лаборатория' },
    ],
  },
  {
    title: 'Жизнь',
    icon: <Heart size={18} />,
    color: 'text-rose-500 bg-rose-500/10',
    pages: [
      { path: '/life', namespace: 'life.hub', label: 'Хаб' },
      { path: '/life/events', namespace: 'life.events', label: 'События' },
      { path: '/life/sports', namespace: 'life.sports', label: 'Спорт' },
      { path: '/life/dormitories', namespace: 'life.dormitories', label: 'Общежития' },
      { path: '/life/clubs', namespace: 'life.clubs', label: 'Клубы' },
    ],
  },
];

export default function PagesManagerPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('Университет');

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Выберите страницу для редактирования контента. Для изменения текстов перейдите в{' '}
        <Link href="/admin/translations" className="text-blue-500 hover:underline">
          Редактор переводов
        </Link>
        .
      </p>

      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const isExpanded = expandedSection === section.title;
          return (
            <div
              key={section.title}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            >
              <button
                type="button"
                onClick={() => setExpandedSection(isExpanded ? null : section.title)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${section.color}`}>{section.icon}</div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{section.title}</h3>
                    <p className="text-xs text-slate-400">{section.pages.length} страниц</p>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                />
              </button>

              {isExpanded && (
                <div className="divide-y divide-slate-100 border-t border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                  {section.pages.map((page) => (
                    <div
                      key={page.path}
                      className="flex items-center justify-between px-6 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {page.label}
                        </p>
                        <p className="truncate font-mono text-xs text-slate-400">
                          {page.namespace}
                        </p>
                      </div>
                      <div className="ml-4 flex items-center gap-2">
                        <Link
                          href={`/admin/translations?ns=${page.namespace}`}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-500/10"
                          title="Редактировать переводы"
                        >
                          <FileEdit size={14} />
                        </Link>
                        <Link
                          href={`/ru${page.path}`}
                          target="_blank"
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                          title="Открыть страницу"
                        >
                          <ExternalLink size={14} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
