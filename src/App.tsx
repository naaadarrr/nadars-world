import { useState } from 'react';
import { NadarPageTitle } from './components/NadarPageTitle';
import folderIcon from './assets/folder.png';
import njzImage from './assets/njz.jpg';
import rabbitImage from './assets/rabbit.png';
import steveJobsImage from '/steve-jobs.png';
import makeSomethingWonderfulCover from './assets/Make Something Wonderful Cover.jpg';
import { IpodDisplay } from './components/IpodDisplay';
import { JobsBookCover } from './components/JobsBookCover';
import VideoPage from './pages/VideoPage';
import ProjectsPage from './pages/ProjectsPage';
import AnimationsPage from './pages/AnimationsPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [hasPlayedInitialAnimation, setHasPlayedInitialAnimation] = useState(false);
  
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
            onClick={() => setCurrentPage(item.page)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `translate(calc(-50% + ${item.x}), calc(-50% + ${item.y})) rotate(${item.rotation}deg) scale(1.05)`;
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
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <img
          src={steveJobsImage}
          alt="Steve Jobs"
          style={{
            width: '180px',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        />
      </div>

      {/* 乔布斯书籍封面 - 右中 */}
      <div
        style={{
          position: 'absolute',
          top: '35vh',
          right: '8vw',
          zIndex: 15,
        }}
      >
        <JobsBookCover coverImage={makeSomethingWonderfulCover} />
      </div>

      {/* 渐变卡片 - 右下角 */}
      <div
        style={{
          position: 'absolute',
          bottom: '12vh',
          right: '6vw',
          zIndex: 15,
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <div
          style={{
            width: '160px',
            height: '100px',
            background: 'linear-gradient(180deg, #4A89ED -7.59%, #DCCFFF 102.92%)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(74, 137, 237, 0.3)',
          }}
        />
      </div>

      {/* iPod 组件 - 底部中心 */}
      <div
        style={{
          position: 'absolute',
          bottom: '6vh',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 15,
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
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

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'animations':
        return renderAnimationsPage();
      case 'video':
        return renderVideoPage();
      case 'projects':
        return renderProjectsPage();
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
  
  return renderCurrentPage();
}

export default App;