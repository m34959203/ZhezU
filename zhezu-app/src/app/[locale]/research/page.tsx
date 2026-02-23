'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  BookOpen,
  Award,
  Calendar,
  FlaskConical,
  ArrowRight,
  Microscope,
  Cpu,
  Leaf,
  Mountain,
  Beaker,
  Users,
  ExternalLink,
  FileText,
} from 'lucide-react';
import type { Locale } from '@/types';

export default function ResearchPage() {
  const t = useTranslations('research');
  const params = useParams();
  const locale = (params.locale || 'ru') as Locale;

  const stats = [
    { value: '150+', label: 'Публикаций', icon: BookOpen, color: 'text-primary dark:text-primary-light', bg: 'bg-primary/10 dark:bg-primary-light/10' },
    { value: '12', label: 'Грантов', icon: Award, color: 'text-gold', bg: 'bg-gold/10' },
    { value: '8', label: 'Конференций', icon: Calendar, color: 'text-success', bg: 'bg-success/10' },
    { value: '5', label: 'Лабораторий', icon: FlaskConical, color: 'text-primary dark:text-primary-light', bg: 'bg-primary/10 dark:bg-primary-light/10' },
  ];

  const researchAreas = [
    {
      icon: Mountain,
      title: 'Горное дело и геология',
      description: 'Исследования в области разработки месторождений, геомеханики, обогащения полезных ископаемых и экологии горного производства.',
      projects: 5,
      researchers: 18,
      color: '#0d9488',
      bgColor: 'bg-[#0d9488]/10',
      textColor: 'text-[#0d9488]',
    },
    {
      icon: Beaker,
      title: 'Металлургия и материалы',
      description: 'Разработка новых сплавов и композитных материалов, оптимизация металлургических процессов, нанотехнологии.',
      projects: 4,
      researchers: 12,
      color: '#2563eb',
      bgColor: 'bg-[#2563eb]/10',
      textColor: 'text-[#2563eb]',
    },
    {
      icon: Leaf,
      title: 'Экология и природопользование',
      description: 'Мониторинг окружающей среды, рекультивация земель, управление отходами и водными ресурсами региона.',
      projects: 3,
      researchers: 10,
      color: '#16a34a',
      bgColor: 'bg-[#16a34a]/10',
      textColor: 'text-[#16a34a]',
    },
    {
      icon: Cpu,
      title: 'AI и цифровые технологии',
      description: 'Машинное обучение, компьютерное зрение, обработка данных, цифровизация промышленных процессов.',
      projects: 6,
      researchers: 15,
      color: '#9333ea',
      bgColor: 'bg-[#9333ea]/10',
      textColor: 'text-[#9333ea]',
    },
  ];

  const publications = [
    {
      title: 'Применение нейронных сетей для прогнозирования устойчивости горных выработок',
      authors: 'Касымов А.Б., Нурланов Е.К., Жумабаев Д.С.',
      journal: 'Горный журнал Казахстана',
      year: '2025',
      type: 'research' as const,
    },
    {
      title: 'Оптимизация флотационного обогащения медных руд с использованием машинного обучения',
      authors: 'Сериков Т.М., Алиева М.Р.',
      journal: 'Metallurgy and Materials Science',
      year: '2025',
      type: 'research' as const,
    },
    {
      title: 'Экологический мониторинг промышленных зон Центрального Казахстана: методы и результаты',
      authors: 'Бекмуратова Г.А., Омаров К.Н., Ибрагимова Л.Т.',
      journal: 'Central Asian Journal of Environmental Science',
      year: '2024',
      type: 'publication' as const,
    },
  ];

  const labs = [
    {
      title: 'Лаборатория искусственного интеллекта',
      description: 'Исследования в области машинного обучения, NLP и компьютерного зрения.',
      head: 'д.т.н. Касымов А.Б.',
      color: 'text-primary dark:text-primary-light',
      bg: 'bg-primary/10 dark:bg-primary-light/10',
      icon: Cpu,
    },
    {
      title: 'Геомеханическая лаборатория',
      description: 'Моделирование и анализ устойчивости горных пород и подземных выработок.',
      head: 'к.т.н. Нурланов Е.К.',
      color: 'text-gold',
      bg: 'bg-gold/10',
      icon: Mountain,
    },
    {
      title: 'Лаборатория материаловедения',
      description: 'Разработка и исследование новых композитных и наноматериалов.',
      head: 'д.т.н. Сериков Т.М.',
      color: 'text-success',
      bg: 'bg-success/10',
      icon: Beaker,
    },
    {
      title: 'Экологическая лаборатория',
      description: 'Анализ проб, мониторинг загрязнений и разработка методов рекультивации.',
      head: 'к.б.н. Бекмуратова Г.А.',
      color: 'text-primary dark:text-primary-light',
      bg: 'bg-primary/10 dark:bg-primary-light/10',
      icon: Leaf,
    },
    {
      title: 'Лаборатория обогащения',
      description: 'Оптимизация процессов флотации, гравитации и магнитной сепарации.',
      head: 'к.т.н. Алиева М.Р.',
      color: 'text-gold',
      bg: 'bg-gold/10',
      icon: FlaskConical,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(29,86,201,0.08),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <Badge className="mb-4">{t('badge')}</Badge>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-surface-light dark:bg-surface-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110`}>
                  <stat.icon size={24} className={stat.color} />
                </div>
                <p className="text-2xl sm:text-3xl font-display font-bold">{stat.value}</p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">
              Направления исследований
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Основные научные направления университета
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {researchAreas.map((area) => (
              <Card key={area.title} hover glow padding="lg">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${area.bgColor}`}
                >
                  <area.icon size={24} className={area.textColor} />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {area.title}
                </h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-4">
                  {area.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  <span className="flex items-center gap-1">
                    <FileText size={12} /> {area.projects} проектов
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} /> {area.researchers} исследователей
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="py-16 lg:py-24 bg-surface-light dark:bg-surface-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">
                Последние публикации
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                Научные работы сотрудников университета
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {publications.map((pub) => (
              <Card key={pub.title} hover padding="lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={pub.type === 'research' ? 'default' : 'info'}>
                        {pub.type === 'research' ? 'Исследование' : 'Публикация'}
                      </Badge>
                      <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        {pub.year}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-1">
                      {pub.authors}
                    </p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1">
                      <BookOpen size={12} /> {pub.journal}
                    </p>
                  </div>
                  <div className="shrink-0 hidden sm:block">
                    <Button variant="ghost" size="sm" icon={<ExternalLink size={14} />}>
                      Читать
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Labs */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">
              Лаборатории
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Научно-исследовательские лаборатории университета
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {labs.map((lab) => (
              <Card key={lab.title} hover glow padding="lg">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${lab.bg}`}
                >
                  <lab.icon size={24} className={lab.color} />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {lab.title}
                </h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-3">
                  {lab.description}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <Microscope size={12} className="text-text-secondary-light dark:text-text-secondary-dark" />
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">
                    Руководитель: {lab.head}
                  </span>
                </div>
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
                <Microscope size={32} className="text-gold" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Заинтересованы в исследованиях?
              </h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
                Присоединяйтесь к нашим научным проектам. Мы открыты для сотрудничества с исследователями, студентами и индустриальными партнёрами.
              </p>
              <Link href="/contact">
                <Button variant="secondary" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                  Связаться с нами
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
