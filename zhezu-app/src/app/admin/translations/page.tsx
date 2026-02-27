'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Save, Loader2, Search, ChevronRight, Globe, Languages, Check, X } from 'lucide-react';
import type { ContentLocale } from '@/lib/admin/types';

const LOCALES: { code: ContentLocale; label: string; flag: string }[] = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'kk', label: 'Қазақша', flag: '🇰🇿' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

const NAMESPACES = [
  { key: 'home', label: 'Главная' },
  { key: 'nav', label: 'Навигация' },
  { key: 'admission', label: 'Поступление' },
  { key: 'university', label: 'Университет' },
  { key: 'academics', label: 'Образование' },
  { key: 'research', label: 'Наука' },
  { key: 'aiCenter', label: 'AI-Центр' },
  { key: 'life', label: 'Жизнь' },
  { key: 'contact', label: 'Контакты' },
  { key: 'metadata', label: 'SEO / Мета' },
];

type TranslationData = Record<string, unknown>;

function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, fullKey));
    } else {
      result[fullKey] = String(value ?? '');
    }
  }
  return result;
}

function unflattenObject(flat: Record<string, string>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split('.');
    let current: Record<string, unknown> = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!(parts[i] in current) || typeof current[parts[i]] !== 'object') {
        current[parts[i]] = {};
      }
      current = current[parts[i]] as Record<string, unknown>;
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

export default function TranslationsPage() {
  const [locale, setLocale] = useState<ContentLocale>('ru');
  const [namespace, setNamespace] = useState('home');
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState('');
  const [translating, setTranslating] = useState(false);
  const [translateFrom, setTranslateFrom] = useState<ContentLocale | null>(null);
  const [translateResult, setTranslateResult] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        if (translateFrom === locale) setTranslateFrom(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [translateFrom, locale]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/translations?locale=${locale}&namespace=${namespace}`);
      if (res.ok) {
        const raw: TranslationData = await res.json();
        setData(flattenObject(raw as Record<string, unknown>));
      }
    } finally {
      setLoading(false);
    }
  }, [locale, namespace]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const nested = unflattenObject(data);
      const res = await fetch('/api/admin/translations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale, namespace, data: nested }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleTranslate(srcLocale: ContentLocale) {
    setTranslating(true);
    setTranslateFrom(srcLocale);
    setTranslateResult(null);
    try {
      // Load source locale data for the same namespace
      const srcRes = await fetch(
        `/api/admin/translations?locale=${srcLocale}&namespace=${namespace}`,
      );
      if (!srcRes.ok) throw new Error('Не удалось загрузить исходные переводы');
      const srcRaw = await srcRes.json();
      const srcFlat = flattenObject(srcRaw as Record<string, unknown>);

      // Only translate keys that have source values
      const keysToTranslate: Record<string, string> = {};
      for (const [key, value] of Object.entries(srcFlat)) {
        if (value.trim()) {
          keysToTranslate[key] = value;
        }
      }

      if (Object.keys(keysToTranslate).length === 0) {
        setTranslateResult({ ok: false, message: 'Нет текста для перевода в исходном языке' });
        return;
      }

      const res = await fetch('/api/admin/ai/translate-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keys: keysToTranslate,
          sourceLang: srcLocale,
          targetLang: locale,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Ошибка перевода');
      }

      const { translations } = await res.json();
      setData((prev) => ({ ...prev, ...translations }));
      setTranslateResult({
        ok: true,
        message: `Переведено ${Object.keys(translations).length} ключей`,
      });
      setTimeout(() => setTranslateResult(null), 4000);
    } catch (err) {
      setTranslateResult({
        ok: false,
        message: err instanceof Error ? err.message : 'Ошибка перевода',
      });
      setTimeout(() => setTranslateResult(null), 4000);
    } finally {
      setTranslating(false);
      setTranslateFrom(null);
    }
  }

  const filteredKeys = Object.keys(data).filter(
    (key) =>
      key.toLowerCase().includes(search.toLowerCase()) ||
      data[key].toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Locale Selector */}
        <div className="flex gap-1 rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
          {LOCALES.map((loc) => (
            <button
              key={loc.code}
              type="button"
              onClick={() => setLocale(loc.code)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                locale === loc.code
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по ключу или значению..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Auto-translate dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            disabled={translating}
            onClick={() => setTranslateFrom(translateFrom ? null : locale)}
            className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
          >
            {translating ? <Loader2 size={14} className="animate-spin" /> : <Languages size={14} />}
            Автоперевод
          </button>
          {translateFrom === locale && !translating && (
            <div className="absolute top-full right-0 z-50 mt-1 min-w-[200px] rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
              <div className="px-3 py-1.5 text-xs font-medium text-slate-400">Перевести из:</div>
              {LOCALES.filter((l) => l.code !== locale).map((src) => (
                <button
                  key={src.code}
                  type="button"
                  onClick={() => {
                    setTranslateFrom(null);
                    handleTranslate(src.code);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <span>{src.flag}</span>
                  {src.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Translate result badge */}
        {translateResult && (
          <div
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium ${
              translateResult.ok
                ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
            }`}
          >
            {translateResult.ok ? <Check size={12} /> : <X size={12} />}
            {translateResult.message}
          </div>
        )}

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

      <div className="flex gap-6">
        {/* Namespace Sidebar */}
        <div className="w-56 shrink-0 space-y-1">
          {NAMESPACES.map((ns) => (
            <button
              key={ns.key}
              type="button"
              onClick={() => setNamespace(ns.key)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                namespace === ns.key
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {ns.label}
              <ChevronRight size={14} className={namespace === ns.key ? '' : 'opacity-0'} />
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-3 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm">
              <Globe size={14} className="text-slate-400" />
              <span className="font-medium text-slate-900 dark:text-white">
                {NAMESPACES.find((n) => n.key === namespace)?.label}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-400">{filteredKeys.length} ключей</span>
            </div>
          </div>

          {translating ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16">
              <Loader2 size={24} className="animate-spin text-purple-500" />
              <span className="text-sm text-purple-600 dark:text-purple-400">
                Переводим с {LOCALES.find((l) => l.code === translateFrom)?.label || '...'}...
              </span>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={24} className="animate-spin text-blue-500" />
            </div>
          ) : filteredKeys.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-400">
              {search ? 'Ничего не найдено' : 'Нет данных для этого раздела'}
            </div>
          ) : (
            <div className="max-h-[calc(100vh-280px)] divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800">
              {filteredKeys.map((key) => (
                <div key={key} className="grid grid-cols-[280px_1fr] items-start gap-4 px-6 py-3">
                  <label className="truncate pt-2.5 font-mono text-xs text-slate-400">{key}</label>
                  {data[key].length > 80 ? (
                    <textarea
                      value={data[key]}
                      onChange={(e) => setData((prev) => ({ ...prev, [key]: e.target.value }))}
                      rows={3}
                      className="w-full resize-y rounded border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:text-white"
                    />
                  ) : (
                    <input
                      type="text"
                      value={data[key]}
                      onChange={(e) => setData((prev) => ({ ...prev, [key]: e.target.value }))}
                      className="w-full rounded border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:text-white"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
