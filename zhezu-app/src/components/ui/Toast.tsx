'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─────────────────────────── Types ─────────────────────────── */

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

interface ToastContextValue {
  toast: (message: string, options?: { variant?: ToastVariant; duration?: number }) => void;
}

/* ─────────────────────────── Variant config ─────────────────── */

const variantConfig: Record<
  ToastVariant,
  { icon: typeof CheckCircle; containerClass: string; iconClass: string }
> = {
  success: {
    icon: CheckCircle,
    containerClass: 'border-success/30 bg-success/5',
    iconClass: 'text-success',
  },
  error: {
    icon: XCircle,
    containerClass: 'border-error/30 bg-error/5',
    iconClass: 'text-error',
  },
  warning: {
    icon: AlertTriangle,
    containerClass: 'border-warning/30 bg-warning/5',
    iconClass: 'text-warning',
  },
  info: {
    icon: Info,
    containerClass: 'border-primary-light/30 bg-primary-light/5',
    iconClass: 'text-primary-light',
  },
};

/* ─────────────────────────── Context ─────────────────────────── */

const ToastContext = createContext<ToastContextValue | null>(null);

/* ─────────────────────────── Single Toast ─────────────────────── */

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => onDismiss(toast.id), 300);
  }, [onDismiss, toast.id]);

  useEffect(() => {
    // Trigger entrance animation
    const enterTimer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(enterTimer);
  }, []);

  useEffect(() => {
    if (toast.duration > 0) {
      timerRef.current = setTimeout(dismiss, toast.duration);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [toast.duration, dismiss]);

  const config = variantConfig[toast.variant];
  const Icon = config.icon;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'pointer-events-auto flex w-80 items-start gap-3 rounded-lg border p-4',
        'bg-surface-light dark:bg-surface-dark',
        'shadow-lg dark:shadow-2xl',
        config.containerClass,
        'transition-all duration-300 ease-in-out',
        isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
      )}
    >
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', config.iconClass)} />
      <p className="text-text-primary-light dark:text-text-primary-dark flex-1 text-sm">
        {toast.message}
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss notification"
        className={cn(
          'shrink-0 rounded-md p-0.5',
          'text-text-secondary-light dark:text-text-secondary-dark',
          'hover:text-text-primary-light dark:hover:text-text-primary-dark',
          'hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark',
          'transition-colors duration-200',
          'focus-visible:ring-primary/50 focus-visible:ring-2 focus-visible:outline-none',
          'cursor-pointer',
        )}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ─────────────────────────── Provider ─────────────────────────── */

let toastCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, options?: { variant?: ToastVariant; duration?: number }) => {
      const id = `toast-${++toastCounter}`;
      const newToast: Toast = {
        id,
        message,
        variant: options?.variant || 'info',
        duration: options?.duration ?? 5000,
      };
      setToasts((prev) => [...prev, newToast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {/* Toast container */}
      <div
        aria-label="Notifications"
        className={cn(
          'fixed right-4 bottom-4 z-[9999]',
          'flex flex-col-reverse gap-2',
          'pointer-events-none',
        )}
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* ─────────────────────────── Hook ─────────────────────────── */

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return ctx;
}
