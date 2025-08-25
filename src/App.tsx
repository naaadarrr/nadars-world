import { useState, useEffect } from 'react';
import { NadarPageTitle } from './components/NadarPageTitle';
import folderIcon from './assets/image/folder.png';
import njzImage from './assets/image/njz.jpg';
import rabbitImage from './assets/image/rabbit.png';
import steveJobsImage from '/steve-jobs.png';
import makeSomethingWonderfulCover from './assets/image/Make Something Wonderful Cover.jpg';
import { IpodDisplay } from './components/IpodDisplay';
import { JobsBookCover } from './components/JobsBookCover';
import VideoPage from './pages/VideoPage';
import ProjectsPage from './pages/ProjectsPage';
import AnimationsPage from './pages/AnimationsPage';
// import MouseFollowerDemo from './components/MouseFollowerDemo';
import MouseFollowerDemoPage from './pages/MouseFollowerDemoPage';
import AdvancedCircularCursor from './components/AdvancedCircularCursor';
import CursorControls from './components/CursorControls';
import GlobalMouseFollowerControls from './components/GlobalMouseFollowerControls';
import ImageSwitchingMouseFollower from './components/ImageSwitchingMouseFollower';
import SoundToggle from './components/SoundToggle';
import raphasockImage from './assets/image/raphasock.png';
import breadImage from './assets/image/bread.png';
import onionImage from './assets/image/onion.png';
import cautionSignImage from './assets/image/Cautionsign.png';
import eggImage from './assets/image/egg.png';
import coffeecupImage from './assets/image/coffeecup.png';
import { useSoundManager } from './hooks/useSfx';
import { useBgs } from './hooks/useBgs';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [hasPlayedInitialAnimation, setHasPlayedInitialAnimation] = useState(false);
  const [isBgsMasterEnabled, setIsBgsMasterEnabled] = useState(false);
  const soundManager = useSoundManager();
  
  // 全局背景音乐管理
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // 首页BGM
  const homeBgs = useBgs({
    enabled: isBgsMasterEnabled && currentPage === 'home' && !isTransitioning,
    src: '/sounds/Starry Night.mp3',
    volume: 0.2,
    loop: true,
  });

  // Animation页面BGM
  const animationBgs = useBgs({
    enabled: isBgsMasterEnabled && currentPage === 'animations' && !isTransitioning,
    src: '/sounds/Beats Lament the World.mp3',
    volume: 0.2,
    loop: true,
  });

  // 根据当前页面切换背景音乐
  useEffect(() => {
    if (!isBgsMasterEnabled || isTransitioning) return;

    setIsTransitioning(true);
    
    if (currentPage === 'animations') {
      // 切换到Animation页面：淡出首页BGM，淡入Animation BGM
      homeBgs.fadeOut(1000);
      setTimeout(() => {
        animationBgs.setVolume(0);
        animationBgs.play();
        animationBgs.fadeIn(1000);
        setIsTransitioning(false);
      }, 1000);
    } else if (currentPage === 'home') {
      // 切换到首页：淡出Animation BGM，淡入首页BGM
      animationBgs.fadeOut(1000);
      setTimeout(() => {
        homeBgs.setVolume(0);
        homeBgs.play();
        homeBgs.fadeIn(1000);
        setIsTransitioning(false);
      }, 1000);
    }
  }, [currentPage, isBgsMasterEnabled]);

  // 首页默认启用背景音乐
  useEffect(() => {
    if (currentPage === 'home' && !isBgsMasterEnabled) {
      const timer = setTimeout(() => {
        setIsBgsMasterEnabled(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentPage, isBgsMasterEnabled]);

  const handleBgsToggle = () => {
    const newState = !isBgsMasterEnabled;
    setIsBgsMasterEnabled(newState);
    
    if (newState) {
      // 开启BGM，根据当前页面播放对应音乐
      if (currentPage === 'home') {
        homeBgs.play();
      } else if (currentPage === 'animations') {
        animationBgs.play();
      }
      soundManager.playSuccess();
    } else {
      // 关闭BGM，停止所有音乐
      homeBgs.stop();
      animationBgs.stop();
      soundManager.playNotification();
    }
  };
  
  const [cursorSettings, setCursorSettings] = useState({
    enabled: true,
    size: 16,
    hoverSize: 32,
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    trail: false,
    trailLength: 5,
    trailOpacity: 0.3
  });

  const [mouseFollowerSettings, setMouseFollowerSettings] = useState({
    enabled: true,
    size: 160, // 从200调整为160
    offsetX: 30, // 从20增加到30
    offsetY: 30, // 从20增加到30
    smoothness: 0.25,
    effect: 'elastic' as const,
    switchInterval: 3000,
    images: [raphasockImage, breadImage, onionImage, cautionSignImage, eggImage, coffeecupImage]
  });
  
  const renderHomePage = () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#000',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* NADAR PAGE 标题动画 */}
      <NadarPageTitle skipInitialAnimation={hasPlayedInitialAnimation} />

      {/* NJZ 图片 - 左上角 */}
      <div
        style={{
          position: 'absolute',
          top: '8vh',
          left: '4vw',
          zIndex: 15,
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          soundManager.playWindowFocus(); // 图片hover音效
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <img
          src={njzImage}
          alt="NJZ"
          style={{
            width: '160px',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        />
      </div>

      {/* 作品集导航 - 围绕标题分布 */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '600px',
          maxWidth: '90vw',
          maxHeight: '80vh',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        {[
          { id: 'animations', title: 'Animations', page: 'animations', x: '-350px', y: '-180px', rotation: -3 },
          { id: 'projects', title: 'Projects', page: 'projects', x: '-320px', y: '130px', rotation: 2 },
          { id: 'video', title: 'Video', page: 'video', x: '350px', y: '-100px', rotation: -1 },
        ].map((item) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${item.x}), calc(-50% + ${item.y})) rotate(${item.rotation}deg)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              pointerEvents: 'auto',
            }}
            onClick={() => {
              soundManager.playMenuOpen(); // 文件夹点击音效
              setCurrentPage(item.page);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `translate(calc(-50% + ${item.x}), calc(-50% + ${item.y})) rotate(${item.rotation}deg) scale(1.05)`;
              soundManager.playWindowFocus(); // 图片hover音效
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `translate(calc(-50% + ${item.x}), calc(-50% + ${item.y})) rotate(${item.rotation}deg) scale(1)`;
            }}
          >
          <img
            src={folderIcon}
            alt={`${item.title} Folder`}
            style={{
              width: '100px',
              height: 'auto',
            }}
          />
          <div
            style={{
              fontFamily: 'AppleGaramond-Light, serif',
              fontSize: '22px',
              color: '#fff',
              fontWeight: 'normal',
              textAlign: 'center',
            }}
          >
            {item.title}
          </div>
        </div>
        ))}
      </div>

      {/* Rabbit 图片 - 右上角 */}
      <div
        style={{
          position: 'absolute',
          top: '12vh',
          right: '4vw',
          zIndex: 15,
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          soundManager.playWindowFocus(); // 图片hover音效
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <img
          src={rabbitImage}
          alt="Rabbit"
          style={{
            width: '140px',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        />
      </div>

      {/* Steve Jobs 图片 - 左中 */}
      <div
        style={{
          position: 'absolute',
          top: '50vh',
          left: '6vw',
          zIndex: 15,
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          soundManager.playWindowFocus(); // 图片hover音效
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <img
          src={steveJobsImage}
          alt="Steve Jobs"
          style={{
            width: '120px',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        />
      </div>

      {/* Make Something Wonderful 书籍封面 - 右中 */}
      <div
        style={{
          position: 'absolute',
          top: '50vh',
          right: '6vw',
          zIndex: 15,
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          soundManager.playWindowFocus(); // 图片hover音效
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <JobsBookCover coverImage={makeSomethingWonderfulCover} />
      </div>

      {/* iPod Display - 底部中央 */}
      <div
        style={{
          position: 'absolute',
          bottom: '4vh',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 15,
        }}
      >
        <IpodDisplay />
      </div>
    </div>
  );

  const renderAnimationsPage = () => (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: '#000',
        overflow: 'auto',
      }}
    >
      <AnimationsPage onNavigate={setCurrentPage} />
    </div>
  );

  const renderVideoPage = () => (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: '#000',
        overflow: 'auto',
      }}
    >
      <VideoPage onNavigate={setCurrentPage} />
    </div>
  );

  const renderProjectsPage = () => (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: '#000',
        overflow: 'auto',
      }}
    >
      <ProjectsPage onNavigate={setCurrentPage} />
    </div>
  );

  const renderMouseFollowerPage = () => (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        overflow: 'auto',
      }}
    >
      <MouseFollowerDemoPage onNavigate={setCurrentPage} />
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'animations':
        return renderAnimationsPage();
      case 'video':
        return renderVideoPage();
      case 'projects':
        return renderProjectsPage();
      case 'mouse-follower':
        return renderMouseFollowerPage();
      default:
        // 首次进入首页时标记动画已播放
        if (currentPage === 'home' && !hasPlayedInitialAnimation) {
          setTimeout(() => {
            setHasPlayedInitialAnimation(true);
          }, 1500); // 等待动画完成后标记
        }
        return renderHomePage();
    }
  };
  
  return (
    <>
      {renderCurrentPage()}
      <AdvancedCircularCursor {...cursorSettings} />
      <ImageSwitchingMouseFollower {...mouseFollowerSettings} />
      <SoundToggle isBgsMasterEnabled={isBgsMasterEnabled} onBgsToggle={handleBgsToggle} />
      {currentPage === 'projects' && (
        <>
          <CursorControls 
            settings={cursorSettings}
            onSettingsChange={setCursorSettings}
          />
          <GlobalMouseFollowerControls 
            settings={mouseFollowerSettings}
            onSettingsChange={setMouseFollowerSettings}
          />
        </>
      )}
    </>
  );
}

export default App;