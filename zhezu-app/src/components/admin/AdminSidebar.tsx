'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Newspaper,
  Languages,
  FileEdit,
  Settings,
  LogOut,
  GraduationCap,
  Menu,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin', label: 'Дашборд', icon: LayoutDashboard },
  { href: '/admin/news', label: 'Публикации', icon: Newspaper },
  { href: '/admin/menu', label: 'Управление меню', icon: Menu },
  { href: '/admin/translations', label: 'Переводы', icon: Languages },
  { href: '/admin/pages', label: 'Контент страниц', icon: FileEdit },
  { href: '/admin/settings', label: 'Настройки', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    window.location.href = '/admin/login';
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6 dark:border-slate-800">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
          <GraduationCap size={20} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">ЖезУ</p>
          <p className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-600/10 dark:text-blue-400'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
        >
          <LogOut size={18} />
          Выйти
        </button>
      </div>
    </aside>
  );
}
