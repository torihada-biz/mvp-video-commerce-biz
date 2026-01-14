# Git setup script for Video Commerce MVP
$ErrorActionPreference = "Stop"

# Get the script directory (project root)
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

# Change to project directory
Set-Location $projectRoot

# Remove any existing .git folder in project directory
if (Test-Path ".git") {
    Remove-Item -Recurse -Force ".git"
    Write-Host "Removed existing .git folder"
}

# Initialize Git repository
git init
Write-Host "Initialized Git repository"

# Set branch to main
git branch -M main
Write-Host "Set branch to main"

# Add all files (respecting .gitignore)
git add .
Write-Host "Staged all files"

# Commit
git commit -m "Initial commit: Video Commerce MVP"
Write-Host "Created initial commit"

# Remove existing remote if it exists
git remote remove origin 2>$null

# Add remote
git remote add origin https://github.com/torihada-biz/video-commerce-mvp.git
Write-Host "Added remote origin"

# Push to GitHub
git push -u origin main
Write-Host "Pushed to GitHub"

Write-Host "Git setup completed successfully!"
