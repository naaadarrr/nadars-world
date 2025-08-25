import React, { useState } from 'react';

interface MouseFollowerControlsProps {
  onSettingsChange: (settings: any) => void;
  settings: {
    enabled: boolean;
    size: number;
    offsetX: number;
    offsetY: number;
    smoothness: number;
    effect: 'smooth' | 'bounce' | 'elastic' | 'trail';
    trailLength: number;
    rotation: boolean;
    scale: boolean;
  };
}

const MouseFollowerControls: React.FC<MouseFollowerControlsProps> = ({
  onSettingsChange,
  settings
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: string, value: any) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 10000,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      padding: '16px',
      color: '#fff',
      fontFamily: 'system-ui, sans-serif',
      fontSize: '14px',
      minWidth: '280px',
    }}>
      {/* 控制按钮 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <h3 style={{ margin: 0, fontSize: '16px' }}>🐎 鼠标跟随控制</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          {isOpen ? '收起' : '展开'}
        </button>
      </div>

      {/* 开关 */}
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
            style={{ width: '16px', height: '16px' }}
          />
          启用鼠标跟随
        </label>
      </div>

      {isOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* 效果选择 */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>跟随效果:</label>
            <select
              value={settings.effect}
              onChange={(e) => handleChange('effect', e.target.value)}
              style={{
                width: '100%',
                padding: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                color: '#fff',
              }}
            >
              <option value="smooth">平滑跟随</option>
              <option value="bounce">弹跳效果</option>
              <option value="elastic">弹性效果</option>
              <option value="trail">轨迹效果</option>
            </select>
          </div>

          {/* 尺寸控制 */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              尺寸: {settings.size}px
            </label>
            <input
              type="range"
              min="20"
              max="120"
              value={settings.size}
              onChange={(e) => handleChange('size', parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* 偏移控制 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px' }}>
                X偏移: {settings.offsetX}px
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={settings.offsetX}
                onChange={(e) => handleChange('offsetX', parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px' }}>
                Y偏移: {settings.offsetY}px
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={settings.offsetY}
                onChange={(e) => handleChange('offsetY', parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* 平滑度控制 */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              平滑度: {(settings.smoothness * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={settings.smoothness}
              onChange={(e) => handleChange('smoothness', parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* 轨迹长度控制 */}
          {settings.effect === 'trail' && (
            <div>
              <label style={{ display: 'block', marginBottom: '4px' }}>
                轨迹长度: {settings.trailLength}
              </label>
              <input
                type="range"
                min="2"
                max="10"
                value={settings.trailLength}
                onChange={(e) => handleChange('trailLength', parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          )}

          {/* 动画选项 */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input
                type="checkbox"
                checked={settings.rotation}
                onChange={(e) => handleChange('rotation', e.target.checked)}
                style={{ width: '14px', height: '14px' }}
              />
              旋转
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input
                type="checkbox"
                checked={settings.scale}
                onChange={(e) => handleChange('scale', e.target.checked)}
                style={{ width: '14px', height: '14px' }}
              />
              缩放
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default MouseFollowerControls;
