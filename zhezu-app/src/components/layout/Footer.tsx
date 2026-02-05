import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import { UNIVERSITY } from '@/lib/constants';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-bg-dark">
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
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
              {t('description')}
            </p>
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
