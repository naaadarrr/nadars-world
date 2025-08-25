import React, { useEffect, useRef, useState, useCallback } from 'react';
import raphasockImage from '../assets/image/raphasock.png';

interface AdvancedMouseFollowerProps {
  enabled?: boolean;
  size?: number;
  offsetX?: number;
  offsetY?: number;
  smoothness?: number;
  effect?: 'smooth' | 'bounce' | 'elastic' | 'trail';
  trailLength?: number;
  rotation?: boolean;
  scale?: boolean;
}

const AdvancedMouseFollower: React.FC<AdvancedMouseFollowerProps> = ({
  enabled = true,
  size = 60,
  offsetX = 30,
  offsetY = 30,
  smoothness = 0.15,
  effect = 'smooth',
  trailLength = 5,
  rotation = true,
  scale = true
}) => {
  const followerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [scaleValue, setScaleValue] = useState(1);
  const [trailPositions, setTrailPositions] = useState<Array<{x: number, y: number}>>([]);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastMousePosition = useRef({ x: 0, y: 0 });

  // 计算速度
  const calculateVelocity = useCallback((currentPos: {x: number, y: number}, lastPos: {x: number, y: number}) => {
    return {
      x: currentPos.x - lastPos.x,
      y: currentPos.y - lastPos.y
    };
  }, []);

  // 弹性效果
  const elasticFollow = useCallback((target: number, current: number, velocity: number) => {
    const spring = 0.1;
    const friction = 0.8;
    const acceleration = (target - current) * spring;
    const newVelocity = velocity * friction + acceleration;
    return { position: current + newVelocity, velocity: newVelocity };
  }, []);

  // 弹跳效果
  const bounceFollow = useCallback((target: number, current: number) => {
    const diff = target - current;
    const bounce = Math.sin(Date.now() * 0.01) * 5;
    return current + diff * smoothness + bounce;
  }, [smoothness]);

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
          const elasticX = elasticFollow(mousePosition.x, followerPosition.x, velocity.x);
          const elasticY = elasticFollow(mousePosition.y, followerPosition.y, velocity.y);
          newX = elasticX.position;
          newY = elasticY.position;
          setVelocity({ x: elasticX.velocity, y: elasticY.velocity });
          break;

        case 'bounce':
          newX = bounceFollow(mousePosition.x, followerPosition.x);
          newY = bounceFollow(mousePosition.y, followerPosition.y);
          break;

        case 'trail':
          // 更新轨迹
          const newTrail = [...trailPositions, { x: mousePosition.x, y: mousePosition.y }];
          if (newTrail.length > trailLength) {
            newTrail.shift();
          }
          setTrailPositions(newTrail);
          
          // 使用轨迹的最后一个位置
          if (newTrail.length > 0) {
            const lastTrailPos = newTrail[newTrail.length - 1];
            newX = followerPosition.x + (lastTrailPos.x - followerPosition.x) * smoothness;
            newY = followerPosition.y + (lastTrailPos.y - followerPosition.y) * smoothness;
          }
          break;
      }

      setFollowerPosition({ x: newX, y: newY });

      // 更新旋转角度
      if (rotation) {
        const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
        setRotationAngle(angle);
      }

      // 更新缩放
      if (scale) {
        const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
        const newScale = Math.max(0.8, Math.min(1.2, 1 + speed * 0.01));
        setScaleValue(newScale);
      }

      animationId = requestAnimationFrame(updateFollowerPosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = {
        x: e.clientX + offsetX,
        y: e.clientY + offsetY
      };

      setMousePosition(newPosition);
      
      // 计算速度
      const newVelocity = calculateVelocity(newPosition, lastMousePosition.current);
      setVelocity(newVelocity);
      lastMousePosition.current = newPosition;
      
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
  }, [enabled, mousePosition.x, mousePosition.y, smoothness, offsetX, offsetY, isVisible, effect, trailLength, rotation, scale, velocity, followerPosition, trailPositions, elasticFollow, bounceFollow, calculateVelocity]);

  if (!enabled) return null;

  return (
    <>
      {/* 轨迹效果 */}
      {effect === 'trail' && trailPositions.map((pos, index) => (
        <div
          key={index}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: size * (1 - index / trailLength),
            height: size * (1 - index / trailLength),
            pointerEvents: 'none',
            zIndex: 9998 - index,
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            opacity: (1 - index / trailLength) * 0.3,
            transition: 'opacity 0.1s ease',
          }}
        >
          <img
            src={raphasockImage}
            alt="Trail"
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
      ))}

      {/* 主跟随器 */}
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
          transform: `translate(${followerPosition.x}px, ${followerPosition.y}px) rotate(${rotationAngle}deg) scale(${scaleValue})`,
          opacity: isVisible ? 1 : 0,
          transition: effect === 'smooth' ? 'opacity 0.3s ease' : 'none',
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
    </>
  );
};

export default AdvancedMouseFollower;
