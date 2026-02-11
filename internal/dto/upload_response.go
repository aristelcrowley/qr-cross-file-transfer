package dto

type UploadResponse struct {
	Message  string `json:"message"`
	Filename string `json:"filename"`
	Size     int64  `json:"size"`
}