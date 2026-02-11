package main

import (
	"flag"
	"fmt"
	"log"
	"os"

	"qr-cross-file-transfer/internal/ip"
	"qr-cross-file-transfer/internal/server"
	"qr-cross-file-transfer/internal/utils"
)

func main() {
	port := flag.Int("port", 8080, "port to listen on")
	iface := flag.String("interface", "", "override LAN IP address")
	shareDir := flag.String("share", ".", "directory to share for download")
	uploadDir := flag.String("uploads", "./uploads", "directory to save uploaded files")
	flag.Parse()

	lanIP := *iface
	if lanIP == "" {
		detected, err := ip.GetLocalIP()
		if err != nil {
			log.Fatalf("Could not detect LAN IP: %v", err)
		}
		lanIP = detected
	}

	if err := os.MkdirAll(*uploadDir, 0o755); err != nil {
		log.Fatalf("Cannot create upload directory: %v", err)
	}

	addr := fmt.Sprintf(":%d", *port)
	url := fmt.Sprintf("http://%s:%d", lanIP, *port)

	fmt.Println("  qr-cross-file-transfer")
	fmt.Printf("  Local:   http://localhost:%d\n", *port)
	fmt.Printf("  Network: %s\n", url)
	fmt.Printf("  Share:   %s\n", *shareDir)
	fmt.Printf("  Uploads: %s\n", *uploadDir)

	if err := utils.GenerateQR(url); err != nil {
		log.Printf("Warning: could not render QR code: %v", err)
	}

	app := server.New(*shareDir, *uploadDir)

	if err := app.Listen(addr); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
