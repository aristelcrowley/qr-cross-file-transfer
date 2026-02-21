"use client";

import { formatBytes } from "@/lib/format";
import type { FileEntry } from "@/types";

interface FileListItemProps {
  file: FileEntry;
  downloadUrl: string;
}

export default function FileListItem({ file, downloadUrl }: FileListItemProps) {
  return (
    <li className="flex items-center justify-between clay-inset rounded-xl px-4 py-3 hover:border-white/12 transition-colors duration-200 group">
      <div className="min-w-0 flex-1 pr-3">
        <p className="text-sm font-medium text-clay-heading truncate">
          {file.name}
        </p>
        <p className="text-xs text-clay-muted tabular-nums">{formatBytes(file.size)}</p>
      </div>
      <a
        href={downloadUrl}
        download
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 border border-indigo-500/25 hover:border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/15 rounded-lg py-2 px-4 shrink-0 transition-all duration-200"
      >
        Download
      </a>
    </li>
  );
}
