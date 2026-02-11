package routes

import (
	"qr-cross-file-transfer/internal/handlers"

	"github.com/gofiber/fiber/v2"
)

func QrRoutes(api fiber.Router, fh *handlers.FileHandler) {
	api.Get("/qr", fh.GetQRCode)
	api.Get("/info", fh.GetServerInfo)
}
