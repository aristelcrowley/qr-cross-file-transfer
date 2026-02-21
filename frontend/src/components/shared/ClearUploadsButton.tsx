"use client";

import { useState, useCallback } from "react";
import ConfirmModal from "@/components/shared/ConfirmModal";

type UploadSource = "from-mobile" | "from-pc";

interface ClearUploadsButtonProps {
  source: UploadSource;
  onCleared?: () => void;
  clearFn: () => Promise<{ message: string; deleted: number }>;
}

const labels: Record<UploadSource, { action: string; folder: string }> = {
  "from-mobile": {
    action: "Clear Sent Files",
    folder: "from-mobile (files you sent by mobile)",
  },
  "from-pc": {
    action: "Clear Received Files",
    folder: "from-pc (files you sent by PC)",
  },
};

export default function ClearUploadsButton({
  source,
  onCleared,
  clearFn,
}: ClearUploadsButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await clearFn();
      onCleared?.();
    } catch (err) {
      console.error("Clear failed:", err);
      setError(err instanceof Error ? err.message : "Failed to clear files");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }, [clearFn, onCleared]);

  return (
    <>
      {error && (
        <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <button
        onClick={() => setOpen(true)}
        className="w-full py-2.5 px-4 rounded-xl text-sm font-medium text-red-400 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-200"
      >
        🗑️ {labels[source].action}
      </button>

      <ConfirmModal
        open={open}
        title="Delete all files?"
        description={`This will permanently delete every file in the "${labels[source].folder}" folder. This action cannot be undone.`}
        confirmLabel="Delete All"
        loading={loading}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
