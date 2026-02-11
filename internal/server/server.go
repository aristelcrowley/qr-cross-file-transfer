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
)

func New(cfg *config.AppConfig) *fiber.App {
	app := fiber.New(fiber.Config{
		AppName: "qr-cross-file-transfer",
		BodyLimit: 2 * 1024 * 1024 * 1024,
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,OPTIONS",
	}))

	fh := handlers.NewFileHandler(cfg)
	uh := handlers.NewUploadHandler(cfg)

	routes.SetUpRoutes(app, fh, uh)

	// Serve the Next.js static export for all non-API routes.
	frontendDir, _ := filepath.Abs(cfg.FrontendDir)
	if info, err := os.Stat(frontendDir); err == nil && info.IsDir() {
		log.Printf("Serving frontend from %s", frontendDir)

		// Serve static assets (JS, CSS, images, etc.)
		app.Static("/", frontendDir, fiber.Static{
			Index: "index.html",
		})

		// SPA-style fallback: for any unmatched route that has a
		// corresponding .html file from the static export, serve it.
		app.Use(func(c *fiber.Ctx) error {
			// Try <path>.html  (Next.js exports /action → action.html)
			htmlFile := filepath.Join(frontendDir, c.Path()+".html")
			if _, err := os.Stat(htmlFile); err == nil {
				return c.SendFile(htmlFile)
			}
			// Try <path>/index.html
			indexFile := filepath.Join(frontendDir, c.Path(), "index.html")
			if _, err := os.Stat(indexFile); err == nil {
				return c.SendFile(indexFile)
			}
			// Fall back to root index.html
			return c.SendFile(filepath.Join(frontendDir, "index.html"))
		})
	} else {
		log.Printf("Warning: frontend directory %q not found — run 'npx next build' in frontend/", cfg.FrontendDir)
	}

	return app
}
