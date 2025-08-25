import React from 'react';
import { useSoundManager } from '../hooks/useSfx';

interface SoundToggleProps {
  className?: string;
  style?: React.CSSProperties;
  isBgsMasterEnabled?: boolean;
  onBgsToggle?: () => void;
}

const SoundToggle: React.FC<SoundToggleProps> = ({ 
  className, 
  style, 
  isBgsMasterEnabled = false, 
  onBgsToggle 
}) => {
  // const soundManager = useSoundManager();

  const handleBgsToggle = () => {
    if (onBgsToggle) {
      onBgsToggle();
    }
  };

  return (
    <div 
      className={className}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        ...style
      }}
    >
      {/* 背景音乐开关 - 简化设计，移除圆框描边 */}
      <div
        onClick={handleBgsToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          color: '#ffffff',
          fontSize: '14px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: '500',
          letterSpacing: '0.5px',
          transition: 'all 0.3s ease',
          userSelect: 'none',
          padding: '8px 12px',
        }}
        title={isBgsMasterEnabled ? '关闭背景音乐' : '开启背景音乐'}
      >
        <span style={{ 
          fontSize: '16px',
          color: '#ffffff'
        }}>
          🎵
        </span>
        <span style={{ 
          color: '#ffffff',
          fontWeight: '600'
        }}>
          BGM [{isBgsMasterEnabled ? 'ON' : 'OFF'}]
        </span>
      </div>
    </div>
  );
};

export default SoundToggle;
