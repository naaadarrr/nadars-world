import React, { useEffect, useRef, useState } from 'react';

interface CircularCursorProps {
  enabled?: boolean;
  size?: number;
  hoverSize?: number;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
}

const CircularCursor: React.FC<CircularCursorProps> = ({
  enabled = true,
  size = 16,
  hoverSize = 32,
  color = '#FFFFFF',
  borderColor = '#FFFFFF',
  borderWidth = 2
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.tagName === 'BUTTON' || 
                         target.tagName === 'A' || 
                         target.onclick !== null ||
                         target.style.cursor === 'pointer' ||
                         target.closest('button') ||
                         target.closest('a') ||
                         target.closest('[onclick]') ||
                         target.closest('[style*="cursor: pointer"]') ||
                         target.closest('img') || // 图片也视为可点击
                         target.closest('[role="button"]');
      
      // 检查是否在slider区域
      const isInSlider = target.closest('[data-slider]') || 
                        target.closest('.slide') ||
                        target.closest('[style*="cursor: none"]');
      
      setIsHovering(Boolean(isClickable || isInSlider));
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    // 隐藏默认光标
    document.body.style.cursor = 'none';

    // 添加事件监听器
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      // 恢复默认光标
      document.body.style.cursor = 'auto';
      
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [enabled, isVisible]);

  if (!enabled) return null;

  const currentSize = isHovering ? hoverSize : size;

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: currentSize,
        height: currentSize,
        borderRadius: '50%',
        background: isHovering ? 'transparent' : color, // hover时透明，默认实心
        border: isHovering ? `${borderWidth}px solid ${borderColor}` : 'none', // hover时显示边框
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate(${position.x - currentSize / 2}px, ${position.y - currentSize / 2}px)`,
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.15s ease-out',
        mixBlendMode: 'difference',
        boxShadow: isHovering ? `0 0 10px ${borderColor}` : 'none', // hover时添加发光效果
      }}
    />
  );
};

export default CircularCursor;
