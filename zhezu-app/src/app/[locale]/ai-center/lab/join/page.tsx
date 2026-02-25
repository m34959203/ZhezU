import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle, Users, GraduationCap, Code2 } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aiCenter.labJoin' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function LabJoinPage() {
  const t = useTranslations('aiCenter.labJoin');

  const roles = [
    { key: 'researcher', icon: <GraduationCap size={20} /> },
    { key: 'developer', icon: <Code2 size={20} /> },
    { key: 'intern', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-violet-600/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 border-violet-500/30 bg-violet-500/20 text-violet-200">
            {t('badge')}
          </Badge>
          <h1 className="font-display mb-4 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="max-w-2xl text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-2xl font-bold">{t('rolesTitle')}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {roles.map((role) => (
              <Card key={role.key} padding="lg" hover>
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <span className="text-primary">{role.icon}</span>
                </div>
                <h3 className="mb-2 font-bold">{t(`roles.${role.key}.title`)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                  {t(`roles.${role.key}.text`)}
                </p>
                <ul className="space-y-1">
                  {['req1', 'req2', 'req3'].map((req) => (
                    <li key={req} className="flex items-center gap-2 text-xs">
                      <CheckCircle size={12} className="shrink-0 text-green-500" />
                      <span className="text-text-secondary-light dark:text-text-secondary-dark">
                        {t(`roles.${role.key}.${req}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card padding="lg">
            <h3 className="mb-4 text-center text-xl font-bold">{t('processTitle')}</h3>
            <div className="space-y-4">
              {['step1', 'step2', 'step3', 'step4'].map((key, i) => (
                <div key={key} className="flex items-start gap-4">
                  <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{t(`process.${key}.title`)}</h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                      {t(`process.${key}.text`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/contact">
            <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaContact')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
