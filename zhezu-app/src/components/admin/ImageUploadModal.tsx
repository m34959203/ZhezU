'use client';

import { useState, useRef, useCallback } from 'react';
import { X, Upload, ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadModalProps {
  open: boolean;
  onClose: () => void;
  onInsert: (url: string) => void;
}

export default function ImageUploadModal({ open, onClose, onInsert }: ImageUploadModalProps) {
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setUrl('');
    setPreview(null);
    setUploading(false);
    setError('');
    setDragOver(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const uploadFile = useCallback(async (file: File) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Допустимые форматы: JPEG, PNG, WebP');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Максимальный размер — 5 МБ');
      return;
    }

    setError('');
    setUploading(true);

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Ошибка загрузки');
      }
      const { url: uploadedUrl } = await res.json();
      setUrl(uploadedUrl);
      setPreview(uploadedUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      setPreview(null);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(localUrl);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) uploadFile(file);
    },
    [uploadFile],
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleInsert = () => {
    const src = url.trim();
    if (!src) return;
    onInsert(src);
    handleClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Вставить изображение
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`mb-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
            dragOver
              ? 'border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-500/10'
              : 'border-slate-300 bg-slate-50 hover:border-slate-400 dark:border-slate-600 dark:bg-slate-700/50 dark:hover:border-slate-500'
          }`}
        >
          {uploading ? (
            <Loader2 size={32} className="animate-spin text-blue-500" />
          ) : preview ? (
            <img
              src={preview}
              alt="Preview"
              className="max-h-40 max-w-full rounded-lg object-contain"
            />
          ) : (
            <>
              <Upload size={32} className="mb-2 text-slate-400" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Перетащите файл сюда
              </p>
              <p className="mt-1 text-xs text-slate-400">или нажмите для выбора</p>
              <p className="mt-2 text-xs text-slate-400">JPEG, PNG, WebP — до 5 МБ</p>
            </>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Divider */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          <span className="text-xs text-slate-400">или</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>

        {/* URL input */}
        <input
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setPreview(e.target.value || null);
            setError('');
          }}
          placeholder="https://example.com/image.jpg"
          className="mb-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
        />

        {/* Error */}
        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={handleInsert}
            disabled={!url.trim() || uploading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <ImageIcon size={14} className="-mt-0.5 mr-1.5 inline-block" />
            Вставить
          </button>
        </div>
      </div>
    </div>
  );
}
