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
