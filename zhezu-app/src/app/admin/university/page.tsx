'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Save,
  Loader2,
  GraduationCap,
  Users,
  BookOpen,
  Building2,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import type { UniversityData, ContentLocale } from '@/lib/admin/types';

const LOCALES: { code: ContentLocale; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'kk', label: 'KK' },
  { code: 'en', label: 'EN' },
];

export default function UniversityDataPage() {
  const [data, setData] = useState<UniversityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeLang, setActiveLang] = useState<ContentLocale>('ru');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    general: true,
    rector: false,
    stats: false,
    departments: false,
    programs: false,
    centers: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/admin/university', { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const toggleSection = useCallback((key: string) => {
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/admin/university', {
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

  function LangTabs() {
    return (
      <div className="flex gap-1">
        {LOCALES.map((loc) => (
          <button
            key={loc.code}
            type="button"
            onClick={() => setActiveLang(loc.code)}
            className={`rounded px-2 py-0.5 text-[10px] font-bold ${
              activeLang === loc.code
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'
            }`}
          >
            {loc.label}
          </button>
        ))}
      </div>
    );
  }

  function SectionHeader({
    id,
    icon,
    title,
    color,
  }: {
    id: string;
    icon: React.ReactNode;
    title: string;
    color: string;
  }) {
    return (
      <button
        type="button"
        onClick={() => toggleSection(id)}
        className="flex w-full items-center gap-2 text-left"
      >
        <span className={color}>{icon}</span>
        <h3 className="flex-1 font-bold text-slate-900 dark:text-white">{title}</h3>
        {openSections[id] ? (
          <ChevronDown size={16} className="text-slate-400" />
        ) : (
          <ChevronRight size={16} className="text-slate-400" />
        )}
      </button>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Данные университета</h2>
          <p className="text-sm text-slate-500">Управление основными данными, кафедрами и программами</p>
        </div>
        <div className="flex items-center gap-3">
          <LangTabs />
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
      </div>

      {/* General Info */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <SectionHeader id="general" icon={<Building2 size={18} />} title="Основная информация" color="text-blue-500" />
        {openSections.general && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Название университета ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                value={data.name[activeLang]}
                onChange={(e) => setData({ ...data, name: { ...data.name, [activeLang]: e.target.value } })}
                className={inputCls}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Краткое название</label>
                <input type="text" value={data.shortName} onChange={(e) => setData({ ...data, shortName: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Год основания</label>
                <input type="number" value={data.founded} onChange={(e) => setData({ ...data, founded: Number(e.target.value) })} className={inputCls} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Веб-сайт</label>
                <input type="url" value={data.website} onChange={(e) => setData({ ...data, website: e.target.value })} className={inputCls} />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Rector & Pro-Rectors */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <SectionHeader id="rector" icon={<GraduationCap size={18} />} title="Руководство" color="text-purple-500" />
        {openSections.rector && (
          <div className="mt-4 space-y-6">
            <div>
              <h4 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-400">Ректор</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">ФИО ({activeLang.toUpperCase()})</label>
                  <input
                    type="text"
                    value={data.rector.name[activeLang]}
                    onChange={(e) => setData({ ...data, rector: { ...data.rector, name: { ...data.rector.name, [activeLang]: e.target.value } } })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">Должность ({activeLang.toUpperCase()})</label>
                  <input
                    type="text"
                    value={data.rector.title[activeLang]}
                    onChange={(e) => setData({ ...data, rector: { ...data.rector, title: { ...data.rector.title, [activeLang]: e.target.value } } })}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400">Проректоры</h4>
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      proRectors: [...data.proRectors, { name: { kk: '', ru: '', en: '' }, title: { kk: '', ru: '', en: '' } }],
                    })
                  }
                  className="flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-600/10 dark:text-blue-400"
                >
                  <Plus size={12} /> Добавить
                </button>
              </div>
              {data.proRectors.map((pr, i) => (
                <div key={i} className="mb-3 rounded-lg border border-slate-100 p-4 dark:border-slate-800">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">Проректор {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => setData({ ...data, proRectors: data.proRectors.filter((_, idx) => idx !== i) })}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="ФИО"
                      value={pr.name[activeLang]}
                      onChange={(e) => {
                        const updated = [...data.proRectors];
                        updated[i] = { ...pr, name: { ...pr.name, [activeLang]: e.target.value } };
                        setData({ ...data, proRectors: updated });
                      }}
                      className={inputCls}
                    />
                    <input
                      type="text"
                      placeholder="Должность"
                      value={pr.title[activeLang]}
                      onChange={(e) => {
                        const updated = [...data.proRectors];
                        updated[i] = { ...pr, title: { ...pr.title, [activeLang]: e.target.value } };
                        setData({ ...data, proRectors: updated });
                      }}
                      className={inputCls}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Statistics */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <SectionHeader id="stats" icon={<Users size={18} />} title="Статистика" color="text-emerald-500" />
        {openSections.stats && (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {([
              ['students', 'Студентов'],
              ['programs', 'Бакалавр. программ'],
              ['masterPrograms', 'Магистр. программ'],
              ['employmentRate', 'Трудоустройство (%)'],
              ['yearsOfExperience', 'Лет опыта'],
              ['faculty', 'Преподавателей'],
              ['doctorsOfScience', 'Докторов наук'],
              ['candidatesOfScience', 'Кандидатов наук'],
              ['phd', 'PhD'],
            ] as const).map(([key, label]) => (
              <div key={key}>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">{label}</label>
                <input
                  type="number"
                  value={data.stats[key]}
                  onChange={(e) => setData({ ...data, stats: { ...data.stats, [key]: Number(e.target.value) } })}
                  className={inputCls}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Departments */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <SectionHeader id="departments" icon={<BookOpen size={18} />} title={`Кафедры (${data.departments.length})`} color="text-amber-500" />
        {openSections.departments && (
          <div className="mt-4 space-y-3">
            {data.departments.map((dept, i) => (
              <div key={dept.id || i} className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">ID: {dept.id}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={dept.color}
                      onChange={(e) => {
                        const updated = [...data.departments];
                        updated[i] = { ...dept, color: e.target.value };
                        setData({ ...data, departments: updated });
                      }}
                      className="h-6 w-6 cursor-pointer rounded border-0"
                    />
                    <button
                      type="button"
                      onClick={() => setData({ ...data, departments: data.departments.filter((_, idx) => idx !== i) })}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Полное название ({activeLang.toUpperCase()})</label>
                    <input
                      type="text"
                      value={dept.name[activeLang]}
                      onChange={(e) => {
                        const updated = [...data.departments];
                        updated[i] = { ...dept, name: { ...dept.name, [activeLang]: e.target.value } };
                        setData({ ...data, departments: updated });
                      }}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Краткое ({activeLang.toUpperCase()})</label>
                    <input
                      type="text"
                      value={dept.shortName[activeLang]}
                      onChange={(e) => {
                        const updated = [...data.departments];
                        updated[i] = { ...dept, shortName: { ...dept.shortName, [activeLang]: e.target.value } };
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
                    { id: `dept-${Date.now()}`, name: { kk: '', ru: '', en: '' }, shortName: { kk: '', ru: '', en: '' }, color: '#3B82F6', icon: 'BookOpen' },
                  ],
                })
              }
              className="flex w-full items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-200 py-3 text-sm font-medium text-slate-400 hover:border-blue-300 hover:text-blue-500 dark:border-slate-700"
            >
              <Plus size={16} /> Добавить кафедру
            </button>
          </div>
        )}
      </section>

      {/* Programs */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <SectionHeader id="programs" icon={<GraduationCap size={18} />} title={`Программы (${data.programs.length})`} color="text-blue-500" />
        {openSections.programs && (
          <div className="mt-4 space-y-3">
            {data.programs.map((prog, i) => (
              <div key={prog.id || i} className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-600 dark:bg-blue-600/10 dark:text-blue-400">
                      {prog.code}
                    </span>
                    <span className="text-xs text-slate-400">{prog.degree}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setData({ ...data, programs: data.programs.filter((_, idx) => idx !== i) })}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Название ({activeLang.toUpperCase()})</label>
                    <input
                      type="text"
                      value={prog.name[activeLang]}
                      onChange={(e) => {
                        const updated = [...data.programs];
                        updated[i] = { ...prog, name: { ...prog.name, [activeLang]: e.target.value } };
                        setData({ ...data, programs: updated });
                      }}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Код</label>
                    <input
                      type="text"
                      value={prog.code}
                      onChange={(e) => {
                        const updated = [...data.programs];
                        updated[i] = { ...prog, code: e.target.value };
                        setData({ ...data, programs: updated });
                      }}
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label className="mb-1 block text-xs text-slate-500">Описание ({activeLang.toUpperCase()})</label>
                  <input
                    type="text"
                    value={prog.description[activeLang]}
                    onChange={(e) => {
                      const updated = [...data.programs];
                      updated[i] = { ...prog, description: { ...prog.description, [activeLang]: e.target.value } };
                      setData({ ...data, programs: updated });
                    }}
                    className={inputCls}
                  />
                </div>
                <div className="mt-2 grid gap-3 sm:grid-cols-4">
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Кафедра</label>
                    <select
                      value={prog.department}
                      onChange={(e) => {
                        const updated = [...data.programs];
                        updated[i] = { ...prog, department: e.target.value };
                        setData({ ...data, programs: updated });
                      }}
                      className={inputCls}
                    >
                      <option value="">—</option>
                      {data.departments.map((d) => (
                        <option key={d.id} value={d.id}>{d.shortName.ru || d.id}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Степень</label>
                    <select
                      value={prog.degree}
                      onChange={(e) => {
                        const updated = [...data.programs];
                        updated[i] = { ...prog, degree: e.target.value as 'bachelor' | 'master' | 'doctorate' };
                        setData({ ...data, programs: updated });
                      }}
                      className={inputCls}
                    >
                      <option value="bachelor">Бакалавр</option>
                      <option value="master">Магистр</option>
                      <option value="doctorate">Докторантура</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Кредиты</label>
                    <input
                      type="number"
                      value={prog.credits}
                      onChange={(e) => {
                        const updated = [...data.programs];
                        updated[i] = { ...prog, credits: Number(e.target.value) };
                        setData({ ...data, programs: updated });
                      }}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Срок (лет)</label>
                    <input
                      type="number"
                      value={prog.duration}
                      onChange={(e) => {
                        const updated = [...data.programs];
                        updated[i] = { ...prog, duration: Number(e.target.value) };
                        setData({ ...data, programs: updated });
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
                  programs: [
                    ...data.programs,
                    {
                      id: `prog-${Date.now()}`,
                      code: '',
                      department: data.departments[0]?.id || '',
                      degree: 'bachelor',
                      credits: 240,
                      duration: 4,
                      languages: ['kk', 'ru'],
                      name: { kk: '', ru: '', en: '' },
                      description: { kk: '', ru: '', en: '' },
                    },
                  ],
                })
              }
              className="flex w-full items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-200 py-3 text-sm font-medium text-slate-400 hover:border-blue-300 hover:text-blue-500 dark:border-slate-700"
            >
              <Plus size={16} /> Добавить программу
            </button>
          </div>
        )}
      </section>

      {/* Admin Centers & Service Units */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <SectionHeader id="centers" icon={<Building2 size={18} />} title="Центры и службы" color="text-teal-500" />
        {openSections.centers && (
          <div className="mt-4 space-y-6">
            <div>
              <h4 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-400">
                Административные центры ({data.adminCenters.length})
              </h4>
              {data.adminCenters.map((center, i) => (
                <div key={i} className="mb-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={center.name[activeLang]}
                    onChange={(e) => {
                      const updated = [...data.adminCenters];
                      updated[i] = { ...center, name: { ...center.name, [activeLang]: e.target.value } };
                      setData({ ...data, adminCenters: updated });
                    }}
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => setData({ ...data, adminCenters: data.adminCenters.filter((_, idx) => idx !== i) })}
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
                    adminCenters: [...data.adminCenters, { name: { kk: '', ru: '', en: '' }, icon: 'Building2' }],
                  })
                }
                className="mt-1 flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-600"
              >
                <Plus size={12} /> Добавить центр
              </button>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-400">
                Служебные подразделения ({data.serviceUnits.length})
              </h4>
              {data.serviceUnits.map((unit, i) => (
                <div key={i} className="mb-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={unit.name[activeLang]}
                    onChange={(e) => {
                      const updated = [...data.serviceUnits];
                      updated[i] = { ...unit, name: { ...unit.name, [activeLang]: e.target.value } };
                      setData({ ...data, serviceUnits: updated });
                    }}
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => setData({ ...data, serviceUnits: data.serviceUnits.filter((_, idx) => idx !== i) })}
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
                    serviceUnits: [...data.serviceUnits, { name: { kk: '', ru: '', en: '' } }],
                  })
                }
                className="mt-1 flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-600"
              >
                <Plus size={12} /> Добавить службу
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
