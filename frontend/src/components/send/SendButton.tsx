"use client";

interface SendButtonProps {
  fileCount: number;
  uploading: boolean;
  progress: number;
  onClick: () => void;
}

export default function SendButton({
  fileCount,
  uploading,
  progress,
  onClick,
}: SendButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={fileCount === 0 || uploading}
      className="clay-btn w-full disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {uploading
        ? `Sending… ${progress}%`
        : `Send ${fileCount > 0 ? `(${fileCount} file${fileCount > 1 ? "s" : ""})` : ""}`}
    </button>
  );
}
