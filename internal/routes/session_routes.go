package routes

import (
	"qr-cross-file-transfer/internal/handlers"

	"github.com/gofiber/fiber/v2"
)

func SessionRoutes(api fiber.Router, sh *handlers.SessionHandler) {
	s := api.Group("/session")
	s.Get("/state", sh.GetState)
	s.Post("/state", sh.SetState)
	s.Get("/stream", sh.Stream)
}
