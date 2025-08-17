import { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

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
        Nadar Design
      </h1>

      <div
        style={{
          display: 'flex',
          gap: '40px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {['Animations', 'Projects', 'About'].map((item) => (
          <div
            key={item}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '16px',
              padding: '20px 40px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '18px',
              color: '#000',
              fontWeight: '500',
            }}
            onClick={() => setCurrentPage(item.toLowerCase())}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '8px',
          fontSize: '14px',
        }}
      >
        Current: {currentPage}
      </div>
    </div>
  );
}

export default App;
