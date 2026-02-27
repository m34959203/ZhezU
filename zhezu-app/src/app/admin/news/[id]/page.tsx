'use client';

import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  Loader2,
  Eye,
  EyeOff,
  Pin,
  Trash2,
  Languages,
  Sparkles,
  Send,
  Camera,
  X,
  ChevronDown,
  ChevronUp,
  Check,
  AlertTriangle,
  Info,
} from 'lucide-react';
import type { NewsArticle, ContentLocale } from '@/lib/admin/types';
import { slugify } from '@/lib/utils';

const RichTextEditor = lazy(() => import('@/components/admin/RichTextEditor'));

const CATEGORIES = [
  { value: 'news', label: 'Новость' },
  { value: 'announcement', label: 'Объявление' },
  { value: 'event', label: 'Событие' },
  { value: 'achievement', label: 'Достижение' },
  { value: 'university', label: 'Университет' },
  { value: 'science', label: 'Наука' },
  { value: 'students', label: 'Студенты' },
  { value: 'sport', label: 'Спорт' },
  { value: 'culture', label: 'Культура' },
];

const LOCALES: { code: ContentLocale; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'kk', label: 'KK' },
  { code: 'en', label: 'EN' },
];

const LANG_LABELS: Record<ContentLocale, string> = {
  kk: 'Казахский',
  ru: 'Русский',
  en: 'Английский',
};

const emptyLocalized = { kk: '', ru: '', en: '' };

interface AISuggestion {
  field: string;
  severity: 'high' | 'medium' | 'low';
  text: string;
}

interface AIAnalysis {
  score: number;
  summary: string;
  strengths: string[];
  suggestions: AISuggestion[];
  improvedTitle?: string;
  improvedExcerpt?: string;
}

export default function NewsEditorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === 'new';

  const [article, setArticle] = useState<Omit<NewsArticle, 'id' | 'createdAt' | 'updatedAt'>>({
    slug: '',
    title: { ...emptyLocalized },
    excerpt: { ...emptyLocalized },
    body: { ...emptyLocalized },
    category: 'news',
    image: '',
    published: false,
    pinned: false,
    author: 'Администратор',
  });
  const [activeLang, setActiveLang] = useState<ContentLocale>('ru');
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /* ─── AI States ─── */
  const [translating, setTranslating] = useState(false);
  const [translateTarget, setTranslateTarget] = useState<ContentLocale | null>(null);
  const [translateDropdown, setTranslateDropdown] = useState(false);

  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const [publishing, setPublishing] = useState(false);
  const [publishingIg, setPublishingIg] = useState(false);
  const [publishResult, setPublishResult] = useState<string | null>(null);
  const [telegramConfigured, setTelegramConfigured] = useState<boolean | null>(null);
  const [instagramConfigured, setInstagramConfigured] = useState<boolean | null>(null);
  const [socialPublished, setSocialPublished] = useState<{
    telegram?: boolean;
    instagram?: boolean;
  }>({});

  useEffect(() => {
    if (isNew) return;
    const controller = new AbortController();
    fetch(`/api/admin/news/${id}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setArticle(data);
          if (data.socialPublished) setSocialPublished(data.socialPublished);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [id, isNew]);

  /* Check social media config on mount */
  useEffect(() => {
    fetch('/api/admin/social/telegram')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setTelegramConfigured(data.configured);
      })
      .catch(() => {});
    fetch('/api/admin/social/instagram')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setInstagramConfigured(data.configured);
      })
      .catch(() => {});
  }, []);

  function setLocField(field: 'title' | 'excerpt' | 'body', value: string) {
    setArticle((prev) => {
      const updated = { ...prev, [field]: { ...prev[field], [activeLang]: value } };
      // Auto-generate slug from title when it hasn't been manually edited
      if (field === 'title' && !slugTouched) {
        updated.slug = slugify(value);
      }
      return updated;
    });
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const url = isNew ? '/api/admin/news' : `/api/admin/news/${id}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });
      if (res.ok) {
        const data = await res.json();
        setSaved(true);
        if (isNew) {
          router.replace(`/admin/news/${data.id}`);
        }

        // Show auto-publish results
        if (data.autoPublishResult) {
          const results: string[] = [];
          if (data.autoPublishResult.telegram?.ok) results.push('Telegram');
          if (data.autoPublishResult.instagram?.ok) results.push('Instagram');
          if (results.length > 0) {
            setPublishResult(`Автопубликация: ${results.join(', ')}`);
            setSocialPublished((prev) => ({
              ...prev,
              ...(data.autoPublishResult.telegram?.ok ? { telegram: true } : {}),
              ...(data.autoPublishResult.instagram?.ok ? { instagram: true } : {}),
            }));
            setTimeout(() => setPublishResult(null), 5000);
          }
        }

        if (data.socialPublished) setSocialPublished(data.socialPublished);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Удалить публикацию?')) return;
    await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
    router.push('/admin/news');
  }

  /* ─── AI: Translation ─── */
  const handleTranslate = useCallback(
    async (targetLang: ContentLocale) => {
      setTranslateDropdown(false);
      setTranslating(true);
      setTranslateTarget(targetLang);
      try {
        const res = await fetch('/api/admin/ai/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: article.title[activeLang],
            excerpt: article.excerpt[activeLang],
            body: article.body[activeLang],
            sourceLang: activeLang,
            targetLang,
          }),
        });
        if (!res.ok) {
          const err = await res.json();
          alert(`Ошибка перевода: ${err.error}`);
          return;
        }
        const data = await res.json();
        setArticle((prev) => ({
          ...prev,
          title: { ...prev.title, [targetLang]: data.title },
          excerpt: { ...prev.excerpt, [targetLang]: data.excerpt },
          body: { ...prev.body, [targetLang]: data.body },
        }));
      } catch {
        alert('Не удалось выполнить перевод');
      } finally {
        setTranslating(false);
        setTranslateTarget(null);
      }
    },
    [activeLang, article],
  );

  /* ─── AI: Analysis ─── */
  const handleAnalyze = useCallback(async () => {
    setAnalyzing(true);
    setShowAnalysis(true);
    setAnalysis(null);
    try {
      const res = await fetch('/api/admin/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: article.title[activeLang],
          excerpt: article.excerpt[activeLang],
          body: article.body[activeLang],
          category: article.category,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(`Ошибка анализа: ${err.error}`);
        setShowAnalysis(false);
        return;
      }
      const data: AIAnalysis = await res.json();
      setAnalysis(data);
    } catch {
      alert('Не удалось выполнить анализ');
      setShowAnalysis(false);
    } finally {
      setAnalyzing(false);
    }
  }, [activeLang, article]);

  /* ─── Social: Telegram ─── */
  const handlePublishTelegram = useCallback(async () => {
    if (!confirm('Опубликовать в Telegram-канал?')) return;
    setPublishing(true);
    setPublishResult(null);
    try {
      const res = await fetch('/api/admin/social/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId: id, lang: 'ru' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishResult(`Ошибка: ${data.error}`);
      } else {
        setPublishResult('Опубликовано в Telegram!');
        setTimeout(() => setPublishResult(null), 3000);
      }
    } catch {
      setPublishResult('Ошибка подключения');
    } finally {
      setPublishing(false);
    }
  }, [id]);

  /* ─── Social: Instagram ─── */
  const handlePublishInstagram = useCallback(async () => {
    if (!confirm('Опубликовать в Instagram?')) return;
    setPublishingIg(true);
    setPublishResult(null);
    try {
      const res = await fetch('/api/admin/social/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId: id, lang: 'ru' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishResult(`Ошибка: ${data.error}`);
      } else {
        setPublishResult('Опубликовано в Instagram!');
        setTimeout(() => setPublishResult(null), 3000);
      }
    } catch {
      setPublishResult('Ошибка подключения');
    } finally {
      setPublishingIg(false);
    }
  }, [id]);

  function applySuggestion(field: 'title' | 'excerpt', value: string) {
    setArticle((prev) => ({
      ...prev,
      [field]: { ...prev[field], [activeLang]: value },
    }));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={24} className="animate-spin text-blue-500" />
      </div>
    );
  }

  const otherLocales = LOCALES.filter((l) => l.code !== activeLang);
  const hasContent = article.title[activeLang].length > 0 || article.body[activeLang].length > 0;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push('/admin/news')}
          className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Назад к списку
        </button>
        <div className="flex items-center gap-2">
          {!isNew && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50 dark:border-red-500/20 dark:hover:bg-red-500/10"
            >
              <Trash2 size={14} />
              Удалить
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saved ? 'Сохранено!' : 'Сохранить'}
          </button>
        </div>
      </div>

      {/* AI Toolbar */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-purple-200 bg-purple-50/50 p-3 dark:border-purple-500/20 dark:bg-purple-500/5">
        <span className="mr-1 flex items-center gap-1.5 text-xs font-semibold text-purple-600 uppercase dark:text-purple-400">
          <Sparkles size={14} />
          AI
        </span>

        {/* Translate Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setTranslateDropdown(!translateDropdown)}
            disabled={translating || !hasContent}
            className="flex items-center gap-1.5 rounded-lg border border-purple-200 bg-white px-3 py-1.5 text-xs font-medium text-purple-700 transition-colors hover:bg-purple-50 disabled:opacity-50 dark:border-purple-500/30 dark:bg-slate-800 dark:text-purple-300 dark:hover:bg-slate-700"
          >
            {translating ? <Loader2 size={12} className="animate-spin" /> : <Languages size={12} />}
            {translating
              ? `${LANG_LABELS[activeLang]} -> ${translateTarget ? LANG_LABELS[translateTarget] : '...'}...`
              : `Перевести с ${activeLang.toUpperCase()}`}
            {!translating &&
              (translateDropdown ? <ChevronUp size={10} /> : <ChevronDown size={10} />)}
          </button>
          {translateDropdown && (
            <div className="absolute top-full left-0 z-10 mt-1 rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
              {otherLocales.map((loc) => (
                <button
                  key={loc.code}
                  type="button"
                  onClick={() => handleTranslate(loc.code)}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs hover:bg-purple-50 dark:hover:bg-slate-700"
                >
                  <Languages size={12} className="text-purple-500" />
                  <span>
                    {activeLang.toUpperCase()} -&gt; {loc.label} ({LANG_LABELS[loc.code]})
                  </span>
                </button>
              ))}
              <div className="my-1 border-t border-slate-100 dark:border-slate-700" />
              <button
                type="button"
                onClick={async () => {
                  for (const loc of otherLocales) {
                    await handleTranslate(loc.code);
                  }
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-medium text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-slate-700"
              >
                <Languages size={12} />
                Перевести на все языки
              </button>
            </div>
          )}
        </div>

        {/* Analyze */}
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={analyzing || !hasContent}
          className="flex items-center gap-1.5 rounded-lg border border-purple-200 bg-white px-3 py-1.5 text-xs font-medium text-purple-700 transition-colors hover:bg-purple-50 disabled:opacity-50 dark:border-purple-500/30 dark:bg-slate-800 dark:text-purple-300 dark:hover:bg-slate-700"
        >
          {analyzing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
          {analyzing ? 'Анализ...' : 'AI-анализ'}
        </button>

        {/* Telegram Publish */}
        {!isNew && telegramConfigured && (
          <button
            type="button"
            onClick={handlePublishTelegram}
            disabled={publishing}
            className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-50 disabled:opacity-50 dark:border-blue-500/30 dark:bg-slate-800 dark:text-blue-300 dark:hover:bg-slate-700"
          >
            {publishing ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
            {publishing ? 'Отправка...' : 'Telegram'}
          </button>
        )}
        {/* Instagram Publish */}
        {!isNew && instagramConfigured && (
          <button
            type="button"
            onClick={handlePublishInstagram}
            disabled={publishingIg}
            className="flex items-center gap-1.5 rounded-lg border border-pink-200 bg-white px-3 py-1.5 text-xs font-medium text-pink-700 transition-colors hover:bg-pink-50 disabled:opacity-50 dark:border-pink-500/30 dark:bg-slate-800 dark:text-pink-300 dark:hover:bg-slate-700"
          >
            {publishingIg ? <Loader2 size={12} className="animate-spin" /> : <Camera size={12} />}
            {publishingIg ? 'Отправка...' : 'Instagram'}
          </button>
        )}
        {publishResult && (
          <span
            className={`text-xs font-medium ${publishResult.startsWith('Ошибка') ? 'text-red-500' : 'text-green-500'}`}
          >
            {publishResult}
          </span>
        )}
        {/* Social published badges */}
        {!isNew && (socialPublished.telegram || socialPublished.instagram) && (
          <div className="ml-auto flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 uppercase">Опубликовано:</span>
            {socialPublished.telegram && (
              <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                <Send size={8} />
                TG
              </span>
            )}
            {socialPublished.instagram && (
              <span className="flex items-center gap-1 rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-medium text-pink-600 dark:bg-pink-500/20 dark:text-pink-400">
                <Camera size={8} />
                IG
              </span>
            )}
          </div>
        )}
      </div>

      {/* AI Analysis Panel */}
      {showAnalysis && (
        <div className="rounded-xl border border-purple-200 bg-white dark:border-purple-500/20 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-purple-100 px-4 py-3 dark:border-purple-500/10">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-purple-500" />
              <span className="text-sm font-semibold text-slate-800 dark:text-white">
                AI-редактор
              </span>
              {analysis && (
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    analysis.score >= 80
                      ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                      : analysis.score >= 50
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                  }`}
                >
                  {analysis.score}/100
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowAnalysis(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-4">
            {analyzing ? (
              <div className="flex items-center justify-center gap-2 py-8">
                <Loader2 size={20} className="animate-spin text-purple-500" />
                <span className="text-sm text-slate-500">Анализируем статью...</span>
              </div>
            ) : analysis ? (
              <div className="space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">{analysis.summary}</p>

                {/* Strengths */}
                {analysis.strengths.length > 0 && (
                  <div>
                    <h4 className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-green-600 uppercase dark:text-green-400">
                      <Check size={12} />
                      Сильные стороны
                    </h4>
                    <ul className="space-y-1">
                      {analysis.strengths.map((s, i) => (
                        <li key={i} className="text-xs text-slate-600 dark:text-slate-400">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggestions */}
                {analysis.suggestions.length > 0 && (
                  <div>
                    <h4 className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-amber-600 uppercase dark:text-amber-400">
                      <AlertTriangle size={12} />
                      Рекомендации
                    </h4>
                    <ul className="space-y-2">
                      {analysis.suggestions.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <span
                            className={`mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full ${
                              s.severity === 'high'
                                ? 'bg-red-500'
                                : s.severity === 'medium'
                                  ? 'bg-amber-500'
                                  : 'bg-blue-500'
                            }`}
                          />
                          <span className="text-slate-600 dark:text-slate-400">
                            <span className="font-medium text-slate-800 dark:text-slate-200">
                              {s.field === 'title'
                                ? 'Заголовок'
                                : s.field === 'excerpt'
                                  ? 'Описание'
                                  : 'Текст'}
                              :
                            </span>{' '}
                            {s.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Apply improved versions */}
                {(analysis.improvedTitle || analysis.improvedExcerpt) && (
                  <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
                    <h4 className="mb-2 flex items-center gap-1 text-xs font-semibold text-purple-600 uppercase dark:text-purple-400">
                      <Info size={12} />
                      Предложенные улучшения
                    </h4>
                    {analysis.improvedTitle && (
                      <div className="mb-2 flex items-center gap-2">
                        <span className="flex-1 rounded border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800">
                          {analysis.improvedTitle}
                        </span>
                        <button
                          type="button"
                          onClick={() => applySuggestion('title', analysis.improvedTitle!)}
                          className="shrink-0 rounded bg-purple-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-purple-700"
                        >
                          Заголовок
                        </button>
                      </div>
                    )}
                    {analysis.improvedExcerpt && (
                      <div className="flex items-center gap-2">
                        <span className="flex-1 rounded border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800">
                          {analysis.improvedExcerpt}
                        </span>
                        <button
                          type="button"
                          onClick={() => applySuggestion('excerpt', analysis.improvedExcerpt!)}
                          className="shrink-0 rounded bg-purple-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-purple-700"
                        >
                          Описание
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        {/* Language Tabs */}
        <div className="flex items-center gap-4 border-b border-slate-200 pb-4 dark:border-slate-700">
          <span className="text-xs font-medium text-slate-400 uppercase">Язык контента:</span>
          <div className="flex gap-1">
            {LOCALES.map((loc) => (
              <button
                key={loc.code}
                type="button"
                onClick={() => setActiveLang(loc.code)}
                className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
                  activeLang === loc.code
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800'
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Заголовок ({activeLang.toUpperCase()})
          </label>
          <input
            type="text"
            value={article.title[activeLang]}
            onChange={(e) => setLocField('title', e.target.value)}
            placeholder="Введите заголовок..."
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Slug & Meta */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>Slug (URL)</span>
              {slugTouched && (
                <button
                  type="button"
                  onClick={() => {
                    setSlugTouched(false);
                    setArticle((prev) => ({
                      ...prev,
                      slug: slugify(prev.title[activeLang]),
                    }));
                  }}
                  className="text-xs font-normal text-blue-500 hover:text-blue-700"
                >
                  Сгенерировать из заголовка
                </button>
              )}
            </label>
            <div className="relative">
              <input
                type="text"
                value={article.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setArticle((prev) => ({ ...prev, slug: e.target.value }));
                }}
                placeholder="auto-generated-slug"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Категория
            </label>
            <select
              value={article.category}
              onChange={(e) =>
                setArticle((prev) => ({
                  ...prev,
                  category: e.target.value as NewsArticle['category'],
                }))
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Краткое описание ({activeLang.toUpperCase()})
          </label>
          <textarea
            value={article.excerpt[activeLang]}
            onChange={(e) => setLocField('excerpt', e.target.value)}
            rows={2}
            placeholder="Краткое описание для карточки и превью..."
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Body */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Текст публикации ({activeLang.toUpperCase()})
          </label>
          <Suspense
            fallback={
              <div className="flex h-[300px] items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700">
                <Loader2 size={20} className="animate-spin text-slate-400" />
              </div>
            }
          >
            <RichTextEditor
              value={article.body[activeLang]}
              onChange={(html) => setLocField('body', html)}
              placeholder="Начните писать текст публикации..."
            />
          </Suspense>
        </div>

        {/* Author & Image */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Автор
            </label>
            <input
              type="text"
              value={article.author}
              onChange={(e) => setArticle((prev) => ({ ...prev, author: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Изображение (URL)
            </label>
            <input
              type="text"
              value={article.image}
              onChange={(e) => setArticle((prev) => ({ ...prev, image: e.target.value }))}
              placeholder="https://..."
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Flags */}
        <div className="flex items-center gap-6 border-t border-slate-200 pt-4 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setArticle((prev) => ({ ...prev, published: !prev.published }))}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              article.published
                ? 'border-green-200 bg-green-50 text-green-600 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400'
                : 'border-slate-200 text-slate-500 hover:border-green-300 dark:border-slate-700'
            }`}
          >
            {article.published ? <Eye size={14} /> : <EyeOff size={14} />}
            {article.published ? 'Опубликовано' : 'Черновик'}
          </button>
          <button
            type="button"
            onClick={() => setArticle((prev) => ({ ...prev, pinned: !prev.pinned }))}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              article.pinned
                ? 'border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400'
                : 'border-slate-200 text-slate-500 hover:border-amber-300 dark:border-slate-700'
            }`}
          >
            <Pin size={14} />
            {article.pinned ? 'Закреплено' : 'Закрепить'}
          </button>
        </div>
      </div>
    </div>
  );
}
