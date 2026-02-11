package routes

import (
	"qr-cross-file-transfer/internal/handlers"

	"github.com/gofiber/fiber/v2"
)

func FileRoutes(api fiber.Router, fh *handlers.FileHandler) {
	api.Get("/files", fh.ListFiles)
	api.Get("/download/:filename", fh.DownloadFile)
	api.Get("/qr", fh.GetQRCode)
	api.Get("/info", fh.GetServerInfo)
}
