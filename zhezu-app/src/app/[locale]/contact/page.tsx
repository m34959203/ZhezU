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
    .refine((val) => !val || /^\+?[\d\s\-()]{7,}$/.test(val), 'Please enter a valid phone number'),
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

  const [submitError, setSubmitError] = useState<string | null>(null);

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

  async function onSubmit(data: ContactFormData) {
    setSubmitError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setSubmitError(result.errors?._form?.[0] ?? 'Something went wrong. Please try again.');
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero — dark */}
      <section className="bg-bg-dark relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,14,23,0.9)] to-[rgba(10,14,23,0.8)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t('title')}
          </h1>
          <p className="max-w-2xl text-lg text-white/60">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <Card padding="lg">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="bg-success/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                      <CheckCircle2 size={32} className="text-success" />
                    </div>
                    <h3 className="font-display mb-2 text-xl font-bold">{t('form.success')}</h3>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Input
                        label={t('form.phone')}
                        type="tel"
                        error={errors.phone?.message}
                        {...register('phone')}
                      />
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="subject"
                          className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium"
                        >
                          {t('form.subject')}
                        </label>
                        <select
                          id="subject"
                          {...register('subject')}
                          className="border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary/50 h-10 w-full rounded-lg border px-3 text-sm focus:ring-2 focus:outline-none"
                        >
                          {SUBJECTS.map((key) => (
                            <option key={key} value={key}>
                              {t(`form.subjects.${key}`)}
                            </option>
                          ))}
                        </select>
                        {errors.subject && (
                          <p className="text-error mt-1 text-xs">{errors.subject.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="message"
                        className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium"
                      >
                        {t('form.message')}
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        {...register('message')}
                        className="border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary/50 w-full resize-none rounded-lg border px-3 py-2.5 text-sm focus:ring-2 focus:outline-none"
                      />
                      {errors.message && (
                        <p className="text-error mt-1 text-xs">{errors.message.message}</p>
                      )}
                    </div>
                    {submitError && (
                      <p className="text-error text-sm" role="alert">
                        {submitError}
                      </p>
                    )}
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
            <div className="space-y-6 lg:col-span-2">
              <Card padding="lg">
                <h3 className="font-display mb-4 font-semibold">{t('title')}</h3>
                <ul className="space-y-4">
                  {[
                    {
                      icon: MapPin,
                      text: t('info.address'),
                      color: 'text-primary dark:text-primary-light',
                      bg: 'bg-primary/10 dark:bg-primary-light/10',
                    },
                    {
                      icon: Phone,
                      text: t('info.phone'),
                      color: 'text-gold',
                      bg: 'bg-gold/10',
                      href: `tel:${UNIVERSITY.phone}`,
                    },
                    {
                      icon: Mail,
                      text: t('info.email'),
                      color: 'text-success',
                      bg: 'bg-success/10',
                      href: `mailto:${UNIVERSITY.email}`,
                    },
                    {
                      icon: Clock,
                      text: t('info.schedule'),
                      color: 'text-primary dark:text-primary-light',
                      bg: 'bg-primary/10 dark:bg-primary-light/10',
                    },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <div
                        className={`h-9 w-9 ${item.bg} mt-0.5 flex shrink-0 items-center justify-center rounded-lg`}
                      >
                        <item.icon size={16} className={item.color} />
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="hover:text-primary dark:hover:text-primary-light mt-2 text-sm transition-colors"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="mt-2 text-sm">{item.text}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card padding="lg">
                <h3 className="font-display mb-4 font-semibold">{t('departments.title')}</h3>
                <ul className="space-y-3">
                  {(['admissions', 'registrar', 'finance', 'it', 'international'] as const).map(
                    (dept) => (
                      <li key={dept} className="flex items-center gap-2.5">
                        <div className="bg-primary dark:bg-primary-light h-1.5 w-1.5 shrink-0 rounded-full" />
                        <span className="text-sm">{t(`departments.${dept}`)}</span>
                      </li>
                    ),
                  )}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
