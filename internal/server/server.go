package server

import (
	"log"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"qr-cross-file-transfer/internal/config"
	"qr-cross-file-transfer/internal/handlers"
	"qr-cross-file-transfer/internal/routes"
	"qr-cross-file-transfer/internal/session"
)

func New(cfg *config.AppConfig) *fiber.App {
	app := fiber.New(fiber.Config{
		AppName:   "qr-cross-file-transfer",
		BodyLimit: 2 * 1024 * 1024 * 1024,
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,DELETE,OPTIONS",
		AllowHeaders: "Origin,Content-Type,Accept",
	}))

	fh := handlers.NewFileHandler(cfg)
	uh := handlers.NewUploadHandler(cfg)
	sh := handlers.NewSessionHandler(session.New())

	routes.SetUpRoutes(app, fh, uh, sh)

	frontendDir, _ := filepath.Abs(cfg.FrontendDir)
	if info, err := os.Stat(frontendDir); err == nil && info.IsDir() {
		log.Printf("Serving frontend from %s", frontendDir)

		app.Static("/", frontendDir, fiber.Static{
			Index: "index.html",
		})

		app.Use(func(c *fiber.Ctx) error {
			htmlFile := filepath.Join(frontendDir, c.Path()+".html")
			if _, err := os.Stat(htmlFile); err == nil {
				return c.SendFile(htmlFile)
			}
			indexFile := filepath.Join(frontendDir, c.Path(), "index.html")
			if _, err := os.Stat(indexFile); err == nil {
				return c.SendFile(indexFile)
			}
			return c.SendFile(filepath.Join(frontendDir, "index.html"))
		})
	} else {
		log.Printf("Warning: frontend directory %q not found — run 'npx next build' in frontend/", cfg.FrontendDir)
	}

	return app
}
