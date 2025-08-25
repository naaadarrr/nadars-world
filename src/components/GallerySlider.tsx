import React, { useEffect, useRef, useState } from 'react';
import { playClick } from '../hooks/useSfx';

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
    const minItems = 50; // 进一步增加最小卡片数量，确保更流畅的循环
    let extended = [...items];
    
    // 重复添加原始数组，直到达到最小数量
    while (extended.length < minItems) {
      extended = [...extended, ...items];
    }
    
    console.log(`🔧 扩展卡片数组: ${items.length} -> ${extended.length}`);
    return extended;
  }, [items]);

  // 添加初始化状态检查
  const [isSliderReady, setIsSliderReady] = useState(false);
  
  // 调试信息
  console.log('🔍 GallerySlider 状态:', {
    isSliderReady,
    hasSliderInstance: !!sliderInstanceRef.current,
    itemsCount: items.length,
    extendedItemsCount: extendedItems.length,
    currentIndex
  });

  // 添加调试按钮（仅在开发环境）
  // const debugSlider = () => {
  //   if (sliderInstanceRef.current) {
  //     console.log('🔍 Slider实例:', sliderInstanceRef.current);
  //     console.log('🔍 当前状态:', {
  //       current: sliderInstanceRef.current.current,
  //       total: sliderInstanceRef.current.total,
  //       progress: sliderInstanceRef.current.progress
  //     });
  //   } else {
  //     console.log('❌ 没有Slider实例');
  //   }
  // };

  // 🚀 按照官方文档标准实现
  useEffect(() => {
    let isInitialized = false;
    let observer: MutationObserver | null = null;
    
    const initializeSlider = async () => {
      const sliderElement = sliderRef.current;
      if (!sliderElement || isInitialized) {
        return;
      }

      // 等待 DOM 完全渲染
      const waitForDOM = () => {
        return new Promise<void>((resolve) => {
          let attempts = 0;
          const maxAttempts = 50; // 最多等待50次
          
          const checkDOM = () => {
            attempts++;
            const hasChildren = sliderElement.children.length > 0;
            const hasWidth = sliderElement.offsetWidth > 0;
            const hasSlides = sliderElement.querySelectorAll('.slide').length > 0;
            
            console.log(`🔍 DOM检查 ${attempts}/${maxAttempts}:`, {
              hasChildren,
              hasWidth,
              hasSlides,
              childrenCount: sliderElement.children.length,
              width: sliderElement.offsetWidth,
              slidesCount: sliderElement.querySelectorAll('.slide').length
            });
            
            if (hasChildren && hasWidth && hasSlides) {
              console.log('✅ DOM准备完成');
              resolve();
            } else if (attempts >= maxAttempts) {
              console.warn('⚠️ DOM检查超时，强制继续');
              resolve();
            } else {
              requestAnimationFrame(checkDOM);
            }
          };
          checkDOM();
        });
      };

      try {
        // 等待 DOM 准备好
        await waitForDOM();
        
        // 导入 Smooothy Core
        const { default: Core } = await import('smooothy');
        
        console.log('🔍 初始化 Smooothy');
        console.log('🔍 Slider element:', sliderElement);
        console.log('🔍 Items count:', sliderElement.children.length);
        console.log('🔍 Container width:', sliderElement.offsetWidth);
        
        // 🎯 针对真无限循环的配置优化 - 实现丝滑滑动
        const slider = new Core(sliderElement, {
          infinite: true,           // 无限循环
          snap: false,              // 关闭吸附，让拖拽更自由
          dragSensitivity: 0.002,   // 进一步降低灵敏度，实现更精确的控制
          lerpFactor: 0.12,         // 调整阻尼，让滑动更丝滑
          scrollInput: false,       // 关闭滚轮，专注拖拽
          speedDecay: 0.9,          // 调整速度衰减，让滑动更自然
          bounceLimit: 0,           // 去除反弹效果，保持无缝
          onSlideChange: (current: number, prev: number) => {
            const actualIndex = current % items.length;
            setCurrentIndex(actualIndex);
            console.log(`🔄 Slide changed: ${prev} -> ${current} (actual: ${actualIndex})`);
          },
          onUpdate: () => {
            // 确保卡片间距在每次更新时都正确
            const slides = sliderElement.querySelectorAll('.slide');
            slides.forEach((slide, index) => {
              if (index < slides.length - 1) {
                (slide as HTMLElement).style.marginRight = '24px';
                (slide as HTMLElement).style.marginLeft = '0px';
                (slide as HTMLElement).style.flexShrink = '0';
              }
            });
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
        const initSlider = () => {
          if (slider.init && typeof slider.init === 'function') {
            try {
              slider.init();
              console.log('🔄 Slider.init() called');
              isInitialized = true;
              setIsSliderReady(true);
              console.log('✅ Slider ready state set to true');
              
              // 验证初始化是否成功
              setTimeout(() => {
                if (sliderInstanceRef.current) {
                  console.log('✅ Slider验证成功:', {
                    hasInstance: !!sliderInstanceRef.current,
                    current: sliderInstanceRef.current.current,
                    total: sliderInstanceRef.current.total
                  });
                } else {
                  console.warn('⚠️ Slider实例验证失败');
                }
              }, 100);
            } catch (initError) {
              console.error('❌ Slider.init() 执行失败:', initError);
              fallbackToNativeScroll(sliderElement);
            }
          } else {
            console.error('❌ Slider.init() not available');
            fallbackToNativeScroll(sliderElement);
          }
        };
        
        // 在线上环境可能需要更长的等待时间
        const initDelay = process.env.NODE_ENV === 'production' ? 200 : 100;
        setTimeout(initSlider, initDelay);
        
        // 启动动画循环
        animate();
        sliderInstanceRef.current = slider;

        // 监听DOM变化，确保卡片间距正确
        observer = new MutationObserver(() => {
          const slides = sliderElement.querySelectorAll('.slide');
          slides.forEach((slide, index) => {
            if (index < slides.length - 1) {
              (slide as HTMLElement).style.marginRight = '24px';
              (slide as HTMLElement).style.marginLeft = '0px';
              (slide as HTMLElement).style.flexShrink = '0';
            }
          });
        });

        observer.observe(sliderElement, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style']
        });

        console.log('✅ Smooothy 初始化完成');

      } catch (error) {
        console.error('❌ Smooothy 初始化失败:', error);
        
        // 如果是导入错误，可能是网络问题，尝试重试
        if (error instanceof Error && (error.message.includes('import') || error.message.includes('fetch'))) {
          console.log('🔄 检测到网络问题，3秒后重试...');
          setTimeout(() => {
            if (sliderRef.current && !isInitialized) {
              console.log('🔄 重试初始化...');
              initializeSlider();
            }
          }, 3000);
          return;
        }
        
        // 如果 Smooothy 失败，尝试使用原生滚动作为后备
        fallbackToNativeScroll(sliderElement);
      }
    };

    // 原生滚动后备方案
    const fallbackToNativeScroll = (element: HTMLElement) => {
      console.log('🔄 使用原生滚动后备方案');
      element.style.overflowX = 'auto';
      element.style.scrollBehavior = 'smooth';
      element.style.cursor = 'grab';
      setIsSliderReady(true);
      
      let isDragging = false;
      let startX = 0;
      let scrollLeft = 0;
      
      const handleMouseDown = (e: MouseEvent) => {
        isDragging = true;
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
        element.style.cursor = 'grabbing';
      };
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - element.offsetLeft;
        const walk = (x - startX) * 2;
        element.scrollLeft = scrollLeft - walk;
      };
      
      const handleMouseUp = () => {
        isDragging = false;
        element.style.cursor = 'grab';
      };
      
      const handleMouseLeave = () => {
        isDragging = false;
        element.style.cursor = 'grab';
      };
      
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      // 清理函数
      return () => {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseup', handleMouseUp);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    };

    // 延迟初始化，确保组件完全挂载
    const initTimeout = process.env.NODE_ENV === 'production' ? 500 : 200;
    const timer = setTimeout(initializeSlider, initTimeout);
    
    // 如果 5 秒后还没有初始化成功，使用后备方案
    const fallbackTimer = setTimeout(() => {
      if (!isSliderReady && sliderRef.current) {
        console.log('⚠️ 5秒后仍未初始化，使用后备方案');
        fallbackToNativeScroll(sliderRef.current);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
      isInitialized = false;
      // 清理动画循环
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      // 清理 slider
      if (sliderInstanceRef.current?.destroy) {
        sliderInstanceRef.current.destroy();
      }
      // 清理 observer
      if (observer) {
        observer.disconnect();
      }
    };
  }, [extendedItems, items.length]);

  // 🎮 导航控制
  const goToPrev = () => {
    if (sliderInstanceRef.current?.goToPrev) {
      playClick();
      sliderInstanceRef.current.goToPrev();
    }
  };

  const goToNext = () => {
    if (sliderInstanceRef.current?.goToNext) {
      playClick();
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
          padding: '0 2vw',         // 进一步减少padding，给卡片更多空间
          alignItems: 'center',     
          gap: '0',                 
          boxSizing: 'border-box',  // 确保padding包含在width内
          userSelect: 'none',       // 防止文本选择
          WebkitUserSelect: 'none', // Safari 支持
          MozUserSelect: 'none',    // Firefox 支持
          msUserSelect: 'none',     // IE 支持
          cursor: 'none', // 隐藏默认光标，使用自定义圆形光标
          opacity: isSliderReady ? 1 : 0.8, // 加载时稍微透明
          transition: 'opacity 0.3s ease',
          pointerEvents: 'auto',    // 确保鼠标事件可以正常工作
          position: 'relative',     // 确保定位正确
        }}
        onMouseDown={(e) => {
          // 简单的拖拽后备方案 - 当 Smooothy 不可用时
          if (!sliderInstanceRef.current && isSliderReady) {
            console.log('🔄 使用后备拖拽方案');
            const element = e.currentTarget;
            let isDragging = false;
            let startX = e.pageX - element.offsetLeft;
            let scrollLeft = element.scrollLeft;
            
            const handleMouseMove = (e: MouseEvent) => {
              if (!isDragging) return;
              e.preventDefault();
              const x = e.pageX - element.offsetLeft;
              const walk = (x - startX) * 2;
              element.scrollLeft = scrollLeft - walk;
            };
            
            const handleMouseUp = () => {
              isDragging = false;
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            
            isDragging = true;
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }
        }}
      >
        {extendedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}  // 确保扩展的卡片有唯一key
            className="slide"
            style={{
              flexShrink: 0,              // 🔑 官方要求
              width: 'clamp(280px, calc((80vw - 120px) / 3), 400px)', // 使用clamp确保响应式宽度，增加间距避免重叠
              height: '400px',            
              marginRight: '24px',        // 增加间距，避免卡片重叠
              marginLeft: '0px',          // 左边距设为0，避免重复计算
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',      
              justifyContent: 'space-between', 
              background: 'transparent',   
              border: '1px solid rgba(255, 255, 255, 0.25)', 
              borderRadius: '0px',        
              color: '#fff',
              cursor: 'none',
              position: 'relative',
              boxSizing: 'border-box',
              userSelect: 'none',         // 防止文本选择
              WebkitUserSelect: 'none',   // Safari 支持
              MozUserSelect: 'none',      // Firefox 支持
              msUserSelect: 'none',       // IE 支持
              pointerEvents: 'auto',      // 确保鼠标事件可以正常工作
              transform: 'translateZ(0)', // 强制硬件加速
              willChange: 'transform',    // 提示浏览器优化
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
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
            }}>
              {item.id}
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
              padding: '16px', // 减少内边距，避免内容溢出
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              position: 'relative', // 确保定位正确
              boxSizing: 'border-box', // 确保padding包含在width内
            }}>
              {item.component ? (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative', // 添加相对定位
                  overflow: 'hidden', // 防止内容溢出
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
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
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
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
            }}>
              {item.title}
            </div>
          </div>
        ))}
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
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
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
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
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