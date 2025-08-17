

const PulseAnimation = () => {
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
        {/* 脉冲圆圈 */}
        <div
          style={{
            position: 'relative',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            animation: 'pulse 2s ease-in-out infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          ♥
          {/* 外层脉冲环 */}
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              right: '-10px',
              bottom: '-10px',
              borderRadius: '50%',
              border: '2px solid rgba(102, 126, 234, 0.3)',
              animation: 'pulseRing 2s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              right: '-20px',
              bottom: '-20px',
              borderRadius: '50%',
              border: '2px solid rgba(102, 126, 234, 0.2)',
              animation: 'pulseRing 2s ease-in-out infinite 0.5s',
            }}
          />
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { 
              transform: scale(1);
              opacity: 1;
            }
            50% { 
              transform: scale(1.1);
              opacity: 0.8;
            }
          }
          
          @keyframes pulseRing {
            0% { 
              transform: scale(0.8);
              opacity: 1;
            }
            100% { 
              transform: scale(1.4);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PulseAnimation;