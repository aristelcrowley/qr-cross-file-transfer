"use client";

import { formatBytes } from "@/lib/format";
import type { FileEntry } from "@/types";

interface FileListItemProps {
  file: FileEntry;
  downloadUrl: string;
}

export default function FileListItem({ file, downloadUrl }: FileListItemProps) {
  return (
    <li className="flex items-center justify-between clay-inset rounded-xl px-4 py-3">
      <div className="min-w-0 flex-1 pr-3">
        <p className="text-sm font-medium text-clay-heading truncate">
          {file.name}
        </p>
        <p className="text-xs text-clay-muted">{formatBytes(file.size)}</p>
      </div>
      <a
        href={downloadUrl}
        download
        className="clay-btn text-xs !py-2 !px-4 shrink-0"
      >
        Download
      </a>
    </li>
  );
}
