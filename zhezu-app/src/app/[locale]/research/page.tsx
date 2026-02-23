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
    {
      value: '150+',
      label: 'Публикаций',
      icon: BookOpen,
      color: 'text-primary dark:text-primary-light',
      bg: 'bg-primary/10 dark:bg-primary-light/10',
    },
    { value: '12', label: 'Грантов', icon: Award, color: 'text-gold', bg: 'bg-gold/10' },
    {
      value: '8',
      label: 'Конференций',
      icon: Calendar,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      value: '5',
      label: 'Лабораторий',
      icon: FlaskConical,
      color: 'text-primary dark:text-primary-light',
      bg: 'bg-primary/10 dark:bg-primary-light/10',
    },
  ];

  const researchAreas = [
    {
      icon: Mountain,
      title: 'Горное дело и геология',
      description:
        'Исследования в области разработки месторождений, геомеханики, обогащения полезных ископаемых и экологии горного производства.',
      projects: 5,
      researchers: 18,
      color: '#0d9488',
      bgColor: 'bg-[#0d9488]/10',
      textColor: 'text-[#0d9488]',
    },
    {
      icon: Beaker,
      title: 'Металлургия и материалы',
      description:
        'Разработка новых сплавов и композитных материалов, оптимизация металлургических процессов, нанотехнологии.',
      projects: 4,
      researchers: 12,
      color: '#2563eb',
      bgColor: 'bg-[#2563eb]/10',
      textColor: 'text-[#2563eb]',
    },
    {
      icon: Leaf,
      title: 'Экология и природопользование',
      description:
        'Мониторинг окружающей среды, рекультивация земель, управление отходами и водными ресурсами региона.',
      projects: 3,
      researchers: 10,
      color: '#16a34a',
      bgColor: 'bg-[#16a34a]/10',
      textColor: 'text-[#16a34a]',
    },
    {
      icon: Cpu,
      title: 'AI и цифровые технологии',
      description:
        'Машинное обучение, компьютерное зрение, обработка данных, цифровизация промышленных процессов.',
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
      title:
        'Экологический мониторинг промышленных зон Центрального Казахстана: методы и результаты',
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
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="from-primary/5 to-gold/5 absolute inset-0 bg-gradient-to-br via-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(29,86,201,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4">{t('badge')}</Badge>
            <h1 className="font-display mb-6 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="group text-center">
                <div
                  className={`h-12 w-12 ${stat.bg} mx-auto mb-3 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110`}
                >
                  <stat.icon size={24} className={stat.color} />
                </div>
                <p className="font-display text-2xl font-bold sm:text-3xl">{stat.value}</p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">
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
            <h2 className="font-display mb-2 text-3xl font-bold sm:text-4xl">
              Направления исследований
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Основные научные направления университета
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {researchAreas.map((area) => (
              <Card key={area.title} hover glow padding="lg">
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${area.bgColor}`}
                >
                  <area.icon size={24} className={area.textColor} />
                </div>
                <h3 className="font-display group-hover:text-primary dark:group-hover:text-primary-light mb-2 text-lg font-semibold transition-colors">
                  {area.title}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm leading-relaxed">
                  {area.description}
                </p>
                <div className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-4 text-xs">
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
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display mb-2 text-3xl font-bold">Последние публикации</h2>
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
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant={pub.type === 'research' ? 'default' : 'info'}>
                        {pub.type === 'research' ? 'Исследование' : 'Публикация'}
                      </Badge>
                      <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                        {pub.year}
                      </span>
                    </div>
                    <h3 className="font-display group-hover:text-primary dark:group-hover:text-primary-light mb-2 font-semibold transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-1 text-sm">
                      {pub.authors}
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1 text-xs">
                      <BookOpen size={12} /> {pub.journal}
                    </p>
                  </div>
                  <div className="hidden shrink-0 sm:block">
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
            <h2 className="font-display mb-2 text-3xl font-bold sm:text-4xl">Лаборатории</h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Научно-исследовательские лаборатории университета
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {labs.map((lab) => (
              <Card key={lab.title} hover glow padding="lg">
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${lab.bg}`}
                >
                  <lab.icon size={24} className={lab.color} />
                </div>
                <h3 className="font-display group-hover:text-primary dark:group-hover:text-primary-light mb-2 text-lg font-semibold transition-colors">
                  {lab.title}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-3 text-sm leading-relaxed">
                  {lab.description}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <Microscope
                    size={12}
                    className="text-text-secondary-light dark:text-text-secondary-dark"
                  />
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
          <div className="from-primary via-primary-dark relative overflow-hidden rounded-2xl bg-gradient-to-br to-[#0f3380] p-8 text-center text-white sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(230,179,37,0.2),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_50%)]" />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <Microscope size={32} className="text-gold" />
              </div>
              <h2 className="font-display mb-4 text-3xl font-bold sm:text-4xl">
                Заинтересованы в исследованиях?
              </h2>
              <p className="mx-auto mb-8 max-w-xl leading-relaxed text-white/70">
                Присоединяйтесь к нашим научным проектам. Мы открыты для сотрудничества с
                исследователями, студентами и индустриальными партнёрами.
              </p>
              <Link href="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
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
