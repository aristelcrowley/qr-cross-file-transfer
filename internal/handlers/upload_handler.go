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
	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(dto.ErrorResponse{
			Error: "invalid multipart form",
		})
	}

	files := form.File["files"]
	if len(files) == 0 {
		files = form.File["file"]
	}
	if len(files) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(dto.ErrorResponse{
			Error: "no files provided (use form field \"files\")",
		})
	}

	if err := os.MkdirAll(h.cfg.UploadDir, 0o755); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(dto.ErrorResponse{
			Error: fmt.Sprintf("cannot create upload directory: %v", err),
		})
	}

	saved := make([]dto.UploadedFileInfo, 0, len(files))
	for _, file := range files {
		dest := filepath.Join(h.cfg.UploadDir, filepath.Base(file.Filename))
		if err := c.SaveFile(file, dest); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(dto.ErrorResponse{
				Error: fmt.Sprintf("failed to save %s: %v", file.Filename, err),
			})
		}
		saved = append(saved, dto.UploadedFileInfo{
			Filename: file.Filename,
			Size:     file.Size,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(dto.UploadResponse{
		Message: fmt.Sprintf("%d file(s) uploaded successfully", len(saved)),
		Files:   saved,
		Count:   len(saved),
	})
}

func (h *UploadHandler) ListUploads(c *fiber.Ctx) error {
	entries, err := os.ReadDir(h.cfg.UploadDir)
	if err != nil {
		if os.IsNotExist(err) {
			return c.JSON(dto.FileListResponse{Files: []dto.FileInfo{}})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(dto.ErrorResponse{
			Error: fmt.Sprintf("cannot read upload directory: %v", err),
		})
	}

	files := make([]dto.FileInfo, 0, len(entries))
	for _, e := range entries {
		info, err := e.Info()
		if err != nil {
			continue
		}
		if e.IsDir() {
			continue
		}
		files = append(files, dto.FileInfo{
			Name:  e.Name(),
			Size:  info.Size(),
			IsDir: false,
		})
	}

	return c.JSON(dto.FileListResponse{Files: files})
}

func (h *UploadHandler) DownloadUpload(c *fiber.Ctx) error {
	filename := c.Params("filename")
	if filename == "" {
		return c.Status(fiber.StatusBadRequest).JSON(dto.ErrorResponse{
			Error: "filename is required",
		})
	}

	target := filepath.Join(h.cfg.UploadDir, filepath.Clean(filename))

	absUpload, _ := filepath.Abs(h.cfg.UploadDir)
	absTarget, _ := filepath.Abs(target)
	if len(absTarget) < len(absUpload) || absTarget[:len(absUpload)] != absUpload {
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
