import React, { useState } from 'react';

interface GlobalMouseFollowerControlsProps {
  onSettingsChange: (settings: any) => void;
  settings: {
    enabled: boolean;
    size: number;
    offsetX: number;
    offsetY: number;
    smoothness: number;
    effect: string;
    switchInterval: number;
  };
}

const GlobalMouseFollowerControls: React.FC<GlobalMouseFollowerControlsProps> = ({
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
      top: '200px', // 从20px改为200px，放在CursorControls下方
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
        <h3 style={{ margin: 0, fontSize: '16px' }}>🐎 全局鼠标跟随</h3>
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
          {/* 图片尺寸 */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              图片尺寸: {settings.size}px
            </label>
            <input
              type="range"
              min="60"
              max="180"
              value={settings.size}
              onChange={(e) => handleChange('size', parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* X轴偏移 */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              X轴偏移: {settings.offsetX}px
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

          {/* Y轴偏移 */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              Y轴偏移: {settings.offsetY}px
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

          {/* 平滑度 */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              平滑度: {(settings.smoothness * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="0.8"
              step="0.05"
              value={settings.smoothness}
              onChange={(e) => handleChange('smoothness', parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* 切换间隔 */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              切换间隔: {settings.switchInterval}ms
            </label>
            <input
              type="range"
              min="1000"
              max="5000"
              step="500"
              value={settings.switchInterval}
              onChange={(e) => handleChange('switchInterval', parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* 效果选择 */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              跟随效果:
            </label>
            <select
              value={settings.effect}
              onChange={(e) => handleChange('effect', e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                borderRadius: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontSize: '12px',
              }}
            >
              <option value="smooth">平滑</option>
              <option value="bounce">弹跳</option>
              <option value="elastic">弹性</option>
              <option value="trail">轨迹</option>
            </select>
          </div>

          {/* 图片信息 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '8px',
            borderRadius: '6px',
            fontSize: '12px',
            opacity: 0.8,
          }}>
            <div>当前图片: 4张循环切换</div>
            <div>切换条件: 鼠标移动时</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalMouseFollowerControls;
