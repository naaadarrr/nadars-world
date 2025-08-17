import { useState, useEffect } from 'react';

const TypewriterAnimation: React.FC = () => {
  const [typewriterDots, setTypewriterDots] = useState('');
  const [dotCount, setDotCount] = useState(1);
  const maxDots = 3;

  useEffect(() => {
    let currentDotCount = 1;

    const timer = setInterval(() => {
      setTypewriterDots('.'.repeat(currentDotCount));
      setDotCount(currentDotCount);

      currentDotCount++;
      if (currentDotCount > maxDots) {
        currentDotCount = 1;
      }
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        color: '#fff',
      }}
    >
      <div
        style={{
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span>Generating</span>
        <span
          style={{
            minWidth: '24px',
            opacity: dotCount / maxDots, // 1个点=0.33, 2个点=0.67, 3个点=1.0
            transition: 'opacity 0.3s ease',
          }}
        >
          {typewriterDots}
        </span>
      </div>
    </div>
  );
};

export default TypewriterAnimation;
