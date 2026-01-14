Set-Location $PSScriptRoot

# Initialize Git
git init

# Configure user
git config user.name "y-takuro-sudo"
git config user.email "y-takuro@webb-official.com"

# Remove helper scripts from tracking
Remove-Item install.ps1 -ErrorAction SilentlyContinue
Remove-Item start-dev.ps1 -ErrorAction SilentlyContinue

# Add all files
git add .

# Commit
git commit -m "Initial commit: WEBB Inc. Portfolio v1

- Next.js 14+ with App Router
- Tailwind CSS with dark mode support
- GSAP animations and Lenis smooth scroll
- Zustand state management
- A24-style theme switching (JAMES WEBB = Dark Mode)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"

# Show status
git status
