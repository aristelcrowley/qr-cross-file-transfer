package routes

import (
	"qr-cross-file-transfer/internal/handlers"

	"github.com/gofiber/fiber/v2"
)

func UploadRoutes(api fiber.Router, uh *handlers.UploadHandler) {
	api.Post("/upload", uh.UploadFile)
	api.Get("/uploads", uh.ListUploads)
	api.Get("/uploads/download/:filename", uh.DownloadUpload)
}
