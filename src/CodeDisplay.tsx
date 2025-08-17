import { useState } from 'react';

interface CodeDisplayProps {
  animationId: string;
  title: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ animationId }) => {
  const [copied, setCopied] = useState(false);

  const getCodeForAnimation = (id: string) => {
    switch (id) {
      case 'taskProgress':
        return `import Lottie from "lottie-react";
import taskProgressAnimation from "./TaskProgressLoadingAnimation.json";

const TaskProgressLoadingAnimation = () => {
  return (
    <div style={{ 
      position: "relative", 
      width: "100%", 
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Lottie 
        animationData={taskProgressAnimation} 
        loop={true}
        style={{
          width: "150px",
          height: "150px",
          maxWidth: "80%",
          maxHeight: "80%"
        }}
      />
    </div>
  );
};

export default TaskProgressLoadingAnimation;`;

      case 'textAnimations':
        return `

const TextShimmer = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "400",
            fontFamily: "system-ui, -apple-system, sans-serif",
            background: "linear-gradient(110deg, #666 0%, #666 40%, #fff 50%, #666 60%, #666 100%)",
            backgroundSize: "300% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 4s ease-in-out infinite",
            willChange: "background-position",
          }}
        >
          Thinking...
        </div>
      </div>

      <style>
        {\`
          @keyframes shimmer {
            0% { background-position: -300% 0; }
            50% { background-position: 0% 0; }
            100% { background-position: 300% 0; }
          }
        \`}
      </style>
    </div>
  );
};

export default TextShimmer;`;

      case 'typewriter':
        return `import { useState, useEffect } from 'react';

const TypewriterAnimation = () => {
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
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '14px',
      color: '#fff',
    }}>
      <div style={{
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
      }}>
        <span>Generating</span>
        <span style={{ 
          minWidth: '24px',
          opacity: dotCount / maxDots,
          transition: 'opacity 0.3s ease'
        }}>
          {typewriterDots}
        </span>
      </div>
    </div>
  );
};

export default TypewriterAnimation;`;

      case 'videoViralAgent':
        return `

interface VideoViralAgentAnimationProps {
  isDetailView?: boolean;
}

const VideoViralAgentAnimation: React.FC<VideoViralAgentAnimationProps> = ({ isDetailView = false }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
        <div style={{
          fontSize: isDetailView ? '120px' : '20px',
          fontWeight: '600', // semibold
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: isDetailView 
            ? 'linear-gradient(90deg, #fff 0%, #fff 35%, #1E34FF 40%, #30D5E5 50%, #DFE0FF 60%, #E53BE5 70%, #fff 75%, #fff 100%)'
            : 'linear-gradient(90deg, #fff 0%, #fff 35%, #1E34FF 40%, #30D5E5 50%, #E53BE5 60%, #fff 65%, #fff 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: isDetailView ? 'detailShimmer 6s ease-in-out infinite' : 'cardShimmer 5s ease-in-out infinite',
          willChange: 'background-position',
          textAlign: 'center',
          lineHeight: 1.1,
        }}>
          Video Viral Agent
        </div>
      </div>
      
      <style>{\`
        @keyframes cardShimmer {
          0% { background-position: -150% 0; }
          20% { background-position: -150% 0; }
          60% { background-position: 150% 0; }
          100% { background-position: 150% 0; }
        }
        
        @keyframes detailShimmer {
          0% { background-position: -150% 0; }
          15% { background-position: -150% 0; }
          55% { background-position: 150% 0; }
          100% { background-position: 200% 0; }
        }
      \`}</style>
    </div>
  );
};

export default VideoViralAgentAnimation;`;

      case 'ripple':
        return `

const RippleAnimation = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
        <div style={{
          position: 'relative',
          width: '120px',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
            zIndex: 10,
            animation: 'centerPulse 3s ease-in-out infinite',
          }} />
          
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '3px solid rgba(255, 107, 107, 0.6)',
              animation: \`ripple 3s ease-out infinite \${i}s\`,
            }} />
          ))}
        </div>
      </div>
      
      <style>{\`
        @keyframes ripple {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes centerPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
      \`}</style>
    </div>
  );
};

export default RippleAnimation;`;

      default:
        return '// Code not available for this animation';
    }
  };

  const code = getCodeForAnimation(animationId);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${animationId}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
      }}
    >
      {/* Header - 类似GitHub的文件头部 */}
      <div
        style={{
          background: 'transparent',
          padding: '20px 20px 16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(12px, 2vw, 14px)',
            color: '#f0f6fc',
            fontWeight: '600',
          }}
        >
          {animationId}.tsx
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={copyToClipboard}
            style={{
              background: copied ? '#238636' : 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
              padding: 'clamp(4px, 1vw, 5px) clamp(12px, 2vw, 16px)',
              color: '#f0f6fc',
              fontSize: 'clamp(10px, 1.5vw, 12px)',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
            onMouseEnter={(e) => {
              if (!copied) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={downloadCode}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
              padding: 'clamp(4px, 1vw, 5px) clamp(12px, 2vw, 16px)',
              color: '#f0f6fc',
              fontSize: 'clamp(10px, 1.5vw, 12px)',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            Download
          </button>
        </div>
      </div>

      {/* Code Content - 类似GitHub的代码展示区域 */}
      <div
        style={{
          flex: 1,
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '12px',
          margin: '0 20px 20px 20px',
          overflow: 'auto',
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          fontSize: '12px',
          lineHeight: '20px',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {code.split('\n').map((line, index) => (
              <tr key={index}>
                {/* 行号列 */}
                <td
                  style={{
                    width: '1%',
                    minWidth: '50px',
                    padding: '0 10px',
                    textAlign: 'right',
                    color: '#7d8590',
                    backgroundColor: 'transparent',
                    userSelect: 'none',
                    verticalAlign: 'top',
                  }}
                >
                  {index + 1}
                </td>
                {/* 代码内容列 */}
                <td
                  style={{
                    padding: '0 10px 0 16px',
                    color: '#f0f6fc',
                    whiteSpace: 'pre',
                    verticalAlign: 'top',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  {line || ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CodeDisplay;
