import React, { useEffect, useRef, useState } from 'react';
import raphasockImage from '../assets/image/raphasock.png';

interface MouseFollowerProps {
  enabled?: boolean;
  size?: number;
  offsetX?: number;
  offsetY?: number;
  smoothness?: number;
}

const MouseFollower: React.FC<MouseFollowerProps> = ({
  enabled = true,
  size = 60,
  offsetX = 30,
  offsetY = 30,
  smoothness = 0.15
}) => {
  const followerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let animationId: number;

    const updateFollowerPosition = () => {
      setFollowerPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * smoothness,
        y: prev.y + (mousePosition.y - prev.y) * smoothness
      }));
      animationId = requestAnimationFrame(updateFollowerPosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX + offsetX,
        y: e.clientY + offsetY
      });
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // 启动动画循环
    updateFollowerPosition();

    // 添加事件监听器
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [enabled, mousePosition.x, mousePosition.y, smoothness, offsetX, offsetY, isVisible]);

  if (!enabled) return null;

  return (
    <div
      ref={followerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height: size,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate(${followerPosition.x}px, ${followerPosition.y}px)`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
      }}
    >
              <img
          src={raphasockImage}
          alt="Mouse Follower"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
      />
    </div>
  );
};

export default MouseFollower;
