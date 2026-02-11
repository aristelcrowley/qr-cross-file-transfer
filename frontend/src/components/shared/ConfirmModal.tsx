"use client";

import { useEffect, useRef } from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Delete All",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) onCancel();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div className="clay-card p-6 sm:p-8 max-w-sm w-full space-y-4 animate-in fade-in zoom-in-95">
        <div className="text-center space-y-2">
          <span className="text-4xl block">⚠️</span>
          <h2 className="text-lg font-bold text-clay-heading">{title}</h2>
          <p className="text-sm text-clay-muted">{description}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="clay-btn flex-1 bg-transparent! disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="clay-btn flex-1 bg-red-400/20! text-red-500! hover:bg-red-400/30! disabled:opacity-40"
          >
            {loading ? "Deleting…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
