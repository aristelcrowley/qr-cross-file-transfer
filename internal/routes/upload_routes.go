package routes

import (
	"qr-cross-file-transfer/internal/handlers"

	"github.com/gofiber/fiber/v2"
)

// UploadRoutes registers the file-upload (receive) endpoints.
func UploadRoutes(api fiber.Router, uh *handlers.UploadHandler) {
	api.Post("/upload", uh.UploadFile)
}
