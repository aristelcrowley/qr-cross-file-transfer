"use client";

interface StatusMessageProps {
  error: string | null;
  done: boolean;
}

export default function StatusMessage({ error, done }: StatusMessageProps) {
  if (error) {
    return (
      <div className="flex items-center justify-center gap-2 py-2">
        <span className="w-2 h-2 rounded-full bg-red-400"></span>
        <p className="text-sm text-red-400 font-medium">{error}</p>
      </div>
    );
  }
  if (done) {
    return (
      <div className="flex items-center justify-center gap-2 py-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        <p className="text-sm text-emerald-400 font-medium">
          Files sent successfully!
        </p>
      </div>
    );
  }
  return null;
}
