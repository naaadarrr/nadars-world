export interface MacOSTheme {
  id: string;
  name: string;
  fonts: {
    ui: string;
    mono?: string;
  };
  colors: {
    windowBg: string;
    menubarBg: string;
    menubarBorder: string;
    windowBorder: string;
    windowBorderInactive?: string;
    titleBar: {
      activeBg: string;
      inactiveBg: string;
      text: string;
      inactiveText: string;
      border?: string;
      borderInactive?: string;
      borderBottom?: string;
    };
    button: {
      face: string;
      highlight: string;
      shadow: string;
      activeFace?: string;
    };
    trafficLights?: {
      close: string;
      closeHover?: string;
      minimize: string;
      minimizeHover?: string;
      maximize: string;
      maximizeHover?: string;
    };
    selection: {
      bg: string;
      text: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
  };
  metrics: {
    borderWidth: string;
    radius: string;
    titleBarHeight: string;
    titleBarRadius?: string;
    windowShadow: string;
  };
}

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface MacOSWindowProps {
  children: React.ReactNode;
  title: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isForeground?: boolean;
  isShaking?: boolean;
  transparentBackground?: boolean;
  skipInitialSound?: boolean;
  windowConstraints?: {
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number | string;
    maxHeight?: number | string;
  };
  className?: string;
  style?: React.CSSProperties;
}

export type ResizeType = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'human';
  username?: string;
  createdAt?: Date;
  isPending?: boolean;
}
