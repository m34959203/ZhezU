'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { UNIVERSITY } from '@/lib/constants';
import { Send, Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';

const SUBJECTS = ['general', 'admission', 'academic', 'technical', 'other'] as const;

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s\-()]{7,}$/.test(val),
      'Please enter a valid phone number'
    ),
  subject: z.enum(SUBJECTS, { message: 'Please select a subject' }),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: 'general',
      message: '',
    },
  });

  async function onSubmit(_data: ContactFormData) {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col">
      {/* Hero — dark */}
      <section className="relative overflow-hidden bg-bg-dark py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,14,23,0.9)] to-[rgba(10,14,23,0.8)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-3 text-white">
            {t('title')}
          </h1>
          <p className="text-lg text-white/60 max-w-2xl">
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
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-success" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2">{t('form.success')}</h3>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label={t('form.name')}
                        error={errors.name?.message}
                        {...register('name')}
                      />
                      <Input
                        label={t('form.email')}
                        type="email"
                        error={errors.email?.message}
                        {...register('email')}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label={t('form.phone')}
                        type="tel"
                        error={errors.phone?.message}
                        {...register('phone')}
                      />
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="subject" className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                          {t('form.subject')}
                        </label>
                        <select
                          id="subject"
                          {...register('subject')}
                          className="w-full h-10 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          {SUBJECTS.map((key) => (
                            <option key={key} value={key}>
                              {t(`form.subjects.${key}`)}
                            </option>
                          ))}
                        </select>
                        {errors.subject && (
                          <p className="text-xs text-error mt-1">{errors.subject.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                        {t('form.message')}
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        {...register('message')}
                        className="w-full rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      />
                      {errors.message && (
                        <p className="text-xs text-error mt-1">{errors.message.message}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      loading={isSubmitting}
                      icon={<Send size={16} />}
                      iconPosition="right"
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? t('form.submitting') : t('form.submit')}
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-2 space-y-6">
              <Card padding="lg">
                <h3 className="font-display font-semibold mb-4">{t('title')}</h3>
                <ul className="space-y-4">
                  {[
                    { icon: MapPin, text: t('info.address'), color: 'text-primary dark:text-primary-light', bg: 'bg-primary/10 dark:bg-primary-light/10' },
                    { icon: Phone, text: t('info.phone'), color: 'text-gold', bg: 'bg-gold/10', href: `tel:${UNIVERSITY.phone}` },
                    { icon: Mail, text: t('info.email'), color: 'text-success', bg: 'bg-success/10', href: `mailto:${UNIVERSITY.email}` },
                    { icon: Clock, text: t('info.schedule'), color: 'text-primary dark:text-primary-light', bg: 'bg-primary/10 dark:bg-primary-light/10' },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <div className={`w-9 h-9 ${item.bg} rounded-lg flex items-center justify-center shrink-0 mt-0.5`}>
                        <item.icon size={16} className={item.color} />
                      </div>
                      {item.href ? (
                        <a href={item.href} className="text-sm hover:text-primary dark:hover:text-primary-light transition-colors mt-2">
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-sm mt-2">{item.text}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card padding="lg">
                <h3 className="font-display font-semibold mb-4">{t('departments.title')}</h3>
                <ul className="space-y-3">
                  {(['admissions', 'registrar', 'finance', 'it', 'international'] as const).map((dept) => (
                    <li key={dept} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-light shrink-0" />
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
