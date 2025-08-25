import React, { useEffect, useRef, useState, useCallback } from 'react';
import raphasockImage from '../assets/image/raphasock.png';
import horseImage from '../assets/image/horse.png';
import eggImage from '../assets/image/egg.png';
import coffeecupImage from '../assets/image/coffeecup.png';

interface ImageSwitchingMouseFollowerProps {
  enabled?: boolean;
  size?: number;
  offsetX?: number;
  offsetY?: number;
  smoothness?: number;
  effect?: 'smooth' | 'bounce' | 'elastic' | 'trail';
  switchInterval?: number;
  images?: string[];
}

const ImageSwitchingMouseFollower: React.FC<ImageSwitchingMouseFollowerProps> = ({
  enabled = true,
  size = 60,
  offsetX = 30,
  offsetY = 30,
  smoothness = 0.15,
  effect = 'smooth',
  switchInterval = 3000,
  images = [raphasockImage, horseImage, eggImage, coffeecupImage]
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const switchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastMoveTime = useRef<number>(0);

  // 图片切换函数
  const switchImage = useCallback(() => {
    if (images.length <= 1) return;
    
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // 启动图片切换定时器 - 只在鼠标移动时切换
  useEffect(() => {
    if (!enabled || images.length <= 1) return;

    // 立即显示第一张图片
    setIsVisible(true);
    
    // 清除之前的定时器
    if (switchTimerRef.current) {
      clearInterval(switchTimerRef.current);
    }

    // 只有在鼠标移动时才启动定时器
    if (isMoving) {
      switchTimerRef.current = setInterval(switchImage, switchInterval);
    }

    return () => {
      if (switchTimerRef.current) {
        clearInterval(switchTimerRef.current);
      }
    };
  }, [enabled, switchInterval, switchImage, images.length, isMoving]);

  useEffect(() => {
    if (!enabled) return;

    let animationId: number;

    const updateFollowerPosition = () => {
      let newX = followerPosition.x;
      let newY = followerPosition.y;

      switch (effect) {
        case 'smooth':
          newX = followerPosition.x + (mousePosition.x - followerPosition.x) * smoothness;
          newY = followerPosition.y + (mousePosition.y - followerPosition.y) * smoothness;
          break;

        case 'elastic':
          const spring = 0.1;
          const friction = 0.8;
          const accelerationX = (mousePosition.x - followerPosition.x) * spring;
          const accelerationY = (mousePosition.y - followerPosition.y) * spring;
          const newVelocityX = velocity.x * friction + accelerationX;
          const newVelocityY = velocity.y * friction + accelerationY;
          newX = followerPosition.x + newVelocityX;
          newY = followerPosition.y + newVelocityY;
          setVelocity({ x: newVelocityX, y: newVelocityY });
          break;

        case 'bounce':
          const diffX = mousePosition.x - followerPosition.x;
          const diffY = mousePosition.y - followerPosition.y;
          const bounce = Math.sin(Date.now() * 0.01) * 5;
          newX = followerPosition.x + diffX * smoothness + bounce;
          newY = followerPosition.y + diffY * smoothness + bounce;
          break;
      }

      setFollowerPosition({ x: newX, y: newY });
      animationId = requestAnimationFrame(updateFollowerPosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = {
        x: e.clientX + offsetX,
        y: e.clientY + offsetY
      };

      setMousePosition(newPosition);
      
      const newVelocity = {
        x: newPosition.x - lastMousePosition.current.x,
        y: newPosition.y - lastMousePosition.current.y
      };
      setVelocity(newVelocity);
      lastMousePosition.current = newPosition;
      
      // 检查鼠标是否在移动
      const speed = Math.sqrt(newVelocity.x * newVelocity.x + newVelocity.y * newVelocity.y);
      const currentTime = Date.now();
      
      if (speed > 1) {
        // 鼠标在移动
        setIsMoving(true);
        setIsVisible(true);
        lastMoveTime.current = currentTime;
      } else {
        // 鼠标停止移动，但延迟1秒后才停止切换
        const timeSinceLastMove = currentTime - lastMoveTime.current;
        if (timeSinceLastMove > 1000) {
          setIsMoving(false);
        }
        setIsVisible(true);
      }
    };

      const handleMouseLeave = () => {
    // 鼠标离开页面时隐藏
    setIsVisible(false);
  };

  const handleMouseEnter = () => {
    // 鼠标进入页面时显示
    setIsVisible(true);
  };

    updateFollowerPosition();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [enabled, mousePosition.x, mousePosition.y, smoothness, offsetX, offsetY, isVisible, effect, velocity, followerPosition]);

  if (!enabled) return null;

  return (
    <div
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
        }}
    >
              <img
          src={images[currentImageIndex]}
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

export default ImageSwitchingMouseFollower;
