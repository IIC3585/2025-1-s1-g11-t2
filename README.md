# Image Processor PWA

A Progressive Web Application (PWA) for image processing using WebAssembly (WASM) for high-performance image manipulation.

## Features

- 🖼️ **Image Processing**
  - Grayscale filter
  - Sepia filter
  - Color inversion
  - Brightness adjustment
- ⚡ **High Performance**
  - WebAssembly (WASM) implementation
  - Real-time image processing
- 📱 **Progressive Web App**
  - Installable on devices
  - Offline functionality
  - Push notifications
- 🔔 **Notifications**
  - Image upload notifications
  - Filter application notifications
  - Firebase Cloud Messaging integration

## Technologies Used

- **Frontend**
  - Vite (Build tool)
  - WebAssembly (WASM)
  - Rust (for image processing)
  - Firebase Cloud Messaging
- **Development Tools**
  - TypeScript
  - ESLint
  - Vite PWA Plugin

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Rust (for WASM development)

## Installation

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```


## Building for Production

To create a production build:

```bash
npm run build
```

## Project Structure

```
├── src/
│   ├── index.js          # Main application logic
│   └── rust-wasm/        # Rust WASM implementation
├── public/               # Static assets
├── index.html           # Main HTML file
├── manifest.json        # PWA manifest
├── service-worker.js    # Service worker for offline functionality
└── vite.config.ts       # Vite configuration
```

## Usage

1. Open the application in your browser
2. Upload an image using the file input
3. Apply filters using the available buttons:
   - Grayscale
   - Sepia
   - Color Inversion
4. Adjust brightness using the slider
5. The processed image will be displayed in real-time


## Acknowledgments

- Vite team for the amazing build tool
- Rust and WebAssembly communities
- Firebase team for the messaging service