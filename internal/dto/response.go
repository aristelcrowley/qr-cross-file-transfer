package dto

type ErrorResponse struct {
	Error string `json:"error"`
}

type ServerInfoResponse struct {
	NetworkURL string `json:"networkUrl"`
	Port       int    `json:"port"`
	ShareDir   string `json:"shareDir"`
	UploadDir  string `json:"uploadDir"`
}