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
    { value: '12+', label: t('stats.projects'), icon: Lightbulb, color: 'text-primary dark:text-primary-light' },
    { value: '200+', label: t('stats.students'), icon: Users, color: 'text-gold' },
    { value: '8', label: t('stats.partners'), icon: Handshake, color: 'text-success' },
    { value: '15+', label: t('stats.publications'), icon: BookOpen, color: 'text-primary dark:text-primary-light' },
  ];

  const projects = [
    {
      icon: Bot,
      title: 'Talapker Guide',
      description: 'AI-помощник для абитуриентов: персональный гид по поступлению, подбор программ и ответы на вопросы в реальном времени.',
      status: 'active' as const,
      color: 'text-primary dark:text-primary-light',
      bg: 'bg-primary/10 dark:bg-primary-light/10',
    },
    {
      icon: Users,
      title: 'Talent Pool',
      description: 'Платформа для сопоставления навыков студентов с требованиями работодателей. Умный подбор талантов и стажировок.',
      status: 'active' as const,
      color: 'text-gold',
      bg: 'bg-gold/10',
    },
    {
      icon: Building2,
      title: 'Smart Campus',
      description: 'IoT-система управления кампусом: умное освещение, климат-контроль, мониторинг аудиторий и оптимизация ресурсов.',
      status: 'development' as const,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      icon: Cpu,
      title: 'Mining AI',
      description: 'Применение искусственного интеллекта в горнодобывающей промышленности: прогнозирование, оптимизация и безопасность.',
      status: 'development' as const,
      color: 'text-primary dark:text-primary-light',
      bg: 'bg-primary/10 dark:bg-primary-light/10',
    },
  ];

  const tools = [
    {
      icon: MessageSquare,
      title: 'AI-Ассистент',
      description: 'Чат-бот на базе GPT для студентов и преподавателей. Ответы на вопросы, помощь с учебными материалами.',
      color: 'text-primary dark:text-primary-light',
      bg: 'bg-primary/10 dark:bg-primary-light/10',
    },
    {
      icon: BarChart3,
      title: 'Анализатор навыков',
      description: 'Инструмент оценки и визуализации компетенций студентов. Рекомендации по развитию карьеры.',
      color: 'text-gold',
      bg: 'bg-gold/10',
    },
    {
      icon: FileSearch,
      title: 'Обработка документов',
      description: 'Автоматическая обработка и классификация документов с помощью AI. OCR, извлечение данных, верификация.',
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      icon: Sparkles,
      title: 'Рекомендательная система',
      description: 'Персональные рекомендации курсов, мероприятий и возможностей на основе профиля студента.',
      color: 'text-primary dark:text-primary-light',
      bg: 'bg-primary/10 dark:bg-primary-light/10',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(29,86,201,0.08),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <Badge className="mb-4">{t('badge')}</Badge>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-8">
              {t('subtitle')}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon size={24} className={`mx-auto mb-2 ${stat.color} transition-transform duration-300 hover:scale-110`} />
                  <p className="text-2xl font-display font-bold">{stat.value}</p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 lg:py-24 bg-surface-light dark:bg-surface-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">
              {t('projects.title')}
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Ключевые проекты AI-Центра университета
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.title} hover glow padding="lg">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${project.bg}`}
                  >
                    <project.icon size={24} className={project.color} />
                  </div>
                  <Badge variant={project.status === 'active' ? 'success' : 'warning'}>
                    {project.status === 'active' ? 'Активный' : 'В разработке'}
                  </Badge>
                </div>
                <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
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
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              {t('tools.title')}
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
              Инструменты на базе искусственного интеллекта, доступные студентам и преподавателям
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <Card key={tool.title} hover glow padding="lg">
                <div
                  className={`w-14 h-14 ${tool.bg} rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
                >
                  <tool.icon size={28} className={tool.color} />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
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
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-[#0f3380] p-8 sm:p-12 lg:p-16 text-white text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(230,179,37,0.2),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_50%)]" />
            <div className="relative">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain size={32} className="text-gold" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
                {t('cta.description')}
              </p>
              <Link href="/contact">
                <Button variant="secondary" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
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
