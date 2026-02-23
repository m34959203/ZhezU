'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Bot,
  Users,
  Building2,
  Cpu,
  Brain,
  Sparkles,
  FileSearch,
  MessageSquare,
  ArrowRight,
  Lightbulb,
  BarChart3,
  Handshake,
  BookOpen,
} from 'lucide-react';
import type { Locale } from '@/types';

export default function AICenterPage() {
  const t = useTranslations('aiCenter');

  const stats = [
    {
      value: '12+',
      label: t('stats.projects'),
      icon: Lightbulb,
      color: 'text-primary dark:text-primary-light',
    },
    { value: '200+', label: t('stats.students'), icon: Users, color: 'text-gold' },
    { value: '8', label: t('stats.partners'), icon: Handshake, color: 'text-success' },
    {
      value: '15+',
      label: t('stats.publications'),
      icon: BookOpen,
      color: 'text-primary dark:text-primary-light',
    },
  ];

  const projects = [
    {
      icon: Bot,
      title: 'Talapker Guide',
      description:
        'AI-помощник для абитуриентов: персональный гид по поступлению, подбор программ и ответы на вопросы в реальном времени.',
      status: 'active' as const,
      color: 'text-primary dark:text-primary-light',
      bg: 'bg-primary/10 dark:bg-primary-light/10',
    },
    {
      icon: Users,
      title: 'Talent Pool',
      description:
        'Платформа для сопоставления навыков студентов с требованиями работодателей. Умный подбор талантов и стажировок.',
      status: 'active' as const,
      color: 'text-gold',
      bg: 'bg-gold/10',
    },
    {
      icon: Building2,
      title: 'Smart Campus',
      description:
        'IoT-система управления кампусом: умное освещение, климат-контроль, мониторинг аудиторий и оптимизация ресурсов.',
      status: 'development' as const,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      icon: Cpu,
      title: 'Mining AI',
      description:
        'Применение искусственного интеллекта в горнодобывающей промышленности: прогнозирование, оптимизация и безопасность.',
      status: 'development' as const,
      color: 'text-primary dark:text-primary-light',
      bg: 'bg-primary/10 dark:bg-primary-light/10',
    },
  ];

  const tools = [
    {
      icon: MessageSquare,
      title: 'AI-Ассистент',
      description:
        'Чат-бот на базе GPT для студентов и преподавателей. Ответы на вопросы, помощь с учебными материалами.',
      color: 'text-primary dark:text-primary-light',
      bg: 'bg-primary/10 dark:bg-primary-light/10',
    },
    {
      icon: BarChart3,
      title: 'Анализатор навыков',
      description:
        'Инструмент оценки и визуализации компетенций студентов. Рекомендации по развитию карьеры.',
      color: 'text-gold',
      bg: 'bg-gold/10',
    },
    {
      icon: FileSearch,
      title: 'Обработка документов',
      description:
        'Автоматическая обработка и классификация документов с помощью AI. OCR, извлечение данных, верификация.',
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      icon: Sparkles,
      title: 'Рекомендательная система',
      description:
        'Персональные рекомендации курсов, мероприятий и возможностей на основе профиля студента.',
      color: 'text-primary dark:text-primary-light',
      bg: 'bg-primary/10 dark:bg-primary-light/10',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="from-primary/5 to-gold/5 absolute inset-0 bg-gradient-to-br via-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(29,86,201,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4">{t('badge')}</Badge>
            <h1 className="font-display mb-6 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 text-lg leading-relaxed">
              {t('subtitle')}
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon
                    size={24}
                    className={`mx-auto mb-2 ${stat.color} transition-transform duration-300 hover:scale-110`}
                  />
                  <p className="font-display text-2xl font-bold">{stat.value}</p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="font-display mb-2 text-3xl font-bold sm:text-4xl">
              {t('projects.title')}
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Ключевые проекты AI-Центра университета
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.title} hover glow padding="lg">
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${project.bg}`}
                  >
                    <project.icon size={24} className={project.color} />
                  </div>
                  <Badge variant={project.status === 'active' ? 'success' : 'warning'}>
                    {project.status === 'active' ? 'Активный' : 'В разработке'}
                  </Badge>
                </div>
                <h3 className="font-display group-hover:text-primary dark:group-hover:text-primary-light mb-2 text-lg font-semibold transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                  {project.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold sm:text-4xl">{t('tools.title')}</h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto max-w-2xl">
              Инструменты на базе искусственного интеллекта, доступные студентам и преподавателям
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <Card key={tool.title} hover glow padding="lg">
                <div
                  className={`h-14 w-14 ${tool.bg} mb-5 flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110`}
                >
                  <tool.icon size={28} className={tool.color} />
                </div>
                <h3 className="font-display group-hover:text-primary dark:group-hover:text-primary-light mb-2 text-lg font-semibold transition-colors">
                  {tool.title}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                  {tool.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="from-primary via-primary-dark relative overflow-hidden rounded-2xl bg-gradient-to-br to-[#0f3380] p-8 text-center text-white sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(230,179,37,0.2),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_50%)]" />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <Brain size={32} className="text-gold" />
              </div>
              <h2 className="font-display mb-4 text-3xl font-bold sm:text-4xl">{t('cta.title')}</h2>
              <p className="mx-auto mb-8 max-w-xl leading-relaxed text-white/70">
                {t('cta.description')}
              </p>
              <Link href="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  {t('cta.button')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
