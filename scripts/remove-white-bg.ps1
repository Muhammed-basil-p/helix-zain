Add-Type -AssemblyName System.Drawing
$imgDir = Join-Path $PSScriptRoot "..\images"
$srcPath = Join-Path $imgDir "helix-zain-logo.png"
$tmpPath = Join-Path $imgDir "helix-zain-logo-tmp.png"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $src.Width
$h = $src.Height
Write-Host "Size: ${w}x${h}"

$fmt = [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
$dst = [System.Drawing.Bitmap]::new($w, $h, $fmt)
$graphics = [System.Drawing.Graphics]::FromImage($dst)
$graphics.DrawImage($src, 0, 0, $w, $h)
$graphics.Dispose()
$src.Dispose()

$rect = [System.Drawing.Rectangle]::new(0, 0, $w, $h)
$bmpData = $dst.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, $fmt)
$stride = [Math]::Abs($bmpData.Stride)
$bytes = New-Object byte[] ($stride * $h)
[System.Runtime.InteropServices.Marshal]::Copy($bmpData.Scan0, $bytes, 0, $bytes.Length)

$thr = 228
for ($y = 0; $y -lt $h; $y++) {
    $row = $y * $stride
    for ($x = 0; $x -lt $w; $x++) {
        $i = $row + ($x * 4)
        $b = $bytes[$i]
        $gch = $bytes[$i + 1]
        $r = $bytes[$i + 2]
        if ($r -ge $thr -and $gch -ge $thr -and $b -ge $thr) {
            $bytes[$i + 3] = 0
        }
        else {
            $bytes[$i + 3] = 255
        }
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $bmpData.Scan0, $bytes.Length)
$dst.UnlockBits($bmpData)
$dst.Save($tmpPath, [System.Drawing.Imaging.ImageFormat]::Png)
$dst.Dispose()
Move-Item -LiteralPath $tmpPath -Destination $srcPath -Force
Write-Host "Saved transparent PNG"
