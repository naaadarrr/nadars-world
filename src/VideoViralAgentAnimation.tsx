import { useState, useRef, useEffect } from 'react';

interface VideoViralAgentAnimationProps {
  isDetailView?: boolean;
}

const VideoViralAgentAnimation: React.FC<VideoViralAgentAnimationProps> = ({ isDetailView = false }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [hasPlayedInitial, setHasPlayedInitial] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const handleReplay = () => {
    setIsAnimating(true);
    setAnimationKey(prev => prev + 1);
  };

  // 组件挂载时开始动画 - 只执行一次
  useEffect(() => {
    if (!hasPlayedInitial) {
      setIsAnimating(true);
      setAnimationKey(0);
      setHasPlayedInitial(true);
    }
  }, [hasPlayedInitial]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        // 确保动画结束后显示纯白色
        if (textRef.current) {
          textRef.current.style.color = '#fff';
          textRef.current.style.background = 'none';
          (textRef.current.style as any).webkitTextFillColor = '#fff';
        }
      }, isDetailView ? 1800 : 1500);

      return () => clearTimeout(timer);
    }
  }, [isAnimating, isDetailView]);

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: isDetailView ? 'space-between' : 'center',
      overflow: 'visible'
    }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: isDetailView ? '70%' : '100%', // 在详情视图中只占70%高度
          position: 'relative',
        }}
      >
        {/* Shimmer文字效果 - 白色到彩色再到白色 */}
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
          }}
        >
          {/* 基础文字 - 始终白色 */}
          <div
            ref={textRef}
            style={{
              fontSize: isDetailView ? '120px' : '20px',
              fontWeight: '600',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              color: '#fff',
              textAlign: 'center',
              lineHeight: 1.1,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Video Viral Agent
          </div>
          
          {/* 光效层 - 只在动画时显示 */}
          {isAnimating && (
            <div
              key={animationKey}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                fontSize: isDetailView ? '120px' : '20px',
                fontWeight: '600',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                background: 'linear-gradient(90deg, transparent 0%, transparent 35%, #F385F3 42%, #DFE0FF 47%, #30D5E5 52%, #1E34FF 57%, transparent 65%, transparent 100%)',
                backgroundSize: '350% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: isDetailView ? 'lightSweep 1.8s ease-out forwards' : 'lightSweep 1.5s ease-out forwards',
                willChange: 'background-position',
                textAlign: 'center',
                lineHeight: 1.1,
                zIndex: 2,
              } as React.CSSProperties}
            >
              Video Viral Agent
            </div>
          )}
        </div>
      </div>

      {/* 重播按钮 - 只在详情视图显示 */}
      {isDetailView && (
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '30%', // 占用剩余的30%高度
            position: 'relative',
            zIndex: 10,
            paddingBottom: '20px'
          }}
        >
          <button
            onClick={handleReplay}
            disabled={isAnimating}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              padding: '14px 28px',
              color: '#fff',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '15px',
              fontWeight: '600',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: isAnimating ? 0.6 : 1,
              backdropFilter: 'blur(15px)',
              outline: 'none',
              position: 'relative',
              zIndex: 11,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            }}
            onMouseEnter={(e) => {
              if (!isAnimating) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isAnimating) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
              }
            }}
          >
            {isAnimating ? '⏸ Playing...' : '▶ Replay'}
          </button>
        </div>
      )}

      <style>
        {`
          @keyframes lightSweep {
            0% { 
              background-position: -120% 0; 
            }
            100% { 
              background-position: 120% 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default VideoViralAgentAnimation;