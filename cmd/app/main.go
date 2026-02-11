package main

import (
	"flag"
	"log"

	"qr-cross-file-transfer/internal/ip"
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
}
