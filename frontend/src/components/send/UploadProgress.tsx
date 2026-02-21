"use client";

interface UploadProgressProps {
  progress: number;
}

export default function UploadProgress({ progress }: UploadProgressProps) {
  return (
    <div className="space-y-1.5">
      <div className="clay-inset rounded-full h-2.5 overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-clay-muted text-right tabular-nums">{progress}%</p>
    </div>
  );
}
