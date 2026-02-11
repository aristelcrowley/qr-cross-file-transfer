package utils

import (
	"fmt"

	qrcode "github.com/skip2/go-qrcode"
)

func GenerateQR(text string) error {
	qr, err := qrcode.New(text, qrcode.Medium)
	if err != nil {
		return fmt.Errorf("failed to generate QR code: %w", err)
	}

	fmt.Println(qr.ToSmallString(false))
	return nil
}
