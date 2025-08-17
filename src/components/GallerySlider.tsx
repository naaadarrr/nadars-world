import React, { useEffect, useRef, useState } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  color: string;
  component?: React.ReactNode;
}

interface GallerySliderProps {
  items: GalleryItem[];
  onItemClick?: (itemId: number) => void;
}

export default function GallerySlider({ items, onItemClick }: GallerySliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderInstanceRef = useRef<any>(null);
  const animationIdRef = useRef<number | null>(null);

  // 🔧 为了真正的无限循环，我们需要扩展卡片数组
  // 确保有足够的卡片来避免"跳跃"效果
  const extendedItems = React.useMemo(() => {
    const minItems = 15; // 确保至少有15张卡片
    let extended = [...items];
    
    while (extended.length < minItems) {
      extended = [...extended, ...items];
    }
    
    console.log(`🔧 扩展卡片数组: ${items.length} -> ${extended.length}`);
    return extended;
  }, [items]);

  // 🚀 按照官方文档标准实现
  useEffect(() => {
    const initializeSlider = async () => {
      const sliderElement = sliderRef.current;
      if (!sliderElement) {
        console.error('❌ Slider element not found');
        return;
      }

      try {
        // 导入 Smooothy Core
        const { default: Core } = await import('smooothy');
        
        console.log('🔍 初始化 Smooothy');
        console.log('🔍 Slider element:', sliderElement);
        console.log('🔍 Items count:', sliderElement.children.length);
        console.log('🔍 Container width:', sliderElement.offsetWidth);
        console.log('🔍 Item width estimate:', sliderElement.children[0]?.getBoundingClientRect?.().width);
        
        // 🎯 针对真无限循环的配置优化
        const slider = new Core(sliderElement, {
          infinite: true,           // 无限循环
          snap: false,              // 关闭吸附，让拖拽更自由
          dragSensitivity: 0.005,   // 降低灵敏度，避免过度敏感
          lerpFactor: 0.2,          // 提高阻尼，更稳定
          scrollInput: false,       // 暂时关闭滚轮，专注拖拽
          speedDecay: 0.9,          // 增加速度衰减，更自然
          bounceLimit: 0,           // 去除反弹效果，保持无缝
          onSlideChange: (current: number, prev: number) => {
            const actualIndex = current % items.length;
            setCurrentIndex(actualIndex);
            console.log(`🔄 Slide changed: ${prev} -> ${current} (actual: ${actualIndex})`);
            console.log(`🔄 Current slider state - current: ${slider.current}, target: ${slider.target}`);
          },
        });

        // 🔄 官方要求的动画循环
        function animate() {
          if (slider && sliderInstanceRef.current) {
            slider.update();
            animationIdRef.current = requestAnimationFrame(animate);
          }
        }
        
        // 确保 DOM 元素完全准备好后再初始化
        setTimeout(() => {
          if (slider.init && typeof slider.init === 'function') {
            slider.init();
            console.log('🔄 Slider.init() called');
          }
        }, 50);
        
        // 启动动画循环
        animate();
        sliderInstanceRef.current = slider;

        console.log('✅ Smooothy 初始化完成');
        console.log('📊 Current slide:', slider.currentSlide);
        console.log('📊 Viewport:', slider.viewport);
        console.log('📊 Total items:', slider.items?.length);
        console.log('📊 Max scroll:', slider.maxScroll);
        
        // 🔧 等待一帧后再检查状态，确保DOM完全渲染
        setTimeout(() => {
          console.log('📊 延迟检查 - Viewport after init:', slider.viewport);
          console.log('📊 延迟检查 - Items count:', slider.items?.length);
          console.log('📊 延迟检查 - Container width:', sliderElement.offsetWidth);
          console.log('📊 延迟检查 - Total scroll width:', slider.viewport?.totalWidth);
        }, 100);

      } catch (error) {
        console.error('❌ Smooothy 初始化失败:', error);
      }
    };

    initializeSlider();

    return () => {
      // 清理动画循环
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      // 清理 slider
      if (sliderInstanceRef.current?.destroy) {
        sliderInstanceRef.current.destroy();
      }
    };
  }, [extendedItems]);

  // 🎮 导航控制
  const goToPrev = () => {
    if (sliderInstanceRef.current?.goToPrev) {
      sliderInstanceRef.current.goToPrev();
    }
  };

  const goToNext = () => {
    if (sliderInstanceRef.current?.goToNext) {
      sliderInstanceRef.current.goToNext();
    }
  };

  return (
    <>
      {/* 🎯 按官方文档的 HTML 结构 */}
      <div 
        ref={sliderRef}
        data-slider
        style={{
          display: 'flex',
          width: '100vw',
          height: '70vh',           
          overflow: 'hidden',
          padding: '0 5vw',         // 减少padding，给卡片更多空间
          alignItems: 'center',     
          gap: '0',                 
          boxSizing: 'border-box',  // 确保padding包含在width内
        }}
      >
        {extendedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}  // 确保扩展的卡片有唯一key
            className="slide"
            style={{
              flexShrink: 0,              // 🔑 官方要求
              width: 'calc((80vw - 48px) / 3)', // 减去margin空间：每个卡片16px margin(8+8)，3个卡片=48px
              height: '400px',            
              marginRight: '8px',         // 🔧 减少间距避免挤压
              marginLeft: '8px',          // 左右对称间距
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',      
              justifyContent: 'space-between', 
              background: 'transparent',   
              border: '1px solid rgba(255, 255, 255, 0.25)', 
              borderRadius: '0px',        
              color: '#fff',
              cursor: 'grab',
              position: 'relative',
              boxSizing: 'border-box',    
            }}
            onClick={() => onItemClick?.(item.id)}
          >
            {/* 🎯 序号在上方 */}
            <div style={{
              fontSize: '14px',
              opacity: 0.6,
              fontWeight: '400',
              textAlign: 'center',
              padding: '16px 0 0 0',
            }}>
              {(index % items.length) + 1}
            </div>

            {/* 🎯 动画内容完全居中显示 */}
            <div style={{
              flex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              background: 'transparent',
              padding: '20px', // 添加内边距，避免动画内容贴边
            }}>
              {item.component ? (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative', // 添加相对定位
                }}>
                  {item.component}
                </div>
              ) : (
                <div style={{ 
                  fontSize: '1.5rem', 
                  opacity: 0.6,
                  fontWeight: '300',
                  textAlign: 'center',
                  width: '100%',
                }}>
                  {item.title}
                </div>
              )}
            </div>

            {/* 🎯 下方显示动画名称，字号22 */}
            <div style={{
              fontSize: '22px',
              fontWeight: '300',
              fontFamily: 'AppleGaramond-Light, serif',
              color: '#fff',
              textAlign: 'center',
              padding: '0 0 16px 0',
            }}>
              {item.title}
            </div>
          </div>
        ))}
      </div>

      {/* 进度指示器 */}
      <div style={{
        position: 'fixed',
        bottom: '32px',
        left: '32px',
        color: '#fff',
        fontSize: '0.9rem',
        fontFamily: 'AlphaLyrae-Medium, sans-serif',
      }}>
        {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
      </div>

      {/* 导航按钮 */}
      <div style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        display: 'flex',
        gap: '16px',
      }}>
        <button
          onClick={goToPrev}
          style={{
            width: '48px',
            height: '48px',
            background: 'rgba(0, 0, 0, 0.7)',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            backdropFilter: 'blur(10px)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18L9 12L15 6" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          style={{
            width: '48px',
            height: '48px',
            background: 'rgba(0, 0, 0, 0.7)',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            backdropFilter: 'blur(10px)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6L15 12L9 18" />
          </svg>
        </button>
      </div>
    </>
  );
}