"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getRole } from "@/hooks/useRole";
import {
  uploadFiles as uploadFilesService,
  listSharedFiles,
  listUploadedFiles,
  getSharedFileUrl,
  getUploadedFileUrl,
} from "@/services/file.service";
import type { FileEntry } from "@/types";

interface UseUploadReturn {
  selected: File[];
  addFiles: (files: FileList | File[]) => void;
  removeFile: (index: number) => void;
  upload: () => Promise<void>;
  uploading: boolean;
  progress: number;
  done: boolean;
  error: string | null;
  reset: () => void;
}

export function useUpload(): UseUploadReturn {
  const [selected, setSelected] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files);
    setSelected((prev) => {
      const existing = new Set(prev.map((f) => f.name + f.size));
      const unique = arr.filter((f) => !existing.has(f.name + f.size));
      return [...prev, ...unique];
    });
    setDone(false);
    setError(null);
  }, []);

  const removeFile = useCallback((index: number) => {
    setSelected((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const upload = useCallback(async () => {
    if (selected.length === 0) return;
    setUploading(true);
    setProgress(0);
    setError(null);
    try {
      await uploadFilesService(selected, setProgress);
      setDone(true);
      setSelected([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }, [selected]);

  const reset = useCallback(() => {
    setSelected([]);
    setUploading(false);
    setProgress(0);
    setDone(false);
    setError(null);
  }, []);

  return { selected, addFiles, removeFile, upload, uploading, progress, done, error, reset };
}

interface UseFileListReturn {
  files: FileEntry[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getDownloadUrl: (filename: string) => string;
}

export function useFileList(intervalMs = 3000): UseFileListReturn {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewer, setViewer] = useState(false);
  const viewerRef = useRef(false);

  useEffect(() => {
    const v = getRole() === "viewer";
    setViewer(v);
    viewerRef.current = v;
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = viewerRef.current
        ? await listUploadedFiles()
        : await listSharedFiles();
      setFiles(res.files.filter((f) => !f.isDir));
    } catch {
      setError("Failed to load file list");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const resolved = getRole() !== null;
    if (!resolved) return;

    refresh();
    const id = setInterval(refresh, intervalMs);
    return () => clearInterval(id);
  }, [viewer, refresh, intervalMs]);

  const getDownloadUrl = useCallback(
    (filename: string) =>
      viewerRef.current
        ? getUploadedFileUrl(filename)
        : getSharedFileUrl(filename),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [viewer]
  );

  return { files, loading, error, refresh, getDownloadUrl };
}
