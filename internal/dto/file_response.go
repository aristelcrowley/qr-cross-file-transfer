package dto

type FileInfo struct {
	Name  string `json:"name"`
	Size  int64  `json:"size"`
	IsDir bool   `json:"isDir"`
}

type FileListResponse struct {
	Files []FileInfo `json:"files"`
}
