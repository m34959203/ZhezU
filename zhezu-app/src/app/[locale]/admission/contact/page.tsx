import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { UNIVERSITY } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Phone, Mail, MapPin, Clock, Globe, ArrowRight, MessageCircle } from 'lucide-react';
import { AdmissionOnly } from '@/components/admission/AdmissionOnly';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admission.contactPage' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const t = await getTranslations('admission.contactPage');
  const locale = (localeParam || 'ru') as Locale;

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

      {/* Contact cards */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <Card padding="lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Phone size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('phoneTitle')}</h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                    {t('phoneSubtitle')}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">{t('admissions')}:</span>{' '}
                  {UNIVERSITY.phoneAdmissions}
                </p>
                <p>
                  <span className="font-medium">{t('mobileLabel')}:</span> {UNIVERSITY.phoneMobile}
                </p>
                <p>
                  <span className="font-medium">{t('mainLabel')}:</span> {UNIVERSITY.phone}
                </p>
              </div>
            </Card>

            <Card padding="lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Mail size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('emailTitle')}</h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                    {t('emailSubtitle')}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p>{UNIVERSITY.email}</p>
                <p>{UNIVERSITY.emailAlt}</p>
              </div>
            </Card>

            <Card padding="lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('addressTitle')}</h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                    {t('addressSubtitle')}
                  </p>
                </div>
              </div>
              <p className="text-sm">{UNIVERSITY.address[locale]}</p>
            </Card>

            <Card padding="lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Clock size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('hoursTitle')}</h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                    {t('hoursSubtitle')}
                  </p>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <p>{t('weekdays')}</p>
                <p>{t('saturday')}</p>
                <p>{t('sunday')}</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display mb-4 text-2xl font-bold">{t('socialTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 text-sm">
            {t('socialText')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { label: 'Instagram', icon: <Globe size={18} /> },
              { label: 'Facebook', icon: <Globe size={18} /> },
              { label: 'WhatsApp', icon: <MessageCircle size={18} /> },
            ].map((social) => (
              <div
                key={social.label}
                className="border-border-light dark:border-border-dark flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium"
              >
                {social.icon}
                {social.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission/faq">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaFaq')}
              </Button>
            </Link>
            <AdmissionOnly>
              <Link href="/admission/apply">
                <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                  {t('ctaApply')}
                </Button>
              </Link>
            </AdmissionOnly>
          </div>
        </div>
      </section>
    </div>
  );
}
