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
  filename: string;
  size: number;
}

export interface ErrorResponse {
  error: string;
}
