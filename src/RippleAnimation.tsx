

const RippleAnimation = () => {
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
        {/* 波纹容器 */}
        <div
          style={{
            position: 'relative',
            width: '120px',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 中心点 */}
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
              zIndex: 10,
              animation: 'centerPulse 3s ease-in-out infinite',
            }}
          />
          
          {/* 波纹圈 1 */}
          <div
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '3px solid rgba(255, 107, 107, 0.6)',
              animation: 'ripple 3s ease-out infinite',
            }}
          />
          
          {/* 波纹圈 2 */}
          <div
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '3px solid rgba(255, 107, 107, 0.4)',
              animation: 'ripple 3s ease-out infinite 1s',
            }}
          />
          
          {/* 波纹圈 3 */}
          <div
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '3px solid rgba(255, 107, 107, 0.2)',
              animation: 'ripple 3s ease-out infinite 2s',
            }}
          />
        </div>
      </div>

      <style>
        {`
          @keyframes ripple {
            0% {
              transform: scale(0.5);
              opacity: 1;
            }
            100% {
              transform: scale(3);
              opacity: 0;
            }
          }
          
          @keyframes centerPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.8;
            }
          }
        `}
      </style>
    </div>
  );
};

export default RippleAnimation;