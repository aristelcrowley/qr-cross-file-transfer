package handlers

import (
	"fmt"
	"net/url"
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

func (h *UploadHandler) resolveUploadDir(c *fiber.Ctx) string {
	from := c.Query("from", "")
	if from == "viewer" {
		return h.cfg.PCUploadDir
	}
	return h.cfg.MobileUploadDir
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

	uploadDir := h.resolveUploadDir(c)
	if err := os.MkdirAll(uploadDir, 0o755); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(dto.ErrorResponse{
			Error: fmt.Sprintf("cannot create upload directory: %v", err),
		})
	}

	saved := make([]dto.UploadedFileInfo, 0, len(files))
	for _, file := range files {
		dest := filepath.Join(uploadDir, filepath.Base(file.Filename))
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

func (h *UploadHandler) listDir(dir string, c *fiber.Ctx) error {
	entries, err := os.ReadDir(dir)
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

func (h *UploadHandler) ListMobileUploads(c *fiber.Ctx) error {
	return h.listDir(h.cfg.MobileUploadDir, c)
}

func (h *UploadHandler) ListPCUploads(c *fiber.Ctx) error {
	return h.listDir(h.cfg.PCUploadDir, c)
}

func (h *UploadHandler) downloadFrom(dir string, c *fiber.Ctx) error {
	raw := c.Params("filename")
	if raw == "" {
		return c.Status(fiber.StatusBadRequest).JSON(dto.ErrorResponse{
			Error: "filename is required",
		})
	}

	filename, err := url.PathUnescape(raw)
	if err != nil {
		filename = raw
	}

	target := filepath.Join(dir, filepath.Clean(filename))

	absDir, _ := filepath.Abs(dir)
	absTarget, _ := filepath.Abs(target)
	if len(absTarget) < len(absDir) || absTarget[:len(absDir)] != absDir {
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

func (h *UploadHandler) DownloadMobileUpload(c *fiber.Ctx) error {
	return h.downloadFrom(h.cfg.MobileUploadDir, c)
}

func (h *UploadHandler) DownloadPCUpload(c *fiber.Ctx) error {
	return h.downloadFrom(h.cfg.PCUploadDir, c)
}

func (h *UploadHandler) clearDir(dir string, c *fiber.Ctx) error {
	entries, err := os.ReadDir(dir)
	if err != nil {
		if os.IsNotExist(err) {
			return c.JSON(fiber.Map{"message": "already empty", "deleted": 0})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(dto.ErrorResponse{
			Error: fmt.Sprintf("cannot read directory: %v", err),
		})
	}

	deleted := 0
	for _, e := range entries {
		path := filepath.Join(dir, e.Name())
		if err := os.RemoveAll(path); err == nil {
			deleted++
		}
	}

	return c.JSON(fiber.Map{
		"message": fmt.Sprintf("%d file(s) deleted", deleted),
		"deleted": deleted,
	})
}

func (h *UploadHandler) ClearMobileUploads(c *fiber.Ctx) error {
	return h.clearDir(h.cfg.MobileUploadDir, c)
}

func (h *UploadHandler) ClearPCUploads(c *fiber.Ctx) error {
	return h.clearDir(h.cfg.PCUploadDir, c)
}
