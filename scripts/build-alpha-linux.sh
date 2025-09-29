#!/bin/bash
# DMFA Comic Reader - Alpha Build Script for Linux AppImage

set -e

echo "🐧 Building DMFA Comic Reader Alpha for Linux..."

# Get the current version from package.json
VERSION=$(node -p "require('./package.json').version")
echo "📦 Version: $VERSION"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf release/alpha/*.AppImage

# Build the web app
echo "⚙️  Building web app..."
npm run build

# Build Linux AppImage
echo "🔨 Building Linux AppImage..."
npm run dist:alpha:linux

# Find the built AppImage
APPIMAGE_PATH=$(find release/alpha -name "*.AppImage" -type f | head -n 1)

if [ -z "$APPIMAGE_PATH" ]; then
    echo "❌ AppImage not found!"
    exit 1
fi

# Rename to standardize filename format
OLD_NAME=$(basename "$APPIMAGE_PATH")
NEW_NAME=$(echo "$OLD_NAME" | sed "s/DMFA Comic Reader-/DMFA-Comic-Reader-/")
NEW_PATH="release/alpha/$NEW_NAME"

mv "$APPIMAGE_PATH" "$NEW_PATH"

# Make it executable
chmod +x "$NEW_PATH"

# Show final info
APPIMAGE_SIZE=$(du -h "$NEW_PATH" | cut -f1)
echo "✅ Alpha AppImage build complete!"
echo "📍 Location: $NEW_PATH"
echo "📦 Size: $APPIMAGE_SIZE"
echo ""
echo "🔍 To run on Linux:"
echo "   1. Make sure the AppImage is executable: chmod +x '$NEW_NAME'"
echo "   2. Run directly: ./'$NEW_NAME'"
echo "   or double-click in your file manager"
echo ""
echo "🖥️  This AppImage should work on most Linux distributions!"
echo "⚠️  This is an alpha build for testing only!"