import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aiCenter.projectsPage' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aiCenter' });
  const tp = await getTranslations({ locale, namespace: 'aiCenter.projectsPage' });
  const data = await getAICenterData();

  const loc = locale as 'kk' | 'ru' | 'en';
  const visibleProjects = data.projects
    .filter((p) => p.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-600/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 border-blue-500/30 bg-blue-500/20 text-blue-200">
            {tp('badge')}
          </Badge>
          <h1 className="font-display mb-4 text-4xl font-bold sm:text-5xl">{tp('title')}</h1>
          <p className="max-w-2xl text-lg text-slate-300">{tp('subtitle')}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {visibleProjects.length === 0 ? (
            <div className="py-20 text-center">
              <Brain size={48} className="mx-auto mb-4 text-slate-300" />
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
                {tp('noProjects')}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {visibleProjects.map((project) => {
                const IconComp = ICON_MAP[project.icon] || Brain;
                return (
                  <Card key={project.id} padding="lg" hover>
                    <div className="mb-4 flex items-start justify-between">
                      <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                        <IconComp size={24} className="text-primary" />
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${STATUS_STYLES[project.status]}`}
                      >
                        {t(`hub.statuses.${project.status}`)}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold">{project.title[loc]}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                      {project.description[loc]}
                    </p>
                    {project.tags.length > 0 && (
                      <div className="text-text-secondary-light dark:text-text-secondary-dark flex flex-wrap gap-2 text-xs">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-surface-light dark:bg-surface-dark rounded px-2 py-1"
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
          )}
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/ai-center">
            <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
              {tp('backToHub')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
