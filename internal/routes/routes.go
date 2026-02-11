package routes

import (
	"qr-cross-file-transfer/internal/handlers"

	"github.com/gofiber/fiber/v2"
)

func SetUpRoutes(app *fiber.App, fh *handlers.FileHandler, uh *handlers.UploadHandler, sh *handlers.SessionHandler) {
	api := app.Group("/api")

	FileRoutes(api, fh)
	UploadRoutes(api, uh)
	SessionRoutes(api, sh)

}
