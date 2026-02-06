# Loading Page Animations

A beautiful loading page with animated shader background built with React, TypeScript, Tailwind CSS, and Three.js.

## Features

- 🎨 Stunning animated shader background with aurora effects
- ⚡ Built with Vite for fast development
- 🎯 TypeScript for type safety
- 💅 Tailwind CSS for styling
- 🌈 Beautiful gradient animations
- 📊 Animated progress bar
- ✨ Dynamic loading text
- 🎭 Smooth transitions and micro-animations

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher recommended)
- npm or yarn

### Installing Node.js on Ubuntu/Debian

**Option 1: Using apt (Quick)**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Option 2: Using nvm (Recommended - Latest Version)**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
```

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── animated-shader-background.tsx  # Three.js shader component
│   │   └── LoadingPage.tsx                     # Main loading page component
│   ├── lib/
│   │   └── utils.ts                            # Utility functions
│   ├── App.tsx                                 # Main app component
│   ├── main.tsx                                # Entry point
│   └── index.css                               # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Customization

### Adjust Loading Time

In `src/App.tsx`, modify the `minimumLoadTime` prop:
```tsx
<LoadingPage 
  onLoadComplete={handleLoadComplete} 
  minimumLoadTime={5000} // Change this value (in milliseconds)
/>
```

### Customize Loading Messages

In `src/components/LoadingPage.tsx`, edit the `loadingMessages` array:
```tsx
const loadingMessages = [
  'Your Message 1',
  'Your Message 2',
  // Add more messages...
];
```

### Modify Shader Colors

The shader background colors can be adjusted in `src/components/ui/animated-shader-background.tsx` by modifying the `auroraColors` calculation in the fragment shader.

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics and shader rendering
- **Lucide React** - Beautiful icons
- **shadcn/ui** - Component architecture pattern

## License

MIT
