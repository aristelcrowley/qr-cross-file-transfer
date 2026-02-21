@echo off
title qr-cross-file-transfer
cd /d "%~dp0"

set PORT=8080
set SHARE=.

echo.
echo  ===================================
echo   QR Cross File Transfer
echo  ===================================
echo.

echo [0/3] Checking prerequisites...

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Node.js is not installed or not in PATH.
    echo  Please install Node.js 18+ from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] npm is not installed or not in PATH.
    echo  It should come bundled with Node.js.
    echo  Please reinstall Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

where go >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Go is not installed or not in PATH.
    echo  Please install Go 1.23+ from https://go.dev/dl/
    echo  After installing, restart your terminal.
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node -v 2^>nul') do set NODE_VER=%%v
for /f "tokens=*" %%v in ('go version 2^>nul') do set GO_VER=%%v
echo  Node.js : %NODE_VER%
echo  Go      : %GO_VER%
echo.

echo.
echo [1/3] Building frontend...
cd frontend
if not exist node_modules (
    echo  Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo  npm install failed!
        pause
        exit /b 1
    )
)
call npx next build
if %errorlevel% neq 0 (
    echo  Frontend build failed!
    pause
    exit /b 1
)
cd ..
echo  Frontend built -^> frontend/out/

echo.
echo [2/3] Building backend...
go build -o bin\qr-cross-file-transfer.exe ./cmd/app
if %errorlevel% neq 0 (
    echo  Backend build failed!
    pause
    exit /b 1
)
echo  Backend built  -^> bin/qr-cross-file-transfer.exe

echo.
echo [3/3] Starting server on port %PORT%...

netstat -aon 2>nul | findstr ":%PORT% " | findstr "LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%PORT% " ^| findstr "LISTENING"') do (
        echo  Killing old process on port %PORT% (PID %%a^)...
        taskkill /F /PID %%a >nul 2>&1
    )
    timeout /t 1 /nobreak >nul
)

start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:%PORT%"

echo  Server running at http://localhost:%PORT%
echo  Browser will open shortly...
echo  Press Ctrl+C to stop.
echo.

bin\qr-cross-file-transfer.exe --port %PORT% --share %SHARE%
pause
