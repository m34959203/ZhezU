'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Building2,
  Microscope,
  Brain,
  Heart,
  BookOpen,
  Settings,
} from 'lucide-react';

interface PageEntry {
  path: string;
  label: string;
  description: string;
  /** Link to admin editor if one exists for this page */
  adminHref?: string;
}

interface PageSection {
  title: string;
  icon: React.ReactNode;
  color: string;
  pages: PageEntry[];
}

const SECTIONS: PageSection[] = [
  {
    title: 'Университет',
    icon: <Building2 size={18} />,
    color: 'text-blue-500 bg-blue-500/10',
    pages: [
      {
        path: '/university',
        label: 'О вузе',
        description: 'Главная страница раздела с общей информацией',
        adminHref: '/admin/university',
      },
      {
        path: '/university/about',
        label: 'История',
        description: 'История университета, хронология ключевых событий',
      },
      {
        path: '/university/mission',
        label: 'Миссия и видение',
        description: 'Миссия, ценности и стратегические цели вуза',
      },
      {
        path: '/university/rector',
        label: 'Ректор',
        description: 'Обращение ректора, биография и фото',
        adminHref: '/admin/university',
      },
      {
        path: '/university/administration',
        label: 'Администрация',
        description: 'Проректоры и руководство университета',
        adminHref: '/admin/university',
      },
      {
        path: '/university/senate',
        label: 'Сенат',
        description: 'Состав и деятельность Сената',
      },
      {
        path: '/university/accreditation',
        label: 'Аккредитация',
        description: 'Документы об аккредитации и лицензии',
      },
      {
        path: '/university/rankings',
        label: 'Рейтинги',
        description: 'Позиции университета в рейтингах',
      },
      {
        path: '/university/partners',
        label: 'Партнёры',
        description: 'Партнёрские организации и международные связи',
      },
    ],
  },
  {
    title: 'Поступление',
    icon: <GraduationCap size={18} />,
    color: 'text-emerald-500 bg-emerald-500/10',
    pages: [
      {
        path: '/admission',
        label: 'Главная поступления',
        description: 'Общая информация для абитуриентов',
      },
      {
        path: '/admission/programs',
        label: 'Программы обучения',
        description: 'Перечень специальностей бакалавриата и магистратуры',
        adminHref: '/admin/university',
      },
      {
        path: '/admission/requirements',
        label: 'Требования',
        description: 'Необходимые документы и условия поступления',
      },
      {
        path: '/admission/apply',
        label: 'Подать заявку',
        description: 'Форма подачи заявления',
      },
      {
        path: '/admission/scholarships',
        label: 'Стипендии и гранты',
        description: 'Информация о стипендиальных программах',
      },
      {
        path: '/admission/contact',
        label: 'FAQ и контакты',
        description: 'Ответы на вопросы и контакты приёмной комиссии',
        adminHref: '/admin/contact',
      },
    ],
  },
  {
    title: 'Образование',
    icon: <BookOpen size={18} />,
    color: 'text-purple-500 bg-purple-500/10',
    pages: [
      {
        path: '/academics/bachelor',
        label: 'Бакалавриат',
        description: 'Программы бакалавриата, учебные планы',
        adminHref: '/admin/university',
      },
      {
        path: '/academics/master',
        label: 'Магистратура',
        description: 'Программы магистратуры',
        adminHref: '/admin/university',
      },
      {
        path: '/academics/departments',
        label: 'Кафедры',
        description: 'Список кафедр и их описание',
        adminHref: '/admin/university',
      },
      {
        path: '/academics/faculty',
        label: 'Профессорско-преподавательский состав',
        description: 'Статистика и информация о ППС',
      },
      {
        path: '/academics/schedule',
        label: 'Расписание',
        description: 'Расписание занятий',
      },
      {
        path: '/academics/library',
        label: 'Библиотека',
        description: 'Информация о библиотечных ресурсах',
      },
    ],
  },
  {
    title: 'Наука',
    icon: <Microscope size={18} />,
    color: 'text-amber-500 bg-amber-500/10',
    pages: [
      {
        path: '/research/publications',
        label: 'Публикации',
        description: 'Научные публикации сотрудников',
      },
      {
        path: '/research/conferences',
        label: 'Конференции',
        description: 'Научные конференции и мероприятия',
      },
      {
        path: '/research/labs',
        label: 'Лаборатории',
        description: 'Научно-исследовательские лаборатории',
      },
      {
        path: '/research/grants',
        label: 'Гранты',
        description: 'Грантовые проекты и возможности',
      },
    ],
  },
  {
    title: 'AI-Центр',
    icon: <Brain size={18} />,
    color: 'text-cyan-500 bg-cyan-500/10',
    pages: [
      {
        path: '/ai-center',
        label: 'Главная AI-Центра',
        description: 'Обзор деятельности центра искусственного интеллекта',
      },
      {
        path: '/ai-center/projects',
        label: 'Проекты',
        description: 'AI-проекты университета',
      },
      {
        path: '/ai-center/agents/talapker',
        label: 'Talapker',
        description: 'AI-помощник для абитуриентов',
      },
      {
        path: '/ai-center/tools',
        label: 'AI-инструменты',
        description: 'Инструменты на основе ИИ',
      },
      {
        path: '/ai-center/lab',
        label: 'Лаборатория',
        description: 'AI-лаборатория университета',
      },
    ],
  },
  {
    title: 'Жизнь',
    icon: <Heart size={18} />,
    color: 'text-rose-500 bg-rose-500/10',
    pages: [
      {
        path: '/life',
        label: 'Студенческая жизнь',
        description: 'Обзор студенческой жизни',
      },
      {
        path: '/life/events',
        label: 'События',
        description: 'Мероприятия и события в университете',
      },
      {
        path: '/life/sports',
        label: 'Спорт',
        description: 'Спортивные секции и достижения',
      },
      {
        path: '/life/dormitories',
        label: 'Общежития',
        description: 'Информация о проживании для студентов',
      },
      {
        path: '/life/clubs',
        label: 'Клубы и кружки',
        description: 'Студенческие организации и клубы по интересам',
      },
    ],
  },
];

export default function PagesManagerPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('Университет');

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Обзор всех страниц сайта. Нажмите на ссылку, чтобы посмотреть страницу.
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
                        <p className="text-xs text-slate-400">{page.description}</p>
                      </div>
                      <div className="ml-4 flex items-center gap-2">
                        {page.adminHref && (
                          <Link
                            href={page.adminHref}
                            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-500/10"
                            title="Редактировать данные"
                          >
                            <Settings size={14} />
                          </Link>
                        )}
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
