import React, { useState } from 'react';
// import MouseFollower from './MouseFollower';
import AdvancedMouseFollower from './AdvancedMouseFollower';
import MouseFollowerControls from './MouseFollowerControls';

const MouseFollowerDemo: React.FC = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    size: 60,
    offsetX: 30,
    offsetY: 30,
    smoothness: 0.15,
    effect: 'smooth' as 'smooth' | 'bounce' | 'elastic' | 'trail',
    trailLength: 5,
    rotation: true,
    scale: true
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* 标题 */}
      <div style={{
        textAlign: 'center',
        color: '#fff',
        marginBottom: '40px',
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>🐎 鼠标跟随效果演示</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          移动鼠标来体验不同的跟随效果
        </p>
      </div>

      {/* 说明卡片 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '20px',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
          <h3>🎯 平滑跟随</h3>
          <p>最基础的跟随效果，图片会平滑地跟随鼠标移动。</p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '20px',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
          <h3>🎪 弹跳效果</h3>
          <p>图片会以弹跳的方式跟随鼠标，增加趣味性。</p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '20px',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
          <h3>🔄 弹性效果</h3>
          <p>模拟物理弹性，图片会有惯性跟随效果。</p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '20px',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
          <h3>🌊 轨迹效果</h3>
          <p>鼠标移动时会留下轨迹，形成拖尾效果。</p>
        </div>
      </div>

      {/* 交互区域 */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '40px',
        textAlign: 'center',
        border: '2px dashed rgba(255, 255, 255, 0.3)',
        marginBottom: '40px',
      }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>🎮 在这里移动鼠标</h2>
        <p style={{ color: '#fff', opacity: 0.7 }}>
          尝试不同的跟随效果，调整参数来获得最佳体验
        </p>
        
        {/* 一些交互元素 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '30px',
          flexWrap: 'wrap',
        }}>
          {['按钮1', '按钮2', '按钮3', '按钮4'].map((text, index) => (
            <button
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                padding: '12px 24px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* 控制面板 */}
      <MouseFollowerControls
        settings={settings}
        onSettingsChange={setSettings}
      />

      {/* 鼠标跟随器 */}
      <AdvancedMouseFollower
        enabled={settings.enabled}
        size={settings.size}
        offsetX={settings.offsetX}
        offsetY={settings.offsetY}
        smoothness={settings.smoothness}
        effect={settings.effect}
        trailLength={settings.trailLength}
        rotation={settings.rotation}
        scale={settings.scale}
      />
    </div>
  );
};

export default MouseFollowerDemo;
