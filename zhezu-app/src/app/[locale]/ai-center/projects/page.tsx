import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Bot, Users, Building2, Mountain } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aiCenter.projectsPage' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function ProjectsPage() {
  const t = useTranslations('aiCenter.projectsPage');

  const projects = [
    { key: 'talapker', icon: <Bot size={24} />, status: 'active' },
    { key: 'talentPool', icon: <Users size={24} />, status: 'active' },
    { key: 'smartCampus', icon: <Building2 size={24} />, status: 'dev' },
    { key: 'miningAI', icon: <Mountain size={24} />, status: 'dev' },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-600/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 border-blue-500/30 bg-blue-500/20 text-blue-200">
            {t('badge')}
          </Badge>
          <h1 className="font-display mb-4 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="max-w-2xl text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.key} padding="lg" hover>
                <div className="mb-4 flex items-start justify-between">
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                    <span className="text-primary">{project.icon}</span>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${project.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}
                  >
                    {t(`statuses.${project.status}`)}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold">{t(`projects.${project.key}.title`)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                  {t(`projects.${project.key}.text`)}
                </p>
                <div className="text-text-secondary-light dark:text-text-secondary-dark flex flex-wrap gap-2 text-xs">
                  {['tag1', 'tag2'].map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-light dark:bg-surface-dark rounded px-2 py-1"
                    >
                      {t(`projects.${project.key}.${tag}`)}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/ai-center/showcase">
            <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaShowcase')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
