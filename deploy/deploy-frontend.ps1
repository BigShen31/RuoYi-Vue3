param(
    [Parameter(Mandatory=$true)][string]$SourceDist,
    [string]$DeployDir = 'D:\Program Files(AI)\deploy\frontend',
    [string]$NginxHome = 'D:\Program Files(AI)\nginx'
)
$ErrorActionPreference = 'Stop'
$staging = $DeployDir + '.new'
$backup = $DeployDir + '.bak'
$NginxExe = Join-Path $NginxHome 'nginx.exe'

if (-not (Test-Path (Join-Path $SourceDist 'index.html'))) { throw ('invalid dist: ' + $SourceDist) }
if (Test-Path $staging) { Remove-Item -LiteralPath $staging -Recurse -Force }
New-Item -ItemType Directory -Force -Path $staging | Out-Null
Copy-Item -Path (Join-Path $SourceDist '*') -Destination $staging -Recurse -Force

if (Test-Path $backup) { Remove-Item -LiteralPath $backup -Recurse -Force }
if (Test-Path $DeployDir) { Rename-Item -LiteralPath $DeployDir -NewName (Split-Path $backup -Leaf) }
Rename-Item -LiteralPath $staging -NewName (Split-Path $DeployDir -Leaf)

$running = netstat -ano | Select-String ':80 ' | Select-String 'LISTENING'
if (-not $running) {
    Start-Process -FilePath $NginxExe -WorkingDirectory $NginxHome -WindowStyle Hidden
    Start-Sleep -Seconds 3
} else {
    & $NginxExe -p ($NginxHome + '/') -s reload
    Start-Sleep -Seconds 2
}

$ok = $false
for ($i = 0; $i -lt 15; $i++) {
    try { $r = Invoke-WebRequest -Uri 'http://localhost/' -UseBasicParsing -TimeoutSec 5; if ($r.StatusCode -eq 200) { $ok = $true; break } } catch { }
    Start-Sleep -Seconds 2
}
if (-not $ok) { throw 'frontend deploy failed: homepage not 200' }
Write-Output ('[deploy] OK http://localhost/ files=' + ((Get-ChildItem -LiteralPath $DeployDir -Recurse -File | Measure-Object).Count))
