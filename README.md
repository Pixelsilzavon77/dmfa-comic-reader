# Unofficial DMFA Comic Reader - Desktop App

This is a standalone desktop application for reading the DMFA webcomic, built with React and Electron.

## Prerequisites

Before you begin, you need to have [Node.js](https://nodejs.org/) installed on your computer. This will also install `npm`, which is used to manage the project's dependencies.

## Installation

1.  **Download and Unzip:** Download and unzip the project files to a folder on your computer.
2.  **Open Terminal:** Open your terminal or command prompt.
3.  **Navigate to Project:** Navigate into the project folder you just unzipped.
    ```sh
    cd path/to/your/project
    ```
4.  **Install Dependencies:** Run the following command. This will download all the necessary libraries (React, Electron, etc.) defined in `package.json`.
    ```sh
    npm install
    ```

## Running the App for Development

To run the application in a live development mode (which will open the app and automatically reload if you make code changes), use the following command:

```sh
npm run start
```

## Building the Application (Creating the AppImage/EXE)

This is the final step to create the standalone application file.

1.  **Run the Build Command:** In your terminal, from the project directory, run:
    ```sh
    npm run dist
    ```
2.  **Find Your App:** The build process will create a new folder called `release`. Inside, you will find the packaged application ready to run:
    *   On Linux: An `.AppImage` file.
    *   On Windows: A `.exe` file.
    *   On macOS: A `.dmg` file.

You can now run this file directly without any further installation!