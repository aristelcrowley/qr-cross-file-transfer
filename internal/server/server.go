package server

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"qr-cross-file-transfer/internal/controllers"
	"qr-cross-file-transfer/internal/routes"
)

func New(shareDir, uploadDir string) *fiber.App {
	app := fiber.New(fiber.Config{
		AppName: "qr-cross-file-transfer",
		BodyLimit: 2 * 1024 * 1024 * 1024,
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,OPTIONS",
	}))

	fc := controllers.NewFileController(shareDir)
	uc := controllers.NewUploadController(uploadDir)

	routes.RegisterRoutes(app, fc, uc)

	return app
}
