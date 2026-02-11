"use client";

interface UploadProgressProps {
  progress: number;
}

export default function UploadProgress({ progress }: UploadProgressProps) {
  return (
    <div className="clay-inset rounded-full h-3 overflow-hidden">
      <div
        className="h-full bg-clay-heading/40 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
