'use client';

import { useEffect, useRef, useState } from 'react';
import { Save, Loader2, ImageIcon, RotateCcw, Upload, Trash2, ExternalLink } from 'lucide-react';
import type { SectionBackgroundsData, SectionKey } from '@/lib/admin/types';

const SECTION_LABELS: Record<SectionKey, string> = {
  university: 'Университет',
  life: 'Студенческая жизнь',
  academics: 'Академические программы',
  contact: 'Контакты',
  research: 'Наука и исследования',
  admission: 'Поступление',
  aiCenter: 'AI-Центр',
  career: 'Карьера',
};

const SECTION_KEYS = Object.keys(SECTION_LABELS) as SectionKey[];

export default function BackgroundsPage() {
  const [data, setData] = useState<SectionBackgroundsData | null>(null);
  const [defaults, setDefaults] = useState<SectionBackgroundsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<SectionKey | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/admin/section-backgrounds', { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: SectionBackgroundsData | null) => {
        setData(d);
        setDefaults(d ? JSON.parse(JSON.stringify(d)) : null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/admin/section-backgrounds', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSaved(true);
        setDefaults(JSON.parse(JSON.stringify(data)));
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  function handleReset(key: SectionKey) {
    if (!data || !defaults) return;
    setData({
      ...data,
      backgrounds: {
        ...data.backgrounds,
        [key]: defaults.backgrounds[key] ?? '',
      },
    });
  }

  function handleClear(key: SectionKey) {
    if (!data) return;
    setData({
      ...data,
      backgrounds: { ...data.backgrounds, [key]: '' },
    });
  }

  function handleChange(key: SectionKey, value: string) {
    if (!data) return;
    setData({
      ...data,
      backgrounds: { ...data.backgrounds, [key]: value },
    });
  }

  async function handleUpload(key: SectionKey, file: File) {
    setUploading(key);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const { url } = await res.json();
        handleChange(key, url);
      }
    } finally {
      setUploading(null);
    }
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={24} className="animate-spin text-blue-500" />
      </div>
    );
  }

  const btnCls =
    'rounded-lg border border-slate-200 p-2.5 text-slate-400 transition-colors hover:text-slate-600 dark:border-slate-700 dark:hover:text-white';

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Фоны разделов</h2>
          <p className="text-sm text-slate-500">
            Укажите URL или загрузите файл фонового изображения для каждого раздела
          </p>
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

      {/* Section cards */}
      <div className="space-y-4">
        {SECTION_KEYS.map((key) => {
          const url = data.backgrounds[key] ?? '';
          const isUploading = uploading === key;
          return (
            <section
              key={key}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Preview */}
              <div className="relative h-36 bg-slate-100 dark:bg-slate-800">
                {url ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={SECTION_LABELS[key]}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
                    <span className="absolute bottom-3 left-4 text-sm font-bold text-white drop-shadow">
                      {SECTION_LABELS[key]}
                    </span>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
                    <ImageIcon size={32} />
                    <span className="text-sm font-medium">{SECTION_LABELS[key]}</span>
                    <span className="text-xs">Нет изображения</span>
                  </div>
                )}

                {/* Upload spinner overlay */}
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Loader2 size={28} className="animate-spin text-white" />
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 p-4">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

                {/* Upload file */}
                <input
                  ref={(el) => {
                    fileInputRefs.current[key] = el;
                  }}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(key, file);
                    e.target.value = '';
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRefs.current[key]?.click()}
                  disabled={isUploading}
                  title="Загрузить файл"
                  className={`${btnCls} hover:border-blue-300 hover:text-blue-600 dark:hover:text-blue-400`}
                >
                  <Upload size={14} />
                </button>

                {/* Open in new tab */}
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Открыть в новой вкладке"
                    className={btnCls}
                  >
                    <ExternalLink size={14} />
                  </a>
                )}

                {/* Reset to saved */}
                <button
                  type="button"
                  onClick={() => handleReset(key)}
                  title="Сбросить к сохранённому"
                  className={btnCls}
                >
                  <RotateCcw size={14} />
                </button>

                {/* Clear */}
                <button
                  type="button"
                  onClick={() => handleClear(key)}
                  title="Удалить фон"
                  className={`${btnCls} hover:border-red-300 hover:text-red-500 dark:hover:text-red-400`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
