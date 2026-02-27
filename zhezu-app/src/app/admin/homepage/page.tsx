'use client';

import { useEffect, useState } from 'react';
import { Save, Loader2, Home, BarChart3, Image, Tag, Plus, Trash2 } from 'lucide-react';
import type { HomepageData } from '@/lib/admin/types';

const STAT_OPTIONS: { key: string; label: string }[] = [
  { key: 'students', label: 'Количество студентов' },
  { key: 'programs', label: 'Программы обучения' },
  { key: 'employment', label: 'Трудоустройство' },
  { key: 'years', label: 'Годы опыта' },
  { key: 'faculty', label: 'Преподаватели' },
  { key: 'masters', label: 'Магистерские программы' },
];

const CATEGORY_NAMES: Record<string, string> = {
  news: 'Новости',
  announcement: 'Объявления',
  event: 'События',
  achievement: 'Достижения',
  university: 'Университет',
  science: 'Наука',
  students: 'Студенты',
  sport: 'Спорт',
  culture: 'Культура',
};

export default function HomepageDataPage() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/admin/homepage', { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={24} className="animate-spin text-blue-500" />
      </div>
    );
  }

  const inputCls =
    'w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white';

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Главная страница</h2>
          <p className="text-sm text-slate-500">Hero-секция, статистика, изображения программ</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saved ? 'Сохранено!' : 'Сохранить'}
        </button>
      </div>

      {/* Hero Title */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Home size={18} className="text-blue-500" />
          Hero-секция
        </h3>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Заголовок (большой текст на главной)
          </label>
          <input
            type="text"
            value={data.heroTitle}
            onChange={(e) => setData({ ...data, heroTitle: e.target.value })}
            className={inputCls}
          />
        </div>
      </section>

      {/* Stats */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-2 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <BarChart3 size={18} className="text-emerald-500" />
          Статистика на главной
        </h3>
        <p className="mb-4 text-xs text-slate-400">
          Цифры, которые отображаются на баннере главной страницы
        </p>
        <div className="space-y-2">
          {data.stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <select
                value={stat.key}
                onChange={(e) => {
                  const updated = [...data.stats];
                  updated[i] = { ...stat, key: e.target.value };
                  setData({ ...data, stats: updated });
                }}
                className={inputCls + ' max-w-[220px]'}
              >
                <option value="">— Выберите —</option>
                {STAT_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={stat.value}
                onChange={(e) => {
                  const updated = [...data.stats];
                  updated[i] = { ...stat, value: e.target.value };
                  setData({ ...data, stats: updated });
                }}
                placeholder="Значение (1370+, 87%...)"
                className={inputCls}
              />
              <button
                type="button"
                onClick={() => setData({ ...data, stats: data.stats.filter((_, idx) => idx !== i) })}
                className="shrink-0 text-red-400 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setData({ ...data, stats: [...data.stats, { key: '', value: '' }] })
            }
            className="flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-600"
          >
            <Plus size={12} /> Добавить показатель
          </button>
        </div>
      </section>

      {/* Program Images */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-2 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Image size={18} className="text-purple-500" />
          Изображения программ
        </h3>
        <p className="mb-4 text-xs text-slate-400">
          Программы, которые будут показаны на главной странице с фотографией
        </p>
        <div className="space-y-2">
          {Object.entries(data.programImages).map(([key, url]) => (
            <div key={key} className="flex items-center gap-3">
              <input
                type="text"
                value={key}
                onChange={(e) => {
                  const newImages = { ...data.programImages };
                  delete newImages[key];
                  newImages[e.target.value] = url;
                  setData({ ...data, programImages: newImages });
                }}
                placeholder="Название программы (mining, construction...)"
                className={inputCls + ' max-w-[250px]'}
              />
              <input
                type="url"
                value={url}
                onChange={(e) =>
                  setData({
                    ...data,
                    programImages: { ...data.programImages, [key]: e.target.value },
                  })
                }
                placeholder="Ссылка на изображение"
                className={inputCls}
              />
              <button
                type="button"
                onClick={() => {
                  const { [key]: _, ...rest } = data.programImages;
                  setData({ ...data, programImages: rest });
                }}
                className="shrink-0 text-red-400 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setData({
                ...data,
                programImages: { ...data.programImages, '': '' },
              })
            }
            className="flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-600"
          >
            <Plus size={12} /> Добавить изображение
          </button>
        </div>
      </section>

      {/* Category Labels */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-2 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Tag size={18} className="text-amber-500" />
          Метки категорий новостей
        </h3>
        <p className="mb-4 text-xs text-slate-400">
          Текст, который отображается на карточках новостей для каждой категории
        </p>
        <div className="space-y-2">
          {Object.entries(data.categoryLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="min-w-[120px] text-sm text-slate-500">
                {CATEGORY_NAMES[key] ?? key}
              </span>
              <input
                type="text"
                value={label}
                onChange={(e) =>
                  setData({
                    ...data,
                    categoryLabels: { ...data.categoryLabels, [key]: e.target.value },
                  })
                }
                className={inputCls}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
