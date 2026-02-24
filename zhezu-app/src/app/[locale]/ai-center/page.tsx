'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ArrowRight,
  Play,
  Brain,
  Bot,
  Eye,
  BarChart3,
  ExternalLink,
  MessageSquare,
  Terminal,
  Palette,
  Shield,
  Code2,
  Database,
  FlaskConical,
  Cpu,
  Sparkles,
  Users,
  Briefcase,
  GraduationCap,
} from 'lucide-react';

const TABS = ['projects', 'agents', 'apps', 'tools', 'lab'] as const;

export default function AICenterPage() {
  const t = useTranslations('aiCenter');
  const [activeTab, setActiveTab] = useState<string>('projects');

  const featuredProjects = [
    {
      title: 'Neural Net Optimizer',
      description:
        'A next-generation framework for optimizing deep learning models, reducing inference time by 40% while maintaining accuracy across diverse datasets.',
      category: 'Deep Learning',
      tags: ['Python', 'PyTorch'],
      image: '/images/placeholder-neural.jpg',
    },
    {
      title: 'VisionSentinel',
      description:
        'Real-time anomaly detection system for industrial surveillance feeds, capable of identifying safety hazards with 99.8% precision.',
      category: 'Computer Vision',
      tags: ['OpenCV', 'C++'],
      image: '/images/placeholder-vision.jpg',
    },
    {
      title: 'AlgoTrade X',
      description:
        'Predictive modeling engine for cryptocurrency markets utilizing sentiment analysis from social media and historical ledger data.',
      category: 'FinTech AI',
      tags: ['Rust', 'React'],
      image: '/images/placeholder-finance.jpg',
    },
  ];

  const agents = [
    {
      name: 'Athena',
      role: 'Research Assistant',
      roleRu: 'Ассистент',
      description:
        'Summarizes papers, extracts data points, and generates literature reviews in seconds.',
      gradient: 'from-blue-400 to-blue-600',
      roleColor: 'text-blue-300',
      statusColor: 'bg-green-500',
      icon: MessageSquare,
      buttonVariant: 'primary' as const,
    },
    {
      name: 'Codex',
      role: 'Code Tutor',
      roleRu: 'Тьютор',
      description:
        'Automates CI/CD pipelines, audits code quality, and helps students learn programming interactively.',
      gradient: 'from-emerald-400 to-teal-600',
      roleColor: 'text-emerald-300',
      statusColor: 'bg-green-500',
      icon: Terminal,
      buttonVariant: 'outline' as const,
    },
    {
      name: 'Muse',
      role: 'Career Advisor',
      roleRu: 'Карьера',
      description:
        'Generates career path recommendations, resume reviews, and interview preparation tailored to your profile.',
      gradient: 'from-purple-400 to-indigo-600',
      roleColor: 'text-purple-300',
      statusColor: 'bg-amber-500',
      icon: Palette,
      buttonVariant: 'outline' as const,
    },
    {
      name: 'Sentinel',
      role: 'Analytics Engine',
      roleRu: 'Аналитика',
      description:
        'Monitors university data patterns, generates insights, and flags potential issues in real-time.',
      gradient: 'from-orange-400 to-red-600',
      roleColor: 'text-orange-300',
      statusColor: 'bg-gray-500',
      icon: Shield,
      buttonVariant: 'outline' as const,
    },
  ];

  const devTools = [
    {
      icon: Code2,
      title: 'API Gateway',
      description: 'Manage and secure your API endpoints with our unified dashboard.',
    },
    {
      icon: Database,
      title: 'Dataset Hub',
      description: 'Access curated, clean datasets for training your custom models.',
    },
    {
      icon: FlaskConical,
      title: 'Experiment Lab',
      description: 'A sandbox environment to test prompts and model parameters safely.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section - Dark */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-600/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(29,86,201,0.15),transparent_60%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/20 px-3 py-1 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-blue-200 uppercase">
              New Models Available v2.4
            </span>
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-4xl font-black tracking-tight text-transparent md:text-6xl lg:text-7xl">
            AI-Center ZhezU
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            {t('subtitle')}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
              className="w-full shadow-[0_0_20px_rgba(29,86,201,0.5)] hover:shadow-[0_0_30px_rgba(29,86,201,0.6)] sm:w-auto"
            >
              Explore Innovation
            </Button>
            <Button
              variant="ghost"
              size="lg"
              icon={<Play size={16} />}
              className="w-full border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-16 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Tabs" className="scrollbar-none flex space-x-8 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'border-primary text-primary font-bold'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content area */}
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured Projects Section */}
        <section>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{t('projects.title')}</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Discover breakthrough initiatives from our research labs.
              </p>
            </div>
            <Link
              href="/ai-center"
              className="text-primary hover:text-primary-dark hidden items-center text-sm font-semibold transition-colors sm:flex"
            >
              View All <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {project.category === 'Deep Learning' && (
                      <Brain size={64} className="text-blue-400/30" />
                    )}
                    {project.category === 'Computer Vision' && (
                      <Eye size={64} className="text-emerald-400/30" />
                    )}
                    {project.category === 'FinTech AI' && (
                      <BarChart3 size={64} className="text-purple-400/30" />
                    )}
                  </div>
                  <div className="absolute top-3 right-3 rounded bg-black/50 px-2 py-1 text-xs font-bold text-white backdrop-blur-md">
                    {project.category}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="group-hover:text-primary mb-2 text-xl font-bold transition-colors dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
                    {project.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
                    <div className="flex gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500 uppercase dark:bg-slate-700 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="text-primary hover:text-primary-dark hover:bg-primary/10 rounded-full p-1 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Agents Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 lg:p-12">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[80px]" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-purple-500/20 blur-[80px]" />

          <div className="relative z-10">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-white">Meet Our Intelligent Agents</h2>
              <p className="text-slate-300">
                Specialized autonomous agents designed to handle complex workflows. Select an agent
                to augment your productivity.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {agents.map((agent) => (
                <div
                  key={agent.name}
                  className="group flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  <div className="relative mb-4">
                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br p-1 ${agent.gradient}`}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-slate-900 bg-slate-800">
                        <agent.icon size={28} className="text-white/80" />
                      </div>
                    </div>
                    <div
                      className={`absolute right-0 bottom-0 h-5 w-5 rounded-full border-2 border-slate-900 ${agent.statusColor}`}
                    />
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-white">{agent.name}</h3>
                  <p
                    className={`mb-3 text-xs font-semibold tracking-wider uppercase ${agent.roleColor}`}
                  >
                    {agent.role}
                  </p>
                  <p className="mb-5 text-sm leading-snug text-slate-300">{agent.description}</p>
                  <Button
                    variant={agent.buttonVariant === 'primary' ? 'primary' : 'ghost'}
                    size="sm"
                    icon={<agent.icon size={14} />}
                    className={
                      agent.buttonVariant !== 'primary'
                        ? 'w-full border border-slate-600 bg-slate-700 text-white hover:bg-slate-600'
                        : 'w-full'
                    }
                  >
                    Try Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Developer Tools Section */}
        <section>
          <h2 className="mb-6 text-2xl font-bold">{t('tools.title')}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {devTools.map((tool) => (
              <a
                key={tool.title}
                href="#"
                className="group flex items-start rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="bg-primary/10 text-primary group-hover:bg-primary rounded-lg p-2 transition-colors group-hover:text-white">
                  <tool.icon size={24} />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold dark:text-white">{tool.title}</h4>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {tool.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* CTA Section */}
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
