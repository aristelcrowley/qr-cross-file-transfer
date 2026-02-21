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
    <>
      <ul className="space-y-2 max-h-72 overflow-y-auto">
        {files.map((file) => (
          <FileListItem
            key={file.name}
            file={file}
            downloadUrl={getDownloadUrl(file.name)}
          />
        ))}
      </ul>
      <p className="text-xs text-slate-500 text-center tabular-nums">
        {files.length} file{files.length !== 1 ? "s" : ""} available
      </p>
    </>
  );
}
