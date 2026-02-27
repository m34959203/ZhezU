'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Save,
  Loader2,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Eye,
  EyeOff,
  Link2,
  FolderOpen,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

/* ─── Types ─── */
interface MenuLink {
  labelKey: string;
  href: string;
}

interface MenuColumn {
  titleKey: string;
  links: MenuLink[];
}

interface MenuItem {
  id: string;
  labelKey: string;
  href: string;
  visible: boolean;
  order: number;
  columns: MenuColumn[];
}

interface FooterLink {
  label: string;
  href: string;
}

interface MenuData {
  navigation: MenuItem[];
  footerNav: FooterLink[];
  footerStudents: FooterLink[];
}

const EMPTY_MENU: MenuData = { navigation: [], footerNav: [], footerStudents: [] };

export default function MenuManagerPage() {
  const [menu, setMenu] = useState<MenuData>(EMPTY_MENU);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [expandedColumn, setExpandedColumn] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'main' | 'footerNav' | 'footerStudents'>('main');

  useEffect(() => {
    fetch('/api/admin/menu')
      .then((r) => (r.ok ? r.json() : EMPTY_MENU))
      .then((data) => setMenu(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaved(false);
    try {
      const sorted = {
        ...menu,
        navigation: [...menu.navigation].sort((a, b) => a.order - b.order),
      };
      const res = await fetch('/api/admin/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sorted),
      });
      if (res.ok) {
        setMenu(sorted);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }, [menu]);

  /* ─── Navigation item helpers ─── */
  function addNavItem() {
    const id = `nav-${Date.now()}`;
    setMenu((prev) => ({
      ...prev,
      navigation: [
        ...prev.navigation,
        {
          id,
          labelKey: 'newSection',
          href: '/new-section',
          visible: true,
          order: prev.navigation.length,
          columns: [],
        },
      ],
    }));
    setExpandedItem(id);
  }

  function removeNavItem(id: string) {
    if (!confirm('Удалить раздел меню и все его подменю?')) return;
    setMenu((prev) => ({
      ...prev,
      navigation: prev.navigation
        .filter((n) => n.id !== id)
        .map((n, i) => ({ ...n, order: i })),
    }));
    if (expandedItem === id) setExpandedItem(null);
  }

  function updateNavItem(id: string, patch: Partial<MenuItem>) {
    setMenu((prev) => ({
      ...prev,
      navigation: prev.navigation.map((n) => (n.id === id ? { ...n, ...patch } : n)),
    }));
  }

  function moveNavItem(id: string, dir: -1 | 1) {
    setMenu((prev) => {
      const items = [...prev.navigation].sort((a, b) => a.order - b.order);
      const idx = items.findIndex((n) => n.id === id);
      const targetIdx = idx + dir;
      if (targetIdx < 0 || targetIdx >= items.length) return prev;
      [items[idx], items[targetIdx]] = [items[targetIdx], items[idx]];
      return {
        ...prev,
        navigation: items.map((n, i) => ({ ...n, order: i })),
      };
    });
  }

  /* ─── Column helpers ─── */
  function addColumn(navId: string) {
    updateNavItem(navId, {
      columns: [
        ...(menu.navigation.find((n) => n.id === navId)?.columns || []),
        { titleKey: 'newColumn', links: [] },
      ],
    });
  }

  function removeColumn(navId: string, colIdx: number) {
    const item = menu.navigation.find((n) => n.id === navId);
    if (!item) return;
    updateNavItem(navId, {
      columns: item.columns.filter((_, i) => i !== colIdx),
    });
  }

  function updateColumn(navId: string, colIdx: number, patch: Partial<MenuColumn>) {
    const item = menu.navigation.find((n) => n.id === navId);
    if (!item) return;
    updateNavItem(navId, {
      columns: item.columns.map((c, i) => (i === colIdx ? { ...c, ...patch } : c)),
    });
  }

  /* ─── Link helpers ─── */
  function addLink(navId: string, colIdx: number) {
    const item = menu.navigation.find((n) => n.id === navId);
    if (!item) return;
    const cols = [...item.columns];
    cols[colIdx] = {
      ...cols[colIdx],
      links: [...cols[colIdx].links, { labelKey: 'newLink', href: '/' }],
    };
    updateNavItem(navId, { columns: cols });
  }

  function removeLink(navId: string, colIdx: number, linkIdx: number) {
    const item = menu.navigation.find((n) => n.id === navId);
    if (!item) return;
    const cols = [...item.columns];
    cols[colIdx] = {
      ...cols[colIdx],
      links: cols[colIdx].links.filter((_, i) => i !== linkIdx),
    };
    updateNavItem(navId, { columns: cols });
  }

  function updateLink(navId: string, colIdx: number, linkIdx: number, patch: Partial<MenuLink>) {
    const item = menu.navigation.find((n) => n.id === navId);
    if (!item) return;
    const cols = [...item.columns];
    cols[colIdx] = {
      ...cols[colIdx],
      links: cols[colIdx].links.map((l, i) => (i === linkIdx ? { ...l, ...patch } : l)),
    };
    updateNavItem(navId, { columns: cols });
  }

  /* ─── Footer link helpers ─── */
  function addFooterLink(section: 'footerNav' | 'footerStudents') {
    setMenu((prev) => ({
      ...prev,
      [section]: [...prev[section], { label: 'Новая ссылка', href: '/' }],
    }));
  }

  function removeFooterLink(section: 'footerNav' | 'footerStudents', idx: number) {
    setMenu((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== idx),
    }));
  }

  function updateFooterLink(
    section: 'footerNav' | 'footerStudents',
    idx: number,
    patch: Partial<FooterLink>,
  ) {
    setMenu((prev) => ({
      ...prev,
      [section]: prev[section].map((l, i) => (i === idx ? { ...l, ...patch } : l)),
    }));
  }

  function moveFooterLink(section: 'footerNav' | 'footerStudents', idx: number, dir: -1 | 1) {
    setMenu((prev) => {
      const items = [...prev[section]];
      const targetIdx = idx + dir;
      if (targetIdx < 0 || targetIdx >= items.length) return prev;
      [items[idx], items[targetIdx]] = [items[targetIdx], items[idx]];
      return { ...prev, [section]: items };
    });
  }

  const inputCls =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={24} className="animate-spin text-blue-500" />
      </div>
    );
  }

  const sortedNav = [...menu.navigation].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">
            Управляйте разделами главного меню, подменю и ссылками в футере
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

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800/50">
        {[
          { key: 'main' as const, label: 'Главное меню' },
          { key: 'footerNav' as const, label: 'Футер: Навигация' },
          { key: 'footerStudents' as const, label: 'Футер: Студентам' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══ TAB: Main Navigation ═══ */}
      {activeTab === 'main' && (
        <div className="space-y-3">
          {sortedNav.map((item, itemIndex) => (
            <div
              key={item.id}
              className={`rounded-xl border bg-white dark:bg-slate-900 ${
                item.visible
                  ? 'border-slate-200 dark:border-slate-800'
                  : 'border-slate-200/50 opacity-60 dark:border-slate-800/50'
              }`}
            >
              {/* Nav item header */}
              <div className="flex items-center gap-2 p-4">
                <GripVertical size={16} className="shrink-0 text-slate-300 dark:text-slate-600" />

                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => moveNavItem(item.id, -1)}
                    disabled={itemIndex === 0}
                    className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveNavItem(item.id, 1)}
                    disabled={itemIndex === sortedNav.length - 1}
                    className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800"
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>

                <div className="grid flex-1 grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={item.labelKey}
                    onChange={(e) => updateNavItem(item.id, { labelKey: e.target.value })}
                    placeholder="labelKey (i18n ключ)"
                    className={inputCls}
                  />
                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => updateNavItem(item.id, { href: e.target.value })}
                    placeholder="/path"
                    className={inputCls + ' font-mono'}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => updateNavItem(item.id, { visible: !item.visible })}
                  className={`rounded-lg p-2 transition-colors ${
                    item.visible
                      ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10'
                      : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title={item.visible ? 'Видимый' : 'Скрытый'}
                >
                  {item.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>

                <button
                  type="button"
                  onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {expandedItem === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                <button
                  type="button"
                  onClick={() => removeNavItem(item.id)}
                  className="rounded-lg p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Expanded: columns & links */}
              {expandedItem === item.id && (
                <div className="border-t border-slate-100 p-4 dark:border-slate-800">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase">
                      Колонки подменю ({item.columns.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => addColumn(item.id)}
                      className="flex items-center gap-1 rounded-lg border border-blue-200 px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:border-blue-500/30 dark:text-blue-400 dark:hover:bg-blue-500/10"
                    >
                      <Plus size={12} />
                      Колонка
                    </button>
                  </div>

                  <div className="space-y-3">
                    {item.columns.map((col, colIdx) => {
                      const colKey = `${item.id}-${colIdx}`;
                      return (
                        <div
                          key={colKey}
                          className="rounded-lg border border-slate-100 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/50"
                        >
                          {/* Column header */}
                          <div className="flex items-center gap-2 px-3 py-2">
                            <FolderOpen size={14} className="shrink-0 text-blue-400" />
                            <input
                              type="text"
                              value={col.titleKey}
                              onChange={(e) =>
                                updateColumn(item.id, colIdx, { titleKey: e.target.value })
                              }
                              placeholder="titleKey (i18n)"
                              className={inputCls + ' flex-1 !py-1.5 text-xs'}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedColumn(expandedColumn === colKey ? null : colKey)
                              }
                              className="rounded p-1 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                            >
                              {expandedColumn === colKey ? (
                                <ChevronUp size={14} />
                              ) : (
                                <ChevronDown size={14} />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeColumn(item.id, colIdx)}
                              className="rounded p-1 text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>

                          {/* Column links */}
                          {expandedColumn === colKey && (
                            <div className="border-t border-slate-100 px-3 py-2 dark:border-slate-700">
                              <div className="space-y-2">
                                {col.links.map((link, linkIdx) => (
                                  <div key={linkIdx} className="flex items-center gap-2">
                                    <Link2 size={12} className="shrink-0 text-slate-300" />
                                    <input
                                      type="text"
                                      value={link.labelKey}
                                      onChange={(e) =>
                                        updateLink(item.id, colIdx, linkIdx, {
                                          labelKey: e.target.value,
                                        })
                                      }
                                      placeholder="labelKey"
                                      className={inputCls + ' flex-1 !py-1 text-xs'}
                                    />
                                    <input
                                      type="text"
                                      value={link.href}
                                      onChange={(e) =>
                                        updateLink(item.id, colIdx, linkIdx, {
                                          href: e.target.value,
                                        })
                                      }
                                      placeholder="/path"
                                      className={inputCls + ' w-48 !py-1 font-mono text-xs'}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeLink(item.id, colIdx, linkIdx)}
                                      className="rounded p-1 text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <button
                                type="button"
                                onClick={() => addLink(item.id, colIdx)}
                                className="mt-2 flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-700"
                              >
                                <Plus size={12} />
                                Добавить ссылку
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addNavItem}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-4 text-sm font-medium text-slate-400 transition-colors hover:border-blue-300 hover:text-blue-500 dark:border-slate-700 dark:hover:border-blue-500/50"
          >
            <Plus size={16} />
            Добавить раздел меню
          </button>
        </div>
      )}

      {/* ═══ TAB: Footer Nav / Footer Students ═══ */}
      {(activeTab === 'footerNav' || activeTab === 'footerStudents') && (
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
              {activeTab === 'footerNav' ? 'Навигация в футере' : 'Ссылки для студентов'}
            </h3>
            <div className="space-y-2">
              {menu[activeTab].map((link, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex shrink-0 gap-0.5">
                    <button
                      type="button"
                      onClick={() => moveFooterLink(activeTab, idx, -1)}
                      disabled={idx === 0}
                      className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveFooterLink(activeTab, idx, 1)}
                      disabled={idx === menu[activeTab].length - 1}
                      className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800"
                    >
                      <ArrowDown size={12} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => updateFooterLink(activeTab, idx, { label: e.target.value })}
                    placeholder="Название"
                    className={inputCls + ' flex-1'}
                  />
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => updateFooterLink(activeTab, idx, { href: e.target.value })}
                    placeholder="/path"
                    className={inputCls + ' w-56 font-mono'}
                  />
                  <button
                    type="button"
                    onClick={() => removeFooterLink(activeTab, idx)}
                    className="rounded-lg p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addFooterLink(activeTab)}
              className="mt-3 flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-700"
            >
              <Plus size={14} />
              Добавить ссылку
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
