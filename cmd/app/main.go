package main

import (
	"flag"
	"fmt"
	"log"

	"qr-cross-file-transfer/internal/ip"
	"qr-cross-file-transfer/internal/server"
)

func main() {
	iface := flag.String("interface", "", "override LAN IP address")
	flag.Parse()

	lanIP := *iface
	if lanIP == "" {
		detected, err := ip.GetLocalIP()
		if err != nil {
			log.Fatalf("Could not detect LAN IP: %v", err)
		}
		lanIP = detected
	}

	
	port := flag.Int("port", 8080, "port to listen on")
	addr := fmt.Sprintf(":%d", *port)
	url := fmt.Sprintf("http://%s:%d", lanIP, *port)


	fmt.Printf("  Local:   http://localhost:%d\n", *port)
	fmt.Printf("  Network: %s\n", url)

	app := server.New()

	if err := app.Listen(addr); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
