package routes

import (
	"qr-cross-file-transfer/internal/handlers"

	"github.com/gofiber/fiber/v2"
)

func UploadRoutes(api fiber.Router, uh *handlers.UploadHandler) {
	api.Post("/upload", uh.UploadFile)

	api.Get("/uploads/from-mobile", uh.ListMobileUploads)
	api.Get("/uploads/from-mobile/download-all", uh.DownloadAllMobileUploads)
	api.Get("/uploads/from-mobile/download/:filename", uh.DownloadMobileUpload)

	api.Get("/uploads/from-pc", uh.ListPCUploads)
	api.Get("/uploads/from-pc/download-all", uh.DownloadAllPCUploads)
	api.Get("/uploads/from-pc/download/:filename", uh.DownloadPCUpload)

	api.Delete("/uploads/from-mobile", uh.ClearMobileUploads)
	api.Delete("/uploads/from-pc", uh.ClearPCUploads)
}
