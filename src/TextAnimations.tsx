const TextAnimations = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        {/* Shimmer文字效果 */}
        <div
          style={{
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            background: 'linear-gradient(110deg, #666 0%, #666 40%, #fff 50%, #666 60%, #666 100%)',
            backgroundSize: '300% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s ease-in-out infinite',
            willChange: 'background-position',
          }}
        >
          Thinking...
        </div>
      </div>

      <style>
        {`
          @keyframes shimmer {
            0% { 
              background-position: -300% 0; 
            }
            50% { 
              background-position: 0% 0; 
            }
            100% { 
              background-position: 300% 0; 
            }
          }
        `}
      </style>
    </div>
  );
};

export default TextAnimations;
