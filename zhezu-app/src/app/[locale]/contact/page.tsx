'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

const contactSchema = z.object({
  name: z.string().min(1, 'Введите ваше имя').min(2, 'Имя должно содержать не менее 2 символов'),
  email: z.string().min(1, 'Введите email').email('Введите корректный email'),
  subject: z.enum(SUBJECTS, { message: 'Выберите тему обращения' }),
  message: z
    .string()
    .min(1, 'Введите сообщение')
    .min(10, 'Сообщение должно содержать не менее 10 символов'),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const DEPARTMENTS = [
  {
    icon: GraduationCap,
    title: 'Приёмная комиссия',
    email: 'admissions@zhezu.edu.kz',
    phone: '+7 (7102) 74-00-11',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Building2,
    title: 'Учебный отдел',
    email: 'academic@zhezu.edu.kz',
    phone: '+7 (7102) 74-00-12',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    icon: Users,
    title: 'Студенческий сервис',
    email: 'students@zhezu.edu.kz',
    phone: '+7 (7102) 74-00-13',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: Monitor,
    title: 'IT-поддержка',
    email: 'support@zhezu.edu.kz',
    phone: '+7 (7102) 74-00-22',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
  },
];

const SUBJECT_LABELS: Record<string, string> = {
  admission: 'Поступление',
  academic: 'Учебные программы',
  technical: 'Техническая поддержка',
  other: 'Другое',
};

const OPENING_HOURS = [
  { day: 'Пн - Пт', hours: '09:00 - 18:00', closed: false },
  { day: 'Суббота', hours: '10:00 - 14:00', closed: false },
  { day: 'Воскресенье', hours: 'Закрыто', closed: true },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
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

      const result = await response.json();

      if (!response.ok || !result.success) {
        setSubmitError(result.errors?._form?.[0] ?? 'Произошла ошибка. Попробуйте снова.');
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError('Ошибка сети. Проверьте подключение и попробуйте снова.');
    }
  }

  return (
    <div className="flex flex-col">
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-8 sm:px-10">
        {/* -------- Page Header -------- */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-900 md:text-5xl dark:text-white">
            Контакты
          </h1>
          <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Свяжитесь с Жезказганским университетом. Будь вы абитуриент, исследователь или гость --
            мы всегда готовы помочь.
          </p>
        </div>

        {/* -------- Map Placeholder -------- */}
        <div className="relative mb-12 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-800">
          <div className="aspect-video w-full" />
          {/* Pin icon */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="bg-primary animate-bounce rounded-full p-3 text-white shadow-lg">
              <MapPin size={28} />
            </div>
          </div>
          {/* Google Maps link */}
          <a
            href="https://maps.google.com/?q=Zhezkazgan+University"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 bottom-4 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-md transition-colors hover:bg-slate-50 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            Открыть в Google Maps
            <ExternalLink size={14} />
          </a>
        </div>

        {/* -------- Two-column: Office Info + Form -------- */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* LEFT COLUMN -- Contact details, hours, departments */}
          <div className="flex flex-col gap-8 lg:col-span-4">
            {/* Main Office */}
            <div className="flex flex-col gap-4">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <Building2 size={20} className="text-primary" />
                Главный офис
              </h2>
              <div className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary shrink-0 rounded-lg p-2">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Адрес</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      пр. Алашахана, 1Б,
                      <br />
                      г. Жезказган, Казахстан
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary shrink-0 rounded-lg p-2">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Телефон</h3>
                    <div className="mt-1 flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-400">
                      <a href="tel:+77102744392" className="hover:text-primary transition-colors">
                        +7 (7102) 74-43-92
                      </a>
                      <a href="tel:+77102745024" className="hover:text-primary transition-colors">
                        +7 (7102) 74-50-24
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary shrink-0 rounded-lg p-2">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Email</h3>
                    <a
                      href="mailto:info@zhezu.edu.kz"
                      className="hover:text-primary mt-1 block text-sm text-slate-600 transition-colors dark:text-slate-400"
                    >
                      info@zhezu.edu.kz
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex flex-col gap-4">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <Clock size={20} className="text-primary" />
                Часы работы
              </h2>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <ul className="flex flex-col gap-3 text-sm">
                  {OPENING_HOURS.map((item, idx) => (
                    <li
                      key={item.day}
                      className={`flex items-center justify-between ${
                        idx < OPENING_HOURS.length - 1
                          ? 'border-b border-slate-100 pb-2 dark:border-slate-700'
                          : 'pt-1'
                      }`}
                    >
                      <span className="text-slate-600 dark:text-slate-400">{item.day}</span>
                      <span
                        className={
                          item.closed
                            ? 'text-primary font-medium'
                            : 'font-medium text-slate-900 dark:text-white'
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
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <Users size={20} className="text-primary" />
                Отделы
              </h2>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800/50">
                {DEPARTMENTS.map((dept, idx) => (
                  <div key={dept.title}>
                    <div className="group cursor-pointer rounded-lg p-3 transition-colors hover:bg-white dark:hover:bg-slate-800">
                      <div className="flex items-start gap-3">
                        <div className={`shrink-0 rounded-lg p-1.5 ${dept.bg}`}>
                          <dept.icon size={16} className={dept.color} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="group-hover:text-primary text-sm font-semibold text-slate-900 dark:text-white">
                            {dept.title}
                          </h4>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {dept.email}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{dept.phone}</p>
                        </div>
                      </div>
                    </div>
                    {idx < DEPARTMENTS.length - 1 && (
                      <div className="mx-3 h-px bg-slate-200 dark:bg-slate-700" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN -- Contact Form */}
          <div className="lg:col-span-8">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              {/* Form Header */}
              <div className="border-b border-slate-100 p-8 dark:border-slate-800">
                <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                  Напишите нам
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Есть вопрос или нужна помощь? Заполните форму ниже, и наша команда ответит вам в
                  течение 24 часов.
                </p>
              </div>

              {/* Form Body */}
              {submitted ? (
                <div className="flex flex-1 items-center justify-center p-12">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <CheckCircle2 size={32} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                      Сообщение отправлено!
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Мы свяжемся с вами в ближайшее время.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-6 p-8">
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Input
                      label="Полное имя"
                      placeholder="Иван Иванов"
                      icon={<Users size={16} />}
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="ivan@example.com"
                      icon={<Mail size={16} />}
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>

                  {/* Subject select */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Тема
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
                        <Mail size={16} />
                      </span>
                      <select
                        id="subject"
                        {...register('subject')}
                        className="focus:border-primary focus:ring-primary h-10 w-full rounded-lg border border-slate-300 bg-slate-50 pr-4 pl-10 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Выберите тему
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
                      className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Сообщение
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Чем мы можем помочь?"
                      {...register('message')}
                      className="focus:border-primary focus:ring-primary w-full flex-1 resize-none rounded-lg border border-slate-300 bg-slate-50 p-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
                    <p className="max-w-xs text-xs text-slate-500 dark:text-slate-400">
                      Отправляя форму, вы соглашаетесь с нашей политикой конфиденциальности и
                      условиями использования.
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      loading={isSubmitting}
                      icon={<Send size={16} />}
                      iconPosition="right"
                    >
                      {isSubmitting ? 'Отправка...' : 'Отправить'}
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
