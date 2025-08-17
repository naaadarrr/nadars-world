import { useState } from 'react';
import './App.css';

// 先测试基本的MacOS组件导入
try {
  console.log('Attempting to import MacOSThemeProvider...');
  const { MacOSThemeProvider } = require('../macosx-components');
  console.log('MacOSThemeProvider imported successfully:', MacOSThemeProvider);
} catch (error) {
  console.error('Error importing MacOSThemeProvider:', error);
}

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [error, setError] = useState<string | null>(null);

  // 测试组件渲染
  const renderContent = () => {
    try {
      return (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(180deg, #4A89ED -7.59%, #DCCFFF 102.92%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(48px, 8vw, 96px)',
              color: '#000000',
              margin: '0 0 40px 0',
              textAlign: 'center',
            }}
          >
            Nadar Design - Debug Mode
          </h1>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '16px',
              padding: '20px',
              maxWidth: '600px',
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#000', margin: '0 0 10px 0' }}>Current Page: {currentPage}</p>
            <p style={{ color: '#000', margin: '0 0 10px 0' }}>React is working ✅</p>
            <p style={{ color: '#000', margin: '0 0 10px 0' }}>CSS is loading ✅</p>
            {error && (
              <p style={{ color: 'red', margin: '10px 0 0 0', fontSize: '14px' }}>Error: {error}</p>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['Home', 'Animations', 'Projects', 'About'].map((item) => (
              <button
                key={item}
                style={{
                  background:
                    currentPage === item.toLowerCase()
                      ? 'rgba(255, 255, 255, 0.4)'
                      : 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: '#000',
                  fontWeight: '500',
                }}
                onClick={() => setCurrentPage(item.toLowerCase())}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            background: '#ff0000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          Error rendering app: {err instanceof Error ? err.message : String(err)}
        </div>
      );
    }
  };

  return renderContent();
}

export default App;
