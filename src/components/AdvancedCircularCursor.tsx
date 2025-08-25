import React, { useEffect, useRef, useState } from 'react';

interface AdvancedCircularCursorProps {
  enabled?: boolean;
  size?: number;
  hoverSize?: number;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  trail?: boolean;
  trailLength?: number;
  trailOpacity?: number;
}

const AdvancedCircularCursor: React.FC<AdvancedCircularCursorProps> = ({
  enabled = true,
  size = 16,
  hoverSize = 32,
  color = 'rgba(255, 255, 255, 0.9)',
  borderColor = 'rgba(255, 255, 255, 1)',
  borderWidth = 2,
  trail = false,
  trailLength = 5,
  trailOpacity = 0.3
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trailPositions, setTrailPositions] = useState<Array<{x: number, y: number}>>([]);

  useEffect(() => {
    if (!enabled) return;

    const updateCursor = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      
      // 更新轨迹
      if (trail) {
        setTrailPositions(prev => {
          const newTrail = [...prev, newPosition];
          if (newTrail.length > trailLength) {
            newTrail.shift();
          }
          return newTrail;
        });
      }
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrailPositions([]);
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
                         target.closest('[style*="cursor: pointer"]');
      
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
  }, [enabled, isVisible, trail, trailLength]);

  if (!enabled) return null;

  const currentSize = isHovering ? hoverSize : size;

  return (
    <>
      {/* 轨迹效果 */}
      {trail && trailPositions.map((pos, index) => (
        <div
          key={index}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: size * (1 - index / trailLength),
            height: size * (1 - index / trailLength),
            borderRadius: '50%',
            background: color,
            pointerEvents: 'none',
            zIndex: 9998 - index,
            transform: `translate(${pos.x - (size * (1 - index / trailLength)) / 2}px, ${pos.y - (size * (1 - index / trailLength)) / 2}px)`,
            opacity: trailOpacity * (1 - index / trailLength),
            transition: 'opacity 0.1s ease',
          }}
        />
      ))}

      {/* 主光标 */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: currentSize,
          height: currentSize,
          borderRadius: '50%',
          background: isHovering ? 'transparent' : color,
          border: isHovering ? `${borderWidth}px solid ${borderColor}` : 'none',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate(${position.x - currentSize / 2}px, ${position.y - currentSize / 2}px)`,
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.15s ease-out',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
};

export default AdvancedCircularCursor;
