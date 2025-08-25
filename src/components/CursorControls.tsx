import React, { useState } from 'react';

interface CursorControlsProps {
  onSettingsChange: (settings: any) => void;
  settings: {
    enabled: boolean;
    size: number;
    hoverSize: number;
    color: string;
    borderColor: string;
    borderWidth: number;
    trail: boolean;
    trailLength: number;
    trailOpacity: number;
  };
}

const CursorControls: React.FC<CursorControlsProps> = ({
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
      right: '20px', // 从left改为right
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
        <h3 style={{ margin: 0, fontSize: '16px' }}>⭕ 圆形光标控制</h3>
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
          启用圆形光标
        </label>
      </div>

      {isOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* 基础尺寸 */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              基础尺寸: {settings.size}px
            </label>
            <input
              type="range"
              min="8"
              max="32"
              value={settings.size}
              onChange={(e) => handleChange('size', parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* 悬停尺寸 */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              悬停尺寸: {settings.hoverSize}px
            </label>
            <input
              type="range"
              min="16"
              max="64"
              value={settings.hoverSize}
              onChange={(e) => handleChange('hoverSize', parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* 边框宽度 */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              边框宽度: {settings.borderWidth}px
            </label>
            <input
              type="range"
              min="1"
              max="6"
              value={settings.borderWidth}
              onChange={(e) => handleChange('borderWidth', parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* 轨迹效果 */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={settings.trail}
                onChange={(e) => handleChange('trail', e.target.checked)}
                style={{ width: '14px', height: '14px' }}
              />
              启用轨迹效果
            </label>
          </div>

          {/* 轨迹长度 */}
          {settings.trail && (
            <div>
              <label style={{ display: 'block', marginBottom: '4px' }}>
                轨迹长度: {settings.trailLength}
              </label>
              <input
                type="range"
                min="3"
                max="10"
                value={settings.trailLength}
                onChange={(e) => handleChange('trailLength', parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          )}

          {/* 轨迹透明度 */}
          {settings.trail && (
            <div>
              <label style={{ display: 'block', marginBottom: '4px' }}>
                轨迹透明度: {(settings.trailOpacity * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.1"
                value={settings.trailOpacity}
                onChange={(e) => handleChange('trailOpacity', parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CursorControls;
