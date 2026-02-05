'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { UNIVERSITY } from '@/lib/constants';
import { Send, Phone, Mail, MapPin, Clock, CheckCircle2, Building2 } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-gold/5 dark:from-primary/10 dark:via-bg-dark dark:to-gold/5 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-3">
            {t('title')}
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <Card padding="lg">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 size={48} className="mx-auto text-success mb-4" />
                    <h3 className="text-xl font-display font-bold mb-2">{t('form.success')}</h3>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label={t('form.name')}
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      <Input
                        label={t('form.email')}
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label={t('form.phone')}
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="subject" className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                          {t('form.subject')}
                        </label>
                        <select
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full h-10 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          {(['general', 'admission', 'academic', 'technical', 'other'] as const).map((key) => (
                            <option key={key} value={key}>
                              {t(`form.subjects.${key}`)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                        {t('form.message')}
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      />
                    </div>
                    <Button type="submit" size="lg" icon={<Send size={16} />} iconPosition="right" className="w-full sm:w-auto">
                      {t('form.submit')}
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact info */}
              <Card padding="lg">
                <h3 className="font-display font-semibold mb-4">{t('title')}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin size={18} className="text-primary dark:text-primary-light mt-0.5 shrink-0" />
                    <span className="text-sm">{t('info.address')}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={18} className="text-primary dark:text-primary-light shrink-0" />
                    <a href={`tel:${UNIVERSITY.phone}`} className="text-sm hover:text-primary dark:hover:text-primary-light transition-colors">
                      {t('info.phone')}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail size={18} className="text-primary dark:text-primary-light shrink-0" />
                    <a href={`mailto:${UNIVERSITY.email}`} className="text-sm hover:text-primary dark:hover:text-primary-light transition-colors">
                      {t('info.email')}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock size={18} className="text-primary dark:text-primary-light shrink-0" />
                    <span className="text-sm">{t('info.schedule')}</span>
                  </li>
                </ul>
              </Card>

              {/* Departments */}
              <Card padding="lg">
                <h3 className="font-display font-semibold mb-4">{t('departments.title')}</h3>
                <ul className="space-y-3">
                  {(['admissions', 'registrar', 'finance', 'it', 'international'] as const).map((dept) => (
                    <li key={dept} className="flex items-center gap-2.5">
                      <Building2 size={14} className="text-text-secondary-light dark:text-text-secondary-dark shrink-0" />
                      <span className="text-sm">{t(`departments.${dept}`)}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
