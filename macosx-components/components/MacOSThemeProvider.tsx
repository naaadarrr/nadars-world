import React, { createContext, useContext, useEffect } from 'react';
import type { MacOSTheme } from '../types';
import { macosTheme } from '../theme/macosTheme';

interface MacOSThemeContextType {
  theme: MacOSTheme;
}

const MacOSThemeContext = createContext<MacOSThemeContextType | undefined>(undefined);

export const useMacOSTheme = () => {
  const context = useContext(MacOSThemeContext);
  if (context === undefined) {
    throw new Error('useMacOSTheme must be used within a MacOSThemeProvider');
  }
  return context;
};

interface MacOSThemeProviderProps {
  children: React.ReactNode;
  theme?: MacOSTheme;
}

export const MacOSThemeProvider: React.FC<MacOSThemeProviderProps> = ({
  children,
  theme = macosTheme,
}) => {
  useEffect(() => {
    // Apply CSS custom properties to the document root
    const root = document.documentElement;

    // Font variables
    root.style.setProperty('--macos-font-ui', theme.fonts.ui);
    root.style.setProperty('--macos-font-mono', theme.fonts.mono || theme.fonts.ui);

    // Color variables
    root.style.setProperty('--macos-window-bg', theme.colors.windowBg);
    root.style.setProperty('--macos-window-border', theme.colors.windowBorder);
    root.style.setProperty(
      '--macos-window-border-inactive',
      theme.colors.windowBorderInactive || theme.colors.windowBorder,
    );

    // Title bar colors
    root.style.setProperty('--macos-titlebar-active-bg', theme.colors.titleBar.activeBg);
    root.style.setProperty('--macos-titlebar-inactive-bg', theme.colors.titleBar.inactiveBg);
    root.style.setProperty('--macos-titlebar-text', theme.colors.titleBar.text);
    root.style.setProperty('--macos-titlebar-text-inactive', theme.colors.titleBar.inactiveText);
    root.style.setProperty(
      '--macos-titlebar-border',
      theme.colors.titleBar.border || 'transparent',
    );
    root.style.setProperty(
      '--macos-titlebar-border-inactive',
      theme.colors.titleBar.borderInactive || 'transparent',
    );
    root.style.setProperty(
      '--macos-titlebar-border-bottom',
      theme.colors.titleBar.borderBottom || 'transparent',
    );

    // Traffic light colors
    if (theme.colors.trafficLights) {
      root.style.setProperty('--macos-traffic-close', theme.colors.trafficLights.close);
      root.style.setProperty(
        '--macos-traffic-close-hover',
        theme.colors.trafficLights.closeHover || theme.colors.trafficLights.close,
      );
      root.style.setProperty('--macos-traffic-minimize', theme.colors.trafficLights.minimize);
      root.style.setProperty(
        '--macos-traffic-minimize-hover',
        theme.colors.trafficLights.minimizeHover || theme.colors.trafficLights.minimize,
      );
      root.style.setProperty('--macos-traffic-maximize', theme.colors.trafficLights.maximize);
      root.style.setProperty(
        '--macos-traffic-maximize-hover',
        theme.colors.trafficLights.maximizeHover || theme.colors.trafficLights.maximize,
      );
    }

    // Metrics
    root.style.setProperty('--macos-border-width', theme.metrics.borderWidth);
    root.style.setProperty('--macos-radius', theme.metrics.radius);
    root.style.setProperty('--macos-titlebar-height', theme.metrics.titleBarHeight);
    root.style.setProperty(
      '--macos-titlebar-radius',
      theme.metrics.titleBarRadius || theme.metrics.radius,
    );
    root.style.setProperty('--macos-window-shadow', theme.metrics.windowShadow);

    // Text colors
    root.style.setProperty('--macos-text-primary', theme.colors.text.primary);
    root.style.setProperty('--macos-text-secondary', theme.colors.text.secondary);
    root.style.setProperty('--macos-text-disabled', theme.colors.text.disabled);

    // Selection colors
    root.style.setProperty('--macos-selection-bg', theme.colors.selection.bg);
    root.style.setProperty('--macos-selection-text', theme.colors.selection.text);
  }, [theme]);

  return <MacOSThemeContext.Provider value={{ theme }}>{children}</MacOSThemeContext.Provider>;
};
