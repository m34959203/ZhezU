import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { UNIVERSITY } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { MessageCircle, ArrowRight, Phone, Mail, MapPin, Clock, Globe } from 'lucide-react';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admission.consultation' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function ConsultationPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('admission.consultation');
  const locale = (params.locale || 'ru') as Locale;

  const services = ['service1', 'service2', 'service3', 'service4', 'service5'];

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

      {/* Contact options */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('contactTitle')}</h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <Phone size={24} />, key: 'phone', value: UNIVERSITY.phoneAdmissions },
              { icon: <Phone size={24} />, key: 'mobile', value: UNIVERSITY.phoneMobile },
              { icon: <Mail size={24} />, key: 'email', value: UNIVERSITY.email },
              { icon: <Globe size={24} />, key: 'whatsapp', value: '+7 777 218 93 25' },
            ].map((item) => (
              <Card key={item.key} padding="md" className="text-center">
                <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                  <span className="text-primary">{item.icon}</span>
                </div>
                <h3 className="mb-1 text-sm font-semibold">{t(`contact.${item.key}`)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  {item.value}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">{t('servicesTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-8 max-w-2xl text-center text-sm">
            {t('servicesSubtitle')}
          </p>
          <div className="mx-auto grid max-w-3xl gap-4">
            {services.map((key) => (
              <div
                key={key}
                className="border-border-light dark:border-border-dark flex items-start gap-4 rounded-lg border p-4"
              >
                <div className="bg-gold/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                  <MessageCircle size={16} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{t(`services.${key}.title`)}</h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-xs">
                    {t(`services.${key}.text`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office info */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card padding="lg">
            <h3 className="mb-4 text-lg font-bold">{t('officeTitle')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span>{UNIVERSITY.address[locale]}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-primary mt-0.5 shrink-0" />
                <span>{t('officeHours')}</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission/apply">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaApply')}
              </Button>
            </Link>
            <Link href="/admission/faq">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaFaq')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
