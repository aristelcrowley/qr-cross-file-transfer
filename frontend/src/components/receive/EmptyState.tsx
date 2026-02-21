"use client";

export default function EmptyState() {
  return (
    <div className="clay-inset rounded-2xl py-12 text-center space-y-3">
      <span className="text-3xl block">📭</span>
      <p className="text-sm text-clay-muted">
        No files available yet. Waiting for the sender…
      </p>
    </div>
  );
}
