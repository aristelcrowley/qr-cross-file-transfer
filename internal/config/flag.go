package config

import (
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"qr-cross-file-transfer/internal/ip"
)

func ParseFlags() *AppConfig {
	cfg := &AppConfig{}

	flag.IntVar(&cfg.Port, "port", 8080, "port to listen on")
	flag.StringVar(&cfg.Interface, "interface", "", "override LAN IP address (e.g. 192.168.1.50)")
	flag.StringVar(&cfg.ShareDir, "share", ".", "directory to share for download")
	flag.StringVar(&cfg.UploadDir, "uploads", "./uploads", "directory to save uploaded files")
	flag.StringVar(&cfg.FrontendDir, "frontend", "./frontend/out", "path to Next.js static export directory")
	flag.Parse()

	cfg.LanIP = cfg.Interface
	if cfg.LanIP == "" {
		detected, err := ip.GetLocalIP()
		if err != nil {
			log.Fatalf("Could not detect LAN IP: %v", err)
		}
		cfg.LanIP = detected
	}

	cfg.MobileUploadDir = filepath.Join(cfg.UploadDir, "from-mobile")
	cfg.PCUploadDir = filepath.Join(cfg.UploadDir, "from-pc")

	for _, dir := range []string{cfg.MobileUploadDir, cfg.PCUploadDir} {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			log.Fatalf("Cannot create upload directory %s: %v", dir, err)
		}
	}

	cfg.NetworkURL = fmt.Sprintf("http://%s:%d", cfg.LanIP, cfg.Port)

	return cfg
}
