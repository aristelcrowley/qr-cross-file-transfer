"use client";

import FileListItem from "./FileListItem";
import type { FileEntry } from "@/types";

interface FileListProps {
  files: FileEntry[];
  getDownloadUrl: (name: string) => string;
}

export default function FileList({ files, getDownloadUrl }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-3">
      <ul className="space-y-2 max-h-[28rem] overflow-y-auto pr-1">
        {files.map((file) => (
          <FileListItem
            key={file.name}
            file={file}
            downloadUrl={getDownloadUrl(file.name)}
          />
        ))}
      </ul>
      <p className="text-xs text-slate-500 text-center tabular-nums pt-1">
        {files.length} file{files.length !== 1 ? "s" : ""} available
      </p>
    </div>
  );
}
