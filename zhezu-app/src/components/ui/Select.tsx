'use client';

import { useState, useRef, useCallback, useEffect, useId, type KeyboardEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();
  const baseId = `select-${generatedId}`;
  const labelId = `${baseId}-label`;
  const listboxId = `${baseId}-listbox`;
  const triggerId = `${baseId}-trigger`;

  const selectedOption = options.find((opt) => opt.value === value);

  const close = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const selectOption = useCallback(
    (optionValue: string) => {
      onChange?.(optionValue);
      close();
    },
    [onChange, close],
  );

  const toggle = useCallback(() => {
    if (disabled) return;
    setIsOpen((prev) => {
      if (!prev) {
        // Opening: highlight the selected option or first
        const idx = options.findIndex((opt) => opt.value === value);
        setHighlightedIndex(idx >= 0 ? idx : 0);
      }
      return !prev;
    });
  }, [disabled, options, value]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, close]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listboxRef.current) {
      const option = listboxRef.current.children[highlightedIndex] as HTMLElement | undefined;
      option?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, highlightedIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      switch (e.key) {
        case 'Enter':
        case ' ': {
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0) {
            selectOption(options[highlightedIndex].value);
          } else {
            toggle();
          }
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          if (!isOpen) {
            toggle();
          } else {
            setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
          }
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (!isOpen) {
            toggle();
          } else {
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
          }
          break;
        }
        case 'Home': {
          if (isOpen) {
            e.preventDefault();
            setHighlightedIndex(0);
          }
          break;
        }
        case 'End': {
          if (isOpen) {
            e.preventDefault();
            setHighlightedIndex(options.length - 1);
          }
          break;
        }
        case 'Escape': {
          if (isOpen) {
            e.preventDefault();
            close();
          }
          break;
        }
        case 'Tab': {
          close();
          break;
        }
      }
    },
    [isOpen, highlightedIndex, options, selectOption, toggle, close],
  );

  const activeDescendant =
    isOpen && highlightedIndex >= 0
      ? `${baseId}-option-${options[highlightedIndex].value}`
      : undefined;

  return (
    <div ref={containerRef} className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          id={labelId}
          className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <button
          id={triggerId}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-labelledby={label ? `${labelId} ${triggerId}` : triggerId}
          aria-activedescendant={activeDescendant}
          disabled={disabled}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-lg border px-3 text-sm',
            'bg-surface-light dark:bg-surface-dark',
            'transition-colors duration-200',
            'focus-visible:ring-primary/50 focus-visible:border-primary dark:focus-visible:border-primary-light focus-visible:ring-2 focus-visible:outline-none',
            'disabled:pointer-events-none disabled:opacity-50',
            'cursor-pointer',
            error
              ? 'border-error focus-visible:ring-error/50'
              : 'border-border-light dark:border-border-dark',
            isOpen && !error && 'border-primary dark:border-primary-light ring-primary/50 ring-2',
          )}
        >
          <span
            className={cn(
              'truncate',
              selectedOption
                ? 'text-text-primary-light dark:text-text-primary-dark'
                : 'text-text-secondary-light/60 dark:text-text-secondary-dark/60',
            )}
          >
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown
            className={cn(
              'text-text-secondary-light dark:text-text-secondary-dark h-4 w-4 shrink-0',
              'transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          />
        </button>

        {isOpen && (
          <ul
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={label ? labelId : triggerId}
            className={cn(
              'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border',
              'border-border-light dark:border-border-dark',
              'bg-surface-light dark:bg-surface-dark',
              'shadow-lg dark:shadow-2xl',
              'py-1',
            )}
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === highlightedIndex;
              const optionId = `${baseId}-option-${option.value}`;

              return (
                <li
                  key={option.value}
                  id={optionId}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectOption(option.value);
                  }}
                  className={cn(
                    'cursor-pointer px-3 py-2 text-sm',
                    'transition-colors duration-100',
                    isHighlighted && 'bg-surface-hover-light dark:bg-surface-hover-dark',
                    isSelected
                      ? 'text-primary dark:text-primary-light font-medium'
                      : 'text-text-primary-light dark:text-text-primary-dark',
                  )}
                >
                  {option.label}
                </li>
              );
            })}
            {options.length === 0 && (
              <li className="text-text-secondary-light dark:text-text-secondary-dark px-3 py-2 text-sm">
                No options available
              </li>
            )}
          </ul>
        )}
      </div>
      {error && <p className="text-error text-xs">{error}</p>}
    </div>
  );
}
