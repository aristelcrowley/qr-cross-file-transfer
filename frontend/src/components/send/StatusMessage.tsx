"use client";

interface StatusMessageProps {
  error: string | null;
  done: boolean;
}

export default function StatusMessage({ error, done }: StatusMessageProps) {
  if (error) {
    return (
      <p className="text-sm text-red-400/80 text-center font-medium">
        {error}
      </p>
    );
  }
  if (done) {
    return (
      <p className="text-sm text-green-600/80 text-center font-medium">
        Files sent successfully!
      </p>
    );
  }
  return null;
}
