"use client";

export default function EmptyState() {
  return (
    <div className="clay-inset rounded-2xl py-10 text-center">
      <p className="text-sm text-clay-muted">
        No files available yet. Waiting for the sender…
      </p>
    </div>
  );
}
