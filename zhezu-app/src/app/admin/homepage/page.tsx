'use client';

import { useEffect, useState } from 'react';
import {
  Save,
  Loader2,
  Home,
  BarChart3,
  Image as ImageIcon,
  Tag,
  Plus,
  Trash2,
  Upload,
} from 'lucide-react';
import type { HomepageData, UniversityData } from '@/lib/admin/types';

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

async function uploadFile(file: File): Promise<string | null> {
  const form = new FormData();
  form.append('file', file);
  try {
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
    if (!res.ok) return null;
    const { url } = await res.json();
    return url as string;
  } catch {
    return null;
  }
}

export default function HomepageDataPage() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [programs, setPrograms] = useState<UniversityData['programs']>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch('/api/admin/homepage', { signal: controller.signal }).then((r) =>
        r.ok ? r.json() : null,
      ),
      fetch('/api/public/university', { signal: controller.signal }).then((r) =>
        r.ok ? r.json() : null,
      ),
    ])
      .then(([hp, uni]) => {
        if (hp) setData(hp);
        if (uni?.programs) setPrograms(uni.programs);
      })
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
          Выберите какие показатели отображать на баннере. Значения берутся из раздела
          «Университет».
        </p>
        <div className="space-y-2">
          {data.stats.map((statKey, i) => (
            <div key={i} className="flex items-center gap-3">
              <select
                value={statKey}
                onChange={(e) => {
                  const updated = [...data.stats];
                  updated[i] = e.target.value;
                  setData({ ...data, stats: updated });
                }}
                className={inputCls}
              >
                <option value="">— Выберите —</option>
                {STAT_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() =>
                  setData({ ...data, stats: data.stats.filter((_, idx) => idx !== i) })
                }
                className="shrink-0 text-red-400 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {data.stats.length < STAT_OPTIONS.length && (
            <button
              type="button"
              onClick={() => setData({ ...data, stats: [...data.stats, ''] })}
              className="flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-600"
            >
              <Plus size={12} /> Добавить показатель
            </button>
          )}
        </div>
      </section>

      {/* Program Images */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-2 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <ImageIcon size={18} className="text-purple-500" />
          Изображения программ
        </h3>
        <p className="mb-4 text-xs text-slate-400">
          Программы, которые будут показаны на главной странице с фотографией
        </p>
        <div className="space-y-3">
          {Object.entries(data.programImages).map(([key, url]) => (
            <div
              key={key}
              className="flex flex-col gap-2 rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50"
            >
              <div className="flex items-center gap-3">
                <select
                  value={key}
                  onChange={(e) => {
                    const newImages = { ...data.programImages };
                    delete newImages[key];
                    newImages[e.target.value] = url;
                    setData({ ...data, programImages: newImages });
                  }}
                  className={inputCls + ' max-w-[280px]'}
                >
                  <option value="">— Выберите программу —</option>
                  {programs.map((p) => (
                    <option
                      key={p.id}
                      value={p.id}
                      disabled={p.id !== key && p.id in data.programImages}
                    >
                      {p.name.ru}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    const { [key]: _removed, ...rest } = data.programImages;
                    setData({ ...data, programImages: rest });
                  }}
                  className="shrink-0 text-red-400 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                {url && (
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="h-full w-full object-cover" />
                  </div>
                )}
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
                <label className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                  {uploading === key ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Upload size={14} />
                  )}
                  {uploading === key ? 'Загрузка...' : 'Загрузить'}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploading(key);
                      const uploadedUrl = await uploadFile(file);
                      if (uploadedUrl) {
                        setData((prev) =>
                          prev
                            ? {
                                ...prev,
                                programImages: { ...prev.programImages, [key]: uploadedUrl },
                              }
                            : prev,
                        );
                      }
                      setUploading(null);
                      e.target.value = '';
                    }}
                  />
                </label>
              </div>
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
            <Plus size={12} /> Добавить программу
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
