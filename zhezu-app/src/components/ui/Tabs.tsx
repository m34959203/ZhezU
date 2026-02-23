'use client';

import {
  useState,
  useRef,
  useCallback,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(
    () => defaultTab || tabs[0]?.id || ''
  );
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const setTabRef = useCallback(
    (id: string) => (el: HTMLButtonElement | null) => {
      if (el) {
        tabRefs.current.set(id, el);
      } else {
        tabRefs.current.delete(id);
      }
    },
    []
  );

  const focusTab = useCallback(
    (index: number) => {
      const tab = tabs[index];
      if (tab) {
        const el = tabRefs.current.get(tab.id);
        el?.focus();
        setActiveTab(tab.id);
      }
    },
    [tabs]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      const currentIndex = tabs.findIndex((t) => t.id === activeTab);

      switch (e.key) {
        case 'ArrowRight': {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % tabs.length;
          focusTab(nextIndex);
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          const prevIndex =
            (currentIndex - 1 + tabs.length) % tabs.length;
          focusTab(prevIndex);
          break;
        }
        case 'Home': {
          e.preventDefault();
          focusTab(0);
          break;
        }
        case 'End': {
          e.preventDefault();
          focusTab(tabs.length - 1);
          break;
        }
      }
    },
    [tabs, activeTab, focusTab]
  );

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={cn('w-full', className)}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn(
          'flex border-b border-border-light dark:border-border-dark',
          'overflow-x-auto scrollbar-none'
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              ref={setTabRef(tab.id)}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={handleKeyDown}
              className={cn(
                'relative shrink-0 px-4 py-2.5 text-sm font-medium whitespace-nowrap',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset rounded-t-md',
                'cursor-pointer',
                isActive
                  ? 'text-primary dark:text-primary-light'
                  : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'
              )}
            >
              {tab.label}
              {isActive && (
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-primary dark:bg-primary-light"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`tabpanel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          tabIndex={0}
          hidden={tab.id !== activeTab}
          className="pt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md"
        >
          {tab.id === activeTab && activeContent}
        </div>
      ))}
    </div>
  );
}
