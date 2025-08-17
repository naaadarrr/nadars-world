import { useState, useRef, useCallback, useEffect } from 'react';

interface InfiniteCanvasProps {
  children: React.ReactNode;
  currentPage: string;
  onMouseMove?: (position: { x: number; y: number }) => void;
}

export default function InfiniteCanvas({
  children,
  currentPage,
  onMouseMove,
}: InfiniteCanvasProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // 初始化画布位置
  useEffect(() => {
    const initializePosition = () => {
      setPosition({ x: 0, y: 0 });
    };

    initializePosition();
    window.addEventListener('resize', initializePosition);

    return () => {
      window.removeEventListener('resize', initializePosition);
    };
  }, []);

  // 处理滚轮事件
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();

    const scrollStep = 100;
    const maxScrollUp = 300;
    const maxScrollDown = -800;

    setPosition((prev) => {
      let newY = prev.y;

      if (e.deltaY > 0) {
        newY = Math.max(prev.y - scrollStep, maxScrollDown);
      } else {
        newY = Math.min(prev.y + scrollStep, maxScrollUp);
      }

      return { x: prev.x, y: newY };
    });
  }, []);

  // 处理鼠标拖拽
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 0 || e.button === 1) {
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      }
    },
    [position],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const newMousePosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newMousePosition);
      onMouseMove?.(newMousePosition);

      if (isDragging) {
        e.preventDefault();
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart, onMouseMove],
  );

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  // 重置视图位置
  const resetView = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isDragging) {
        e.preventDefault();
        document.body.style.cursor = 'grab';
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        resetView();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        document.body.style.cursor = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      document.body.style.cursor = '';
    };
  }, [isDragging, resetView]);

  // 添加滚轮事件监听
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      return () => canvas.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  return (
    <div
      ref={canvasRef}
      style={{
        width: '100vw',
        height: '100vh',
        background:
          currentPage === 'home'
            ? 'linear-gradient(180deg, #4A89ED -7.59%, #DCCFFF 102.92%)'
            : '#000',
        position: 'relative',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'default',
        userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 无限画布内容容器 */}
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          width: '100vw',
          height: '150vh',
          position: 'absolute',
          pointerEvents: isDragging ? 'none' : 'auto',
          willChange: 'transform',
          zIndex: 2,
        }}
      >
        {children}
      </div>

      {/* 小地图 */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '280px',
          height: '180px',
          background: 'rgba(30, 30, 30, 0.95)',
          border: '2px solid rgba(100, 100, 100, 0.4)',
          borderRadius: '16px',
          zIndex: 1000,
          pointerEvents: 'auto',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7)',
          padding: '16px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: '#2a2a2a',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(80, 80, 80, 0.3)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '80%',
              height: '80%',
              background: 'rgba(50, 50, 50, 0.8)',
              borderRadius: '8px',
              border: '1px solid rgba(70, 70, 70, 0.5)',
            }}
          >
            {/* 根据当前页面显示不同的小地图内容 */}
            {currentPage === 'home' ? (
              <>
                <div
                  style={{
                    position: 'absolute',
                    top: '8%',
                    left: '25%',
                    width: '50%',
                    height: '10%',
                    background: 'rgba(120, 120, 120, 0.9)',
                    borderRadius: '2px',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '45%',
                    left: '35%',
                    width: '10%',
                    height: '10%',
                    background: 'rgba(123, 179, 224, 0.9)',
                    borderRadius: '2px',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '45%',
                    left: '55%',
                    width: '10%',
                    height: '10%',
                    background: 'rgba(255, 193, 7, 0.9)',
                    borderRadius: '2px',
                  }}
                />
              </>
            ) : (
              <>
                <div
                  style={{
                    position: 'absolute',
                    top: '8%',
                    left: '20%',
                    width: '60%',
                    height: '8%',
                    background: 'rgba(120, 120, 120, 0.9)',
                    borderRadius: '2px',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '25%',
                    left: '15%',
                    width: '70%',
                    height: '35%',
                    background: 'rgba(140, 140, 140, 0.9)',
                    borderRadius: '4px',
                  }}
                />
              </>
            )}
          </div>

          {/* 当前视觉屏幕区域指示器 */}
          <div
            style={{
              position: 'absolute',
              left: `${10 + 80 * (0.5 - position.x / 2000)}%`,
              top: `${10 + 80 * (0.5 - position.y / 1500)}%`,
              width: '35%',
              height: '45%',
              border: '2px solid rgba(255, 255, 255, 0.8)',
              borderRadius: '4px',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}
