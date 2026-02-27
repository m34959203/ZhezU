'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Search, ChevronDown, ArrowRight, Compass, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { Button } from '@/components/ui/Button';
import { NAVIGATION_ITEMS } from '@/lib/navigation';
import type { NavItem } from '@/lib/navigation';

/* ------------------------------------------------------------------ */
/*  Mega Menu Panel                                                    */
/* ------------------------------------------------------------------ */
function MegaMenuPanel({ item, isOpen }: { item: NavItem; isOpen: boolean }) {
  const t = useTranslations('megaNav');

  return (
    <div
      className={cn(
        'absolute top-full right-0 left-0 z-50 transition-all duration-300 ease-out',
        isOpen
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-2 opacity-0',
      )}
    >
      {/* shadow/backdrop */}
      <div className="border-border-light dark:border-border-dark dark:bg-surface-dark border-t border-b bg-white shadow-xl">
        <div className="mx-auto max-w-screen-xl px-4 pt-12 pb-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-10 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
            {item.columns.map((column) => (
              <div key={column.titleKey} className="flex flex-col">
                <h3 className="font-display text-primary dark:text-primary-light mb-3 text-xs font-semibold tracking-widest uppercase">
                  {t(column.titleKey)}
                </h3>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        prefetch={false}
                        className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light block py-1.5 text-sm font-normal transition-colors duration-200"
                      >
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom action bar */}
          <div className="border-border-light/50 dark:border-border-dark/50 mt-8 flex items-center justify-between border-t pt-6">
            <div className="flex gap-4">
              <Link
                href="/university/about"
                prefetch={false}
                className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <div className="bg-primary/10 text-primary group-hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg transition-colors group-hover:text-white">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <p className="text-text-primary-light text-sm font-bold dark:text-white">
                    {t('whyZhezU')}
                  </p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                    {t('whyZhezUDesc')}
                  </p>
                </div>
              </Link>
              <Link
                href="/university/campus"
                prefetch={false}
                className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <div className="bg-primary/10 text-primary group-hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg transition-colors group-hover:text-white">
                  <Compass size={18} />
                </div>
                <div>
                  <p className="text-text-primary-light text-sm font-bold dark:text-white">
                    {t('virtualTour')}
                  </p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                    {t('virtualTourDesc')}
                  </p>
                </div>
              </Link>
            </div>
            <Link
              href={item.href}
              prefetch={false}
              className="group text-primary dark:text-primary-light flex items-center gap-1.5 text-sm font-bold decoration-2 underline-offset-4 hover:underline"
            >
              {t('seeAll')} {t(item.labelKey + '.title')}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  MAIN HEADER — Single clean nav bar                                 */
/* ================================================================== */
export function Header({ navItems }: { navItems?: NavItem[] }) {
  const t = useTranslations('megaNav');
  const pathname = usePathname();

  const items = navItems && navItems.length > 0 ? navItems : NAVIGATION_ITEMS;

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- close menu when route changes (state-during-render pattern) ---- */
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveMenu(null);
  }

  /* ---- hover handlers with a small grace period ---- */
  const handleMenuEnter = useCallback((id: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(id);
  }, []);

  const handleMenuLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, []);

  const handlePanelEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handlePanelLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, []);

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-40 w-full">
        {/* Single navigation layer */}
        <div className="bg-bg-light/80 dark:bg-bg-dark/80 border-border-light/50 dark:border-border-dark/50 border-b backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="group flex shrink-0 items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-emblem.png"
                  alt="ZhezU"
                  width={48}
                  height={43}
                  className="h-[43px] w-[48px] object-contain"
                />
                <div className="flex flex-col">
                  <span className="font-display text-primary dark:text-primary-light text-base leading-tight font-bold">
                    ZhezU
                  </span>
                  <span className="text-text-secondary-light dark:text-text-secondary-dark hidden text-[10px] leading-tight sm:block">
                    Жезказганский университет
                  </span>
                </div>
              </Link>

              {/* Desktop mega-menu triggers */}
              <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
                {items.map((item) => {
                  const isActive = activeMenu === item.id;
                  return (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => handleMenuEnter(item.id)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveMenu((prev) => (prev === item.id ? null : item.id))}
                        className={cn(
                          'flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'text-primary dark:text-primary-light bg-primary/8 dark:bg-primary-light/8'
                            : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark',
                        )}
                        aria-expanded={isActive}
                        aria-haspopup="true"
                      >
                        {t(item.labelKey + '.title')}
                        <ChevronDown
                          size={14}
                          className={cn(
                            'transition-transform duration-200',
                            isActive && 'rotate-180',
                          )}
                        />
                      </button>
                    </div>
                  );
                })}
              </nav>

              {/* Right side actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark hidden h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors md:flex"
                  aria-label={t('searchPlaceholder')}
                >
                  <Search size={18} />
                </button>
                <div className="hidden sm:block">
                  <LanguageSwitcher />
                </div>
                <ThemeToggle />
                <Link href="/admission/apply">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="font-display hidden sm:inline-flex"
                  >
                    {t('apply')}
                  </Button>
                </Link>
                <MobileMenu navItems={items} />
              </div>
            </div>
          </div>

          {/* Mega-menu dropdown panels (anchored to primary nav) */}
          {items.map((item) => (
            <div key={item.id} onMouseEnter={handlePanelEnter} onMouseLeave={handlePanelLeave}>
              <MegaMenuPanel item={item} isOpen={activeMenu === item.id} />
            </div>
          ))}
        </div>
      </header>

      {/* Search overlay (portal-like, rendered outside header flow) */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Scrim behind mega-menu when open */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300"
          onClick={() => setActiveMenu(null)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
