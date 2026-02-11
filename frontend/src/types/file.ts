export interface FileEntry {
  name: string;
  size: number;
  isDir: boolean;
}

export interface FileListResponse {
  files: FileEntry[];
}

export interface UploadResponse {
  message: string;
  files: { filename: string; size: number }[];
  count: number;
}

export interface ErrorResponse {
  error: string;
}
