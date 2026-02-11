import type { FileListResponse, UploadResponse } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function uploadFiles(
  files: File[],
  onProgress?: (percent: number) => void
): Promise<UploadResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE}/api/upload`);

    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(xhr.responseText || "Upload failed"));
      }
    };
    xhr.onerror = () => reject(new Error("Network error during upload"));

    const fd = new FormData();
    for (const f of files) {
      fd.append("files", f);
    }
    xhr.send(fd);
  });
}

export async function listSharedFiles(): Promise<FileListResponse> {
  const res = await fetch(`${API_BASE}/api/files`);
  if (!res.ok) throw new Error("Failed to list shared files");
  return res.json();
}

export function getSharedFileUrl(filename: string): string {
  return `${API_BASE}/api/download/${encodeURIComponent(filename)}`;
}

export async function listUploadedFiles(): Promise<FileListResponse> {
  const res = await fetch(`${API_BASE}/api/uploads`);
  if (!res.ok) throw new Error("Failed to list uploaded files");
  return res.json();
}

export function getUploadedFileUrl(filename: string): string {
  return `${API_BASE}/api/uploads/download/${encodeURIComponent(filename)}`;
}
