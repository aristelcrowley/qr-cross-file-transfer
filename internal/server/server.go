package server

import (
	"github.com/gofiber/fiber/v2"

	"qr-cross-file-transfer/internal/routes"
)

func New() *fiber.App {
	app := fiber.New(fiber.Config{
		AppName: "qr-cross-file-transfer",
	})

	routes.RegisterRoutes(app)

	return app
}
