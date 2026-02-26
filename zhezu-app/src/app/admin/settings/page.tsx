'use client';

import { useEffect, useState } from 'react';
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

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeLang, setActiveLang] = useState<ContentLocale>('ru');
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/admin/settings', { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : DEFAULT_SETTINGS))
      .then(setSettings)
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
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={24} className="animate-spin text-blue-500" />
      </div>
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
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Address - multilingual */}
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
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </section>

      {/* Social Links */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 font-bold text-slate-900 dark:text-white">Соцсети</h3>
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
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
              <button
                type="button"
                onClick={() => setSettings((s) => ({ ...s, [toggle.key]: !s[toggle.key] }))}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  settings[toggle.key] ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    settings[toggle.key] ? 'translate-x-5' : ''
                  }`}
                />
              </button>
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

      {/* Integrations */}
      <section className="rounded-xl border border-purple-200 bg-white p-6 dark:border-purple-500/20 dark:bg-slate-900">
        <h3 className="mb-2 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Sparkles size={18} className="text-purple-500" />
          Интеграции (AI и соцсети)
        </h3>
        <p className="mb-4 text-xs text-slate-400">
          Токены хранятся в settings.json на сервере. Для работы AI-функций нужен Gemini API ключ.
        </p>

        <div className="space-y-5">
          {/* Gemini */}
          <div className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
            <h4 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400">
              <Sparkles size={14} />
              Google Gemini (AI)
            </h4>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                API Key
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
                  placeholder="AIza..."
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
          </div>

          {/* Telegram */}
          <div className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
            <h4 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
              <Send size={14} />
              Telegram
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Bot Token
                </label>
                <div className="flex gap-2">
                  <input
                    type={showTokens.telegram ? 'text' : 'password'}
                    value={settings.integrations?.telegramBotToken ?? ''}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        integrations: {
                          ...s.integrations,
                          telegramBotToken: e.target.value,
                        },
                      }))
                    }
                    placeholder="123456:ABC-DEF..."
                    className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
                  value={settings.integrations?.telegramChatId ?? ''}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      integrations: {
                        ...s.integrations,
                        telegramChatId: e.target.value,
                      },
                    }))
                  }
                  placeholder="@zhezu_news или -100..."
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Instagram */}
          <div className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
            <h4 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-pink-600 dark:text-pink-400">
              <Camera size={14} />
              Instagram (Graph API)
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Access Token
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
                    placeholder="EAAx..."
                    className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
                  Instagram Business Page ID
                </label>
                <input
                  type="text"
                  value={settings.integrations?.instagramPageId ?? ''}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      integrations: {
                        ...s.integrations,
                        instagramPageId: e.target.value,
                      },
                    }))
                  }
                  placeholder="17841..."
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
