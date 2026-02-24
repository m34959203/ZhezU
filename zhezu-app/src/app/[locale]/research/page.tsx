'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  BookOpen,
  Award,
  GraduationCap,
  DollarSign,
  TrendingUp,
  Brain,
  Sun,
  Dna,
  ArrowRight,
  ExternalLink,
  FileText,
  Download,
  Quote,
  Filter,
  ArrowUpDown,
  Microscope,
  FlaskConical,
} from 'lucide-react';

export default function ResearchPage() {
  const t = useTranslations('research');

  const stats = [
    {
      value: '1,240+',
      label: t('stats.publications'),
      trend: '+12%',
      icon: BookOpen,
      iconBg: 'bg-blue-50 dark:bg-blue-900/30',
      iconColor: 'text-primary dark:text-blue-400',
    },
    {
      value: '50+',
      label: t('stats.conferences'),
      trend: '+5%',
      icon: Award,
      iconBg: 'bg-purple-50 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      value: '85',
      label: 'H-Index',
      trend: '+3%',
      icon: GraduationCap,
      iconBg: 'bg-amber-50 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      value: '32',
      label: t('stats.grants'),
      trend: '+8%',
      icon: DollarSign,
      iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  const focusAreas = [
    {
      icon: Brain,
      title: t('areas.ai'),
      description: t('areas.aiDesc'),
    },
    {
      icon: Sun,
      title: t('areas.environment'),
      description: t('areas.environmentDesc'),
    },
    {
      icon: Dna,
      title: t('areas.metallurgy'),
      description: t('areas.metallurgyDesc'),
    },
  ];

  const publications = [
    {
      type: 'Journal Article',
      typeBadge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
      date: 'June 2023',
      title:
        'Deep Learning Approaches for Early Detection of Neurodegenerative Diseases using MRI Scans',
      authors: 'Dr. Sarah Chen, Prof. Michael Ross, et al.',
      journal: 'Journal of Medical Imaging & AI',
      citations: 42,
      downloads: '1.2k',
    },
    {
      type: 'Conference Paper',
      typeBadge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
      date: 'May 2023',
      title: 'Scalable Microgrid Architectures for Rural Electrification in Developing Nations',
      authors: 'Dr. Ahmed Al-Fayed, Engineer James Wu',
      journal: 'IEEE International Conference on Smart Energy',
      citations: 18,
      downloads: '850',
    },
    {
      type: 'Grant Report',
      typeBadge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
      date: 'April 2023',
      title: 'CRISPR-Cas9 Gene Editing: Ethical Implications and Regulatory Frameworks',
      authors: 'Prof. Elena Rodriguez',
      journal: 'Bioethics Quarterly Review',
      citations: 156,
      downloads: '3.4k',
    },
  ];

  const labs = [
    {
      title: 'Quantum Computing Lab',
      location: 'Building C, Room 304',
      icon: FlaskConical,
    },
    {
      title: 'Robotics & Vision',
      location: 'Engineering Hall',
      icon: Microscope,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="px-4 py-6 sm:px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(29,86,201,0.15),transparent_70%)]" />
          <div className="relative z-10 flex min-h-[420px] flex-col items-center justify-center px-4 py-16 text-center lg:py-24">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-200 backdrop-blur-sm">
              <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-400" />
              Advancing Global Knowledge
            </div>
            <h1 className="mb-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t('title')}
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-slate-300 sm:text-xl">{t('subtitle')}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                variant="primary"
                size="lg"
                className="shadow-lg transition-transform hover:scale-105"
              >
                Explore Publications
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                {t('labs.title')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="px-4 py-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg}`}
                >
                  <stat.icon size={20} className={stat.iconColor} />
                </div>
                <span className="flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <TrendingUp size={12} className="mr-1" />
                  {stat.trend}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold dark:text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content: Focus Areas + Publications */}
      <section className="px-4 py-8 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Left Column: Focus Areas + Labs */}
          <div className="flex flex-col gap-8 lg:w-1/3">
            {/* Focus Areas */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold dark:text-white">{t('areas.title')}</h2>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  Strategic initiatives addressing global challenges.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {focusAreas.map((area) => (
                  <div
                    key={area.title}
                    className="rounded-xl border border-slate-200 bg-white p-4 transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div className="bg-primary/10 text-primary mb-3 flex h-10 w-10 items-center justify-center rounded-lg">
                      <area.icon size={20} />
                    </div>
                    <h3 className="font-bold dark:text-white">{area.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Labs */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold dark:text-white">{t('labs.title')}</h2>
                <Link
                  href="/research"
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {labs.map((lab) => (
                  <a
                    key={lab.title}
                    href="#"
                    className="flex items-center gap-4 rounded-xl bg-white p-3 shadow-sm transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700"
                  >
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-slate-700 to-slate-900">
                      <lab.icon size={24} className="text-blue-400/60" />
                    </div>
                    <div>
                      <h4 className="font-bold dark:text-white">{lab.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{lab.location}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Publications */}
          <div className="lg:w-2/3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold dark:text-white">{t('publications.title')}</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                >
                  <Filter size={14} /> Filter
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                >
                  <ArrowUpDown size={14} /> Recent
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {publications.map((pub) => (
                <div
                  key={pub.title}
                  className="group flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span className={`rounded px-2 py-0.5 text-xs font-bold ${pub.typeBadge}`}>
                          {pub.type}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {pub.date}
                        </span>
                      </div>
                      <h3 className="group-hover:text-primary text-lg leading-tight font-bold dark:text-white">
                        {pub.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-medium dark:text-slate-200">Authors:</span>{' '}
                        {pub.authors}
                      </p>
                      <p className="text-sm text-slate-500 italic dark:text-slate-500">
                        {pub.journal}
                      </p>
                    </div>
                    <div className="hidden sm:block">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                        <FileText size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-6 border-t border-slate-100 pt-4 dark:border-slate-700">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                      <Quote size={14} />
                      <span>{pub.citations} Citations</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                      <Download size={14} />
                      <span>{pub.downloads} Downloads</span>
                    </div>
                    <a
                      href="#"
                      className="text-primary ml-auto flex items-center gap-1 text-sm font-semibold hover:underline"
                    >
                      Read Paper <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="md">
                  Load More Publications
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="from-primary via-primary-dark relative overflow-hidden rounded-2xl bg-gradient-to-br to-[#0f3380] p-8 text-center text-white sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(230,179,37,0.2),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_50%)]" />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <Microscope size={32} className="text-gold" />
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
