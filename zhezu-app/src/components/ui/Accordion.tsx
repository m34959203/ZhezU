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
    <div className={cn('border-border-light dark:border-border-dark border-b', 'last:border-b-0')}>
      <h3>
        <button
          id={triggerId}
          type="button"
          role="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            'flex w-full items-center justify-between px-1 py-4 text-left text-sm font-medium',
            'text-text-primary-light dark:text-text-primary-dark',
            'hover:text-primary dark:hover:text-primary-light',
            'transition-colors duration-200',
            'focus-visible:ring-primary/50 rounded-sm focus-visible:ring-2 focus-visible:outline-none',
            'cursor-pointer',
          )}
        >
          <span className="pr-4">{item.trigger}</span>
          <ChevronDown
            className={cn(
              'text-text-secondary-light dark:text-text-secondary-dark h-4 w-4 shrink-0',
              'transition-transform duration-300 ease-in-out',
              isOpen && 'rotate-180',
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
        <div
          ref={contentRef}
          className="text-text-secondary-light dark:text-text-secondary-dark px-1 pb-4 text-sm"
        >
          {item.content}
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items, type = 'single', defaultOpen = [], className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => new Set(defaultOpen));

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
    [type],
  );

  return (
    <div
      className={cn(
        'border-border-light dark:border-border-dark rounded-lg border',
        'bg-surface-light dark:bg-surface-dark',
        'divide-border-light dark:divide-border-dark divide-y',
        'px-4',
        className,
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
