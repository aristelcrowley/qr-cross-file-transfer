package handlers

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	qrcode "github.com/skip2/go-qrcode"

	"qr-cross-file-transfer/internal/config"
	"qr-cross-file-transfer/internal/dto"
)

type FileHandler struct {
	cfg *config.AppConfig
}

func NewFileHandler(cfg *config.AppConfig) *FileHandler {
	return &FileHandler{cfg: cfg}
}

func (h *FileHandler) ListFiles(c *fiber.Ctx) error {
	entries, err := os.ReadDir(h.cfg.ShareDir)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(dto.ErrorResponse{
			Error: fmt.Sprintf("cannot read directory: %v", err),
		})
	}

	files := make([]dto.FileInfo, 0, len(entries))
	for _, e := range entries {
		info, err := e.Info()
		if err != nil {
			continue
		}
		files = append(files, dto.FileInfo{
			Name:  e.Name(),
			Size:  info.Size(),
			IsDir: e.IsDir(),
		})
	}

	return c.JSON(dto.FileListResponse{Files: files})
}

func (h *FileHandler) DownloadFile(c *fiber.Ctx) error {
	filename := c.Params("filename")
	if filename == "" {
		return c.Status(fiber.StatusBadRequest).JSON(dto.ErrorResponse{
			Error: "filename is required",
		})
	}

	target := filepath.Join(h.cfg.ShareDir, filepath.Clean(filename))

	absShare, _ := filepath.Abs(h.cfg.ShareDir)
	absTarget, _ := filepath.Abs(target)
	if len(absTarget) < len(absShare) || absTarget[:len(absShare)] != absShare {
		return c.Status(fiber.StatusForbidden).JSON(dto.ErrorResponse{
			Error: "access denied",
		})
	}

	if _, err := os.Stat(target); os.IsNotExist(err) {
		return c.Status(fiber.StatusNotFound).JSON(dto.ErrorResponse{
			Error: "file not found",
		})
	}

	c.Set("Content-Disposition", fmt.Sprintf(`attachment; filename="%s"`, filename))
	return c.SendFile(target)
}

func (h *FileHandler) GetQRCode(c *fiber.Ctx) error {
	png, err := qrcode.Encode(h.cfg.NetworkURL, qrcode.Medium, 256)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(dto.ErrorResponse{
			Error: fmt.Sprintf("failed to generate QR code: %v", err),
		})
	}

	c.Set("Content-Type", "image/png")
	return c.Send(png)
}

func (h *FileHandler) GetServerInfo(c *fiber.Ctx) error {
	return c.JSON(dto.ServerInfoResponse{
		NetworkURL: h.cfg.NetworkURL,
		Port:       h.cfg.Port,
		ShareDir:   h.cfg.ShareDir,
		UploadDir:  h.cfg.UploadDir,
	})
}
