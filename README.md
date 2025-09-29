# A fan made reader for DMFA

### Core Reading Experience
- **Bookmarking System**: Save your favorite pages and easily return to them
- **Progress Tracking**: Automatically save and restore your reading progress
- **Mobile-Optimized**: Significantly improved reading experience on Android compared to the original website
- **Touch Gestures**: Intuitive swipe navigation on mobile devices  
- **Cross-Platform**: Works on Windows, Linux, macOS, and Android
- **Clean Interface**: Distraction-free reading with easy navigation controls

### Enhanced Content & Archival Features
- **Complete Chapter Listing**: Includes extra chapters not listed on the original site, sourced from Katbox
- **Preserved Cast Pages**: Access to character pages that were previously taken down, preserved for archival purposes
- **Enhanced Demonology 101**: Expanded lore section with additional DMFA race information
- **Bonus Comics**: Access to bonus comics from Amber's server that weren't listed in the main archive
- **Auto-Updates**: Automatic content updates for the main comic (in testing)

A modern, unofficial desktop and mobile reader for the DMFA (Dan and Mab's Furry Adventures) webcomic. Built with React, TypeScript, Electron and Capacitor to provide a better reading experience, especially on mobile devices.

## Features

- **Bookmarking System**: Save your favorite pages and easily return to them, complete with the ability to set notes on bookmarks
- **Progress Tracking**: Automatically save and restore your reading progress
- **Mobile-Optimized**: Significantly improved reading experience on Android compared to the original website
- **Touch Gestures**: Intuitive swipe navigation on mobile devices
- **Cross-Platform**: Works on Windows, Linux, and Android

## Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- For Android builds: Android SDK and Java Development Kit (JDK)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pixelsilzavon77/dmfa-comic-reader.git
   cd dmfa-comic-reader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm start
   ```

## Building for Production

### Using Build Scripts (Recommended)

We provide convenient build scripts in the `scripts/` folder for easy cross-platform building:

#### Linux AppImage
```bash
./scripts/build-alpha-linux.sh
```
Creates a portable `.AppImage` file that runs on most Linux distributions.

#### Windows Executable  
```bash
./scripts/build-alpha-windows.sh
```
Creates a portable `.exe` file for Windows.

#### Android APK
```bash
./scripts/build-alpha-android.sh
```
Creates an `.apk` file for Android devices.

## Development

### Project Structure
```
src/
├── components/          # React components
├── styles/             # CSS stylesheets
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── constants.ts        # Application constants

android/                # Android/Capacitor configuration
electron/              # Electron main process files
scripts/               # Build automation scripts
```

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build web application
- `npm run electron:start` - Start Electron app
- `npm test` - Run tests (when available)

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Desktop**: Electron
- **Mobile**: Capacitor
- **Build**: Vite, Electron Builder
- **Styling**: Tailwind CSS, PostCSS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This is an unofficial fan-made application. DMFA (Dan and Mab's Furry Adventures) is created by Amber M. Williams (Mebs/Ambaaargh) and can be found at [missmab.com](http://www.missmab.com/).

## Support

If you encounter any issues or have suggestions, please open an issue on GitHub.
