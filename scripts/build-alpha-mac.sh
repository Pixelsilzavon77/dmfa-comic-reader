#!/bin/bash
# DMFA Comic Reader - Alpha Build Script for macOS DMG

set -e

echo "🍎 Building DMFA Comic Reader Alpha for macOS..."

# Get the current version from package.json
VERSION=$(node -p "require('./package.json').version")
echo "📦 Version: $VERSION"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf release/alpha/*.dmg

# Build the web app
echo "⚙️  Building web app..."
npm run build

# Build macOS DMG
echo "🔨 Building macOS DMG..."
npm run dist:alpha:mac

# Find the built DMG
DMG_PATH=$(find release/alpha -name "*.dmg" -type f | head -n 1)

if [ -z "$DMG_PATH" ]; then
    echo "❌ macOS DMG not found!"
    exit 1
fi

# Rename to include alpha in filename
OLD_NAME=$(basename "$DMG_PATH")
NEW_NAME=$(echo "$OLD_NAME" | sed "s/DMFA Comic Reader-/DMFA-Comic-Reader-/" | sed "s/.dmg/-alpha.dmg/")
NEW_PATH="release/alpha/$NEW_NAME"

mv "$DMG_PATH" "$NEW_PATH"

# Show final info
DMG_SIZE=$(du -h "$NEW_PATH" | cut -f1)
echo "✅ Alpha macOS build complete!"
echo "📍 Location: $NEW_PATH"
echo "📦 Size: $DMG_SIZE"
echo ""
echo "🔍 To install on macOS:"
echo "   1. Transfer the .dmg file to a Mac"
echo "   2. Double-click to mount the disk image"
echo "   3. Drag the app to Applications folder"
echo "   4. First run: Right-click app → Open (to bypass Gatekeeper)"
echo ""
echo "🍏 Universal build supports both Intel and Apple Silicon Macs!"
echo "⚠️  This is an alpha build for testing only!"