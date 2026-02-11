package routes

import (
	"qr-cross-file-transfer/internal/controllers"

	"github.com/gofiber/fiber/v2"
)

func RegisterRoutes(app *fiber.App, fc *controllers.FileController, uc *controllers.UploadController) {
	FileRoutes(app, fc)
	UploadRoutes(app, uc)
}
