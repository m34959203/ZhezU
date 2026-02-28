'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Newspaper,
  Globe,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus,
  Eye,
  Building2,
} from 'lucide-react';
import type { NewsArticle, UniversityData } from '@/lib/admin/types';

interface StatCard {
  label: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

export default function AdminDashboard() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [university, setUniversity] = useState<UniversityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetch('/api/admin/news', { signal: controller.signal })
        .then((r) => r.json())
        .then((data) => { if (Array.isArray(data)) setNews(data); })
        .catch(() => {}),
      fetch('/api/admin/university', { signal: controller.signal })
        .then((r) => r.json())
        .then((data) => { if (data && !data.error) setUniversity(data); })
        .catch(() => {}),
    ]).finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const published = news.filter((n) => n.published).length;

  const uniStudents = university?.stats?.students ?? 0;
  const uniPrograms = university?.stats?.programs ?? 0;
  const uniDepartments = university?.departments?.length ?? 0;

  const stats: StatCard[] = [
    {
      label: 'Публикации',
      value: String(news.length),
      change: `${published} опубликовано`,
      icon: <Newspaper size={20} />,
      color: 'bg-blue-500/10 text-blue-500',
      href: '/admin/news',
    },
    {
      label: 'Языков',
      value: '3',
      change: 'kk / ru / en',
      icon: <Globe size={20} />,
      color: 'bg-emerald-500/10 text-emerald-500',
      href: '/admin/settings',
    },
    {
      label: 'Университет',
      value: uniStudents > 0 ? String(uniStudents) : uniDepartments > 0 ? String(uniDepartments) : '—',
      change: uniStudents > 0
        ? `${uniPrograms} программ`
        : uniDepartments > 0
          ? 'кафедр'
          : 'Заполните данные',
      icon: <Building2 size={20} />,
      color: 'bg-purple-500/10 text-purple-500',
      href: '/admin/university',
    },
    {
      label: 'Посещений',
      value: '—',
      change: 'Скоро',
      icon: <TrendingUp size={20} />,
      color: 'bg-amber-500/10 text-amber-500',
      href: '/admin',
    },
  ];

  const categoryLabel: Record<string, string> = {
    news: 'Новость',
    announcement: 'Объявление',
    event: 'Событие',
    achievement: 'Достижение',
  };

  const categoryColor: Record<string, string> = {
    news: 'bg-blue-500/10 text-blue-400',
    announcement: 'bg-amber-500/10 text-amber-400',
    event: 'bg-emerald-500/10 text-emerald-400',
    achievement: 'bg-purple-500/10 text-purple-400',
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Добро пожаловать</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Управление порталом Жезказганского университета
          </p>
        </div>
        <Link
          href="/admin/news?action=new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Plus size={16} />
          Новая публикация
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className={`rounded-lg p-2.5 ${stat.color}`}>{stat.icon}</div>
              <ArrowRight
                size={14}
                className="text-slate-300 transition-transform group-hover:translate-x-1 dark:text-slate-600"
              />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            {stat.change && (
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{stat.change}</p>
            )}
          </Link>
        ))}
      </div>

      {/* Recent News */}
      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white">Последние публикации</h3>
          <Link
            href="/admin/news"
            className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600"
          >
            Все <ArrowRight size={12} />
          </Link>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          </div>
        ) : news.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-400">
            Нет публикаций. Создайте первую!
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {news.slice(0, 5).map((article) => (
              <div key={article.id} className="flex items-center justify-between px-6 py-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="truncate text-sm font-medium text-slate-900 dark:text-white">
                      {article.title.ru}
                    </h4>
                    {article.pinned && (
                      <span className="shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                        PIN
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${categoryColor[article.category]}`}
                    >
                      {categoryLabel[article.category]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(article.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                    <span>{article.author}</span>
                  </div>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${article.published ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                  />
                  <Link
                    href={`/admin/news/${article.id}`}
                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-500 dark:hover:bg-slate-800"
                  >
                    <Eye size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: 'Управление новостями',
            desc: 'Создание, редактирование и публикация новостей',
            href: '/admin/news',
            color: 'from-blue-500 to-blue-700',
          },
          {
            title: 'Данные университета',
            desc: 'Статистика, кафедры, программы обучения',
            href: '/admin/university',
            color: 'from-emerald-500 to-emerald-700',
          },
          {
            title: 'Настройки сайта',
            desc: 'Контакты, соцсети, режим обслуживания',
            href: '/admin/settings',
            color: 'from-purple-500 to-purple-700',
          },
        ].map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group relative overflow-hidden rounded-xl p-6 text-white"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${action.color} transition-transform group-hover:scale-105`}
            />
            <div className="relative">
              <h4 className="mb-1 font-bold">{action.title}</h4>
              <p className="text-sm text-white/70">{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
