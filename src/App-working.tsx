import { useState, useRef, useCallback, useEffect } from 'react';
import TaskProgressLoadingAnimation from './TaskProgressLoadingAnimation';
import macintoshBg from './assets/macintosh.png';
import folderIcon from './assets/folder.png';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

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
      setMousePosition({ x: e.clientX, y: e.clientY });

      if (isDragging) {
        e.preventDefault();
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 添加滚轮事件监听
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      return () => canvas.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  const renderHomePage = () => (
    <>
      {/* 网格高亮效果层 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          mask: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(255, 255, 255, 0.8) 0%, transparent 100%)`,
          WebkitMask: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(255, 255, 255, 0.8) 0%, transparent 100%)`,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* 主标题 */}
      <div
        style={{
          padding: '8vh 0 4vh 0',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          position: 'relative',
        }}
      >
        <h1
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
            margin: '0 auto',
            fontSize: 'clamp(48px, 8vw, 96px)',
            color: '#000000',
            lineHeight: 1.1,
            padding: '0 20px',
            fontWeight: '600',
            letterSpacing: '-0.02em',
          }}
        >
          Nadar Design
        </h1>
      </div>

      {/* 欢迎消息 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginTop: '2vh',
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            padding: '16px 24px',
            maxWidth: '420px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '17px',
              color: '#000',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            👋 Hi, I'm nadar, Welcome to my creative space!
          </p>
        </div>
      </div>

      {/* 作品集导航 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '80px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '6vh',
          zIndex: 10,
        }}
      >
        {[
          { id: 'animations', title: 'Animations', page: 'taskProgress' },
          { id: 'projects', title: 'Projects', page: 'projects' },
          { id: 'about', title: 'About', page: 'about' },
        ].map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
              pointerEvents: 'auto',
              transition: 'transform 0.3s ease',
            }}
            onClick={() => setCurrentPage(item.page)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <img
              src={folderIcon}
              alt={`${item.title} Folder`}
              style={{
                width: '150px',
                height: 'auto',
                filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.4))',
              }}
            />

            <div
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '20px',
                color: '#20241F',
                fontWeight: '500',
                textAlign: 'center',
                textShadow: '0 1px 3px rgba(255, 255, 255, 0.3)',
              }}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderAnimationsPage = () => (
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
          onClick={() => setCurrentPage('home')}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            padding: '8px 16px',
            color: '#fff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* 页面标题 */}
      <div
        style={{
          padding: '5vh 0',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          position: 'relative',
        }}
      >
        <h1
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
            margin: '0 auto',
            fontSize: 'clamp(32px, 5vw, 64px)',
            color: '#fff',
            textShadow: '0 2px 8px #000',
            lineHeight: 1.2,
            padding: '0 20px',
          }}
        >
          TaskProgress Loading Animation
        </h1>
      </div>

      {/* 主要展示区域 */}
      <div
        style={{
          position: 'relative',
          width: 'min(60vw, 800px)',
          maxWidth: '95vw',
          margin: '4vh auto 8vh auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={macintoshBg}
          alt="Macintosh"
          style={{
            width: '100%',
            height: 'auto',
            zIndex: 1,
            pointerEvents: 'none',
            display: 'block',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '28%',
            transform: 'translate(-50%, -50%)',
            width: '20vw',
            height: '20vw',
            maxWidth: 400,
            maxHeight: 400,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto',
          }}
        >
          <TaskProgressLoadingAnimation />
        </div>
      </div>
    </>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'taskProgress':
        return renderAnimationsPage();
      case 'projects':
        return (
          <div style={{ color: 'white', textAlign: 'center', padding: '100px 20px' }}>
            <h1>Projects Page</h1>
            <button
              onClick={() => setCurrentPage('home')}
              style={{ padding: '10px 20px', marginTop: '20px' }}
            >
              Back to Home
            </button>
          </div>
        );
      case 'about':
        return (
          <div style={{ color: 'white', textAlign: 'center', padding: '100px 20px' }}>
            <h1>About Page</h1>
            <button
              onClick={() => setCurrentPage('home')}
              style={{ padding: '10px 20px', marginTop: '20px' }}
            >
              Back to Home
            </button>
          </div>
        );
      default:
        return renderHomePage();
    }
  };

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
        {renderCurrentPage()}
      </div>

      {/* 小地图 */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '200px',
          height: '120px',
          background: 'rgba(30, 30, 30, 0.9)',
          border: '1px solid rgba(100, 100, 100, 0.4)',
          borderRadius: '8px',
          zIndex: 1000,
          padding: '10px',
          fontSize: '12px',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div>Page: {currentPage}</div>
        <div>
          Position: {Math.round(position.x)}, {Math.round(position.y)}
        </div>
        <div>
          Mouse: {Math.round(mousePosition.x)}, {Math.round(mousePosition.y)}
        </div>
        <div>Dragging: {isDragging ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
}

export default App;
