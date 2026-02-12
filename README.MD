# qr-cross-file-transfer

**Bi-directional local file transfer between your PC and phone — no installs, no accounts, no cloud.**

Scan a QR code. Send or receive files. Done.

## What Is This?

qr-cross-file-transfer is a self-hosted, zero-dependency file transfer tool that runs entirely on your local network. Launch it on your PC, scan the QR code with your phone's camera, and instantly start moving files back and forth — from PC to phone, or phone to PC.

No app to install on your phone. No sign-ups. No file size limits (beyond your available disk space). No data leaves your network.

It works by running a lightweight Go server that serves a responsive web UI (built with Next.js) to any device on the same LAN. The phone interacts entirely through the browser.

---

## Why This Over Alternatives?

| | qr-cross-file-transfer | Cloud Services (Drive, Dropbox) | Chat Apps (Telegram, WhatsApp) | AirDrop / Nearby Share |
|---|---|---|---|---|
| **No install on phone** | Yes — browser only | Requires app | Requires app | Requires specific OS |
| **Works offline / air-gapped** | Yes — LAN only | No | No | Partial |
| **No file size limit** | Correct | Free tier limits | 2 GB cap typical | Varies |
| **No account required** | Correct | Requires login | Requires login | Requires login |
| **Cross-platform** | Any device with a browser | Yes | Yes | Apple-only / Android-only |
| **Data stays local** | Always | Never | Never | Yes |
| **Bi-directional** | Yes | Manual sync | Manual | Yes |

The core value: **it just works, entirely within your network, with zero setup on the receiving device.**

---

## Quick Start

### Prerequisites

- [Go](https://go.dev/dl/) 1.23+
- [Node.js](https://nodejs.org/) 18+ (with npm)

### One-Click Run (Windows)

Double-click **`run.bat`** in the project root folder. It will:

1. Build the frontend
2. Build the backend
3. Open your browser to the local site
4. Display a QR code in the terminal

That's it. Scan the QR code with your phone and start transferring files.

### Manual Run

```bash
# 1. Build the frontend
cd frontend
npm install
npx next build
cd ..

# 2. Build the backend
go build -o bin/qr-cross-file-transfer.exe ./cmd/app

# 3. Run
./bin/qr-cross-file-transfer.exe
```

A QR code will appear in your terminal. Open your browser to the URL shown (or scan with your phone).

### PowerShell

```powershell
.\run.ps1                     # defaults: port 8080, share current dir
.\run.ps1 -Port 9090          # custom port
.\run.ps1 -Share "C:\Files"   # custom share directory
```

---

## Network & Firewall (Important)
This tool works by turning your PC into a local web server. For your phone to reach it:

1. Same Wi-Fi: Ensure your phone is not on 4G/5G data. It must be on the same Wi-Fi network as your PC.
2. Firewall: On Windows, you may see a "Windows Defender Firewall" popup when you first run the app. You must check "Private networks" and click "Allow access". If the site fails to load on your phone: Temporarily disable your firewall or allow the port (default 8080) through.
3. Isolation: Some public Wi-Fi networks (cafes, universities) have "AP Isolation" enabled, which prevents devices from talking to each other. This tool will not work on those networks; use a mobile hotspot instead.

---

## How It Works

```
  PC (Go server)                          Phone (Browser)
  +-----------------+                     +------------------+
  | Fiber HTTP      | <--- same LAN ---> | Next.js web UI   |
  | Static frontend |                     | (no install)     |
  | File I/O        |                     |                  |
  +-----------------+                     +------------------+
        |                                        |
        |   1. PC shows QR code in terminal      |
        |   2. Phone scans QR -> opens browser   |
        |   3. Phone picks "Send" or "Receive"   |
        |   4. PC auto-navigates via SSE         |
        |   5. Files transfer over LAN           |
        |                                        |
```

**Session flow:**

1. Launch the server on your PC. It detects your LAN IP and prints a QR code pointing to `http://<your-ip>:<port>/action`.
2. Scan the QR with your phone. The phone opens the action page in its browser.
3. The phone picks an action — **Send** (upload files to PC) or **Receive** (download files from PC).
4. The PC auto-navigates to the matching page via Server-Sent Events (SSE). No manual clicking on PC.
5. Transfer files. Both directions support multiple files with progress tracking.
6. When done, press `Ctrl+C` in the terminal to stop the server.

**Upload separation:** Files sent from the phone land in `uploads/from-mobile/`. Files sent from the PC land in `uploads/from-pc/`. Each side only sees what the other sent.

---

## CLI Flags

| Flag | Default | Description |
|------|---------|-------------|
| `--port` | `8080` | Port the server listens on |
| `--interface` | _(auto-detect)_ | Override the LAN IP address |
| `--share` | `.` | Directory whose files the PC shares for download |
| `--uploads` | `./uploads` | Base directory for uploaded files |
| `--frontend` | `./frontend/out` | Path to the Next.js static export |

```bash
./bin/qr-cross-file-transfer.exe --port 9090 --share "C:\MyFiles"
```

---

## API Reference

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/files` | List files in the share directory |
| `GET` | `/api/download/:filename` | Download a shared file |
| `GET` | `/api/qr` | QR code as PNG image |
| `GET` | `/api/info` | Server info (IP, port, share dir) |
| `POST` | `/api/upload?from=controller\|viewer` | Upload files (routed by sender role) |
| `GET` | `/api/uploads/from-mobile` | List files uploaded by phone |
| `GET` | `/api/uploads/from-mobile/download/:filename` | Download a mobile-uploaded file |
| `GET` | `/api/uploads/from-pc` | List files uploaded by PC |
| `GET` | `/api/uploads/from-pc/download/:filename` | Download a PC-uploaded file |
| `DELETE` | `/api/uploads/from-mobile` | Clear all mobile-uploaded files |
| `DELETE` | `/api/uploads/from-pc` | Clear all PC-uploaded files |
| `GET` | `/api/session/state` | Get current session state |
| `POST` | `/api/session/state` | Set session state |
| `GET` | `/api/session/stream` | SSE stream for session state changes |

---

## Project Structure

```
qr-cross-file-transfer/
|-- cmd/app/main.go              # Entry point
|-- internal/
|   |-- config/                  # CLI flags & app configuration
|   |-- dto/                     # Data transfer objects (JSON shapes)
|   |-- handlers/                # HTTP handlers (files, uploads, session)
|   |-- ip/                      # LAN IP detection
|   |-- routes/                  # Route registration
|   |-- server/                  # Fiber app setup, CORS, static serving
|   |-- session/                 # In-memory session state & SSE broadcaster
|   |-- utils/                   # QR code generation
|-- frontend/
|   |-- src/
|   |   |-- app/                 # Next.js pages (/, /action, /send, /receive, /waiting)
|   |   |-- components/          # UI components (hero, qr, send, receive, layout, shared)
|   |   |-- hooks/               # React hooks (useFiles, useRole, useViewerNavigation)
|   |   |-- services/            # API client functions
|   |   |-- types/               # TypeScript interfaces
|   |   |-- lib/                 # Utilities (formatBytes)
|-- run.bat                      # One-click build & run (Windows CMD)
|-- run.ps1                      # Build & run (PowerShell)
```

---

## Tech Stack

**Backend**
- **Go 1.23** — compiled, single binary, no runtime needed
- **Fiber v2** — Express-inspired web framework for Go, built on fasthttp
- **go-qrcode** — terminal and PNG QR code generation

**Frontend**
- **Next.js 16** — static export (`output: "export"`) served directly by Go
- **React 19** — component-based UI
- **Tailwind CSS 4** — utility-first styling with a custom claymorphism design system
- **TypeScript 5** — type safety across the frontend

**Communication**
- **Server-Sent Events (SSE)** — real-time session state sync from server to PC browser
- **XHR** — file uploads with progress tracking
- **sessionStorage** — lightweight role persistence (viewer/controller) with no cookies

---

## Stopping the Server

Press `Ctrl+C` in the terminal window where the server is running. If you used `run.bat`, simply close the terminal window.

Uploaded files persist in the `uploads/` directory until you manually delete them or use the in-app clear button.

---

## License

MIT. See [LICENSE](LICENSE).
