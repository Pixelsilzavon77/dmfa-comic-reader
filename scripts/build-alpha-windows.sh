#!/bin/bash
# DMFA Comic Reader - Alpha Build Script for Windows Portable

set -e

echo "🪟 Building DMFA Comic Reader Alpha for Windows..."

# Get the current version from package.json
VERSION=$(node -p "require('./package.json').version")
echo "📦 Version: $VERSION"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf release/alpha/*.exe

# Build the web app
echo "⚙️  Building web app..."
npm run build

# Build Windows Portable
echo "🔨 Building Windows Portable..."
npm run dist:alpha:windows

# Find the built executable
EXE_PATH=$(find release/alpha -name "*.exe" -type f | head -n 1)

if [ -z "$EXE_PATH" ]; then
    echo "❌ Windows executable not found!"
    exit 1
fi

# Rename to include alpha in filename
OLD_NAME=$(basename "$EXE_PATH")
NEW_NAME=$(echo "$OLD_NAME" | sed "s/DMFA Comic Reader-/DMFA-Comic-Reader-/" | sed "s/.exe/-alpha.exe/")
NEW_PATH="release/alpha/$NEW_NAME"

mv "$EXE_PATH" "$NEW_PATH"

# Show final info
EXE_SIZE=$(du -h "$NEW_PATH" | cut -f1)
echo "✅ Alpha Windows build complete!"
echo "📍 Location: $NEW_PATH"
echo "📦 Size: $EXE_SIZE"
echo ""
echo "🔍 To run on Windows:"
echo "   1. Transfer the .exe file to a Windows machine"
echo "   2. Double-click to run (no installation required)"
echo "   3. Windows may show a security warning - click 'More info' then 'Run anyway'"
echo ""
echo "💻 This is a portable executable that runs without installation!"
echo "⚠️  This is an alpha build for testing only!"