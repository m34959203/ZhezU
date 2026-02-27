'use client';

import { useEffect, useState } from 'react';
import { Save, Loader2, Phone, Clock, Plus, Trash2, Mail } from 'lucide-react';
import type { ContactPageData } from '@/lib/admin/types';

const SUBJECT_LABELS: Record<string, string> = {
  admission: 'Поступление',
  academic: 'Учебные программы',
  technical: 'Техническая поддержка',
  other: 'Другое',
};

export default function ContactDataPage() {
  const [data, setData] = useState<ContactPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/admin/contact', { signal: controller.signal })
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
      const res = await fetch('/api/admin/contact', {
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Страница контактов</h2>
          <p className="text-sm text-slate-500">Отделы, часы работы, темы обращений</p>
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

      {/* Contact Departments */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Phone size={18} className="text-blue-500" />
          Контактные отделы
        </h3>
        <div className="space-y-3">
          {data.departments.map((dept, i) => (
            <div key={i} className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Отдел {i + 1}</span>
                <button
                  type="button"
                  onClick={() => setData({ ...data, departments: data.departments.filter((_, idx) => idx !== i) })}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs text-slate-500">Название</label>
                  <input
                    type="text"
                    value={dept.title}
                    onChange={(e) => {
                      const updated = [...data.departments];
                      updated[i] = { ...dept, title: e.target.value };
                      setData({ ...data, departments: updated });
                    }}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-500">Email</label>
                  <input
                    type="email"
                    value={dept.email}
                    onChange={(e) => {
                      const updated = [...data.departments];
                      updated[i] = { ...dept, email: e.target.value };
                      setData({ ...data, departments: updated });
                    }}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-500">Телефон</label>
                  <input
                    type="text"
                    value={dept.phone}
                    onChange={(e) => {
                      const updated = [...data.departments];
                      updated[i] = { ...dept, phone: e.target.value };
                      setData({ ...data, departments: updated });
                    }}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setData({
                ...data,
                departments: [
                  ...data.departments,
                  {
                    icon: 'Building2',
                    title: '',
                    email: '',
                    phone: '',
                    color: 'text-blue-600 dark:text-blue-400',
                    bg: 'bg-blue-50 dark:bg-blue-900/20',
                  },
                ],
              })
            }
            className="flex w-full items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-200 py-3 text-sm font-medium text-slate-400 hover:border-blue-300 hover:text-blue-500 dark:border-slate-700"
          >
            <Plus size={16} /> Добавить отдел
          </button>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Clock size={18} className="text-emerald-500" />
          Часы работы
        </h3>
        <div className="space-y-3">
          {data.openingHours.map((entry, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="text"
                value={entry.day}
                onChange={(e) => {
                  const updated = [...data.openingHours];
                  updated[i] = { ...entry, day: e.target.value };
                  setData({ ...data, openingHours: updated });
                }}
                placeholder="День"
                className={inputCls + ' max-w-[160px]'}
              />
              <input
                type="text"
                value={entry.hours}
                onChange={(e) => {
                  const updated = [...data.openingHours];
                  updated[i] = { ...entry, hours: e.target.value };
                  setData({ ...data, openingHours: updated });
                }}
                placeholder="Часы"
                className={inputCls}
              />
              <label className="flex items-center gap-1 text-xs text-slate-500 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={entry.closed}
                  onChange={(e) => {
                    const updated = [...data.openingHours];
                    updated[i] = { ...entry, closed: e.target.checked };
                    setData({ ...data, openingHours: updated });
                  }}
                  className="rounded"
                />
                Закрыто
              </label>
              <button
                type="button"
                onClick={() => setData({ ...data, openingHours: data.openingHours.filter((_, idx) => idx !== i) })}
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
                openingHours: [...data.openingHours, { day: '', hours: '', closed: false }],
              })
            }
            className="flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-600"
          >
            <Plus size={12} /> Добавить строку
          </button>
        </div>
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Краткая запись для футера
          </label>
          <input
            type="text"
            value={data.workingHoursShort}
            onChange={(e) => setData({ ...data, workingHoursShort: e.target.value })}
            className={inputCls}
            placeholder="Пн-Пт: 09:00 — 18:00"
          />
        </div>
      </section>

      {/* Subject Labels */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-2 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Mail size={18} className="text-amber-500" />
          Темы обращений
        </h3>
        <p className="mb-4 text-xs text-slate-400">
          Текст, который увидит посетитель при выборе темы в форме обратной связи
        </p>
        <div className="space-y-2">
          {Object.entries(data.subjectLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="min-w-[140px] text-sm text-slate-500">
                {SUBJECT_LABELS[key] ?? key}
              </span>
              <input
                type="text"
                value={label}
                onChange={(e) =>
                  setData({
                    ...data,
                    subjectLabels: { ...data.subjectLabels, [key]: e.target.value },
                  })
                }
                className={inputCls}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Google Maps */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 font-bold text-slate-900 dark:text-white">Google Maps</h3>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Поисковый запрос для карты
          </label>
          <input
            type="text"
            value={data.googleMapsQuery}
            onChange={(e) => setData({ ...data, googleMapsQuery: e.target.value })}
            className={inputCls}
            placeholder="Zhezkazgan+University"
          />
        </div>
      </section>
    </div>
  );
}
