
import { ChatBubble } from '../../macosx-components';
import type { ChatMessage } from '../../macosx-components';
import folderIcon from '../assets/folder.png';

interface HomePageProps {
  onNavigate: (page: string) => void;
  mousePosition: { x: number; y: number };
}

export default function HomePage({ onNavigate, mousePosition }: HomePageProps) {
  const welcomeMessage: ChatMessage = {
    id: 'welcome-1',
    content: "👋 Hi, I'm nadar, Welcome to my creative space!",
    role: 'assistant',
    createdAt: new Date(),
  };

  const portfolioItems = [
    {
      id: 'animations',
      title: 'Animations',
      description: 'Interactive animations & motion design',
      onClick: () => onNavigate('animations'),
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'Design projects & case studies',
      onClick: () => onNavigate('projects'),
    },
    {
      id: 'video',
      title: 'Video',
      description: 'Video content & motion graphics',
      onClick: () => onNavigate('video'),
    },
  ];

  return (
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
            linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '160px 160px, 160px 160px, 40px 40px, 40px 40px',
          mask: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(255, 255, 255, 1) 0%, 
            rgba(255, 255, 255, 0.8) 30%, 
            rgba(255, 255, 255, 0.3) 60%, 
            transparent 100%)`,
          WebkitMask: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(255, 255, 255, 1) 0%, 
            rgba(255, 255, 255, 0.8) 30%, 
            rgba(255, 255, 255, 0.3) 60%, 
            transparent 100%)`,
          zIndex: 1,
          pointerEvents: 'none',
          transition: 'mask 0.1s ease-out, -webkit-mask 0.1s ease-out',
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
          minHeight: '120px',
        }}
      >
        <h1
          style={{
            fontFamily: 'AlphaLyrae-Medium, sans-serif',
            textAlign: 'center',
            margin: '0 auto',
            fontSize: 'clamp(48px, 8vw, 96px)',
            color: '#000000',
            lineHeight: 1.1,
            padding: '0 20px',
            wordBreak: 'break-word',
            zIndex: 2,
            position: 'relative',
            fontWeight: '500',
            letterSpacing: '-0.02em',
          }}
        >
          Nadar Design
        </h1>
      </div>

      {/* Steve Jobs 装饰图片 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginTop: '3vh',
          marginBottom: '2vh',
          zIndex: 10,
          position: 'relative',
        }}
      >
        <img
          src="/steve-jobs.png"
          alt="Steve Jobs"
          style={{
            width: '150px',
            height: 'auto',
            borderRadius: '16px',
            filter: 'drop-shadow(0 12px 32px rgba(0, 0, 0, 0.4))',
            opacity: 1,
            border: '2px solid rgba(255, 255, 255, 0.1)',
            display: 'block',
            maxWidth: '100%',
          }}
          onError={(e) => {
            console.error('Failed to load Steve Jobs image:', e);
          }}
          onLoad={() => {
            console.log('Steve Jobs image loaded successfully');
          }}
        />
      </div>

      {/* 欢迎气泡框 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginTop: '2vh',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '420px' }}>
          <ChatBubble
            message={welcomeMessage}
            isOwn={false}
            showActions={false}
            fontSize={17}
            className="animate-fadeInUp"
          />
        </div>
      </div>

      {/* 作品集导航 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '60px',
          width: '100%',
          marginTop: '6vh',
          zIndex: 10,
        }}
      >
        {/* 文件夹容器 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '60px',
            justifyContent: 'center',
            maxWidth: '800px',
            width: '100%',
            padding: '0 20px',
          }}
        >
          {portfolioItems.map((item) => (
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
              onClick={item.onClick}
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
                  filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.4)) brightness(1.2)', // 增加亮度到1.2
                  opacity: 1,
                }}
              />

              <div
                style={{
                  fontFamily: 'AppleGaramond-Light, serif',
                  fontSize: '24px',
                  color: '#20241F',
                  fontWeight: 'normal',
                  textAlign: 'center',
                  textShadow: '0 1px 3px rgba(255, 255, 255, 0.3)',
                  letterSpacing: '0.5px',
                }}
              >
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
