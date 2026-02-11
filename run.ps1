param(
    [int]    $Port  = 8080,
    [string] $Share = "."
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "`n[1/3] Building frontend..." -ForegroundColor Cyan
Push-Location "$Root\frontend"
npx next build
if ($LASTEXITCODE -ne 0) { Pop-Location; throw "Frontend build failed." }
Pop-Location
Write-Host "  Frontend built -> frontend/out/" -ForegroundColor Green

Write-Host "`n[2/3] Building backend..." -ForegroundColor Cyan
Push-Location $Root
go mod tidy
$bin = Join-Path $Root "bin\qr-cross-file-transfer.exe"
go build -o $bin ./cmd/app
if ($LASTEXITCODE -ne 0) { Pop-Location; throw "Backend build failed." }
Pop-Location
Write-Host "  Backend built  -> bin/qr-cross-file-transfer.exe" -ForegroundColor Green

Write-Host "`n[3/3] Starting server on port $Port..." -ForegroundColor Cyan
$url = "http://localhost:$Port"
Start-Process $url
Write-Host "  Opened $url in default browser`n" -ForegroundColor Green

& $bin --port $Port --share $Share
