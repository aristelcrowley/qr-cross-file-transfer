package handlers

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"

	"qr-cross-file-transfer/internal/config"
	"qr-cross-file-transfer/internal/dto"
)

type UploadHandler struct {
	cfg *config.AppConfig
}

func NewUploadHandler(cfg *config.AppConfig) *UploadHandler {
	return &UploadHandler{cfg: cfg}
}

func (h *UploadHandler) UploadFile(c *fiber.Ctx) error {
	file, err := c.FormFile("file")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(dto.ErrorResponse{
			Error: "file field is required",
		})
	}

	if err := os.MkdirAll(h.cfg.UploadDir, 0o755); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(dto.ErrorResponse{
			Error: fmt.Sprintf("cannot create upload directory: %v", err),
		})
	}

	dest := filepath.Join(h.cfg.UploadDir, filepath.Base(file.Filename))

	if err := c.SaveFile(file, dest); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(dto.ErrorResponse{
			Error: fmt.Sprintf("failed to save file: %v", err),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(dto.UploadResponse{
		Message:  "file uploaded successfully",
		Filename: file.Filename,
		Size:     file.Size,
	})
}
