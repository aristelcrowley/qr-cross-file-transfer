"use client";

import { formatBytes } from "@/lib/format";

interface SelectedFilesListProps {
  files: File[];
  onRemove: (index: number) => void;
}

export default function SelectedFilesList({
  files,
  onRemove,
}: SelectedFilesListProps) {
  if (files.length === 0) return null;

  return (
    <ul className="space-y-2 max-h-48 overflow-y-auto">
      {files.map((file, i) => (
        <li
          key={file.name + file.size}
          className="flex items-center justify-between clay-inset rounded-xl px-4 py-2.5 text-sm"
        >
          <span className="truncate text-clay-heading font-medium pr-3">
            {file.name}
          </span>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-clay-muted text-xs">
              {formatBytes(file.size)}
            </span>
            <button
              onClick={() => onRemove(i)}
              className="text-clay-muted hover:text-red-400 transition-colors text-lg leading-none"
            >
              ×
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
