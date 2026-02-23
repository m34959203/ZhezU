'use client';

import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  id: string;
  trigger: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  defaultOpen?: string[];
  className?: string;
}

function AccordionPanel({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [item.content]);

  const triggerId = `accordion-trigger-${item.id}`;
  const panelId = `accordion-panel-${item.id}`;

  return (
    <div
      className={cn(
        'border-b border-border-light dark:border-border-dark',
        'last:border-b-0'
      )}
    >
      <h3>
        <button
          id={triggerId}
          type="button"
          role="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            'flex w-full items-center justify-between py-4 px-1 text-left text-sm font-medium',
            'text-text-primary-light dark:text-text-primary-dark',
            'hover:text-primary dark:hover:text-primary-light',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm',
            'cursor-pointer'
          )}
        >
          <span className="pr-4">{item.trigger}</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 text-text-secondary-light dark:text-text-secondary-dark',
              'transition-transform duration-300 ease-in-out',
              isOpen && 'rotate-180'
            )}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        style={{
          height: isOpen ? contentHeight : 0,
        }}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div ref={contentRef} className="pb-4 px-1 text-sm text-text-secondary-light dark:text-text-secondary-dark">
          {item.content}
        </div>
      </div>
    </div>
  );
}

export function Accordion({
  items,
  type = 'single',
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    () => new Set(defaultOpen)
  );

  const handleToggle = useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (type === 'single') {
            next.clear();
          }
          next.add(id);
        }
        return next;
      });
    },
    [type]
  );

  return (
    <div
      className={cn(
        'rounded-lg border border-border-light dark:border-border-dark',
        'bg-surface-light dark:bg-surface-dark',
        'divide-y divide-border-light dark:divide-border-dark',
        'px-4',
        className
      )}
    >
      {items.map((item) => (
        <AccordionPanel
          key={item.id}
          item={item}
          isOpen={openItems.has(item.id)}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}
