import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GraduationCap, Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react';
import { UNIVERSITY } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-bg-dark">
      {/* Newsletter */}
      <div className="border-b border-border-light dark:border-border-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-8 sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(230,179,37,0.2),transparent_60%)]" />
            <div className="relative flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-display font-bold text-white mb-1">{t('newsletter.title')}</h3>
                <p className="text-white/60 text-sm">{t('newsletter.desc')}</p>
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg text-primary dark:text-primary-light">
                ZhezU
              </span>
            </Link>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-4">
              {t('description')}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { href: UNIVERSITY.social.instagram, label: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                { href: UNIVERSITY.social.facebook, label: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-surface-hover-light dark:bg-surface-hover-dark flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d={social.icon} /></svg>
                </a>
              ))}
              <a
                href={UNIVERSITY.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-surface-hover-light dark:bg-surface-hover-dark flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark hover:bg-success/10 hover:text-success transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2.5">
              {(['home', 'admission', 'academics', 'career', 'contact'] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={key === 'home' ? '/' : `/${key}`}
                    className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-4">{t('resources')}</h3>
            <ul className="space-y-2.5">
              {(['library', 'schedule', 'moodle', 'email'] as const).map((key) => (
                <li key={key}>
                  <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-4">{t('contacts')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-text-secondary-light dark:text-text-secondary-dark mt-0.5 shrink-0" />
                <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  {UNIVERSITY.address.ru}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-text-secondary-light dark:text-text-secondary-dark shrink-0" />
                <a href={`tel:${UNIVERSITY.phone}`} className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors">
                  {UNIVERSITY.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-text-secondary-light dark:text-text-secondary-dark shrink-0" />
                <a href={`mailto:${UNIVERSITY.email}`} className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors">
                  {UNIVERSITY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
            {t('copyright')}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer">
              {t('privacy')}
            </span>
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer">
              {t('terms')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
