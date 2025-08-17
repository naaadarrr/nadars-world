import { useState } from 'react';
import TaskProgressLoadingAnimation from '../TaskProgressLoadingAnimation';
import TextAnimations from '../TextAnimations';
import TypewriterAnimation from '../TypewriterAnimation';
import VideoViralAgentAnimation from '../VideoViralAgentAnimation';
import { NadarPageTitleAnimation } from '../components/animations/NadarPageTitleAnimation';
import macintoshBg from '../assets/macintosh.png';
// import taskProgressAnimation from '../assets/TaskProgressLoadingAnimation.json';
// import Lottie from 'lottie-react';
import GallerySlider from '../components/GallerySlider';

interface AnimationsPageProps {
  onNavigate: (page: string) => void;
}

export default function AnimationsPage({ onNavigate }: AnimationsPageProps) {
  // const [dotsCount, setDotsCount] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'stack' | 'gallery'>('gallery');
  const [selectedAnimation, setSelectedAnimation] = useState<number | null>(null);
  const [detailViewId, setDetailViewId] = useState<number | null>(null);

  // 动画组件数据
  const animationItems = [
    {
      id: 1,
      title: 'Nadar Page Title',
      description: 'Interactive scatter-gather title animation',
      component: <NadarPageTitleAnimation />,
      detailComponent: <NadarPageTitleAnimation />,
      color: '#000000',
      image: macintoshBg,
      code: `import { useState, useEffect } from 'react';

const NadarPageTitleAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScattering, setIsScattering] = useState(false);
  
  // Letters automatically converge and can be clicked to scatter
  useEffect(() => {
    setIsAnimating(true);
  }, []);
  
  return (
    <div className="nadar-title-animation">
      {/* Letter animation logic */}
    </div>
  );
};`
    },
    {
      id: 2,
      title: 'TaskProgress Loading',
      description: 'Interactive Lottie-based loading animation',
      component: <TaskProgressLoadingAnimation />,
      detailComponent: <TaskProgressLoadingAnimation />,
      color: '#4285F4',
      image: macintoshBg,
      code: `import Lottie from 'lottie-react';
import taskProgressAnimation from './assets/TaskProgress.json';

export default function TaskProgressLoadingAnimation() {
  return (
    <div style={{
      width: '200px',
      height: '200px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Lottie
        animationData={taskProgressAnimation}
        loop={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}`,
    },
    {
      id: 3,
      title: 'Text Shimmer',
      description: 'Smooth shimmer effect for text elements',
      component: <TextAnimations />,
      detailComponent: <TextAnimations />,
      color: '#EA4335',
      image: macintoshBg,
      code: `export default function TextAnimations() {
  return (
    <div style={{
      fontSize: '2rem',
      fontWeight: 'bold',
      background: 'linear-gradient(90deg, #fff 0%, #ddd 50%, #fff 100%)',
      backgroundSize: '200% 100%',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      animation: 'shimmer 2s ease-in-out infinite',
    }}>
      Shimmer Text
      <style>
        {\`@keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }\`}
      </style>
    </div>
  );
}`,
    },
    {
      id: 4,
      title: 'Typewriter Effect',
      description: 'Classic typewriter animation with dots',
      component: <TypewriterAnimation />,
      detailComponent: <TypewriterAnimation />,
      color: '#FBBC05',
      image: macintoshBg,
      code: `import { useState, useEffect } from 'react';

export default function TypewriterAnimation() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = 'Hello, World!';

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isTyping && text.length < fullText.length) {
      timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 150);
    } else if (text.length === fullText.length) {
      timeout = setTimeout(() => {
        setIsTyping(false);
        setText('');
      }, 2000);
    } else {
      setIsTyping(true);
    }

    return () => clearTimeout(timeout);
  }, [text, isTyping]);

  return (
    <div style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>
      {text}
      <span style={{ animation: 'blink 1s infinite' }}>|</span>
    </div>
  );
}`,
    },
    {
      id: 5,
      title: 'Video Viral Agent',
      description: 'Multi-color gradient text animation',
      component: <VideoViralAgentAnimation isDetailView={false} />,
      detailComponent: <VideoViralAgentAnimation isDetailView={true} />,
      color: '#34A853',
      image: macintoshBg,
      code: `interface Props {
  isDetailView?: boolean;
}

export default function VideoViralAgentAnimation({ isDetailView = false }: Props) {
  return (
    <div style={{
      fontSize: isDetailView ? '3rem' : '2rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
      backgroundSize: '400% 400%',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      animation: 'gradient 3s ease infinite',
      textAlign: 'center',
    }}>
      Video Viral Agent
      <style>
        {\`@keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }\`}
      </style>
    </div>
  );
}`,
    },
  ];

  // 画廊数据
  const galleryItems = animationItems.map(item => ({
    id: item.id,
    title: item.title,
    image: item.image,
    color: item.color,
    component: item.component,
  }));

  // 移除不需要的打字机动画效果
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setDotsCount((prev) => (prev + 1) % 4);
  //   }, 300);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <>
      {/* 返回按钮 */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 20,
          pointerEvents: 'auto',
        }}
      >
        <button
          onClick={() => onNavigate('home')}
          style={{
            width: '40px',
            height: '40px',
            background: 'transparent',
            border: 'none',
            borderRadius: '50%',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          ←
        </button>
      </div>

      {/* 视图切换按钮 */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 20,
          display: 'flex',
          gap: '5px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '4px',
        }}
      >
        {['gallery', 'grid', 'stack'].map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode as 'grid' | 'stack' | 'gallery')}
            style={{
              background: viewMode === mode ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              color: viewMode === mode ? '#fff' : 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'AlphaLyrae-Medium, sans-serif',
              fontSize: '12px',
              fontWeight: viewMode === mode ? '600' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(10px)',
              textTransform: 'capitalize',
            }}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* 页面标题 - 完全固定不动 */}
      <div
        style={{
          padding: '5vh 0 2vh 0',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          minHeight: '80px',
        }}
      >
        <h1
          style={{
            fontFamily: 'AlphaLyrae-Medium, sans-serif',
            textAlign: 'center',
            margin: '0 auto',
            fontSize: 'clamp(32px, 5vw, 64px)',
            color: '#fff',
            textShadow: '0 2px 8px #000',
            lineHeight: 1.2,
            padding: '0 20px',
            wordBreak: 'break-word',
            zIndex: 10,
            position: 'relative',
          }}
        >
          Animation
        </h1>
      </div>

      {/* 主内容区域 - 增加顶部间距避免被固定标题覆盖 */}
      <div
        style={{
          marginTop: '160px', // 增加间距避免被固定标题覆盖
          minHeight: 'calc(100vh - 240px)',
          width: '100%',
        }}
      >
        {/* Grid View */}
        {viewMode === 'grid' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '30px',
              padding: '40px',
              maxWidth: '1400px',
              margin: '0 auto',
            }}
          >
            {animationItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '30px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: 'white',
                  position: 'relative',
                }}
                onClick={() => setSelectedAnimation(selectedAnimation === item.id ? null : item.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                {/* Animation Preview Area */}
                <div
                  style={{
                    width: '100%',
                    height: selectedAnimation === item.id ? '300px' : '200px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    overflow: 'hidden',
                    transition: 'height 0.3s ease',
                    position: 'relative',
                  }}
                >
                  {selectedAnimation === item.id ? (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.component}
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        textAlign: 'center',
                      }}
                    >
                      Click to view animation
                    </div>
                  )}
                </div>
                
                <h3 style={{ margin: '0 0 10px 0', fontSize: '22px', fontFamily: 'AlphaLyrae-Medium, sans-serif' }}>
                  {item.title}
                </h3>
                <p style={{ margin: 0, opacity: 0.7, fontSize: '14px', lineHeight: 1.5 }}>
                  {item.description}
                </p>
                
                {/* Color indicator */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: item.color,
                    boxShadow: `0 2px 8px ${item.color}40`,
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Stack View */}
        {viewMode === 'stack' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              padding: '40px 20px',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            {animationItems.map((item, index) => (
              <div
                key={item.id}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '30px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '30px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: `translateY(${index * 4}px)`,
                  zIndex: animationItems.length - index,
                }}
                onClick={() => setSelectedAnimation(selectedAnimation === item.id ? null : item.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `translateY(${index * 4 - 8}px) scale(1.02)`;
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `translateY(${index * 4}px) scale(1)`;
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                <div
                  style={{
                    minWidth: '180px',
                    height: '120px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {selectedAnimation === item.id ? (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(0.7)' }}>
                      {item.component}
                    </div>
                  ) : (
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                      Preview
                    </div>
                  )}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontFamily: 'AlphaLyrae-Medium, sans-serif' }}>
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, opacity: 0.7, fontSize: '14px', lineHeight: 1.4 }}>
                    {item.description}
                  </p>
                </div>
                
                <div
                  style={{
                    width: '8px',
                    height: '40px',
                    borderRadius: '4px',
                    background: item.color,
                    boxShadow: `0 2px 8px ${item.color}40`,
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Gallery View */}
        {viewMode === 'gallery' && (
          <div style={{ padding: '40px 0' }}>
            <GallerySlider 
              items={galleryItems} 
            />
          </div>
        )}

        {/* Detail View */}
        {false && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* 详情页顶部导航 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 40px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <h2 style={{
                color: '#fff',
                fontSize: '1.8rem',
                fontFamily: 'AppleGaramond-Light, serif',
                margin: 0,
              }}>
                {animationItems.find(item => item.id === detailViewId)?.title}
              </h2>
              
              <button
                onClick={() => setDetailViewId(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontFamily: 'AlphaLyrae-Medium, sans-serif',
                  fontSize: '14px',
                }}
              >
                ✕ Close
              </button>
            </div>

            {/* 详情页内容 */}
            <div style={{
              flex: 1,
              display: 'flex',
              overflow: 'hidden',
            }}>
              {/* 左侧：预览区域 */}
              <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                background: 'rgba(255, 255, 255, 0.02)',
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '20px',
                  padding: '60px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '400px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                  {animationItems.find(item => item.id === detailViewId)?.detailComponent}
                </div>
              </div>

              {/* 右侧：代码区域 */}
              <div style={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <div style={{
                  padding: '20px 30px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                  <h3 style={{
                    color: '#fff',
                    fontSize: '1.2rem',
                    fontFamily: 'AlphaLyrae-Medium, sans-serif',
                    margin: 0,
                    opacity: 0.9,
                  }}>
                    Source Code
                  </h3>
                </div>
                
                <div style={{
                  flex: 1,
                  overflow: 'auto',
                  padding: '0',
                }}>
                  <pre style={{
                    margin: 0,
                    padding: '30px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: '#fff',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {animationItems.find(item => item.id === detailViewId)?.code}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
