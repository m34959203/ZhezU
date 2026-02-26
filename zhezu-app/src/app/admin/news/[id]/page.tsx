'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Eye, EyeOff, Pin, Trash2 } from 'lucide-react';
import type { NewsArticle, ContentLocale } from '@/lib/admin/types';

const CATEGORIES = [
  { value: 'news', label: 'Новость' },
  { value: 'announcement', label: 'Объявление' },
  { value: 'event', label: 'Событие' },
  { value: 'achievement', label: 'Достижение' },
];

const LOCALES: { code: ContentLocale; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'kk', label: 'KK' },
  { code: 'en', label: 'EN' },
];

const emptyLocalized = { kk: '', ru: '', en: '' };

export default function NewsEditorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === 'new';

  const [article, setArticle] = useState<Omit<NewsArticle, 'id' | 'createdAt' | 'updatedAt'>>({
    slug: '',
    title: { ...emptyLocalized },
    excerpt: { ...emptyLocalized },
    body: { ...emptyLocalized },
    category: 'news',
    image: '',
    published: false,
    pinned: false,
    author: 'Администратор',
  });
  const [activeLang, setActiveLang] = useState<ContentLocale>('ru');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isNew) return;
    const controller = new AbortController();
    fetch(`/api/admin/news/${id}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setArticle(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [id, isNew]);

  function setLocField(field: 'title' | 'excerpt' | 'body', value: string) {
    setArticle((prev) => ({
      ...prev,
      [field]: { ...prev[field], [activeLang]: value },
    }));
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const url = isNew ? '/api/admin/news' : `/api/admin/news/${id}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });
      if (res.ok) {
        setSaved(true);
        if (isNew) {
          const created = await res.json();
          router.replace(`/admin/news/${created.id}`);
        }
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Удалить публикацию?')) return;
    await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
    router.push('/admin/news');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={24} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push('/admin/news')}
          className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Назад к списку
        </button>
        <div className="flex items-center gap-2">
          {!isNew && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50 dark:border-red-500/20 dark:hover:bg-red-500/10"
            >
              <Trash2 size={14} />
              Удалить
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saved ? 'Сохранено!' : 'Сохранить'}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        {/* Language Tabs */}
        <div className="flex items-center gap-4 border-b border-slate-200 pb-4 dark:border-slate-700">
          <span className="text-xs font-medium text-slate-400 uppercase">Язык контента:</span>
          <div className="flex gap-1">
            {LOCALES.map((loc) => (
              <button
                key={loc.code}
                type="button"
                onClick={() => setActiveLang(loc.code)}
                className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
                  activeLang === loc.code
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800'
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Заголовок ({activeLang.toUpperCase()})
          </label>
          <input
            type="text"
            value={article.title[activeLang]}
            onChange={(e) => setLocField('title', e.target.value)}
            placeholder="Введите заголовок..."
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Slug & Meta */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Slug (URL)
            </label>
            <input
              type="text"
              value={article.slug}
              onChange={(e) => setArticle((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="my-article-slug"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Категория
            </label>
            <select
              value={article.category}
              onChange={(e) =>
                setArticle((prev) => ({
                  ...prev,
                  category: e.target.value as NewsArticle['category'],
                }))
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Краткое описание ({activeLang.toUpperCase()})
          </label>
          <textarea
            value={article.excerpt[activeLang]}
            onChange={(e) => setLocField('excerpt', e.target.value)}
            rows={2}
            placeholder="Краткое описание для карточки и превью..."
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Body */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Текст публикации ({activeLang.toUpperCase()})
          </label>
          <textarea
            value={article.body[activeLang]}
            onChange={(e) => setLocField('body', e.target.value)}
            rows={12}
            placeholder="Полный текст публикации. Поддерживается Markdown."
            className="w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 font-mono text-sm leading-relaxed focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Author & Image */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Автор
            </label>
            <input
              type="text"
              value={article.author}
              onChange={(e) => setArticle((prev) => ({ ...prev, author: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Изображение (URL)
            </label>
            <input
              type="text"
              value={article.image}
              onChange={(e) => setArticle((prev) => ({ ...prev, image: e.target.value }))}
              placeholder="https://..."
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Flags */}
        <div className="flex items-center gap-6 border-t border-slate-200 pt-4 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setArticle((prev) => ({ ...prev, published: !prev.published }))}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              article.published
                ? 'border-green-200 bg-green-50 text-green-600 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400'
                : 'border-slate-200 text-slate-500 hover:border-green-300 dark:border-slate-700'
            }`}
          >
            {article.published ? <Eye size={14} /> : <EyeOff size={14} />}
            {article.published ? 'Опубликовано' : 'Черновик'}
          </button>
          <button
            type="button"
            onClick={() => setArticle((prev) => ({ ...prev, pinned: !prev.pinned }))}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              article.pinned
                ? 'border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400'
                : 'border-slate-200 text-slate-500 hover:border-amber-300 dark:border-slate-700'
            }`}
          >
            <Pin size={14} />
            {article.pinned ? 'Закреплено' : 'Закрепить'}
          </button>
        </div>
      </div>
    </div>
  );
}
