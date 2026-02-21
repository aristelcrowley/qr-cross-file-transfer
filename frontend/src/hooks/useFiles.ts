"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getRole } from "@/hooks/useRole";
import {
  uploadFiles as uploadFilesService,
  listMobileUploads,
  listPCUploads,
  getMobileUploadUrl,
  getPCUploadUrl,
  getDownloadAllMobileUrl,
  getDownloadAllPCUrl,
} from "@/services/file.service";
import type { FileEntry, Role } from "@/types";

// ── useUpload ──

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
  const roleRef = useRef<Role>("controller");

  // Resolve role after hydration.
  useEffect(() => {
    roleRef.current = getRole() ?? "controller";
  }, []);

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
      await uploadFilesService(selected, roleRef.current, setProgress);
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

// ── useFileList ──

interface UseFileListReturn {
  files: FileEntry[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getDownloadUrl: (filename: string) => string;
  downloadAllUrl: string;
}

/**
 * Fetches the file list the *other* side uploaded:
 * - viewer (PC) → from-mobile dir (files the phone sent)
 * - controller (phone) → from-pc dir (files the PC sent)
 *
 * Polls every `intervalMs` for changes.
 */
export function useFileList(intervalMs = 3000): UseFileListReturn {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewer, setViewer] = useState(false);
  const viewerRef = useRef(false);

  // Resolve role after hydration.
  useEffect(() => {
    const v = getRole() === "viewer";
    setViewer(v);
    viewerRef.current = v;
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Viewer (PC) sees what mobile uploaded, controller (phone) sees what PC uploaded.
      const res = viewerRef.current
        ? await listMobileUploads()
        : await listPCUploads();
      setFiles(res.files.filter((f) => !f.isDir));
    } catch {
      setError("Failed to load file list");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount + poll.
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
        ? getMobileUploadUrl(filename)
        : getPCUploadUrl(filename),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [viewer]
  );

  const downloadAllUrl = viewerRef.current
    ? getDownloadAllMobileUrl()
    : getDownloadAllPCUrl();

  return { files, loading, error, refresh, getDownloadUrl, downloadAllUrl };
}
