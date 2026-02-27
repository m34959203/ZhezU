'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Save,
  Loader2,
  Globe,
  Phone,
  Mail,
  MapPin,
  Shield,
  Sparkles,
  Send,
  Camera,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Zap,
} from 'lucide-react';
import type { SiteSettings, ContentLocale } from '@/lib/admin/types';

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'Жезказганский университет им. О.А. Байконурова',
  contactEmail: 'info@zhezu.edu.kz',
  contactPhone: '+7 7102 123456',
  address: { kk: '', ru: '', en: '' },
  socialLinks: { instagram: '', telegram: '', youtube: '', facebook: '' },
  admissionOpen: true,
  maintenanceMode: false,
  announcement: { kk: '', ru: '', en: '' },
};

const LOCALES: { code: ContentLocale; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'kk', label: 'KK' },
  { code: 'en', label: 'EN' },
];

const GEMINI_MODELS = [
  { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (рекомендуется)' },
  { value: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash Lite (быстрее/дешевле)' },
  { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (умнее)' },
  { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash (устаревшая)' },
];

interface IntegrationsStatus {
  geminiApiKeySet: boolean;
  telegramBotTokenSet: boolean;
  instagramAccessTokenSet: boolean;
  geminiModel: string;
  telegramChatId: string;
  telegramEnabled: boolean;
  instagramPageId: string;
  instagramEnabled: boolean;
  autoPublishSocial: boolean;
}

interface ValidationResult {
  ok: boolean;
  message: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [status, setStatus] = useState<IntegrationsStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeLang, setActiveLang] = useState<ContentLocale>('ru');
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({});
  const [validating, setValidating] = useState<Record<string, boolean>>({});
  const [validationResults, setValidationResults] = useState<Record<string, ValidationResult>>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/admin/settings', { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : DEFAULT_SETTINGS))
      .then((data) => {
        if (data.integrationsStatus) {
          setStatus(data.integrationsStatus);
        }
        setSettings(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        // Clear token inputs after save (they're stored server-side)
        setSettings((s) => ({
          ...s,
          integrations: {
            ...s.integrations,
            geminiApiKey: undefined,
            telegramBotToken: undefined,
            instagramAccessToken: undefined,
          },
        }));
        // Refresh status
        const refreshRes = await fetch('/api/admin/settings');
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          if (refreshData.integrationsStatus) setStatus(refreshData.integrationsStatus);
        }
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  const handleValidate = useCallback(async (service: string) => {
    setValidating((v) => ({ ...v, [service]: true }));
    setValidationResults((v) => ({ ...v, [service]: undefined as unknown as ValidationResult }));
    try {
      const res = await fetch('/api/admin/ai/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service }),
      });
      const data = await res.json();
      setValidationResults((v) => ({ ...v, [service]: data }));
    } catch {
      setValidationResults((v) => ({
        ...v,
        [service]: { ok: false, message: 'Ошибка подключения' },
      }));
    } finally {
      setValidating((v) => ({ ...v, [service]: false }));
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={24} className="animate-spin text-blue-500" />
      </div>
    );
  }

  const inputCls =
    'w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white';
  const monoInputCls =
    'flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white';

  function StatusDot({ isSet }: { isSet: boolean }) {
    return (
      <span
        className={`inline-block h-2 w-2 rounded-full ${isSet ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}
        title={isSet ? 'Настроено' : 'Не задано'}
      />
    );
  }

  function ValidationBadge({ result }: { result?: ValidationResult }) {
    if (!result) return null;
    return (
      <span
        className={`flex items-center gap-1 text-xs font-medium ${result.ok ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}
      >
        {result.ok ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
        {result.message}
      </span>
    );
  }

  function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
    return (
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            enabled ? 'translate-x-5' : ''
          }`}
        />
      </button>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saved ? 'Сохранено!' : 'Сохранить настройки'}
        </button>
      </div>

      {/* General */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Globe size={18} className="text-blue-500" />
          Основные
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Название сайта
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings((s) => ({ ...s, siteName: e.target.value }))}
              className={inputCls}
            />
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Phone size={18} className="text-emerald-500" />
          Контакты
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
              <Mail size={12} /> Email
            </label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings((s) => ({ ...s, contactEmail: e.target.value }))}
              className={inputCls}
            />
          </div>
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
              <Phone size={12} /> Телефон
            </label>
            <input
              type="text"
              value={settings.contactPhone}
              onChange={(e) => setSettings((s) => ({ ...s, contactPhone: e.target.value }))}
              className={inputCls}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
              <MapPin size={12} /> Адрес ({activeLang.toUpperCase()})
            </label>
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
          </div>
          <input
            type="text"
            value={settings.address[activeLang]}
            onChange={(e) =>
              setSettings((s) => ({
                ...s,
                address: { ...s.address, [activeLang]: e.target.value },
              }))
            }
            className={inputCls}
          />
        </div>
      </section>

      {/* Social Links */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 font-bold text-slate-900 dark:text-white">Соцсети (ссылки)</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {(['instagram', 'telegram', 'youtube', 'facebook'] as const).map((key) => (
            <div key={key}>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 capitalize dark:text-slate-300">
                {key}
              </label>
              <input
                type="url"
                value={settings.socialLinks[key] ?? ''}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    socialLinks: { ...s.socialLinks, [key]: e.target.value },
                  }))
                }
                placeholder={`https://${key}.com/...`}
                className={inputCls}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Toggles */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Shield size={18} className="text-amber-500" />
          Режимы
        </h3>
        <div className="space-y-4">
          {[
            {
              key: 'admissionOpen' as const,
              label: 'Приём документов открыт',
              desc: 'Показывать кнопку «Подать заявку» на сайте',
            },
            {
              key: 'maintenanceMode' as const,
              label: 'Режим обслуживания',
              desc: 'Показать заглушку «Сайт на обслуживании»',
            },
          ].map((toggle) => (
            <div
              key={toggle.key}
              className="flex items-center justify-between rounded-lg border border-slate-100 p-4 dark:border-slate-800"
            >
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{toggle.label}</p>
                <p className="text-xs text-slate-400">{toggle.desc}</p>
              </div>
              <Toggle
                enabled={settings[toggle.key]}
                onChange={(v) => setSettings((s) => ({ ...s, [toggle.key]: v }))}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Announcement */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 font-bold text-slate-900 dark:text-white">
          Баннер-объявление ({activeLang.toUpperCase()})
        </h3>
        <textarea
          value={settings.announcement?.[activeLang] ?? ''}
          onChange={(e) =>
            setSettings((s) => ({
              ...s,
              announcement: {
                ...(s.announcement || { kk: '', ru: '', en: '' }),
                [activeLang]: e.target.value,
              },
            }))
          }
          rows={3}
          placeholder="Текст объявления. Оставьте пустым чтобы скрыть баннер."
          className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </section>

      {/* ═══════ INTEGRATIONS ═══════ */}
      <section className="rounded-xl border border-purple-200 bg-white p-6 dark:border-purple-500/20 dark:bg-slate-900">
        <h3 className="mb-2 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Sparkles size={18} className="text-purple-500" />
          Интеграции (AI и соцсети)
        </h3>
        <p className="mb-5 text-xs text-slate-400">
          Секреты не возвращаются с сервера после сохранения. Введите новый токен, чтобы обновить.
        </p>

        <div className="space-y-5">
          {/* ── Auto-publish toggle ── */}
          <div className="flex items-center justify-between rounded-lg border border-green-100 bg-green-50/50 p-4 dark:border-green-500/20 dark:bg-green-500/5">
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-green-700 dark:text-green-400">
                <Zap size={14} />
                Автопубликация в соцсети
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Автоматически публиковать новости в Telegram и Instagram при переводе из черновика в
                опубликованное
              </p>
            </div>
            <Toggle
              enabled={
                settings.integrations?.autoPublishSocial ?? status?.autoPublishSocial ?? false
              }
              onChange={(v) =>
                setSettings((s) => ({
                  ...s,
                  integrations: { ...s.integrations, autoPublishSocial: v },
                }))
              }
            />
          </div>

          {/* ── Gemini ── */}
          <div className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400">
                <Sparkles size={14} />
                Google Gemini (AI)
                <StatusDot isSet={!!status?.geminiApiKeySet} />
              </h4>
              <button
                type="button"
                onClick={() => handleValidate('gemini')}
                disabled={validating.gemini || !status?.geminiApiKeySet}
                className="flex items-center gap-1 rounded-md border border-purple-200 px-2.5 py-1 text-[11px] font-medium text-purple-600 transition-colors hover:bg-purple-50 disabled:opacity-40 dark:border-purple-500/30 dark:text-purple-400 dark:hover:bg-purple-500/10"
              >
                {validating.gemini ? (
                  <Loader2 size={10} className="animate-spin" />
                ) : (
                  <Zap size={10} />
                )}
                Проверить
              </button>
            </div>
            <ValidationBadge result={validationResults.gemini} />

            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  API Key {status?.geminiApiKeySet && '(задан)'}
                </label>
                <div className="flex gap-2">
                  <input
                    type={showTokens.gemini ? 'text' : 'password'}
                    value={settings.integrations?.geminiApiKey ?? ''}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        integrations: { ...s.integrations, geminiApiKey: e.target.value },
                      }))
                    }
                    placeholder={status?.geminiApiKeySet ? '••••••••' : 'AIza...'}
                    className={monoInputCls}
                  />
                  <button
                    type="button"
                    onClick={() => setShowTokens((s) => ({ ...s, gemini: !s.gemini }))}
                    className="rounded-lg border border-slate-200 px-3 text-slate-400 hover:text-slate-600 dark:border-slate-700 dark:hover:text-white"
                  >
                    {showTokens.gemini ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Модель
                </label>
                <select
                  value={
                    settings.integrations?.geminiModel || status?.geminiModel || 'gemini-2.5-flash'
                  }
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      integrations: { ...s.integrations, geminiModel: e.target.value },
                    }))
                  }
                  className={inputCls}
                >
                  {GEMINI_MODELS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ── Telegram ── */}
          <div className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                <Send size={14} />
                Telegram
                <StatusDot isSet={!!status?.telegramBotTokenSet} />
              </h4>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleValidate('telegram')}
                  disabled={validating.telegram || !status?.telegramBotTokenSet}
                  className="flex items-center gap-1 rounded-md border border-blue-200 px-2.5 py-1 text-[11px] font-medium text-blue-600 transition-colors hover:bg-blue-50 disabled:opacity-40 dark:border-blue-500/30 dark:text-blue-400 dark:hover:bg-blue-500/10"
                >
                  {validating.telegram ? (
                    <Loader2 size={10} className="animate-spin" />
                  ) : (
                    <Zap size={10} />
                  )}
                  Проверить
                </button>
                <Toggle
                  enabled={
                    settings.integrations?.telegramEnabled ?? status?.telegramEnabled ?? false
                  }
                  onChange={(v) =>
                    setSettings((s) => ({
                      ...s,
                      integrations: { ...s.integrations, telegramEnabled: v },
                    }))
                  }
                />
              </div>
            </div>
            <ValidationBadge result={validationResults.telegram} />

            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Bot Token {status?.telegramBotTokenSet && '(задан)'}
                </label>
                <div className="flex gap-2">
                  <input
                    type={showTokens.telegram ? 'text' : 'password'}
                    value={settings.integrations?.telegramBotToken ?? ''}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        integrations: { ...s.integrations, telegramBotToken: e.target.value },
                      }))
                    }
                    placeholder={status?.telegramBotTokenSet ? '••••••••' : '123456:ABC-DEF...'}
                    className={monoInputCls}
                  />
                  <button
                    type="button"
                    onClick={() => setShowTokens((s) => ({ ...s, telegram: !s.telegram }))}
                    className="rounded-lg border border-slate-200 px-3 text-slate-400 hover:text-slate-600 dark:border-slate-700 dark:hover:text-white"
                  >
                    {showTokens.telegram ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Chat ID / @channel
                </label>
                <input
                  type="text"
                  value={settings.integrations?.telegramChatId ?? status?.telegramChatId ?? ''}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      integrations: { ...s.integrations, telegramChatId: e.target.value },
                    }))
                  }
                  placeholder="@zhezu_news или -100..."
                  className={inputCls + ' font-mono'}
                />
              </div>
            </div>
          </div>

          {/* ── Instagram ── */}
          <div className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-pink-600 dark:text-pink-400">
                <Camera size={14} />
                Instagram (Graph API)
                <StatusDot isSet={!!status?.instagramAccessTokenSet} />
              </h4>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleValidate('instagram')}
                  disabled={validating.instagram || !status?.instagramAccessTokenSet}
                  className="flex items-center gap-1 rounded-md border border-pink-200 px-2.5 py-1 text-[11px] font-medium text-pink-600 transition-colors hover:bg-pink-50 disabled:opacity-40 dark:border-pink-500/30 dark:text-pink-400 dark:hover:bg-pink-500/10"
                >
                  {validating.instagram ? (
                    <Loader2 size={10} className="animate-spin" />
                  ) : (
                    <Zap size={10} />
                  )}
                  Проверить
                </button>
                <Toggle
                  enabled={
                    settings.integrations?.instagramEnabled ?? status?.instagramEnabled ?? false
                  }
                  onChange={(v) =>
                    setSettings((s) => ({
                      ...s,
                      integrations: { ...s.integrations, instagramEnabled: v },
                    }))
                  }
                />
              </div>
            </div>
            <ValidationBadge result={validationResults.instagram} />

            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Access Token {status?.instagramAccessTokenSet && '(задан)'}
                </label>
                <div className="flex gap-2">
                  <input
                    type={showTokens.instagram ? 'text' : 'password'}
                    value={settings.integrations?.instagramAccessToken ?? ''}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        integrations: {
                          ...s.integrations,
                          instagramAccessToken: e.target.value,
                        },
                      }))
                    }
                    placeholder={status?.instagramAccessTokenSet ? '••••••••' : 'EAAx...'}
                    className={monoInputCls}
                  />
                  <button
                    type="button"
                    onClick={() => setShowTokens((s) => ({ ...s, instagram: !s.instagram }))}
                    className="rounded-lg border border-slate-200 px-3 text-slate-400 hover:text-slate-600 dark:border-slate-700 dark:hover:text-white"
                  >
                    {showTokens.instagram ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Business Page ID
                </label>
                <input
                  type="text"
                  value={settings.integrations?.instagramPageId ?? status?.instagramPageId ?? ''}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      integrations: { ...s.integrations, instagramPageId: e.target.value },
                    }))
                  }
                  placeholder="17841..."
                  className={inputCls + ' font-mono'}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
