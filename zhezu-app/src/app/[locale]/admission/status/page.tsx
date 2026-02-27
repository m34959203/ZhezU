import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { UNIVERSITY } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import {
  Search,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Phone,
  Mail,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admission.status' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function StatusPage({ _params }: { _params: { locale: string } }) {
  const t = useTranslations('admission.status');

  const statuses = [
    { key: 'received', icon: <Clock size={20} />, color: 'text-blue-500' },
    { key: 'review', icon: <AlertCircle size={20} />, color: 'text-amber-500' },
    { key: 'accepted', icon: <CheckCircle size={20} />, color: 'text-green-500' },
    { key: 'rejected', icon: <XCircle size={20} />, color: 'text-red-500' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="from-primary/5 to-gold/5 absolute inset-0 bg-gradient-to-br via-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4">{t('badge')}</Badge>
          <h1 className="font-display mb-4 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl text-lg">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Status check info */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card padding="lg">
            <div className="mb-6 text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                <Search size={24} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold">{t('checkTitle')}</h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 text-sm">
                {t('checkText')}
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-primary" />
                <span className="font-medium">{t('byPhone')}:</span>
                <span>{UNIVERSITY.phoneAdmissions}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-primary" />
                <span className="font-medium">{t('byMobile')}:</span>
                <span>{UNIVERSITY.phoneMobile}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-primary" />
                <span className="font-medium">{t('byEmail')}:</span>
                <span>{UNIVERSITY.email}</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Status types */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('statusesTitle')}</h2>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            {statuses.map((status) => (
              <Card key={status.key} padding="md">
                <div className="flex items-start gap-3">
                  <span className={status.color}>{status.icon}</span>
                  <div>
                    <h3 className="font-semibold">{t(`statuses.${status.key}.title`)}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">
                      {t(`statuses.${status.key}.text`)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission/apply">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaApply')}
              </Button>
            </Link>
            <Link href="/admission/contact">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaContact')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
