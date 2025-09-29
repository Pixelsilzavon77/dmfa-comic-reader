#!/bin/bash
# DMFA Comic Reader - Alpha Build Script

set -e

echo "🚀 Building DMFA Comic Reader Alpha for Android..."

# Get the current version from package.json
VERSION=$(node -p "require('./package.json').version")
echo "📦 Version: $VERSION"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf android/app/build/outputs/apk/

# Build the web app
echo "⚙️  Building web app..."
npm run build

# Sync with Capacitor
echo "📱 Syncing with Android..."
npx cap sync android

# Build Android APK
echo "🔨 Building Android APK..."
cd android
unset _JAVA_OPTIONS
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk
./gradlew assembleDebug --console=plain

# Copy to release folder
echo "📋 Copying APK to release folder..."
cd ..
mkdir -p "release/alpha"
cp "android/app/build/outputs/apk/debug/app-debug.apk" "release/alpha/DMFA-Comic-Reader-${VERSION}.apk"

# Show final info
APK_SIZE=$(du -h "release/alpha/DMFA-Comic-Reader-${VERSION}.apk" | cut -f1)
echo "✅ Alpha build complete!"
echo "📍 Location: release/alpha/DMFA-Comic-Reader-${VERSION}.apk"
echo "📦 Size: $APK_SIZE"
echo ""
echo "🔍 To install on Android:"
echo "   1. Transfer the APK to your Android device"
echo "   2. Enable 'Install unknown apps' in Settings"
echo "   3. Tap the APK file to install"
echo ""
echo "⚠️  This is a debug build for alpha testing only!"