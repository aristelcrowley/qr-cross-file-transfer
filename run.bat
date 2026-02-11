@echo off
title qr-cross-file-transfer
cd /d "%~dp0"

set PORT=8080
set SHARE=.

echo.
echo [1/3] Building frontend...
cd frontend
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
start http://localhost:%PORT%
echo  Opened http://localhost:%PORT% in default browser
echo.

bin\qr-cross-file-transfer.exe --port %PORT% --share %SHARE%
pause
