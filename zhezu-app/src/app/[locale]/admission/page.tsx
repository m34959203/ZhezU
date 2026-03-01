'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import {
  BookOpen,
  FileText,
  Send,
  ClipboardCheck,
  ArrowRight,
  Globe,
  BadgeCheck,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Static data for program cards (images from the stitch design)      */
/* ------------------------------------------------------------------ */
const PROGRAM_CARDS = [
  {
    key: 'cs',
    degree: 'B.Sc.',
    duration: 4,
    lang: 'English',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwRMBBfq_5taGdnlvygxrbUvKpt-TL5QMWKcLGgyIjGU8z_TeN5oXIpa4Mw6qXYxBUS-HGsSOLlECHY7yZtDUD2MxIa2I-Y3KUxWhPbUfhPEW96uyLaEjXHnyAVtv9mNd8ZRwEmj72doEs0YZ3KIklOKWouvoMWMvu6PlRO1m4R04yxfsfCbHR2fttYlhpY_v10wnOGu47IgcyrdB1i4NZTGsehl-Y-l66IEM1AxhxYqThXkPm3RKj2qic8tYXO2l__CBGTSEvPa6T',
  },
  {
    key: 'arch',
    degree: 'B.Arch',
    duration: 5,
    lang: 'English / Kazakh',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmoKRtsbjfCMtKIoQhFj8vG3NZC6Q6cJbXf02Z0exyRae51tpMZqsO8Dvu57YhkTe_9CE1BBc9XsfLJYwRzK1PC9aGDKnH3HqekiyGsErOVLXUtAtvnMwRGYFCj7LbAM_8MA-ddZv_lPnJcDklpXIxoVKmiISLrPmHcXw7J3gbReLt29yA7go3tienZ1xDosS1Y9Wuda4jH4lvYUmJ1fvnGkGK1cr0EjcDCwuwUVZGVcjS2lUjlrMMZsvZzDDo9h7Pz7JzH0UNtJxP',
  },
  {
    key: 'biz',
    degree: 'MBA',
    duration: 2,
    lang: 'English',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDExVSSskaat2L5lsqoEUdjhyafelldX5jGkJQ-ne5PTzLGLWO-jQhMUa4Sx7r8kZTCOWlhtKAfjBN1AQTkPiGVv2YwMpzLnjLgVzQFWJJmBbKziUGxI2dLAXNoMCAp9mW5QE4Jzjb3GD3PAFQgkdhjk8A6xFEKy184psvlwClZXM_0y9x2l03yS1J1RZtf_ddoH4JubN2jBv48naZMwxBDFPp1TNMrF1NsWf6ePjxLzIFYmFUWGmz4fyUnqLdgApkEPn-sMLVU_ASw',
  },
  {
    key: 'civil',
    degree: 'B.Eng',
    duration: 4,
    lang: 'Russian',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbc5ZfW09_IU9uX9PoQzlf9NB0BNZkpGkNjBzbOUDi7APE7-eFkZagRz0c-eHB7ZvnasABpYdb_To-tjpPu93U18MJbF8NKhMnwkyoG4N9U0cAv1PZoaslYjOIbPTmMRBsxRR0Hp5fnBwchfiOzl01iOgSkaZ62IH82v85IKZKme54CIgWUmfOyqNhfBWB1Q_0vP4Mn0ADe_Of9UyHZOeW0O58xZQa0xhUfyfsGG3QVGoRovX2VydWxQG-SmZSP247jiNIB5vLcuqC',
  },
  {
    key: 'econ',
    degree: 'B.A.',
    duration: 3,
    lang: 'English',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjCI7ikUNAHkHtKpIRzfW8utO9I1u2BqcdJEYe1dGZUA_kffNOovu050lmrkVSHCcf_jl8WFyEZGrEWhmcS75zpv74xRAD5Sg_-aDc3Gn10FoOzaIYtlb63iOlBR_B2HHkoKYZWlk6EyynXcVvuQ7Z3vKEPrkPcv4RH4cyxbnzOGJiY0ZwCzMb9v2eN0iyZVBsJCx8-R1nROCKCrYfrzPaR21YWKk3ZteTtnrfYMoM_mQCz4dSOS_oD38zlhNpGLjKSxeiGRrmQKf_',
  },
  {
    key: 'psych',
    degree: 'B.Sc.',
    duration: 4,
    lang: 'Kazakh / English',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjjVKnfXKyPj8JLqE-J_-y_d5DwPprpD4V-2MtIa6vYcNqStPoutJnX2vPeRDbsqMdqiGtHaNEb4J_Jw5ADrZDx7Dm9HwaqyKA1xetCeftyHTxOvZ6TeEHud53FffdIypOn3FjDIByNQqA5xQVml4VRPfhv7_QKq8EJdboIExwArYJoniXRk0u2bn4qAHWA9cSKhbXLQh2p0Vl3b9pFZUFMZMRtUIhNfbIypRtwYZ-AF3nvWqOdSFlJg9nFbX4acUueYFc_zd-5QAf',
  },
];

export default function AdmissionPage() {
  const t = useTranslations('admission');
  const tActions = useTranslations('actions');

  /* Admission open flag from admin settings */
  const [admissionOpen, setAdmissionOpen] = useState(true);
  useEffect(() => {
    fetch('/api/public/settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => { if (s && typeof s.admissionOpen === 'boolean') setAdmissionOpen(s.admissionOpen); })
      .catch(() => {});
  }, []);

  /* Tuition data from admin */
  const [tuitionCosts, setTuitionCosts] = useState({
    costResident: 600000,
    costInternational: 800000,
    dormitory: 180000,
    gpa35: 150000,
    gpa30: 90000,
    gpa25: 30000,
  });
  useEffect(() => {
    fetch('/api/public/tuition')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return;
        // Calculate average cost across programs, or use first program's cost
        const programs = d.programs || [];
        const paid = programs.filter((p: { isFree: boolean }) => !p.isFree);
        const avgRes = paid.length > 0
          ? Math.round(paid.reduce((s: number, p: { costResident: number }) => s + p.costResident, 0) / paid.length)
          : 600000;
        const avgInt = paid.length > 0
          ? Math.round(paid.reduce((s: number, p: { costInternational: number }) => s + p.costInternational, 0) / paid.length)
          : 800000;
        setTuitionCosts({
          costResident: avgRes,
          costInternational: avgInt,
          dormitory: d.dormitoryCost ?? 180000,
          gpa35: d.scholarships?.gpa35 ?? 150000,
          gpa30: d.scholarships?.gpa30 ?? 90000,
          gpa25: d.scholarships?.gpa25 ?? 30000,
        });
      })
      .catch(() => {});
  }, []);

  /* Tuition calculator state */
  const [isResident, setIsResident] = useState(true);
  const [gpa, setGpa] = useState(35); // stored as 0-40, displayed as 0.0-4.0
  const [onCampus, setOnCampus] = useState(true);

  const gpaDisplay = (gpa / 10).toFixed(1);
  const baseTuition = isResident ? tuitionCosts.costResident : tuitionCosts.costInternational;
  const housing = onCampus ? tuitionCosts.dormitory : 0;
  const scholarship = gpa >= 35 ? tuitionCosts.gpa35 : gpa >= 30 ? tuitionCosts.gpa30 : gpa >= 25 ? tuitionCosts.gpa25 : 0;
  const total = baseTuition + housing - scholarship;

  const formatTenge = (v: number) => {
    const abs = Math.abs(v);
    return `${v < 0 ? '-' : ''}${abs.toLocaleString('ru-KZ')} ₸`;
  };

  /* Steps data */
  const steps = [
    { icon: BookOpen, label: t('steps.step1'), desc: t('steps.step1Desc'), active: true },
    { icon: FileText, label: t('steps.step2'), desc: t('steps.step2Desc'), active: false },
    { icon: Send, label: t('steps.step3'), desc: t('steps.step3Desc'), active: false },
    { icon: ClipboardCheck, label: t('steps.step4'), desc: t('steps.step4Desc'), active: false },
  ];

  /* FAQ items */
  const faqItems = [
    { id: 'faq-1', trigger: t('faq.q1'), content: t('faq.a1') },
    { id: 'faq-2', trigger: t('faq.q2'), content: t('faq.a2') },
    { id: 'faq-3', trigger: t('faq.q3'), content: t('faq.a3') },
    { id: 'faq-4', trigger: t('faq.q4'), content: t('faq.a4') },
  ];

  return (
    <div className="flex flex-col">
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[560px] flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-8 text-center">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJEsrpAMTM1QYcTMat30yhLfeHb6b6kAUnQZU6yLw7uSmCJEK9yY6FYGouMqJGswKMmuVr3WkG9cYHiiuv2w--GxixZfFiQCOtcHhu5QrSnXZ01PBSKjDEAgW8jLbQtjM6asj3_bZJJw4j4ziqlTjBT7B-49qC12OSZ96Jj3pSJjuhdBrPrrGX7FfD1Grn-n4Gvz8IVUbpQVd6rksU_g3GJuE9FCV3GlS101oEw_HTkdU_p8R39To1epKi3caUJqBB9UlDBWzXU_Ly")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(17,22,33,0.6)] to-[rgba(17,22,33,0.8)]" />

        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
          {/* Badge */}
          <Badge
            variant={admissionOpen ? 'warning' : 'default'}
            className={`border px-4 py-1.5 text-xs font-bold tracking-wider uppercase backdrop-blur-sm ${
              admissionOpen
                ? 'border-gold/30 bg-gold/20 text-gold-light'
                : 'border-white/20 bg-white/10 text-white/70'
            }`}
          >
            {admissionOpen ? t('heroBadge') : t('heroBadgeClosed')}
          </Badge>

          {/* Title */}
          <h1 className="text-4xl leading-tight font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          {admissionOpen && (
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="min-w-[160px] shadow-lg transition-transform hover:scale-105"
              >
                {t('startApplication')}
              </Button>
              <button className="flex h-12 min-w-[160px] cursor-pointer items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                {t('viewRequirements')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. YOUR PATH TO ZHEZU - 4-step process                       */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('steps.title')}</h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mt-4 text-lg">
              {t('steps.subtitle')}
            </p>
          </div>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="absolute top-8 right-[12.5%] left-[12.5%] hidden h-0.5 bg-slate-200 lg:block dark:bg-slate-700" />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-4">
              {steps.map((step, i) => (
                <div key={i} className="group relative flex flex-col items-center text-center">
                  <div
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 shadow-sm transition-colors ${
                      step.active
                        ? 'border-primary bg-surface-light text-primary group-hover:bg-primary dark:bg-surface-dark dark:border-primary group-hover:text-white'
                        : 'border-border-light bg-surface-light text-text-secondary-light group-hover:border-primary group-hover:text-primary dark:bg-surface-dark dark:border-border-dark dark:text-text-secondary-dark'
                    }`}
                  >
                    <step.icon className="h-7 w-7" />
                  </div>
                  <div className="mt-4 flex flex-col items-center">
                    <h3 className="text-lg font-bold">{step.label}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 text-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. FIND YOUR PROGRAM - sidebar filters + card grid            */}
      {/* ============================================================ */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{t('programs.title')}</h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">
                {t('programs.subtitle')}
              </p>
            </div>
            <button className="text-primary hover:text-primary-dark flex items-center gap-1 font-semibold">
              {t('programs.viewAll')} <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Filters sidebar */}
            <aside className="border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark h-fit rounded-xl border p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">{t('filters.title')}</h3>
              <div className="space-y-6">
                {/* Department checkboxes */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    {t('filters.department')}
                  </label>
                  <div className="space-y-2">
                    {(['engineering', 'business', 'artsSciences', 'medicine'] as const).map(
                      (dept) => (
                        <label key={dept} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="text-primary focus:ring-primary rounded border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                          />
                          <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                            {t(`filters.departments.${dept}`)}
                          </span>
                        </label>
                      ),
                    )}
                  </div>
                </div>

                {/* Level dropdown */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">{t('filters.level')}</label>
                  <select className="border-border-light bg-surface-hover-light focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-surface-dark w-full rounded-lg py-2 text-sm">
                    {(['all', 'undergraduate', 'graduate', 'phd'] as const).map((level) => (
                      <option key={level}>{t(`filters.levels.${level}`)}</option>
                    ))}
                  </select>
                </div>

                {/* Language radios */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    {t('filters.language')}
                  </label>
                  <div className="space-y-2">
                    {(['english', 'kazakh', 'russian'] as const).map((lang, i) => (
                      <label key={lang} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="lang"
                          defaultChecked={i === 0}
                          className="text-primary focus:ring-primary border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                        />
                        <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                          {t(`filters.languages.${lang}`)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Program cards grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {PROGRAM_CARDS.map((prog) => (
                  <Card key={prog.key} hover padding="none" className="cursor-pointer">
                    {/* Card image */}
                    <div
                      className="aspect-video w-full bg-slate-200 bg-cover bg-center dark:bg-slate-700"
                      style={{ backgroundImage: `url('${prog.img}')` }}
                    />
                    {/* Card body */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="default" className="text-xs font-semibold">
                          {prog.degree}
                        </Badge>
                        <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                          {prog.duration} {t('programCards.years')}
                        </span>
                      </div>
                      <h4 className="group-hover:text-primary mb-2 text-lg font-bold">
                        {t(`programCards.${prog.key}` as Parameters<typeof t>[0])}
                      </h4>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 flex-1 text-sm">
                        {t(`programCards.${prog.key}Desc` as Parameters<typeof t>[0])}
                      </p>
                      <div className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-2 text-xs font-medium">
                        <Globe className="h-3.5 w-3.5" /> {prog.lang}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. TUITION ESTIMATOR                                          */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl px-6 py-12 md:px-12 dark:bg-blue-900">
            <div className="mx-auto max-w-5xl">
              {/* Header */}
              <div className="mb-10 text-center text-white">
                <h2 className="text-3xl font-bold">{t('tuition.title')}</h2>
                <p className="mt-2 text-blue-100 opacity-90">{t('tuition.subtitle')}</p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Controls */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-lg">
                  <div className="space-y-6">
                    {/* Residency toggle */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        {t('tuition.residency')}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setIsResident(true)}
                          className={`cursor-pointer rounded-lg py-2 text-sm font-medium transition-colors ${
                            isResident
                              ? 'bg-primary text-white shadow-sm'
                              : 'bg-surface-hover-light dark:bg-surface-hover-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-slate-200 dark:hover:bg-slate-600'
                          }`}
                        >
                          {t('tuition.resident')}
                        </button>
                        <button
                          onClick={() => setIsResident(false)}
                          className={`cursor-pointer rounded-lg py-2 text-sm font-medium transition-colors ${
                            !isResident
                              ? 'bg-primary text-white shadow-sm'
                              : 'bg-surface-hover-light dark:bg-surface-hover-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-slate-200 dark:hover:bg-slate-600'
                          }`}
                        >
                          {t('tuition.international')}
                        </button>
                      </div>
                    </div>

                    {/* GPA slider */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold">{t('tuition.gpa')}</label>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        value={gpa}
                        onChange={(e) => setGpa(Number(e.target.value))}
                        className="accent-primary h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 dark:bg-slate-600"
                      />
                      <div className="text-text-secondary-light dark:text-text-secondary-dark mt-1 flex justify-between text-xs">
                        <span>2.0</span>
                        <span className="text-primary font-bold">{gpaDisplay}</span>
                        <span>4.0</span>
                      </div>
                    </div>

                    {/* Living on campus radio */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        {t('tuition.livingOnCampus')}
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="housing"
                            checked={onCampus}
                            onChange={() => setOnCampus(true)}
                            className="text-primary focus:ring-primary"
                          />
                          <span className="text-sm">{t('tuition.yes')}</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="housing"
                            checked={!onCampus}
                            onChange={() => setOnCampus(false)}
                            className="text-primary focus:ring-primary"
                          />
                          <span className="text-sm">{t('tuition.no')}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results breakdown */}
                <div className="flex flex-col justify-center rounded-xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-white/20 pb-4">
                      <span className="text-blue-100">{t('tuition.baseTuition')}</span>
                      <span className="font-bold">{formatTenge(baseTuition)}</span>
                    </div>
                    {onCampus && (
                      <div className="flex justify-between border-b border-white/20 pb-4">
                        <span className="text-blue-100">{t('tuition.housingMeals')}</span>
                        <span className="font-bold">{formatTenge(housing)}</span>
                      </div>
                    )}
                    {scholarship > 0 && (
                      <div className="flex justify-between border-b border-white/20 pb-4 text-green-300">
                        <span className="flex items-center gap-1">
                          <BadgeCheck className="h-4 w-4" /> {t('tuition.meritScholarship')}
                        </span>
                        <span className="font-bold">-{formatTenge(scholarship)}</span>
                      </div>
                    )}
                    <div className="mt-6 flex items-end justify-between pt-2">
                      <span className="text-lg font-medium">{t('tuition.estimatedTotal')}</span>
                      <span className="text-4xl font-bold text-white">
                        {formatTenge(total)}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-blue-200">{t('tuition.disclaimer')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. FAQ ACCORDION                                              */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">{t('faq.title')}</h2>
          </div>
          <Accordion items={faqItems} type="single" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. CTA SECTION - "Ready to Shape Your Future?"                */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-16 text-center sm:px-12">
            {/* Dot pattern background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              {admissionOpen && (
                <Badge
                  variant="warning"
                  className="border-gold/30 bg-gold/20 text-gold mb-4 inline-block border px-3 py-1 text-xs font-semibold tracking-wider uppercase"
                >
                  {t('cta.badge')}
                </Badge>
              )}

              <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">{t('cta.title')}</h2>

              <p className="mb-8 text-lg text-slate-300">{t('cta.subtitle')}</p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                {admissionOpen && (
                  <Button
                    variant="secondary"
                    size="lg"
                    className="min-w-[200px] shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-transform hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]"
                  >
                    {tActions('apply')}
                  </Button>
                )}
                <button className="flex h-12 min-w-[200px] cursor-pointer items-center justify-center rounded-lg bg-white/10 px-8 text-lg font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                  {t('cta.contactAdmissions')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
