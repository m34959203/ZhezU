'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Search, GraduationCap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { Button } from '@/components/ui/Button';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/admission', key: 'admission' },
  { href: '/academics', key: 'academics' },
  { href: '/career', key: 'career' },
  { href: '/contact', key: 'contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const tActions = useTranslations('actions');
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-light dark:border-border-dark bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base leading-tight text-primary dark:text-primary-light">
                ZhezU
              </span>
              <span className="text-[10px] leading-tight text-text-secondary-light dark:text-text-secondary-dark hidden sm:block">
                University
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5'
                    : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark'
                }`}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1.5">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark transition-colors cursor-pointer hidden md:flex"
              aria-label={t('search')}
            >
              <Search size={18} />
            </button>
            <ThemeToggle />
            <LanguageSwitcher />
            <Button size="sm" className="hidden sm:inline-flex">
              {tActions('apply')}
            </Button>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
