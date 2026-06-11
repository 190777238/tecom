# Generate site favicon files from images/favicon.png

param(
  [string]$Root = (Join-Path $PSScriptRoot '..')
)

Add-Type -AssemblyName System.Drawing

$Root = (Resolve-Path $Root).Path
$Source = Join-Path $Root 'images\favicon.png'

if (-not (Test-Path $Source)) {
  Write-Error "Source not found: $Source"
  exit 1
}

function Resize-Icon {
  param(
    [System.Drawing.Image]$SourceImage,
    [int]$Size
  )

  $bmp = New-Object System.Drawing.Bitmap $Size, $Size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.DrawImage($SourceImage, 0, 0, $Size, $Size)
  $g.Dispose()
  return $bmp
}

$img = [System.Drawing.Image]::FromFile($Source)
try {
  $png32 = Resize-Icon -SourceImage $img -Size 32
  $png180 = Resize-Icon -SourceImage $img -Size 180

  $png32.Save((Join-Path $Root 'favicon-32x32.png'), [System.Drawing.Imaging.ImageFormat]::Png)
  $png180.Save((Join-Path $Root 'apple-touch-icon.png'), [System.Drawing.Imaging.ImageFormat]::Png)

  $icon = [System.Drawing.Icon]::FromHandle($png32.GetHicon())
  $stream = [System.IO.File]::Create((Join-Path $Root 'favicon.ico'))
  $icon.Save($stream)
  $stream.Close()
  $icon.Dispose()

  $png32.Dispose()
  $png180.Dispose()
}
finally {
  $img.Dispose()
}

Write-Output 'Generated favicon.ico, favicon-32x32.png, apple-touch-icon.png from images/favicon.png'
