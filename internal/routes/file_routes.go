package routes

import (
	"qr-cross-file-transfer/internal/controllers"

	"github.com/gofiber/fiber/v2"
)

func FileRoutes(api *fiber.App, fc *controllers.FileController) {
	api.Get("/files", fc.ListFiles)
	api.Get("/download/:filename", fc.DownloadFile)
}
