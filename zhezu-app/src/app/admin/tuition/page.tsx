'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Save,
  Loader2,
  Plus,
  Trash2,
  GraduationCap,
  Home,
  Award,
} from 'lucide-react';
import type { TuitionData, TuitionProgram, ContentLocale } from '@/lib/admin/types';

const DEFAULTS: TuitionData = {
  programs: [],
  dormitoryCost: 180000,
  scholarships: { gpa35: 150000, gpa30: 90000, gpa25: 30000 },
};

const LOCALES: { code: ContentLocale; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'kk', label: 'KK' },
  { code: 'en', label: 'EN' },
];

function emptyProgram(): TuitionProgram {
  return {
    id: crypto.randomUUID(),
    name: { kk: '', ru: '', en: '' },
    level: 'bachelor',
    costResident: 600000,
    costInternational: 800000,
    isFree: false,
  };
}

function formatTenge(v: number): string {
  return v.toLocaleString('ru-KZ') + ' ₸';
}

export default function TuitionAdminPage() {
  const [data, setData] = useState<TuitionData>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [locale, setLocale] = useState<ContentLocale>('ru');

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/tuition');
      if (res.ok) {
        const json = await res.json();
        setData({ ...DEFAULTS, ...json });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/tuition', {
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

  function updateProgram(index: number, patch: Partial<TuitionProgram>) {
    setData((prev) => {
      const programs = [...prev.programs];
      programs[index] = { ...programs[index], ...patch };
      return { ...prev, programs };
    });
  }

  function updateProgramName(index: number, value: string) {
    setData((prev) => {
      const programs = [...prev.programs];
      programs[index] = {
        ...programs[index],
        name: { ...programs[index].name, [locale]: value },
      };
      return { ...prev, programs };
    });
  }

  function addProgram() {
    setData((prev) => ({ ...prev, programs: [...prev.programs, emptyProgram()] }));
  }

  function removeProgram(index: number) {
    setData((prev) => ({
      ...prev,
      programs: prev.programs.filter((_, i) => i !== index),
    }));
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Стоимость обучения</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Управление стоимостью обучения по направлениям
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saved ? 'Сохранено!' : 'Сохранить'}
        </button>
      </div>

      {/* General settings: dormitory + scholarships */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Dormitory */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2">
            <Home size={18} className="text-blue-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Общежитие</h2>
          </div>
          <label className="mb-1 block text-sm text-slate-500 dark:text-slate-400">
            Стоимость проживания в год (₸)
          </label>
          <input
            type="number"
            value={data.dormitoryCost}
            onChange={(e) => setData({ ...data, dormitoryCost: Number(e.target.value) })}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <p className="mt-1 text-xs text-slate-400">{formatTenge(data.dormitoryCost)}</p>
        </div>

        {/* Scholarships */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2">
            <Award size={18} className="text-green-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Скидки за успеваемость</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm text-slate-500 dark:text-slate-400">
                GPA 3.5+ (₸/год)
              </label>
              <input
                type="number"
                value={data.scholarships.gpa35}
                onChange={(e) =>
                  setData({
                    ...data,
                    scholarships: { ...data.scholarships, gpa35: Number(e.target.value) },
                  })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-500 dark:text-slate-400">
                GPA 3.0 – 3.4 (₸/год)
              </label>
              <input
                type="number"
                value={data.scholarships.gpa30}
                onChange={(e) =>
                  setData({
                    ...data,
                    scholarships: { ...data.scholarships, gpa30: Number(e.target.value) },
                  })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-500 dark:text-slate-400">
                GPA 2.5 – 2.9 (₸/год)
              </label>
              <input
                type="number"
                value={data.scholarships.gpa25}
                onChange={(e) =>
                  setData({
                    ...data,
                    scholarships: { ...data.scholarships, gpa25: Number(e.target.value) },
                  })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Programs table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap size={18} className="text-blue-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Направления ({data.programs.length})
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Locale switcher */}
            <div className="flex rounded-lg border border-slate-200 dark:border-slate-700">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`px-3 py-1 text-xs font-medium transition-colors ${
                    locale === l.code
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  } ${l.code === 'ru' ? 'rounded-l-lg' : l.code === 'en' ? 'rounded-r-lg' : ''}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <button
              onClick={addProgram}
              className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
            >
              <Plus size={14} />
              Добавить
            </button>
          </div>
        </div>

        {data.programs.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-400">
            Нет направлений. Нажмите «Добавить» чтобы создать.
          </div>
        ) : (
          <div className="space-y-3">
            {data.programs.map((prog, i) => (
              <div
                key={prog.id}
                className="rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
                  {/* Name */}
                  <div className="sm:col-span-4">
                    <label className="mb-1 block text-xs text-slate-400">
                      Название ({locale.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={prog.name[locale]}
                      onChange={(e) => updateProgramName(i, e.target.value)}
                      placeholder="Название направления"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  {/* Level */}
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs text-slate-400">Уровень</label>
                    <select
                      value={prog.level}
                      onChange={(e) =>
                        updateProgram(i, { level: e.target.value as 'bachelor' | 'master' })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="bachelor">Бакалавриат</option>
                      <option value="master">Магистратура</option>
                    </select>
                  </div>

                  {/* Free toggle */}
                  <div className="flex items-end sm:col-span-1">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={prog.isFree}
                        onChange={(e) => updateProgram(i, { isFree: e.target.checked })}
                        className="rounded text-blue-600"
                      />
                      <span className="text-xs text-slate-500 whitespace-nowrap">Грант</span>
                    </label>
                  </div>

                  {/* Cost resident */}
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs text-slate-400">Резидент (₸)</label>
                    <input
                      type="number"
                      value={prog.costResident}
                      onChange={(e) => updateProgram(i, { costResident: Number(e.target.value) })}
                      disabled={prog.isFree}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  {/* Cost international */}
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs text-slate-400">Иностранный (₸)</label>
                    <input
                      type="number"
                      value={prog.costInternational}
                      onChange={(e) =>
                        updateProgram(i, { costInternational: Number(e.target.value) })
                      }
                      disabled={prog.isFree}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  {/* Delete */}
                  <div className="flex items-end sm:col-span-1">
                    <button
                      onClick={() => removeProgram(i)}
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                      title="Удалить"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {prog.isFree && (
                  <div className="mt-2 rounded bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                    Бесплатное обучение (грант / бюджетное место)
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
