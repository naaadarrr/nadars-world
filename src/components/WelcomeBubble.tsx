

interface WelcomeBubbleProps {
  message: string;
  className?: string;
}

export default function WelcomeBubble({ message, className = '' }: WelcomeBubbleProps) {
  return (
    <div className={`welcome-bubble ${className}`}>
      <div className="bubble-content">{message}</div>
      <style>{`
        .welcome-bubble {
          position: relative;
          max-width: 420px;
          margin: 0 auto;
        }

        .bubble-content {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(248, 250, 252, 0.95) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          padding: 16px 24px;
          font-family:
            -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif;
          font-size: 17px;
          line-height: 1.4;
          color: #1d1d1f;
          box-shadow:
            0 4px 20px rgba(0, 0, 0, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
        }

        .bubble-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 100%
          );
        }

        .bubble-content::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid rgba(255, 255, 255, 0.95);
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.05));
        }

        .welcome-bubble:hover .bubble-content {
          transform: translateY(-1px);
          box-shadow:
            0 6px 25px rgba(0, 0, 0, 0.1),
            0 2px 6px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          transition: all 0.2s ease-out;
        }

        .bubble-content {
          transition: all 0.2s ease-out;
        }

        /* 添加一些微妙的动画效果 */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .welcome-bubble {
          animation: fadeInUp 0.6s ease-out;
        }

        /* 响应式设计 */
        @media (max-width: 480px) {
          .bubble-content {
            font-size: 16px;
            padding: 14px 20px;
            border-radius: 18px;
          }
        }
      `}</style>
    </div>
  );
}
