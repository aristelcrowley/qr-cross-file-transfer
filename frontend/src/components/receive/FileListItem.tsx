"use client";

import { formatBytes } from "@/lib/format";
import FilePreview from "./FilePreview";
import type { FileEntry } from "@/types";

interface FileListItemProps {
  file: FileEntry;
  downloadUrl: string;
}

export default function FileListItem({ file, downloadUrl }: FileListItemProps) {
  return (
    <li className="clay-inset rounded-xl p-3 hover:border-white/12 transition-all duration-200 group">
      <a
        href={downloadUrl}
        download
        className="flex items-center gap-3.5 no-underline"
      >
        <FilePreview fileName={file.name} downloadUrl={downloadUrl} />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-clay-heading truncate group-hover:text-indigo-300 transition-colors duration-200">
            {file.name}
          </p>
          <p className="text-xs text-clay-muted tabular-nums mt-0.5">
            {formatBytes(file.size)}
          </p>
        </div>

        <div className="shrink-0 w-8 h-8 rounded-lg border border-indigo-500/25 bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-all duration-200">
          <svg
            className="w-4 h-4 text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
          </svg>
        </div>
      </a>
    </li>
  );
}
