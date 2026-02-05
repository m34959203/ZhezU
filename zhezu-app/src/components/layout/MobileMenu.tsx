'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/admission', key: 'admission' },
  { href: '/academics', key: 'academics' },
  { href: '/talent-pool', key: 'talentPool' },
  { href: '/skill-map', key: 'skillMap' },
  { href: '/career', key: 'career' },
  { href: '/contact', key: 'contact' },
] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('nav');
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark transition-colors cursor-pointer"
        aria-label={t('menu')}
      >
        <Menu size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-surface-light dark:bg-surface-dark shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark">
              <span className="font-display font-bold text-lg text-primary dark:text-primary-light">ZhezU</span>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 p-4" aria-label="Mobile navigation">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? 'bg-primary/10 text-primary dark:text-primary-light'
                          : 'text-text-primary-light dark:text-text-primary-dark hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark'
                      }`}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
