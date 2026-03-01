'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Save,
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
  ExternalLink,
  Brain,
  ChevronUp,
  ChevronDown,
  Link as LinkIcon,
} from 'lucide-react';
import type { AICenterData, AICenterProject, ContentLocale } from '@/lib/admin/types';

const EMPTY_LOCALIZED = { kk: '', ru: '', en: '' };

const DEFAULT_DATA: AICenterData = {
  title: { kk: 'AI-Center ZhezU', ru: 'AI-Center ZhezU', en: 'AI-Center ZhezU' },
  subtitle: EMPTY_LOCALIZED,
  externalUrl: '',
  projects: [],
};

const LOCALES: { code: ContentLocale; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'kk', label: 'KK' },
  { code: 'en', label: 'EN' },
];

const STATUS_OPTIONS: { value: AICenterProject['status']; label: string; color: string }[] = [
  { value: 'active', label: 'Активный', color: 'bg-green-100 text-green-700' },
  { value: 'dev', label: 'В разработке', color: 'bg-amber-100 text-amber-700' },
  { value: 'planned', label: 'Планируется', color: 'bg-slate-100 text-slate-600' },
];

const ICON_OPTIONS = [
  'Brain', 'Bot', 'Users', 'Building2', 'Mountain', 'Eye', 'BarChart3',
  'Code2', 'Database', 'FlaskConical', 'Cpu', 'Zap', 'Globe', 'Shield',
  'MessageSquare', 'Terminal', 'Palette', 'Lightbulb', 'Rocket', 'Search',
];

export default function AICenterAdminPage() {
  const [data, setData] = useState<AICenterData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeLang, setActiveLang] = useState<ContentLocale>('ru');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/ai-center')
      .then((r) => (r.ok ? r.json() : DEFAULT_DATA))
      .then((d) => setData({ ...DEFAULT_DATA, ...d }))
      .finally(() => setLoading(false));
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch('/api/admin/ai-center', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }, [data]);

  const addProject = () => {
    const newProject: AICenterProject = {
      id: crypto.randomUUID(),
      title: { ...EMPTY_LOCALIZED },
      description: { ...EMPTY_LOCALIZED },
      icon: 'Brain',
      tags: [],
      status: 'dev',
      url: '',
      visible: true,
      order: data.projects.length,
    };
    setData({ ...data, projects: [...data.projects, newProject] });
    setExpandedProject(newProject.id);
  };

  const updateProject = (id: string, patch: Partial<AICenterProject>) => {
    setData({
      ...data,
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
  };

  const removeProject = (id: string) => {
    if (!confirm('Удалить этот проект?')) return;
    setData({ ...data, projects: data.projects.filter((p) => p.id !== id) });
  };

  const moveProject = (id: string, dir: -1 | 1) => {
    const list = [...data.projects];
    const idx = list.findIndex((p) => p.id === id);
    const target = idx + dir;
    if (target < 0 || target >= list.length) return;
    [list[idx], list[target]] = [list[target], list[idx]];
    list.forEach((p, i) => (p.order = i));
    setData({ ...data, projects: list });
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI-Центр</h1>
          <p className="mt-1 text-sm text-slate-500">
            Управление информационной панелью AI-Центра
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saved ? 'Сохранено!' : 'Сохранить'}
        </button>
      </div>

      {/* Language tabs */}
      <div className="flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
        {LOCALES.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setActiveLang(l.code)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeLang === l.code
                ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* General settings card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <Brain size={20} className="text-blue-500" />
          Общие настройки
        </h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Заголовок ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={data.title[activeLang]}
              onChange={(e) =>
                setData({ ...data, title: { ...data.title, [activeLang]: e.target.value } })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Описание ({activeLang.toUpperCase()})
            </label>
            <textarea
              rows={2}
              value={data.subtitle[activeLang]}
              onChange={(e) =>
                setData({ ...data, subtitle: { ...data.subtitle, [activeLang]: e.target.value } })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              <LinkIcon size={14} className="mr-1 inline" />
              Ссылка на отдельный сайт AI-Центра
            </label>
            <input
              type="url"
              placeholder="https://ai.zhezu.edu.kz"
              value={data.externalUrl}
              onChange={(e) => setData({ ...data, externalUrl: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
            <p className="mt-1 text-xs text-slate-400">
              Если указано — кнопки на хаб-странице будут вести на этот сайт
            </p>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Проекты ({data.projects.length})
          </h2>
          <button
            type="button"
            onClick={addProject}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-600/10 dark:text-blue-400 dark:hover:bg-blue-600/20"
          >
            <Plus size={16} />
            Добавить проект
          </button>
        </div>

        {data.projects.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-slate-200 p-8 text-center dark:border-slate-700">
            <Brain size={32} className="mx-auto mb-2 text-slate-300" />
            <p className="text-sm text-slate-500">Проектов пока нет</p>
            <button
              type="button"
              onClick={addProject}
              className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Создать первый проект
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {data.projects.map((project, idx) => (
              <div
                key={project.id}
                className="rounded-lg border border-slate-200 dark:border-slate-700"
              >
                {/* Collapsed header */}
                <div
                  className="flex cursor-pointer items-center gap-3 p-3"
                  onClick={() =>
                    setExpandedProject(expandedProject === project.id ? null : project.id)
                  }
                >
                  <GripVertical size={16} className="shrink-0 text-slate-300" />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); moveProject(project.id, -1); }}
                      disabled={idx === 0}
                      className="rounded p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); moveProject(project.id, 1); }}
                      disabled={idx === data.projects.length - 1}
                      className="rounded p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                  <span className="text-xs font-bold text-slate-400">{idx + 1}</span>
                  <span className="flex-1 truncate text-sm font-medium text-slate-800 dark:text-white">
                    {project.title.ru || project.title.en || 'Без названия'}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      STATUS_OPTIONS.find((s) => s.value === project.status)?.color
                    }`}
                  >
                    {STATUS_OPTIONS.find((s) => s.value === project.status)?.label}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateProject(project.id, { visible: !project.visible });
                    }}
                    className="rounded p-1 text-slate-400 hover:text-slate-600"
                    title={project.visible ? 'Скрыть' : 'Показать'}
                  >
                    {project.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeProject(project.id); }}
                    className="rounded p-1 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Expanded form */}
                {expandedProject === project.id && (
                  <div className="border-t border-slate-200 p-4 dark:border-slate-700">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-slate-500">
                          Название ({activeLang.toUpperCase()})
                        </label>
                        <input
                          type="text"
                          value={project.title[activeLang]}
                          onChange={(e) =>
                            updateProject(project.id, {
                              title: { ...project.title, [activeLang]: e.target.value },
                            })
                          }
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-slate-500">
                          Описание ({activeLang.toUpperCase()})
                        </label>
                        <textarea
                          rows={2}
                          value={project.description[activeLang]}
                          onChange={(e) =>
                            updateProject(project.id, {
                              description: {
                                ...project.description,
                                [activeLang]: e.target.value,
                              },
                            })
                          }
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500">
                          Иконка
                        </label>
                        <select
                          value={project.icon}
                          onChange={(e) =>
                            updateProject(project.id, { icon: e.target.value })
                          }
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                        >
                          {ICON_OPTIONS.map((ic) => (
                            <option key={ic} value={ic}>
                              {ic}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500">
                          Статус
                        </label>
                        <select
                          value={project.status}
                          onChange={(e) =>
                            updateProject(project.id, {
                              status: e.target.value as AICenterProject['status'],
                            })
                          }
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500">
                          Теги (через запятую)
                        </label>
                        <input
                          type="text"
                          value={project.tags.join(', ')}
                          onChange={(e) =>
                            updateProject(project.id, {
                              tags: e.target.value
                                .split(',')
                                .map((t) => t.trim())
                                .filter(Boolean),
                            })
                          }
                          placeholder="Python, ML, NLP"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500">
                          Ссылка на проект
                        </label>
                        <input
                          type="url"
                          value={project.url || ''}
                          onChange={(e) =>
                            updateProject(project.id, { url: e.target.value || undefined })
                          }
                          placeholder="https://..."
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* External link hint */}
      {data.externalUrl && (
        <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <ExternalLink size={18} className="shrink-0 text-blue-500" />
          <div className="text-sm">
            <p className="font-medium text-blue-800 dark:text-blue-300">
              Отдельный сайт AI-Центра
            </p>
            <p className="text-blue-600 dark:text-blue-400">
              Кнопки &laquo;Исследовать&raquo; и &laquo;Подробнее&raquo; будут вести на{' '}
              <a
                href={data.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {data.externalUrl}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
