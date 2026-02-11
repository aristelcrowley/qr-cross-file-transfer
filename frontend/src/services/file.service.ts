import type { FileListResponse, UploadResponse, Role } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

/**
 * Upload files to the server. The `from` param tells the backend
 * which sub-directory to store them in:
 *   controller → uploads/from-mobile/
 *   viewer     → uploads/from-pc/
 */
export async function uploadFiles(
  files: File[],
  from: Role,
  onProgress?: (percent: number) => void
): Promise<UploadResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE}/api/upload?from=${from}`);

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

// ── Shared files (PC's share directory) ──

export async function listSharedFiles(): Promise<FileListResponse> {
  const res = await fetch(`${API_BASE}/api/files`);
  if (!res.ok) throw new Error("Failed to list shared files");
  return res.json();
}

export function getSharedFileUrl(filename: string): string {
  return `${API_BASE}/api/download/${encodeURIComponent(filename)}`;
}

// ── Files uploaded by phone (for PC to receive) ──

export async function listMobileUploads(): Promise<FileListResponse> {
  const res = await fetch(`${API_BASE}/api/uploads/from-mobile`);
  if (!res.ok) throw new Error("Failed to list mobile uploads");
  return res.json();
}

export function getMobileUploadUrl(filename: string): string {
  return `${API_BASE}/api/uploads/from-mobile/download/${encodeURIComponent(filename)}`;
}

// ── Files uploaded by PC (for phone to receive) ──

export async function listPCUploads(): Promise<FileListResponse> {
  const res = await fetch(`${API_BASE}/api/uploads/from-pc`);
  if (!res.ok) throw new Error("Failed to list PC uploads");
  return res.json();
}

export function getPCUploadUrl(filename: string): string {
  return `${API_BASE}/api/uploads/from-pc/download/${encodeURIComponent(filename)}`;
}

// ── Clear uploaded files ──

export async function clearMobileUploads(): Promise<{ message: string; deleted: number }> {
  const res = await fetch(`${API_BASE}/api/uploads/from-mobile`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to clear mobile uploads");
  return res.json();
}

export async function clearPCUploads(): Promise<{ message: string; deleted: number }> {
  const res = await fetch(`${API_BASE}/api/uploads/from-pc`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to clear PC uploads");
  return res.json();
}
