'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Save,
  Loader2,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Home,
  BarChart3,
  Image as ImageIcon,
  Tag,
  Upload,
  Layout,
  Type,
  ImagePlus,
  Flag,
  Code,
  Minus,
  Megaphone,
  BookOpen,
  Newspaper,
  Building2,
  Sparkles,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import type {
  HomepageData,
  UniversityData,
  PageBlock,
  BlockType,
  BlockSize,
  BlockConfig,
  TextBlockConfig,
  ImageBlockConfig,
  BannerBlockConfig,
  HtmlBlockConfig,
  DividerBlockConfig,
  CtaBlockConfig,
  ProgramsBlockConfig,
  NewsBlockConfig,
  DepartmentsBlockConfig,
  LocalizedString,
} from '@/lib/admin/types';

/* ─── Constants ─── */

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

const BLOCK_TYPE_INFO: Record<
  BlockType,
  { label: string; icon: typeof Home; description: string }
> = {
  hero: { label: 'Hero-секция', icon: Home, description: 'Баннер с заголовком и статистикой' },
  programs: { label: 'Программы', icon: BookOpen, description: 'Карусель популярных программ' },
  news: { label: 'Новости', icon: Newspaper, description: 'Блок новостей и событий' },
  departments: { label: 'Кафедры', icon: Building2, description: 'Сетка кафедр' },
  cta: { label: 'CTA', icon: Megaphone, description: 'Призыв к действию' },
  text: { label: 'Текст', icon: Type, description: 'Текстовый блок (HTML)' },
  image: { label: 'Изображение', icon: ImagePlus, description: 'Изображение с подписью' },
  banner: { label: 'Баннер', icon: Flag, description: 'Баннер с фоном и кнопкой' },
  html: { label: 'HTML', icon: Code, description: 'Произвольный HTML код' },
  divider: { label: 'Разделитель', icon: Minus, description: 'Линия или отступ между блоками' },
};

const SIZE_OPTIONS: { value: BlockSize; label: string }[] = [
  { value: 'full', label: 'Полная ширина' },
  { value: 'wide', label: 'Широкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'narrow', label: 'Узкий' },
];

const EMPTY_LS: LocalizedString = { kk: '', ru: '', en: '' };

function makeId() {
  return 'b_' + Math.random().toString(36).slice(2, 10);
}

function createDefaultConfig(type: BlockType): BlockConfig {
  switch (type) {
    case 'hero':
      return { _type: 'hero' };
    case 'programs':
      return { _type: 'programs', maxItems: 4 };
    case 'news':
      return { _type: 'news', maxItems: 4 };
    case 'departments':
      return { _type: 'departments', columns: 5 };
    case 'cta':
      return { _type: 'cta' };
    case 'text':
      return { _type: 'text', content: { ...EMPTY_LS }, align: 'left' };
    case 'image':
      return { _type: 'image', src: '', alt: '', rounded: true };
    case 'banner':
      return { _type: 'banner', title: { ...EMPTY_LS }, overlay: true };
    case 'html':
      return { _type: 'html', code: '' };
    case 'divider':
      return { _type: 'divider', style: 'line', spacing: 'md' };
  }
}

/* ─── Upload helper ─── */

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

/* ─── Block Item ─── */

function BlockItem({
  block,
  index,
  total,
  expanded,
  onToggleExpand,
  onToggleVisibility,
  onRemove,
  onMoveUp,
  onMoveDown,
  onUpdateConfig,
  onUpdateSize,
}: {
  block: PageBlock;
  index: number;
  total: number;
  expanded: boolean;
  onToggleExpand: () => void;
  onToggleVisibility: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onUpdateConfig: (config: BlockConfig) => void;
  onUpdateSize: (size: BlockSize) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  const info = BLOCK_TYPE_INFO[block.type];
  const Icon = info.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-xl border bg-white transition-shadow dark:bg-slate-900 ${
        isDragging
          ? 'border-blue-400 shadow-xl shadow-blue-500/20'
          : block.visible
            ? 'border-slate-200 dark:border-slate-800'
            : 'border-dashed border-slate-300 opacity-60 dark:border-slate-700'
      }`}
    >
      {/* Block Header */}
      <div className="flex items-center gap-1.5 px-3 py-2.5 sm:gap-2 sm:px-4 sm:py-3">
        {/* Drag handle + Move up/down */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="cursor-grab touch-none text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            {...attributes}
            {...listeners}
          >
            <GripVertical size={18} />
          </button>
          <div className="flex flex-col gap-0.5">
            <button
              type="button"
              disabled={index === 0}
              onClick={onMoveUp}
              className="rounded p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30 dark:hover:bg-slate-800"
              title="Вверх"
            >
              <ArrowUp size={12} />
            </button>
            <button
              type="button"
              disabled={index === total - 1}
              onClick={onMoveDown}
              className="rounded p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30 dark:hover:bg-slate-800"
              title="Вниз"
            >
              <ArrowDown size={12} />
            </button>
          </div>
        </div>

        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
            block.visible
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
              : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
          }`}
        >
          <Icon size={16} />
        </div>

        <div className="min-w-0 flex-1">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {info.label}
          </span>
          <span className="ml-2 hidden text-xs text-slate-400 sm:inline">
            {info.description}
          </span>
        </div>

        <select
          value={block.size}
          onChange={(e) => onUpdateSize(e.target.value as BlockSize)}
          className="hidden rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 sm:block dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          {SIZE_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onToggleVisibility}
          className={`rounded-md p-1.5 transition-colors ${
            block.visible
              ? 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
              : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title={block.visible ? 'Скрыть блок' : 'Показать блок'}
        >
          {block.visible ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>

        <button
          type="button"
          onClick={onToggleExpand}
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
        >
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        <button
          type="button"
          onClick={onRemove}
          className="rounded-md p-1.5 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
          title="Удалить блок"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Block Settings (expanded) */}
      {expanded && (
        <div className="border-t border-slate-100 px-4 py-4 dark:border-slate-800">
          {/* Size selector for mobile */}
          <div className="mb-3 sm:hidden">
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
              Размер
            </label>
            <select
              value={block.size}
              onChange={(e) => onUpdateSize(e.target.value as BlockSize)}
              className="w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {SIZE_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <BlockConfigEditor block={block} onUpdateConfig={onUpdateConfig} />
        </div>
      )}
    </div>
  );
}

/* ─── Block Config Editor ─── */

function BlockConfigEditor({
  block,
  onUpdateConfig,
}: {
  block: PageBlock;
  onUpdateConfig: (config: BlockConfig) => void;
}) {
  const config = block.config;
  const inputCls =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white';

  switch (block.type) {
    case 'hero':
      return (
        <p className="text-xs text-slate-400">
          Hero-секция использует настройки заголовка и статистики из вкладки «Данные».
        </p>
      );

    case 'programs': {
      const c = config as ProgramsBlockConfig;
      return (
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
            Макс. кол-во программ
          </label>
          <input
            type="number"
            min={1}
            max={12}
            value={c.maxItems || 4}
            onChange={(e) => onUpdateConfig({ ...c, maxItems: parseInt(e.target.value) || 4 })}
            className={inputCls + ' max-w-[120px]'}
          />
        </div>
      );
    }

    case 'news': {
      const c = config as NewsBlockConfig;
      return (
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
            Макс. кол-во новостей
          </label>
          <input
            type="number"
            min={1}
            max={12}
            value={c.maxItems || 4}
            onChange={(e) => onUpdateConfig({ ...c, maxItems: parseInt(e.target.value) || 4 })}
            className={inputCls + ' max-w-[120px]'}
          />
        </div>
      );
    }

    case 'departments': {
      const c = config as DepartmentsBlockConfig;
      return (
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
            Кол-во колонок
          </label>
          <select
            value={c.columns || 5}
            onChange={(e) => onUpdateConfig({ ...c, columns: parseInt(e.target.value) || 5 })}
            className={inputCls + ' max-w-[160px]'}
          >
            <option value={3}>3 колонки</option>
            <option value={4}>4 колонки</option>
            <option value={5}>5 колонок</option>
          </select>
        </div>
      );
    }

    case 'cta': {
      const c = config as CtaBlockConfig;
      return (
        <div className="space-y-3">
          <p className="text-xs text-slate-400">
            Оставьте пустым, чтобы использовать текст из переводов.
          </p>
          <LocalizedInput
            label="Заголовок"
            value={c.title || EMPTY_LS}
            onChange={(v) => onUpdateConfig({ ...c, title: v })}
          />
          <LocalizedInput
            label="Описание"
            value={c.description || EMPTY_LS}
            onChange={(v) => onUpdateConfig({ ...c, description: v })}
          />
          <LocalizedInput
            label="Текст кнопки"
            value={c.buttonText || EMPTY_LS}
            onChange={(v) => onUpdateConfig({ ...c, buttonText: v })}
          />
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
              Ссылка кнопки
            </label>
            <input
              type="text"
              value={c.buttonLink || ''}
              onChange={(e) => onUpdateConfig({ ...c, buttonLink: e.target.value })}
              placeholder="/admission"
              className={inputCls}
            />
          </div>
        </div>
      );
    }

    case 'text': {
      const c = config as TextBlockConfig;
      return (
        <div className="space-y-3">
          <LocalizedTextarea
            label="Содержимое (HTML)"
            value={c.content}
            onChange={(v) => onUpdateConfig({ ...c, content: v })}
          />
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
              Выравнивание
            </label>
            <select
              value={c.align || 'left'}
              onChange={(e) =>
                onUpdateConfig({ ...c, align: e.target.value as 'left' | 'center' | 'right' })
              }
              className={inputCls + ' max-w-[160px]'}
            >
              <option value="left">По левому краю</option>
              <option value="center">По центру</option>
              <option value="right">По правому краю</option>
            </select>
          </div>
        </div>
      );
    }

    case 'image': {
      const c = config as ImageBlockConfig;
      return (
        <div className="space-y-3">
          <ImageUploadField
            label="URL изображения"
            value={c.src}
            onChange={(v) => onUpdateConfig({ ...c, src: v })}
          />
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
              Alt-текст
            </label>
            <input
              type="text"
              value={c.alt || ''}
              onChange={(e) => onUpdateConfig({ ...c, alt: e.target.value })}
              className={inputCls}
            />
          </div>
          <LocalizedInput
            label="Подпись"
            value={c.caption || EMPTY_LS}
            onChange={(v) => onUpdateConfig({ ...c, caption: v })}
          />
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              checked={c.rounded ?? true}
              onChange={(e) => onUpdateConfig({ ...c, rounded: e.target.checked })}
              className="rounded border-slate-300"
            />
            Скруглённые углы
          </label>
        </div>
      );
    }

    case 'banner': {
      const c = config as BannerBlockConfig;
      return (
        <div className="space-y-3">
          <LocalizedInput
            label="Заголовок"
            value={c.title}
            onChange={(v) => onUpdateConfig({ ...c, title: v })}
          />
          <LocalizedInput
            label="Описание"
            value={c.description || EMPTY_LS}
            onChange={(v) => onUpdateConfig({ ...c, description: v })}
          />
          <ImageUploadField
            label="Фоновое изображение"
            value={c.backgroundImage || ''}
            onChange={(v) => onUpdateConfig({ ...c, backgroundImage: v })}
          />
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
              Цвет фона
            </label>
            <input
              type="color"
              value={c.backgroundColor || '#1d56c9'}
              onChange={(e) => onUpdateConfig({ ...c, backgroundColor: e.target.value })}
              className="h-10 w-20 cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              checked={c.overlay ?? true}
              onChange={(e) => onUpdateConfig({ ...c, overlay: e.target.checked })}
              className="rounded border-slate-300"
            />
            Затемнение фона
          </label>
          <LocalizedInput
            label="Текст кнопки"
            value={c.buttonText || EMPTY_LS}
            onChange={(v) => onUpdateConfig({ ...c, buttonText: v })}
          />
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
              Ссылка кнопки
            </label>
            <input
              type="text"
              value={c.buttonLink || ''}
              onChange={(e) => onUpdateConfig({ ...c, buttonLink: e.target.value })}
              placeholder="/admission"
              className={inputCls}
            />
          </div>
        </div>
      );
    }

    case 'html': {
      const c = config as HtmlBlockConfig;
      return (
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
            HTML код
          </label>
          <textarea
            value={c.code}
            onChange={(e) => onUpdateConfig({ ...c, code: e.target.value })}
            rows={6}
            className={inputCls + ' font-mono text-xs'}
            placeholder="<div>...</div>"
          />
        </div>
      );
    }

    case 'divider': {
      const c = config as DividerBlockConfig;
      return (
        <div className="flex gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
              Стиль
            </label>
            <select
              value={c.style || 'line'}
              onChange={(e) =>
                onUpdateConfig({ ...c, style: e.target.value as 'line' | 'space' | 'dots' })
              }
              className={inputCls + ' max-w-[140px]'}
            >
              <option value="line">Линия</option>
              <option value="dots">Точки</option>
              <option value="space">Пустое место</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
              Отступы
            </label>
            <select
              value={c.spacing || 'md'}
              onChange={(e) =>
                onUpdateConfig({ ...c, spacing: e.target.value as 'sm' | 'md' | 'lg' })
              }
              className={inputCls + ' max-w-[140px]'}
            >
              <option value="sm">Маленький</option>
              <option value="md">Средний</option>
              <option value="lg">Большой</option>
            </select>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}

/* ─── Reusable Input Components ─── */

function LocalizedInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: LocalizedString;
  onChange: (v: LocalizedString) => void;
}) {
  const [tab, setTab] = useState<'ru' | 'kk' | 'en'>('ru');
  const inputCls =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white';

  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</span>
        <div className="flex gap-0.5">
          {(['ru', 'kk', 'en'] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setTab(l)}
              className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                tab === l
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <input
        type="text"
        value={value[tab] || ''}
        onChange={(e) => onChange({ ...value, [tab]: e.target.value })}
        className={inputCls}
      />
    </div>
  );
}

function LocalizedTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: LocalizedString;
  onChange: (v: LocalizedString) => void;
}) {
  const [tab, setTab] = useState<'ru' | 'kk' | 'en'>('ru');
  const inputCls =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white';

  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</span>
        <div className="flex gap-0.5">
          {(['ru', 'kk', 'en'] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setTab(l)}
              className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                tab === l
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <textarea
        value={value[tab] || ''}
        onChange={(e) => onChange({ ...value, [tab]: e.target.value })}
        rows={4}
        className={inputCls}
      />
    </div>
  );
}

function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputCls =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white';

  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
        {label}
      </label>
      <div className="flex items-center gap-2">
        {value && (
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="h-full w-full object-cover" />
          </div>
        )}
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className={inputCls}
        />
        <label className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          {uploading ? '...' : 'Загрузить'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setUploading(true);
              const url = await uploadFile(file);
              if (url) onChange(url);
              setUploading(false);
              e.target.value = '';
            }}
          />
        </label>
      </div>
    </div>
  );
}

/* ─── "Add Block" Panel ─── */

function AddBlockPanel({ onAdd }: { onAdd: (type: BlockType) => void }) {
  const [open, setOpen] = useState(false);

  const builtIn: BlockType[] = ['hero', 'programs', 'news', 'departments', 'cta'];
  const custom: BlockType[] = ['text', 'image', 'banner', 'html', 'divider'];

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-4 text-sm font-semibold text-slate-500 transition-colors hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
      >
        <Plus size={18} />
        Добавить блок
      </button>

      {open && (
        <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Встроенные секции
          </p>
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {builtIn.map((type) => {
              const info = BLOCK_TYPE_INFO[type];
              const Icon = info.icon;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    onAdd(type);
                    setOpen(false);
                  }}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 p-3 text-center transition-colors hover:border-blue-300 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-blue-600 dark:hover:bg-blue-900/20"
                >
                  <Icon size={20} className="text-blue-500" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {info.label}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Пользовательские блоки
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {custom.map((type) => {
              const info = BLOCK_TYPE_INFO[type];
              const Icon = info.icon;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    onAdd(type);
                    setOpen(false);
                  }}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 p-3 text-center transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-emerald-600 dark:hover:bg-emerald-900/20"
                >
                  <Icon size={20} className="text-emerald-500" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {info.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */

export default function HomepageBuilderPage() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [programs, setPrograms] = useState<UniversityData['programs']>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set());
  const [uploading, setUploading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'builder' | 'data'>('builder');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

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

  const blocks = data?.blocks || [];

  const setBlocks = useCallback(
    (newBlocks: PageBlock[]) => {
      if (!data) return;
      setData({ ...data, blocks: newBlocks });
    },
    [data],
  );

  function moveBlock(index: number, direction: -1 | 1) {
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= blocks.length) return;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;
    setBlocks(updated.map((b, i) => ({ ...b, order: i })));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = blocks.findIndex((b) => b.id === active.id);
    const newIdx = blocks.findIndex((b) => b.id === over.id);
    const reordered = arrayMove(blocks, oldIdx, newIdx).map((b, i) => ({ ...b, order: i }));
    setBlocks(reordered);
  }

  function addBlock(type: BlockType) {
    const newBlock: PageBlock = {
      id: makeId(),
      type,
      order: blocks.length,
      visible: true,
      size: 'full',
      config: createDefaultConfig(type),
    };
    setBlocks([...blocks, newBlock]);
    setExpandedBlocks((prev) => new Set(prev).add(newBlock.id));
  }

  function removeBlock(id: string) {
    setBlocks(
      blocks
        .filter((b) => b.id !== id)
        .map((b, i) => ({ ...b, order: i })),
    );
    setExpandedBlocks((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function toggleVisibility(id: string) {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, visible: !b.visible } : b)));
  }

  function updateBlockConfig(id: string, config: BlockConfig) {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, config } : b)));
  }

  function updateBlockSize(id: string, size: BlockSize) {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, size } : b)));
  }

  function toggleExpand(id: string) {
    setExpandedBlocks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function initDefaultBlocks() {
    const defaults: PageBlock[] = [
      { id: makeId(), type: 'hero', order: 0, visible: true, size: 'full', config: { _type: 'hero' } },
      { id: makeId(), type: 'programs', order: 1, visible: true, size: 'full', config: { _type: 'programs', maxItems: 4 } },
      { id: makeId(), type: 'news', order: 2, visible: true, size: 'full', config: { _type: 'news', maxItems: 4 } },
      { id: makeId(), type: 'departments', order: 3, visible: true, size: 'full', config: { _type: 'departments', columns: 5 } },
      { id: makeId(), type: 'cta', order: 4, visible: true, size: 'full', config: { _type: 'cta' } },
    ];
    setBlocks(defaults);
  }

  async function handleSave() {
    if (!data) return;
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
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
            <Layout size={22} className="text-blue-500" />
            Конструктор страниц
          </h2>
          <p className="text-sm text-slate-500">
            Управляйте блоками, порядком и содержимым главной страницы
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saved ? 'Сохранено!' : 'Сохранить'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('builder')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'builder'
              ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-400'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
          }`}
        >
          <Sparkles size={14} className="mr-1.5 inline" />
          Конструктор
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('data')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'data'
              ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-400'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
          }`}
        >
          <BarChart3 size={14} className="mr-1.5 inline" />
          Данные
        </button>
      </div>

      {/* ═══════════ BUILDER TAB ═══════════ */}
      {activeTab === 'builder' && (
        <div className="space-y-4">
          {blocks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
              <Layout size={40} className="mx-auto mb-4 text-slate-300 dark:text-slate-600" />
              <h3 className="mb-2 text-lg font-bold text-slate-700 dark:text-slate-300">
                Конструктор пуст
              </h3>
              <p className="mb-6 text-sm text-slate-500">
                Добавьте блоки или загрузите стандартную структуру
              </p>
              <button
                type="button"
                onClick={initDefaultBlocks}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <Sparkles size={16} />
                Загрузить стандартные блоки
              </button>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={blocks.map((b) => b.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {blocks
                    .sort((a, b) => a.order - b.order)
                    .map((block, index) => (
                      <BlockItem
                        key={block.id}
                        block={block}
                        index={index}
                        total={blocks.length}
                        expanded={expandedBlocks.has(block.id)}
                        onToggleExpand={() => toggleExpand(block.id)}
                        onToggleVisibility={() => toggleVisibility(block.id)}
                        onRemove={() => removeBlock(block.id)}
                        onMoveUp={() => moveBlock(index, -1)}
                        onMoveDown={() => moveBlock(index, 1)}
                        onUpdateConfig={(config) => updateBlockConfig(block.id, config)}
                        onUpdateSize={(size) => updateBlockSize(block.id, size)}
                      />
                    ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          <AddBlockPanel onAdd={addBlock} />
        </div>
      )}

      {/* ═══════════ DATA TAB ═══════════ */}
      {activeTab === 'data' && (
        <div className="space-y-6">
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
      )}
    </div>
  );
}
