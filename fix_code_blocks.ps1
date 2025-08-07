# PowerShell script to fix code blocks without language identifiers
# This script will properly identify and fix only opening code blocks without languages

Write-Host "Starting precise code block fix process..." -ForegroundColor Green

# First, let's revert the previous changes by restoring from git
Write-Host "Reverting previous changes..." -ForegroundColor Yellow
git checkout .

# Get all markdown files in the content directory
$markdownFiles = Get-ChildItem -Path "content" -Recurse -Filter "*.md"

$totalFiles = $markdownFiles.Count
$processedFiles = 0
$totalReplacements = 0

foreach ($file in $markdownFiles) {
    $processedFiles++
    Write-Progress -Activity "Processing Markdown Files" -Status "File $processedFiles of $totalFiles" -PercentComplete (($processedFiles / $totalFiles) * 100)
    
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    
    # Split content into lines for precise processing
    $lines = $content -split "`r?`n"
    $inCodeBlock = $false
    $modifiedLines = @()
    
    for ($i = 0; $i -lt $lines.Length; $i++) {
        $line = $lines[$i]
        
        if ($line -match '^```\s*$' -and !$inCodeBlock) {
            # This is an opening code block without language
            $modifiedLines += '```bash'
            $inCodeBlock = $true
            $totalReplacements++
        }
        elseif ($line -match '^```' -and !$inCodeBlock) {
            # This is an opening code block with language - keep as is
            $modifiedLines += $line
            $inCodeBlock = $true
        }
        elseif ($line -match '^```' -and $inCodeBlock) {
            # This is a closing code block - keep as is
            $modifiedLines += $line
            $inCodeBlock = $false
        }
        else {
            # Regular line - keep as is
            $modifiedLines += $line
        }
    }
    
    # Join the lines back together
    $newContent = $modifiedLines -join "`n"
    
    # Only write file if changes were made
    if ($newContent -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        $fileReplacements = ($originalContent -split "`r?`n" | Where-Object { $_ -match '^```\s*$' }).Count
        Write-Host "Fixed $fileReplacements code blocks in: $($file.Name)" -ForegroundColor Yellow
    }
}

Write-Host "`nProcess completed!" -ForegroundColor Green
Write-Host "Total files processed: $totalFiles" -ForegroundColor Cyan
Write-Host "Total code blocks fixed: $totalReplacements" -ForegroundColor Cyan