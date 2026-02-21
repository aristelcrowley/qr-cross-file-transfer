"use client";

export default function EmptyState() {
  return (
    <div className="clay-inset rounded-2xl py-14 text-center space-y-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-500/5 border border-white/5">
        <span className="text-3xl">📭</span>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-clay-heading">No files yet</p>
        <p className="text-xs text-clay-muted">
          Waiting for the sender to share files…
        </p>
      </div>
    </div>
  );
}
