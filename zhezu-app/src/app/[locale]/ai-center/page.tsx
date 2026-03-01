import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  ArrowRight,
  Brain,
  Bot,
  Users,
  Building2,
  Mountain,
  Eye,
  BarChart3,
  Code2,
  Database,
  FlaskConical,
  Cpu,
  Zap,
  Globe,
  Shield,
  MessageSquare,
  Terminal,
  Palette,
  Lightbulb,
  Rocket,
  Search,
  ExternalLink,
} from 'lucide-react';
import { getAICenterData } from '@/lib/admin/public-data';
import type { AICenterProject } from '@/lib/admin/types';

/* Map icon string → component */
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Brain, Bot, Users, Building2, Mountain, Eye, BarChart3, Code2, Database,
  FlaskConical, Cpu, Zap, Globe, Shield, MessageSquare, Terminal, Palette,
  Lightbulb, Rocket, Search,
};

const STATUS_STYLES: Record<AICenterProject['status'], string> = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  dev: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  planned: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
};

export default async function AICenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aiCenter' });
  const data = await getAICenterData();

  const visibleProjects = data.projects
    .filter((p) => p.visible)
    .sort((a, b) => a.order - b.order);

  const loc = locale as 'kk' | 'ru' | 'en';

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
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
              {t('hub.badgeLabel')}
            </span>
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-4xl font-black tracking-tight text-transparent md:text-6xl lg:text-7xl">
            {data.title[loc] || 'AI-Center ZhezU'}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            {data.subtitle[loc] || t('subtitle')}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {data.externalUrl ? (
              <a href={data.externalUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ExternalLink size={16} />}
                  iconPosition="right"
                  className="w-full shadow-[0_0_20px_rgba(29,86,201,0.5)] hover:shadow-[0_0_30px_rgba(29,86,201,0.6)] sm:w-auto"
                >
                  {t('hub.explore')}
                </Button>
              </a>
            ) : (
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight size={16} />}
                iconPosition="right"
                className="w-full shadow-[0_0_20px_rgba(29,86,201,0.5)] hover:shadow-[0_0_30px_rgba(29,86,201,0.6)] sm:w-auto"
              >
                {t('hub.explore')}
              </Button>
            )}
            <Link href="/contact">
              <Button
                variant="ghost"
                size="lg"
                icon={<ArrowRight size={16} />}
                iconPosition="right"
                className="w-full border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto"
              >
                {t('cta.button')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {visibleProjects.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-text-primary-light dark:text-text-primary-dark text-3xl font-bold tracking-tight">
                {t('projects.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">
                {t('hub.projectsSubtitle')}
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project) => {
                const IconComp = ICON_MAP[project.icon] || Brain;
                return (
                  <Card key={project.id} padding="lg" hover>
                    <div className="mb-4 flex items-start justify-between">
                      <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                        <IconComp size={24} className="text-primary" />
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold ${STATUS_STYLES[project.status]}`}
                      >
                        {t(`hub.statuses.${project.status}`)}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold">{project.title[loc]}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                      {project.description[loc]}
                    </p>
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark rounded px-2 py-0.5 text-[10px] font-bold uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark mt-4 inline-flex items-center gap-1 text-sm font-medium"
                      >
                        {t('hub.viewProject')} <ExternalLink size={12} />
                      </a>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
              <h2 className="font-display mb-4 text-3xl font-bold sm:text-4xl">
                {t('cta.title')}
              </h2>
              <p className="mx-auto mb-8 max-w-xl leading-relaxed text-white/70">
                {t('cta.description')}
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                {data.externalUrl ? (
                  <a href={data.externalUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="secondary"
                      size="lg"
                      icon={<ExternalLink size={18} />}
                      iconPosition="right"
                    >
                      {t('hub.goToSite')}
                    </Button>
                  </a>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
