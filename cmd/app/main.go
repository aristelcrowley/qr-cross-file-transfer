package main

import (
	"fmt"
	"log"

	"qr-cross-file-transfer/internal/config"
	"qr-cross-file-transfer/internal/server"
	"qr-cross-file-transfer/internal/utils"
)

func main() {
	cfg := config.ParseFlags()

	fmt.Println("  qr-cross-file-transfer")
	fmt.Printf("  Local:   http://localhost:%d\n", cfg.Port)
	fmt.Printf("  Network: %s\n", cfg.NetworkURL)
	fmt.Printf("  Share:   %s\n", cfg.ShareDir)
	fmt.Printf("  Uploads: %s\n", cfg.UploadDir)

	fmt.Printf("  Frontend: %s\n", cfg.FrontendDir)

	if err := utils.GenerateQR(cfg.NetworkURL + "/action"); err != nil {
		log.Printf("Warning: could not render QR code: %v", err)
	}

	app := server.New(cfg)

	addr := fmt.Sprintf(":%d", cfg.Port)
	if err := app.Listen(addr); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
