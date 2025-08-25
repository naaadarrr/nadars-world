import React, { useState } from 'react';
import ImageSwitchingMouseFollower from '../components/ImageSwitchingMouseFollower';
import raphasockImage from '../assets/image/raphasock.png';
import horseImage from '../assets/image/horse.png';
import eggImage from '../assets/image/egg.png';
import coffeecupImage from '../assets/image/coffeecup.png';

interface MouseFollowerDemoPageProps {
  onNavigate: (page: string) => void;
}

const MouseFollowerDemoPage: React.FC<MouseFollowerDemoPageProps> = ({ onNavigate }) => {
  const [settings, setSettings] = useState({
    enabled: true,
    size: 120,
    offsetX: 20,
    offsetY: 20,
    smoothness: 0.25,
    effect: 'elastic' as 'smooth' | 'bounce' | 'elastic',
    switchInterval: 3000,
  });

  const images = [raphasockImage, horseImage, eggImage, coffeecupImage];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'AlphaLyrae-Medium, sans-serif',
    }}>
      {/* 返回按钮 */}
      <button
        onClick={() => onNavigate('projects')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          padding: '8px 16px',
          color: '#fff',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        ← Back to Projects
      </button>

      {/* 标题 */}
      <div style={{ textAlign: 'center', color: '#fff', marginBottom: '40px', paddingTop: '60px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>🐎 Mouse Follower Demo</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>体验智能图片切换的鼠标跟随效果</p>
      </div>

      {/* 控制面板 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '12px',
        padding: '20px',
        color: '#fff',
        minWidth: '280px',
        zIndex: 1000,
      }}>
        <h3>🎛️ 控制面板</h3>
        
        <div style={{ marginBottom: '16px' }}>
          <label>
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => setSettings({...settings, enabled: e.target.checked})}
            />
            启用鼠标跟随
          </label>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>效果: </label>
          <select
            value={settings.effect}
            onChange={(e) => setSettings({...settings, effect: e.target.value as any})}
          >
            <option value="smooth">平滑</option>
            <option value="bounce">弹跳</option>
            <option value="elastic">弹性</option>
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>尺寸: {settings.size}px</label>
          <input
            type="range"
            min="60"
            max="180"
            value={settings.size}
            onChange={(e) => setSettings({...settings, size: parseInt(e.target.value)})}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>切换间隔: {settings.switchInterval}ms</label>
          <input
            type="range"
            min="1000"
            max="5000"
            step="500"
            value={settings.switchInterval}
            onChange={(e) => setSettings({...settings, switchInterval: parseInt(e.target.value)})}
            style={{ width: '100%' }}
          />
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
        maxWidth: '800px',
        margin: '0 auto 40px auto',
      }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>🎮 在这里移动鼠标</h2>
        <p style={{ color: '#fff', opacity: 0.7 }}>
          体验智能图片切换效果，4张图片循环切换，只有在鼠标移动时才会每3秒切换一次
        </p>
      </div>

      {/* 图片切换鼠标跟随效果 */}
      <ImageSwitchingMouseFollower
        enabled={settings.enabled}
        size={settings.size}
        offsetX={settings.offsetX}
        offsetY={settings.offsetY}
        smoothness={settings.smoothness}
        effect={settings.effect}
        switchInterval={settings.switchInterval}
        images={images}
      />
    </div>
  );
};

export default MouseFollowerDemoPage;
