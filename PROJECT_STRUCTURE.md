# Nadar Design Website - Project Structure

## 📁 Directory Overview

```
nadar-design-website/
├── public/                     # Static assets
│   └── vite.svg
├── src/                        # Main source code
│   ├── components/             # Reusable components
│   │   └── InfiniteCanvas.tsx  # Canvas navigation system
│   ├── pages/                  # Page components
│   │   ├── HomePage.tsx        # Landing page
│   │   ├── AnimationsPage.tsx  # Animation showcase
│   │   ├── ProjectsPage.tsx    # Project portfolio
│   │   └── AboutPage.tsx       # About/contact page
│   ├── assets/                 # Images, animations, etc.
│   ├── App.tsx                 # Main app component
│   ├── App.css                 # Global styles
│   ├── main.tsx                # App entry point
│   └── vite-env.d.ts          # Vite type definitions
├── macosx-components/          # MacOS component library
│   ├── components/             # UI components
│   │   ├── ChatApp.tsx
│   │   ├── ChatBubble.tsx
│   │   ├── ChatContainer.tsx
│   │   ├── ChatInput.tsx
│   │   ├── MacOSThemeProvider.tsx
│   │   ├── MacOSWindow.tsx
│   │   ├── TrafficLights.tsx
│   │   ├── WindowFrame.tsx
│   │   └── index.ts
│   ├── styles/                 # Component styles
│   ├── theme/                  # Theme configuration
│   ├── types/                  # TypeScript definitions
│   ├── hooks/                  # Custom hooks
│   └── examples/               # Usage examples
├── dist/                       # Build output
├── node_modules/               # Dependencies
├── .vscode/                    # VS Code settings
├── .vercel/                    # Vercel deployment config
├── package.json                # Project configuration
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite configuration
├── eslint.config.js           # ESLint configuration
└── README.md                  # Project documentation
```

## 🏗️ Architecture

### Core Components

1. **App.tsx** - Main application wrapper with routing logic
2. **InfiniteCanvas.tsx** - Handles the draggable canvas interface
3. **Page Components** - Individual page implementations

### Component Library

The `macosx-components` directory contains a reusable component library that mimics macOS interface elements:

- **MacOSThemeProvider** - Theme context provider
- **ChatBubble** - Message bubble component
- **MacOSWindow** - Window frame with traffic lights
- **TrafficLights** - Window control buttons

### Styling Strategy

- **Global Styles** - `src/App.css` for app-wide styles
- **Component Styles** - `macosx-components/styles/` for component-specific styles
- **Inline Styles** - Used for dynamic styling and animations

### State Management

- **Local State** - React useState for component-level state
- **Props Drilling** - Simple prop passing for navigation
- **Zustand** - Available for complex state management (if needed)

## 🎯 Key Features

### Infinite Canvas Navigation

- Figma-style draggable interface
- Mouse wheel scrolling with boundaries
- Keyboard shortcuts (Space + drag, Cmd/Ctrl + 0)
- Mini-map for navigation overview

### Page System

- **Home** - Portfolio overview with folder navigation
- **Animations** - Interactive animation showcase
- **Projects** - Project portfolio with descriptions
- **About** - Personal information and contact

### Responsive Design

- Fluid typography with `clamp()`
- Flexible layouts with CSS Grid/Flexbox
- Mobile-optimized interactions

## 🔧 Development Guidelines

### File Naming

- **Components** - PascalCase (e.g., `HomePage.tsx`)
- **Utilities** - camelCase (e.g., `utils.ts`)
- **Constants** - UPPER_SNAKE_CASE (e.g., `CONSTANTS.ts`)

### Component Structure

```tsx
interface ComponentProps {
  // Props definition
}

export default function Component({ prop }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

### Styling Approach

- Prefer inline styles for dynamic values
- Use CSS classes for static styles
- Maintain consistent spacing and typography

## 🚀 Build Process

1. **Development** - `npm run dev` starts Vite dev server
2. **Build** - `npm run build` creates production bundle
3. **Preview** - `npm run preview` serves production build locally

## 📦 Dependencies

### Core

- React 19 - UI framework
- TypeScript - Type safety
- Vite - Build tool

### UI/Animation

- Framer Motion - Animations
- Lottie React - After Effects animations
- Lucide React - Icons

### Development

- ESLint - Code linting
- TypeScript ESLint - TS-specific linting

## 🎨 Design System

### Colors

- Primary gradient: `#4A89ED` to `#DCCFFF`
- Dark theme: `#000` background
- Text: White with opacity variations

### Typography

- Font: AlphaLyrae-Medium
- Responsive sizing with `clamp()`
- Consistent line heights

### Spacing

- 8px base unit system
- Consistent margins and padding
- Responsive spacing with viewport units

This structure provides a solid foundation for a creative portfolio website while maintaining clean, maintainable code.
