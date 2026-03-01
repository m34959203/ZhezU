'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { SiteSettings, ContactPageData } from '@/lib/admin/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Building2,
  GraduationCap,
  Users,
  Monitor,
  ExternalLink,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Schema & Types                                                     */
/* ------------------------------------------------------------------ */

const SUBJECTS = ['admission', 'academic', 'technical', 'other'] as const;

type ContactFormData = {
  name: string;
  email: string;
  subject: (typeof SUBJECTS)[number];
  message: string;
};

/* ------------------------------------------------------------------ */
/*  Fallback Data                                                       */
/* ------------------------------------------------------------------ */

const FALLBACK_DEPARTMENTS = [
  {
    icon: 'GraduationCap',
    title: 'Приёмная комиссия',
    email: 'admissions@zhezu.edu.kz',
    phone: '+7 (7102) 74-00-11',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: 'Building2',
    title: 'Учебный отдел',
    email: 'academic@zhezu.edu.kz',
    phone: '+7 (7102) 74-00-12',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    icon: 'Users',
    title: 'Студенческий сервис',
    email: 'students@zhezu.edu.kz',
    phone: '+7 (7102) 74-00-13',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: 'Monitor',
    title: 'IT-поддержка',
    email: 'support@zhezu.edu.kz',
    phone: '+7 (7102) 74-00-22',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
  },
];

/* FALLBACK_SUBJECT_LABELS are now loaded via i18n in component body */

const FALLBACK_OPENING_HOURS = [
  { day: 'Пн - Пт', hours: '09:00 - 18:00', closed: false },
  { day: 'Суббота', hours: '10:00 - 14:00', closed: false },
  { day: 'Воскресенье', hours: 'Закрыто', closed: true },
];

const ICON_MAP: Record<string, typeof GraduationCap> = {
  GraduationCap,
  Building2,
  Users,
  Monitor,
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [contactData, setContactData] = useState<ContactPageData | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch('/api/public/settings', { signal: controller.signal }).then((r) =>
        r.ok ? r.json() : null,
      ),
      fetch('/api/public/contact', { signal: controller.signal }).then((r) =>
        r.ok ? r.json() : null,
      ),
    ])
      .then(([s, c]) => {
        if (s) setSettings(s);
        if (c) setContactData(c);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const contactSchema = z.object({
    name: z.string().min(1, t('form.name')).min(2, t('form.name')),
    email: z.string().min(1, t('form.email')).email(t('form.email')),
    subject: z.enum(SUBJECTS, { message: t('form.subject') }),
    message: z.string().min(1, t('form.message')).min(10, t('form.message')),
  });

  const DEPARTMENTS =
    contactData?.departments && contactData.departments.length > 0
      ? contactData.departments
      : FALLBACK_DEPARTMENTS;
  const SUBJECT_LABELS: Record<string, string> =
    contactData?.subjectLabels && Object.keys(contactData.subjectLabels).length > 0
      ? contactData.subjectLabels
      : { admission: t('form.subjects.admission'), academic: t('form.subjects.academic'), technical: t('form.subjects.technical'), other: t('form.subjects.other') };
  const OPENING_HOURS =
    contactData?.openingHours && contactData.openingHours.length > 0
      ? contactData.openingHours
      : FALLBACK_OPENING_HOURS;
  const googleMapsQuery = contactData?.googleMapsQuery || 'Zhezkazgan+University';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: undefined,
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

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setSubmitError(result?.errors?._form?.[0] ?? result?.error ?? response.statusText);
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError('Network error');
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,14,23,0.88)] to-[rgba(10,14,23,0.78)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,rgba(230,179,37,0.1),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 text-center sm:px-10 sm:text-left">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-white md:text-5xl">
            {t('title')}
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-8 sm:px-10">

        {/* -------- Map Placeholder -------- */}
        <div className="border-border-light bg-bg-light dark:border-border-dark dark:bg-bg-dark relative mb-12 w-full overflow-hidden rounded-xl border shadow-sm">
          <iframe
            title={t('map.openInGoogleMaps')}
            src={`https://maps.google.com/maps?q=${googleMapsQuery}&output=embed&z=15`}
            className="aspect-video w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            href={`https://maps.google.com/?q=${googleMapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface-light text-text-primary-light hover:bg-bg-light dark:bg-surface-dark dark:text-text-primary-dark dark:hover:bg-bg-dark absolute right-4 bottom-4 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-md transition-colors"
          >
            {t('map.openInGoogleMaps')}
            <ExternalLink size={14} />
          </a>
        </div>

        {/* -------- Two-column: Office Info + Form -------- */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* LEFT COLUMN -- Contact details, hours, departments */}
          <div className="flex flex-col gap-8 lg:col-span-4">
            {/* Main Office */}
            <div className="flex flex-col gap-4">
              <h2 className="text-text-primary-light dark:text-text-primary-dark flex items-center gap-2 text-xl font-bold">
                <Building2 size={20} className="text-primary" />
                {t('mainOffice')}
              </h2>
              <div className="border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark flex flex-col gap-6 rounded-xl border p-6 shadow-sm">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary shrink-0 rounded-lg p-2">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-text-primary-light dark:text-text-primary-dark font-bold">
                      {t('info.addressLabel')}
                    </h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">
                      {settings?.address?.ru ?? t('info.address')}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary shrink-0 rounded-lg p-2">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-text-primary-light dark:text-text-primary-dark font-bold">
                      {t('info.phoneLabel')}
                    </h3>
                    <div className="text-text-secondary-light dark:text-text-secondary-dark mt-1 flex flex-col gap-1 text-sm">
                      <a
                        href={`tel:${(settings?.contactPhone ?? t('info.phone')).replace(/[\s()-]/g, '')}`}
                        className="hover:text-primary transition-colors"
                      >
                        {settings?.contactPhone ?? t('info.phone')}
                      </a>
                      {settings?.contactPhoneAdmissions && (
                        <a
                          href={`tel:${settings.contactPhoneAdmissions.replace(/[\s()-]/g, '')}`}
                          className="hover:text-primary transition-colors"
                        >
                          {settings.contactPhoneAdmissions}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary shrink-0 rounded-lg p-2">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-text-primary-light dark:text-text-primary-dark font-bold">
                      {t('info.emailLabel')}
                    </h3>
                    <a
                      href={`mailto:${settings?.contactEmail ?? t('info.email')}`}
                      className="hover:text-primary text-text-secondary-light dark:text-text-secondary-dark mt-1 block text-sm transition-colors"
                    >
                      {settings?.contactEmail ?? t('info.email')}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex flex-col gap-4">
              <h2 className="text-text-primary-light dark:text-text-primary-dark flex items-center gap-2 text-xl font-bold">
                <Clock size={20} className="text-primary" />
                {t('openingHours.title')}
              </h2>
              <div className="border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark rounded-xl border p-6 shadow-sm">
                <ul className="flex flex-col gap-3 text-sm">
                  {OPENING_HOURS.map((item, idx) => (
                    <li
                      key={item.day}
                      className={`flex items-center justify-between ${
                        idx < OPENING_HOURS.length - 1
                          ? 'border-border-light dark:border-border-dark border-b pb-2'
                          : 'pt-1'
                      }`}
                    >
                      <span className="text-text-secondary-light dark:text-text-secondary-dark">
                        {item.day}
                      </span>
                      <span
                        className={
                          item.closed
                            ? 'text-primary font-medium'
                            : 'text-text-primary-light dark:text-text-primary-dark font-medium'
                        }
                      >
                        {item.hours}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Departments */}
            <div className="flex flex-col gap-4">
              <h2 className="text-text-primary-light dark:text-text-primary-dark flex items-center gap-2 text-xl font-bold">
                <Users size={20} className="text-primary" />
                {t('departments.title')}
              </h2>
              <div className="border-border-light bg-bg-light dark:border-border-dark dark:bg-bg-dark rounded-xl border p-1">
                {DEPARTMENTS.map((dept, idx) => {
                  const IconComp =
                    (typeof dept.icon === 'string' ? ICON_MAP[dept.icon] : dept.icon) || Building2;
                  return (
                    <div key={dept.title}>
                      <div className="group hover:bg-surface-light dark:hover:bg-surface-dark cursor-pointer rounded-lg p-3 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className={`shrink-0 rounded-lg p-1.5 ${dept.bg}`}>
                            <IconComp size={16} className={dept.color} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="group-hover:text-primary text-text-primary-light dark:text-text-primary-dark text-sm font-semibold">
                              {dept.title}
                            </h4>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-xs">
                              {dept.email}
                            </p>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                              {dept.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                      {idx < DEPARTMENTS.length - 1 && (
                        <div className="bg-border-light dark:bg-border-dark mx-3 h-px" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN -- Contact Form */}
          <div className="lg:col-span-8">
            <div className="border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm">
              {/* Form Header */}
              <div className="border-border-light dark:border-border-dark border-b p-8">
                <h2 className="text-text-primary-light dark:text-text-primary-dark mb-2 text-2xl font-bold">
                  {t('form.formTitle')}
                </h2>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  {t('form.description')}
                </p>
              </div>

              {/* Form Body */}
              {submitted ? (
                <div className="flex flex-1 items-center justify-center p-12">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <CheckCircle2 size={32} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-text-primary-light dark:text-text-primary-dark mb-2 text-xl font-bold">
                      {t('form.success')}
                    </h3>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-6 p-8">
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Input
                      label={t('form.name')}
                      placeholder={t('form.namePlaceholder')}
                      icon={<Users size={16} />}
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label={t('form.email')}
                      type="email"
                      placeholder={t('form.emailPlaceholder')}
                      icon={<Mail size={16} />}
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>

                  {/* Subject select */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="subject"
                      className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium"
                    >
                      {t('form.subject')}
                    </label>
                    <div className="relative">
                      <span className="text-text-secondary-light dark:text-text-secondary-dark pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
                        <Mail size={16} />
                      </span>
                      <select
                        id="subject"
                        {...register('subject')}
                        className="focus:border-primary focus:ring-primary border-border-light bg-bg-light text-text-primary-light dark:border-border-dark dark:bg-bg-dark dark:text-text-primary-dark h-10 w-full rounded-lg border pr-4 pl-10 text-sm"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          {t('form.selectTopic')}
                        </option>
                        {SUBJECTS.map((key) => (
                          <option key={key} value={key}>
                            {SUBJECT_LABELS[key]}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.subject && (
                      <p className="text-xs text-red-500">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message textarea */}
                  <div className="flex flex-1 flex-col gap-1.5">
                    <label
                      htmlFor="message"
                      className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium"
                    >
                      {t('form.message')}
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder={t('form.messagePlaceholder')}
                      {...register('message')}
                      className="focus:border-primary focus:ring-primary border-border-light bg-bg-light text-text-primary-light dark:border-border-dark dark:bg-bg-dark dark:text-text-primary-dark w-full flex-1 resize-none rounded-lg border p-4 text-sm"
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit error */}
                  {submitError && (
                    <p className="text-sm text-red-500" role="alert">
                      {submitError}
                    </p>
                  )}

                  {/* Footer row */}
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-xs text-xs">
                      {t('form.privacyNote')}
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      loading={isSubmitting}
                      icon={<Send size={16} />}
                      iconPosition="right"
                    >
                      {isSubmitting ? t('form.submitting') : t('form.submit')}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
