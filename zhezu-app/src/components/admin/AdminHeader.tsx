'use client';

import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const TITLE_MAP: Record<string, string> = {
  '/admin': 'Дашборд',
  '/admin/news': 'Управление публикациями',
  '/admin/translations': 'Редактор переводов',
  '/admin/pages': 'Контент страниц',
  '/admin/settings': 'Настройки сайта',
};

const subscribe = () => () => {};

export default function AdminHeader() {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const title =
    Object.entries(TITLE_MAP).find(([path]) =>
      path === '/admin' ? pathname === '/admin' : pathname.startsWith(path),
    )?.[1] ?? 'Админ-панель';

  const isDark = resolvedTheme === 'dark';

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <h1 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h1>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <Search size={18} />
        </button>
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500" />
        </button>
        <button
          type="button"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label={isDark ? 'Светлая тема' : 'Тёмная тема'}
        >
          {mounted ? (
            isDark ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )
          ) : (
            <div className="h-[18px] w-[18px]" />
          )}
        </button>
        <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
          A
        </div>
      </div>
    </header>
  );
}
