package dto

type UploadedFileInfo struct {
	Filename string `json:"filename"`
	Size     int64  `json:"size"`
}

type UploadResponse struct {
	Message string             `json:"message"`
	Files   []UploadedFileInfo `json:"files"`
	Count   int                `json:"count"`
}
