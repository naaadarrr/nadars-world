import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { MacOSWindowProps } from '../types';
import { useMacOSTheme } from './MacOSThemeProvider';
import { TrafficLights } from './TrafficLights';
import { useWindowManager } from '../hooks/useWindowManager';

export const WindowFrame: React.FC<MacOSWindowProps> = ({
  children,
  title,
  onClose,
  onMinimize,
  onMaximize,
  isForeground = true,
  isShaking = false,
  transparentBackground = false,
  windowConstraints = {},
  className = '',
  style = {},
}) => {
  const { theme } = useMacOSTheme();
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);

  const defaultConstraints = {
    minWidth: 300,
    minHeight: 200,
    maxWidth: window.innerWidth,
    maxHeight: window.innerHeight,
    ...windowConstraints,
  };

  const {
    windowPosition,
    windowSize,
    isDragging,
    resizeType,
    handleMouseDown,
    handleResizeStart,
    setWindowSize,
    setWindowPosition,
  } = useWindowManager({
    initialPosition: { x: 100, y: 100 },
    initialSize: { width: 600, height: 400 },
    minSize: { width: defaultConstraints.minWidth!, height: defaultConstraints.minHeight! },
    maxSize: {
      width:
        typeof defaultConstraints.maxWidth === 'number'
          ? defaultConstraints.maxWidth
          : window.innerWidth,
      height:
        typeof defaultConstraints.maxHeight === 'number'
          ? defaultConstraints.maxHeight
          : window.innerHeight,
    },
  });

  // Remove initial mount state after animation
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialMount(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target === e.currentTarget && !isOpen && e.propertyName === 'opacity') {
        setIsVisible(false);
      }
    },
    [isOpen],
  );

  const handleCloseClick = () => {
    setIsOpen(false);
    // Call onClose after animation completes
    setTimeout(() => {
      onClose?.();
    }, 200);
  };

  const handleMaximizeClick = () => {
    if (isMaximized) {
      // Restore to default size
      setWindowSize({ width: 600, height: 400 });
      setWindowPosition({ x: 100, y: 100 });
      setIsMaximized(false);
    } else {
      // Maximize
      const maxWidth =
        typeof defaultConstraints.maxWidth === 'number'
          ? defaultConstraints.maxWidth
          : window.innerWidth;
      const maxHeight =
        typeof defaultConstraints.maxHeight === 'number'
          ? defaultConstraints.maxHeight
          : window.innerHeight;

      setWindowSize({ width: maxWidth, height: maxHeight });
      setWindowPosition({ x: 0, y: 0 });
      setIsMaximized(true);
    }
    onMaximize?.();
  };

  const handleTitleBarDoubleClick = (e: React.MouseEvent) => {
    // Don't trigger on traffic lights
    if ((e.target as HTMLElement).closest('.traffic-lights')) {
      return;
    }
    handleMaximizeClick();
  };

  if (!isVisible) return null;

  const windowStyle = {
    left: windowPosition.x,
    top: windowPosition.y,
    width: windowSize.width,
    height: windowSize.height,
    transition: isDragging || resizeType ? 'none' : 'all 0.2s ease-in-out',
    transform: !isInitialMount && !isOpen ? 'scale(0.95)' : 'scale(1)',
    opacity: !isInitialMount && !isOpen ? 0 : 1,
    transformOrigin: 'center',
    ...style,
  };

  return (
    <motion.div
      className={`fixed select-none ${className}`}
      style={windowStyle}
      initial={isInitialMount ? { opacity: 0, scale: 0.95 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="relative w-full h-full">
        {/* Resize handles */}
        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 pointer-events-none">
          {/* Top */}
          <div
            className="absolute left-2 right-2 top-0 h-2 cursor-n-resize pointer-events-auto"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
            onTouchStart={(e) => handleResizeStart(e, 'n')}
          />
          {/* Bottom */}
          <div
            className="absolute left-2 right-2 bottom-0 h-2 cursor-s-resize pointer-events-auto"
            onMouseDown={(e) => handleResizeStart(e, 's')}
            onTouchStart={(e) => handleResizeStart(e, 's')}
          />
          {/* Left */}
          <div
            className="absolute left-0 top-2 bottom-2 w-2 cursor-w-resize pointer-events-auto"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
            onTouchStart={(e) => handleResizeStart(e, 'w')}
          />
          {/* Right */}
          <div
            className="absolute right-0 top-2 bottom-2 w-2 cursor-e-resize pointer-events-auto"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
            onTouchStart={(e) => handleResizeStart(e, 'e')}
          />
          {/* Corners */}
          <div
            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize pointer-events-auto"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
            onTouchStart={(e) => handleResizeStart(e, 'nw')}
          />
          <div
            className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize pointer-events-auto"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
            onTouchStart={(e) => handleResizeStart(e, 'ne')}
          />
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize pointer-events-auto"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
            onTouchStart={(e) => handleResizeStart(e, 'sw')}
          />
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize pointer-events-auto"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
            onTouchStart={(e) => handleResizeStart(e, 'se')}
          />
        </div>

        {/* Window content */}
        <div
          className={`w-full h-full flex flex-col overflow-hidden ${
            isShaking ? 'animate-shake' : ''
          }`}
          style={{
            borderRadius: theme.metrics.titleBarRadius,
            border: `${theme.metrics.borderWidth} solid ${
              isForeground
                ? theme.colors.windowBorder
                : theme.colors.windowBorderInactive || theme.colors.windowBorder
            }`,
            boxShadow: theme.metrics.windowShadow,
            backgroundColor: transparentBackground ? 'transparent' : theme.colors.windowBg,
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between px-3 py-1 cursor-move select-none traffic-lights-container"
            style={{
              height: theme.metrics.titleBarHeight,
              background: isForeground
                ? theme.colors.titleBar.activeBg
                : theme.colors.titleBar.inactiveBg,
              borderBottom: `1px solid ${
                isForeground
                  ? theme.colors.titleBar.borderBottom ||
                    theme.colors.titleBar.border ||
                    'transparent'
                  : theme.colors.titleBar.borderInactive || 'transparent'
              }`,
              borderRadius: `${theme.metrics.titleBarRadius} ${theme.metrics.titleBarRadius} 0 0`,
              color: isForeground ? theme.colors.titleBar.text : theme.colors.titleBar.inactiveText,
              fontFamily: theme.fonts.ui,
              fontSize: '13px',
              fontWeight: '500',
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onDoubleClick={handleTitleBarDoubleClick}
          >
            {/* Traffic lights */}
            <div className="traffic-lights">
              <TrafficLights
                onClose={handleCloseClick}
                onMinimize={onMinimize}
                onMaximize={handleMaximizeClick}
                isForeground={isForeground}
              />
            </div>

            {/* Title */}
            <div className="flex-1 text-center font-medium truncate px-4">{title}</div>

            {/* Spacer to balance traffic lights */}
            <div style={{ width: '68px' }} />
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-hidden">{children}</div>
        </div>
      </div>
    </motion.div>
  );
};
