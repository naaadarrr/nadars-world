import { useState, useEffect } from 'react';

interface LetterProps {
  letter: string;
  index: number;
  finalX: number;
  finalY: number;
  isAnimating: boolean;
  isScattering: boolean;
  onScatterComplete?: () => void;
  onLetterClick?: () => void;
}

const AnimatedLetter: React.FC<LetterProps & { finalRotation?: number; finalScale?: number }> = ({ 
  letter, index, finalX, finalY, isAnimating, isScattering, onScatterComplete, onLetterClick, finalRotation = 0, finalScale = 1 
}) => {
  const [position, setPosition] = useState(() => {
    // 从随机位置开始动画，确保在可见区域内
    return {
      x: Math.random() * 240 + 30, // 限制在卡片范围内 (270px width)
      y: Math.random() * 120 + 30, // 限制在卡片范围内 (150px height)
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.4 + Math.random() * 0.3, // 稍微增大初始尺寸
    };
  });

  const [scatterPosition] = useState(() => {
    // 气球效果的分散位置
    const horizontalRange = 30;
    const verticalRange = 25;
    const rotationRange = 15;
    
    return {
      x: finalX + (Math.random() - 0.5) * horizontalRange,
      y: finalY + (Math.random() - 0.5) * verticalRange,
      rotation: finalRotation + (Math.random() - 0.5) * rotationRange,
      scale: finalScale * (0.96 + Math.random() * 0.08),
    };
  });

  useEffect(() => {
    if (isAnimating && !isScattering) {
      // 汇聚动画
      const timer = setTimeout(() => {
        setPosition({
          x: finalX,
          y: finalY,
          rotation: finalRotation,
          scale: finalScale,
        });
      }, index * 8);

      return () => clearTimeout(timer);
    }
  }, [isAnimating, isScattering, finalX, finalY, index, finalRotation, finalScale]);

  useEffect(() => {
    if (isScattering) {
      // 分散动画
      const timer = setTimeout(() => {
        setPosition({
          x: scatterPosition.x,
          y: scatterPosition.y,
          rotation: scatterPosition.rotation,
          scale: scatterPosition.scale,
        });

        // 分散完成后触发回调
        if (index === 0 && onScatterComplete) {
          setTimeout(() => {
            onScatterComplete();
          }, 200);
        }
      }, index * 3);

      return () => clearTimeout(timer);
    }
  }, [isScattering, scatterPosition, index, onScatterComplete]);

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) rotate(${position.rotation}deg) scale(${position.scale})`,
        transition: (isAnimating || isScattering)
          ? isScattering 
            ? `all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.1)`
            : `all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)`
          : 'none',
        fontSize: '32px', // 适合卡片大小
        fontFamily: '"SK Pupok-Solid Demo", "Arial Black", sans-serif',
        fontWeight: '900',
        color: '#ffffff',
        WebkitTextStroke: '1px #000000',
        textShadow: `
          1px 1px 0px #000000,
          2px 2px 0px #000000,
          3px 3px 0px rgba(0, 0, 0, 0.8)
        `,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      {letter}
      
      {/* 字母点击区域 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '40px',
          pointerEvents: 'auto',
          cursor: 'pointer',
          zIndex: 3,
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (onLetterClick) {
            onLetterClick();
          }
        }}
      />
    </div>
  );
};

export const NadarPageTitleAnimation: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScattering, setIsScattering] = useState(false);
  const [isClickable, setIsClickable] = useState(false);

  const letters = ['N', 'A', 'D', 'A', 'R', ' ', 'P', 'A', 'G', 'E'];
  
  // 适合卡片的字母布局
  const calculateFinalPositions = () => {
    const centerX = 135; // 卡片中心 (270px / 2)
    const centerY = 75;  // 卡片中心 (150px / 2)
    
    const letterSettings = [
      // NADAR - 上层
      { x: -40, y: -20, rotation: -3, scale: 0.8 },   // N
      { x: -20, y: -15, rotation: 5, scale: 0.7 },    // A
      { x: 0, y: -22, rotation: -2, scale: 0.9 },      // D
      { x: 20, y: -18, rotation: 7, scale: 0.65 },     // A
      { x: 40, y: -20, rotation: -4, scale: 0.85 },   // R
      // PAGE - 下层
      { x: -35, y: 15, rotation: 4, scale: 0.8 },      // P
      { x: -15, y: 10, rotation: -3, scale: 0.6 },    // A
      { x: 5, y: 12, rotation: 8, scale: 0.85 },     // G
      { x: 25, y: 15, rotation: 6, scale: 0.7 },     // E
    ];
    
    let settingIndex = 0;
    
    return letters.map((letter) => {
      if (letter === ' ') {
        return {
          letter,
          finalX: centerX,
          finalY: centerY,
          finalRotation: 0,
          finalScale: 1,
        };
      }
      
      const setting = letterSettings[settingIndex];
      settingIndex++;
      
      return {
        letter,
        finalX: centerX + setting.x,
        finalY: centerY + setting.y,
        finalRotation: setting.rotation,
        finalScale: setting.scale,
      };
    });
  };

  const letterPositions = calculateFinalPositions();

  useEffect(() => {
    // 自动开始动画
    console.log('🚀 NadarPageTitleAnimation mounted, starting initial animation');
    const timer = setTimeout(() => {
      console.log('📥 Starting converge animation');
      setIsAnimating(true);
      // 汇聚动画完成后，标题变为可点击
      setTimeout(() => {
        console.log('🖱️ Making title clickable');
        setIsClickable(true);
      }, 800);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // 处理点击事件
  const handleTitleClick = () => {
    console.log('🎯 Title clicked!', { isClickable, isScattering });
    if (!isClickable || isScattering) {
      console.log('❌ Click ignored:', { isClickable, isScattering });
      return;
    }
    
    console.log('✅ Starting scatter animation');
    setIsClickable(false);
    setIsScattering(true);
  };

  // 处理分散完成回调
  const handleScatterComplete = () => {
    setIsScattering(false);
    setIsAnimating(true);
    // 重新汇聚后再次变为可点击
    setTimeout(() => {
      setIsClickable(true);
    }, 400);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        pointerEvents: 'auto', // 允许点击事件
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={handleTitleClick} // 点击触发动画
    >
      {letterPositions.map((pos, index) => (
        pos.letter !== ' ' && (
          <AnimatedLetter
            key={index}
            letter={pos.letter}
            index={index}
            finalX={pos.finalX}
            finalY={pos.finalY}
            finalRotation={pos.finalRotation}
            finalScale={pos.finalScale}
            isAnimating={isAnimating}
            isScattering={isScattering}
            onScatterComplete={index === 0 ? handleScatterComplete : undefined}
            onLetterClick={isClickable ? handleTitleClick : undefined}
          />
        )
      ))}
      
      <style>{`
        @font-face {
          font-family: 'SK Pupok-Solid Demo';
          src: url('./assets/fonts/SK Pupok-Solid Demo.ttf') format('truetype');
          font-weight: 900;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
    </div>
  );
};
