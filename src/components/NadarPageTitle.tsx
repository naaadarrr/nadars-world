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
  skipInitialAnimation?: boolean;
}

const AnimatedLetter: React.FC<LetterProps & { finalRotation?: number; finalScale?: number }> = ({ 
  letter, index, finalX, finalY, isAnimating, isScattering, onScatterComplete, onLetterClick, skipInitialAnimation = false, finalRotation = 0, finalScale = 1 
}) => {
  const [position, setPosition] = useState(() => {
    if (skipInitialAnimation) {
      // 跳过动画时直接设置为最终位置
      return {
        x: finalX,
        y: finalY,
        rotation: finalRotation,
        scale: finalScale,
      };
    } else {
      // 正常动画时从随机位置开始
      return {
        x: Math.random() * (window.innerWidth - 400) + 200,
        y: Math.random() * (window.innerHeight - 400) + 200,
        rotation: (Math.random() - 0.5) * 360, // -180 to 180 degrees，减少旋转范围
        scale: 0.3 + Math.random() * 0.4, // 增加初始缩放，减少缩放范围
      };
    }
  });

  const [scatterPosition] = useState(() => {
    // 为特定字母设置精确的摆动范围
    const isFirstA = letter === 'A' && index === 1;      // NADAR中的第一个A
    const isPageG = letter === 'G' && index === 8;       // PAGE中的G
    const isLetterE = letter === 'E';                     // 字母E
    
    let horizontalRange = 100;
    let verticalRange = 70;
    let rotationRange = 35;
    
    if (isFirstA) {
      horizontalRange = 70;  // 第一个A减少摆动，避免与D空隙过大
      verticalRange = 55;    // 垂直摆动也适当减少
      rotationRange = 25;    // 旋转摆动减少
    } else if (isPageG) {
      horizontalRange = 90;  // PAGE中的G增加摆动，让动画更明显
      verticalRange = 65;    // 垂直摆动适当增加
      rotationRange = 32;    // 旋转摆动增加
    } else if (isLetterE) {
      horizontalRange = 85;  // E的水平摆动略微减少
      verticalRange = 50;    // E的垂直摆动减少约30%，避免向下偏移太多
      rotationRange = 30;    // E的旋转摆动适当减少
    }
    
    return {
      x: finalX + (Math.random() - 0.5) * horizontalRange,
      y: finalY + (Math.random() - 0.5) * verticalRange,
      rotation: finalRotation + (Math.random() - 0.5) * rotationRange,
      scale: finalScale * (0.96 + Math.random() * 0.08), // 缩放保持一致
    };
  });

  useEffect(() => {
    if (isAnimating && !isScattering) {
      // 汇聚动画：所有字母几乎同时开始动画，只有极小的错开让效果更自然
      const timer = setTimeout(() => {
        setPosition({
          x: finalX,
          y: finalY,
          rotation: finalRotation,
          scale: finalScale,
        });
      }, index * 12); // 更丝滑的错开时序

      return () => clearTimeout(timer);
    }
  }, [isAnimating, isScattering, finalX, finalY, index, finalRotation, finalScale]);

  useEffect(() => {
    if (isScattering) {
      // 分散动画：立即移动到分散位置
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
          }, 280); // 分散动画持续0.28秒后开始汇聚，更丝滑的衔接
        }
      }, index * 5); // 字母更同步，减少错开感，整体更流畅

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
            ? `all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1)` // 分散：快速启动，轻微回弹，像气球被推开
            : `all 0.7s cubic-bezier(0.165, 0.84, 0.44, 1)` // 汇聚：丝滑的easeOutQuart，优雅回归
          : 'none',
        fontSize: '120px',
        fontFamily: '"SK Pupok-Solid Demo", "Arial Black", sans-serif',
        fontWeight: '900',
        color: '#ffffff',
        WebkitTextStroke: '2px #000000',
        textShadow: `
          2px 2px 0px #000000,
          4px 4px 0px #000000,
          6px 6px 0px #000000,
          8px 8px 0px rgba(0, 0, 0, 0.8),
          10px 10px 0px rgba(0, 0, 0, 0.6),
          12px 12px 0px rgba(0, 0, 0, 0.4)
        `,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 25,
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
          width: '80px',
          height: '80px',
          pointerEvents: 'auto',
          cursor: 'pointer',
          zIndex: 26,
          // 调试时可以启用背景色: backgroundColor: 'rgba(255, 0, 0, 0.2)',
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

interface NadarPageTitleProps {
  skipInitialAnimation?: boolean;
}

export const NadarPageTitle: React.FC<NadarPageTitleProps> = ({ skipInitialAnimation = false }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScattering, setIsScattering] = useState(false);
  const [isClickable, setIsClickable] = useState(skipInitialAnimation); // 如果跳过动画，直接可点击

  const letters = ['N', 'A', 'D', 'A', 'R', ' ', 'P', 'A', 'G', 'E'];
  
  // 创意字母编排：参考图片风格，加入旋转、缩放、重叠效果
  const calculateFinalPositions = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.35;
    
    // 创意字母编排，适当分开的布局，保持视觉平衡
    const letterSettings = [
      // NADAR - 上层，创意排列
      { x: -130, y: -45, rotation: -6, scale: 1.1 },   // N - 左侧，稍大，轻微左倾
      { x: -65, y: -30, rotation: 8, scale: 0.95 },    // A - 左中，轻微右倾
      { x: 0, y: -50, rotation: -3, scale: 1.2 },      // D - 中心，最大，轻微左倾
      { x: 55, y: -35, rotation: 10, scale: 0.9 },     // A - 右中，轻微右倾
      { x: 110, y: -40, rotation: -7, scale: 1.25 },   // R - 右侧，轻微左倾，放大
      // 空格跳过
      // PAGE - 下层，创意排列，适当分开
      { x: -110, y: 25, rotation: 8, scale: 1.1 },      // P - 左侧，向左偏移
      { x: -55, y: 15, rotation: -6, scale: 0.85 },    // A - 向左偏移
      { x: 15, y: 20, rotation: 14, scale: 1.15 },     // G - 中心，向左偏移
      { x: 70, y: 25, rotation: 18, scale: 0.95 },     // E - 右侧，向上移动
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
    if (skipInitialAnimation) {
      // 跳过动画，直接显示最终状态
      setIsAnimating(true);
      setIsClickable(true);
    } else {
      // 组件挂载后立即开始动画
      const timer = setTimeout(() => {
        setIsAnimating(true);
        // 汇聚动画完成后，标题变为可点击
        setTimeout(() => {
          setIsClickable(true);
        }, 1200); // 等待汇聚动画完成
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [skipInitialAnimation]);

  // 处理点击事件
  const handleTitleClick = () => {
    if (!isClickable || isScattering) return;
    
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
    }, 650); // 配合新的动画时序
  };



  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // 容器本身不可点击
        zIndex: 30,
      }}
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
            skipInitialAnimation={skipInitialAnimation}
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