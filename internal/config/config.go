package config

type AppConfig struct {
	Port            int
	Interface       string
	LanIP           string
	ShareDir        string
	UploadDir       string
	MobileUploadDir string
	PCUploadDir     string
	FrontendDir     string
	NetworkURL      string
}
