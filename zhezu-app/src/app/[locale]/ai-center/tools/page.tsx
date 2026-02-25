import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Bot, BarChart3, FileText, Sparkles } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aiCenter.aiTools' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function ToolsPage() {
  const t = useTranslations('aiCenter.aiTools');

  const tools = [
    { key: 'chatbot', icon: <Bot size={24} /> },
    { key: 'skills', icon: <BarChart3 size={24} /> },
    { key: 'docs', icon: <FileText size={24} /> },
    { key: 'recommender', icon: <Sparkles size={24} /> },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-cyan-600/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 border-cyan-500/30 bg-cyan-500/20 text-cyan-200">
            {t('badge')}
          </Badge>
          <h1 className="font-display mb-4 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="max-w-2xl text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {tools.map((tool) => (
              <Card key={tool.key} padding="lg" hover>
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <span className="text-primary">{tool.icon}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold">{t(`tools.${tool.key}.title`)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                  {t(`tools.${tool.key}.text`)}
                </p>
                <Button variant="ghost" size="sm">
                  {t('tryButton')}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/ai-center/api">
            <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaApi')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
