import { useState, useCallback, useRef, useEffect } from 'react';
import type { WindowPosition, WindowSize, ResizeType } from '../types';

interface UseWindowManagerProps {
  initialPosition?: WindowPosition;
  initialSize?: WindowSize;
  minSize?: WindowSize;
  maxSize?: WindowSize;
  onPositionChange?: (position: WindowPosition) => void;
  onSizeChange?: (size: WindowSize) => void;
}

export const useWindowManager = ({
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 600, height: 400 },
  minSize = { width: 300, height: 200 },
  maxSize,
  onPositionChange,
  onSizeChange,
}: UseWindowManagerProps = {}) => {
  const [windowPosition, setWindowPosition] = useState<WindowPosition>(initialPosition);
  const [windowSize, setWindowSize] = useState<WindowSize>(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [resizeType, setResizeType] = useState<ResizeType | null>(null);

  const dragStartRef = useRef<{ x: number; y: number; windowX: number; windowY: number } | null>(
    null,
  );
  const resizeStartRef = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
    windowX: number;
    windowY: number;
  } | null>(null);

  // Handle mouse/touch move events
  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (isDragging && dragStartRef.current) {
        const deltaX = clientX - dragStartRef.current.x;
        const deltaY = clientY - dragStartRef.current.y;

        const newPosition = {
          x: Math.max(0, dragStartRef.current.windowX + deltaX),
          y: Math.max(0, dragStartRef.current.windowY + deltaY),
        };

        setWindowPosition(newPosition);
        onPositionChange?.(newPosition);
      }

      if (resizeType && resizeStartRef.current) {
        const deltaX = clientX - resizeStartRef.current.x;
        const deltaY = clientY - resizeStartRef.current.y;

        let newSize = { ...windowSize };
        let newPosition = { ...windowPosition };

        // Handle different resize directions
        if (resizeType.includes('e')) {
          newSize.width = Math.max(minSize.width, resizeStartRef.current.width + deltaX);
          if (maxSize?.width) {
            newSize.width = Math.min(newSize.width, maxSize.width);
          }
        }

        if (resizeType.includes('w')) {
          const newWidth = Math.max(minSize.width, resizeStartRef.current.width - deltaX);
          const widthDiff = newWidth - resizeStartRef.current.width;
          newSize.width = newWidth;
          newPosition.x = Math.max(0, resizeStartRef.current.windowX - widthDiff);

          if (maxSize?.width) {
            newSize.width = Math.min(newSize.width, maxSize.width);
          }
        }

        if (resizeType.includes('s')) {
          newSize.height = Math.max(minSize.height, resizeStartRef.current.height + deltaY);
          if (maxSize?.height) {
            newSize.height = Math.min(newSize.height, maxSize.height);
          }
        }

        if (resizeType.includes('n')) {
          const newHeight = Math.max(minSize.height, resizeStartRef.current.height - deltaY);
          const heightDiff = newHeight - resizeStartRef.current.height;
          newSize.height = newHeight;
          newPosition.y = Math.max(0, resizeStartRef.current.windowY - heightDiff);

          if (maxSize?.height) {
            newSize.height = Math.min(newSize.height, maxSize.height);
          }
        }

        setWindowSize(newSize);
        setWindowPosition(newPosition);
        onSizeChange?.(newSize);
        onPositionChange?.(newPosition);
      }
    },
    [
      isDragging,
      resizeType,
      windowSize,
      windowPosition,
      minSize,
      maxSize,
      onPositionChange,
      onSizeChange,
    ],
  );

  // Handle mouse/touch end events
  const handleEnd = useCallback(() => {
    setIsDragging(false);
    setResizeType(null);
    dragStartRef.current = null;
    resizeStartRef.current = null;
  }, []);

  // Mouse event handlers
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    },
    [handleMove],
  );

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Touch event handlers
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    },
    [handleMove],
  );

  const handleTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Add/remove event listeners
  useEffect(() => {
    if (isDragging || resizeType) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, resizeType, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Start dragging
  const handleMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      setIsDragging(true);
      dragStartRef.current = {
        x: clientX,
        y: clientY,
        windowX: windowPosition.x,
        windowY: windowPosition.y,
      };
    },
    [windowPosition],
  );

  // Start resizing
  const handleResizeStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent, type: ResizeType) => {
      e.preventDefault();
      e.stopPropagation();

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      setResizeType(type);
      resizeStartRef.current = {
        x: clientX,
        y: clientY,
        width: windowSize.width,
        height: windowSize.height,
        windowX: windowPosition.x,
        windowY: windowPosition.y,
      };
    },
    [windowSize, windowPosition],
  );

  return {
    windowPosition,
    windowSize,
    isDragging,
    resizeType,
    setWindowPosition,
    setWindowSize,
    handleMouseDown,
    handleResizeStart,
  };
};
