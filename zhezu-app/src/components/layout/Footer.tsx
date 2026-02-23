'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GraduationCap, MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { UNIVERSITY } from '@/lib/constants';
import { SOCIAL_LINKS } from '@/lib/navigation';
import { Button } from '@/components/ui/Button';

/* ------------------------------------------------------------------ */
/*  Social Icon SVGs (same as Header)                                  */
/* ------------------------------------------------------------------ */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const SOCIAL_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
};

/* ------------------------------------------------------------------ */
/*  Footer Navigation Data                                             */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { label: 'О вузе', href: '/university/about' },
  { label: 'Руководство', href: '/university/rector' },
  { label: 'Поступление', href: '/admission' },
  { label: 'Наука', href: '/research' },
  { label: 'AI-Центр', href: '/ai-center' },
];

const STUDENT_LINKS = [
  { label: 'Расписание', href: '/academics/schedule' },
  { label: 'Библиотека', href: '/academics/library' },
  { label: 'Общежития', href: '/life/dormitories' },
  { label: 'Клубы и кружки', href: '/life/clubs' },
  { label: 'Спорт', href: '/life/sports' },
];

/* ================================================================== */
/*  FOOTER                                                             */
/* ================================================================== */
export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-bg-dark text-white">
      {/* ── Section 1: Newsletter ────────────────────────────────── */}
      <div className="bg-gradient-to-br from-primary to-primary-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(230,179,37,0.15),transparent_60%)]" />
            <div className="relative flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-display font-bold text-white mb-1">
                  {t('newsletter.title')}
                </h3>
                <p className="text-white/60 text-sm">
                  {t('newsletter.desc')}
                </p>
              </div>
              <div className="flex w-full sm:w-auto gap-2">
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="flex-1 sm:w-64 h-10 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
                <Button variant="secondary" size="md" icon={<Send size={16} />}>
                  {t('newsletter.subscribe')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Main 4-Column Grid ────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Column 1: University Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-[0_0_15px_rgba(29,86,201,0.4)] transition-shadow duration-300">
                <GraduationCap size={20} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                ZhezU
              </span>
            </Link>

            <p className="text-sm text-white/60 leading-relaxed mb-6">
              {t('description')}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const IconComp = SOCIAL_ICON_MAP[social.id];
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors duration-200"
                  >
                    {IconComp && <IconComp className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Навигация */}
          <div>
            <h3 className="font-display font-semibold text-sm text-white mb-5 uppercase tracking-wide">
              Навигация
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Студентам */}
          <div>
            <h3 className="font-display font-semibold text-sm text-white mb-5 uppercase tracking-wide">
              Студентам
            </h3>
            <ul className="space-y-3">
              {STUDENT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Контакты */}
          <div>
            <h3 className="font-display font-semibold text-sm text-white mb-5 uppercase tracking-wide">
              {t('contacts')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-white/40 mt-0.5 shrink-0" />
                <span className="text-sm text-white/60 leading-relaxed">
                  {UNIVERSITY.address.ru}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-white/40 shrink-0" />
                <a
                  href={`tel:${UNIVERSITY.phone.replace(/[\s()-]/g, '')}`}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {UNIVERSITY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-white/40 shrink-0" />
                <a
                  href={`mailto:${UNIVERSITY.email}`}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {UNIVERSITY.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-white/40 shrink-0" />
                <span className="text-sm text-white/60">
                  Пн-Пт: 09:00 — 18:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Section 3: Bottom Bar ──────────────────────────────── */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; 2026 Жезказганский университет им. О.А. Байконурова. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-white/40 hover:text-white transition-colors duration-200"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/sitemap"
              className="text-xs text-white/40 hover:text-white transition-colors duration-200"
            >
              Карта сайта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
