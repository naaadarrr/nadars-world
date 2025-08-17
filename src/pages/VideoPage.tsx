import { useState, useRef } from 'react';

interface VideoPageProps {
  onNavigate: (page: string) => void;
}

export default function VideoPage({ onNavigate }: VideoPageProps) {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setShowVideo(true);
    // 延迟一下确保video元素已经显示
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100);
  };

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
            e.currentTarget.style.background = 'rgba(128, 128, 128, 0.3)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ←
        </button>
      </div>

      {/* 页面标题 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontFamily: "'SchrofferMono-Regular', 'Courier New', monospace",
            textAlign: 'center',
            margin: '0',
            fontSize: '24px',
            color: '#fff',
            lineHeight: 1.2,
            fontWeight: 'normal',
          }}
        >
          Video
        </h1>
      </div>

      {/* 主要内容区域 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          minHeight: '100vh',
          padding: '180px 20px 60px 20px',
          zIndex: 5,
        }}
      >
        {/* 视频播放区域 */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            aspectRatio: '16/9',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            backgroundColor: '#000',
          }}
        >
          {/* 播放前的预览 */}
          {!showVideo && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                cursor: 'pointer',
              }}
              onClick={handlePlayClick}
            >
              {/* 播放按钮 */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  color: '#333',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  marginLeft: '8px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                }}
              >
                ▶
              </div>
              
              {/* 标题 */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                AnyFit 宣传片
              </div>
            </div>
          )}

          {/* 视频播放器 */}
          {showVideo && (
            <video
              ref={videoRef}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              controls
              onError={(e) => {
                console.error('Video failed to load:', e);
                alert('视频加载失败');
              }}
            >
              <source src="/golden_gate_dusk.mp4" type="video/mp4" />
              您的浏览器不支持视频播放。
            </video>
          )}
        </div>
      </div>


    </>
  );
}
