package handlers

import (
	"bufio"
	"fmt"

	"github.com/gofiber/fiber/v2"

	"qr-cross-file-transfer/internal/session"
)

type SessionHandler struct {
	sess *session.Session
}

func NewSessionHandler(sess *session.Session) *SessionHandler {
	return &SessionHandler{sess: sess}
}

// GetState returns the current session state as JSON.
func (h *SessionHandler) GetState(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{"state": h.sess.GetState()})
}

// SetState allows the controller (phone) to change the session state.
func (h *SessionHandler) SetState(c *fiber.Ctx) error {
	var body struct {
		State string `json:"state"`
	}
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid JSON body",
		})
	}

	switch body.State {
	case session.StateIdle, session.StateWaiting, session.StateSending, session.StateReceiving:
		h.sess.SetState(body.State)
		return c.JSON(fiber.Map{"state": body.State})
	default:
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fmt.Sprintf("unknown state: %s", body.State),
		})
	}
}

// Stream sends Server-Sent Events whenever the session state changes.
func (h *SessionHandler) Stream(c *fiber.Ctx) error {
	c.Set("Content-Type", "text/event-stream")
	c.Set("Cache-Control", "no-cache")
	c.Set("Connection", "keep-alive")
	c.Set("X-Accel-Buffering", "no") 

	c.Context().SetBodyStreamWriter(func(w *bufio.Writer) {
		ch := h.sess.Subscribe()
		defer h.sess.Unsubscribe(ch)

		fmt.Fprintf(w, "data: %s\n\n", h.sess.GetState())
		if err := w.Flush(); err != nil {
			return
		}

		for state := range ch {
			_, err := fmt.Fprintf(w, "data: %s\n\n", state)
			if err != nil {
				return
			}
			if err := w.Flush(); err != nil {
				return
			}
		}
	})
	return nil
}
