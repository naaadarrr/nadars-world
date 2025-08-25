import React from 'react';
import MouseFollower from './MouseFollower';

// 最简单的使用方式
const SimpleMouseFollowerExample: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        textAlign: 'center',
        color: '#fff',
        padding: '40px',
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
          🐎 简单的鼠标跟随效果
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
          移动鼠标，你会看到一匹马跟随你的光标
        </p>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '20px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
        }}>
          <h3>使用方法：</h3>
          <pre style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '15px',
            borderRadius: '8px',
            textAlign: 'left',
            fontSize: '14px',
          }}>
{`import MouseFollower from './MouseFollower';

// 在你的组件中使用
<MouseFollower 
  enabled={true}
  size={60}
  offsetX={30}
  offsetY={30}
  smoothness={0.15}
/>`}
          </pre>
        </div>
      </div>

      {/* 鼠标跟随器 */}
      <MouseFollower 
        enabled={true}
        size={60}
        offsetX={30}
        offsetY={30}
        smoothness={0.15}
      />
    </div>
  );
};

export default SimpleMouseFollowerExample;
