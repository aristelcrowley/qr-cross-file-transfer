package routes

import (
	"qr-cross-file-transfer/internal/controllers"

	"github.com/gofiber/fiber/v2"
)

func UploadRoutes(api *fiber.App, uc *controllers.UploadController) {
	api.Post("/upload", uc.UploadFile)
}
