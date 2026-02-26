'use client';

import { useEffect, useState, useReducer } from 'react';
import Link from 'next/link';
import { Plus, Search, Trash2, Edit3, Eye, EyeOff, Pin, Clock, Loader2 } from 'lucide-react';
import type { NewsArticle } from '@/lib/admin/types';

const CATEGORIES = [
  { value: '', label: 'Все' },
  { value: 'news', label: 'Новости' },
  { value: 'announcement', label: 'Объявления' },
  { value: 'event', label: 'События' },
  { value: 'achievement', label: 'Достижения' },
  { value: 'university', label: 'Университет' },
  { value: 'science', label: 'Наука' },
  { value: 'students', label: 'Студенты' },
  { value: 'sport', label: 'Спорт' },
  { value: 'culture', label: 'Культура' },
];

const categoryColor: Record<string, string> = {
  news: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  announcement: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  event: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  achievement: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  university: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  science: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  students: 'bg-green-500/10 text-green-400 border-green-500/20',
  sport: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  culture: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
};

async function fetchNews(signal?: AbortSignal): Promise<NewsArticle[]> {
  const res = await fetch('/api/admin/news', { signal });
  if (!res.ok) return [];
  return res.json();
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [refreshKey, refresh] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    const controller = new AbortController();
    fetchNews(controller.signal)
      .then(setNews)
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [refreshKey]);

  async function togglePublish(article: NewsArticle) {
    await fetch(`/api/admin/news/${article.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !article.published }),
    });
    refresh();
  }

  async function togglePin(article: NewsArticle) {
    await fetch(`/api/admin/news/${article.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pinned: !article.pinned }),
    });
    refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm('Удалить публикацию?')) return;
    setDeleting(id);
    await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
    refresh();
    setDeleting(null);
  }

  const filtered = news.filter((n) => {
    const matchSearch = n.title.ru.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !filterCategory || n.category === filterCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по заголовку..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
        <div className="flex gap-1 rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setFilterCategory(cat.value)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                filterCategory === cat.value
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <Link
          href="/admin/news/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Plus size={16} />
          Создать
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={24} className="animate-spin text-blue-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-400">
            {search || filterCategory ? 'Ничего не найдено' : 'Нет публикаций'}
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 text-xs text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3 font-medium">Заголовок</th>
                <th className="px-4 py-3 font-medium">Категория</th>
                <th className="px-4 py-3 font-medium">Статус</th>
                <th className="px-4 py-3 font-medium">Дата</th>
                <th className="px-4 py-3 font-medium">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((article) => (
                <tr
                  key={article.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="max-w-xs px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium text-slate-900 dark:text-white">
                        {article.title.ru}
                      </span>
                      {article.pinned && <Pin size={12} className="shrink-0 text-amber-500" />}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-400">{article.excerpt.ru}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${categoryColor[article.category]}`}
                    >
                      {CATEGORIES.find((c) => c.value === article.category)?.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${article.published ? 'text-green-500' : 'text-slate-400'}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${article.published ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                      />
                      {article.published ? 'Опубликовано' : 'Черновик'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(article.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/news/${article.id}`}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-500/10"
                        title="Редактировать"
                      >
                        <Edit3 size={14} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => togglePublish(article)}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-500 dark:hover:bg-emerald-500/10"
                        title={article.published ? 'Снять с публикации' : 'Опубликовать'}
                      >
                        {article.published ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => togglePin(article)}
                        className={`rounded-lg p-1.5 transition-colors hover:bg-amber-50 dark:hover:bg-amber-500/10 ${article.pinned ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'}`}
                        title={article.pinned ? 'Открепить' : 'Закрепить'}
                      >
                        <Pin size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(article.id)}
                        disabled={deleting === article.id}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                        title="Удалить"
                      >
                        {deleting === article.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
