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
      className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
    >
      {uploading
        ? `Sending… ${progress}%`
        : `Send ${fileCount > 0 ? `(${fileCount} file${fileCount > 1 ? "s" : ""})` : ""}`}
    </button>
  );
}
