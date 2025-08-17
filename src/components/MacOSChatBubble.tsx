

interface MacOSChatBubbleProps {
  message: string;
  isOwn?: boolean;
  className?: string;
}

export default function MacOSChatBubble({
  message,
  isOwn = false,
  className = '',
}: MacOSChatBubbleProps) {
  return (
    <div className={`macos-chat-bubble ${isOwn ? 'own' : 'other'} ${className}`}>
      <div className="bubble-wrapper">
        <div className="bubble-content">{message}</div>
      </div>

      <style>{`
        .macos-chat-bubble {
          display: flex;
          justify-content: ${isOwn ? 'flex-end' : 'flex-start'};
          margin: 8px 0;
          max-width: 100%;
        }

        .bubble-wrapper {
          position: relative;
          max-width: 420px;
          min-width: 60px;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
        }

        .bubble-content {
          position: relative;
          padding: 14px 20px;
          border-radius: 25px;
          font-family:
            -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif;
          font-size: 17px;
          line-height: 1.4;
          word-wrap: break-word;
          overflow-wrap: break-word;

          /* 更接近图片的样式 - 浅蓝色渐变背景 */
          background: linear-gradient(
            135deg,
            rgba(174, 203, 250, 0.9) 0%,
            rgba(145, 180, 240, 0.9) 50%,
            rgba(120, 160, 230, 0.9) 100%
          );
          color: #1d1d1f;

          /* 更强的立体效果 */
          box-shadow: 
            /* 外部阴影 - 更深更大 */
            0 12px 24px rgba(0, 0, 0, 0.2),
            0 4px 8px rgba(0, 0, 0, 0.1),
            /* 内部高光 */ inset 0 1px 0 rgba(255, 255, 255, 0.8),
            inset 0 -1px 0 rgba(0, 0, 0, 0.05),
            /* 边缘高光 */ inset 1px 0 0 rgba(255, 255, 255, 0.3),
            inset -1px 0 0 rgba(255, 255, 255, 0.3);

          /* 边框 */
          border: 1px solid rgba(255, 255, 255, 0.4);

          /* 3D效果的关键 - 轻微的变形 */
          transform: perspective(1000px) rotateX(2deg);
        }

        /* Hover effects */
        .bubble-wrapper:hover .bubble-content {
          transform: perspective(1000px) rotateX(2deg) translateY(-2px);
          box-shadow:
            0 16px 32px rgba(0, 0, 0, 0.25),
            0 6px 12px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            inset 0 -1px 0 rgba(0, 0, 0, 0.05),
            inset 1px 0 0 rgba(255, 255, 255, 0.4),
            inset -1px 0 0 rgba(255, 255, 255, 0.4);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .bubble-content {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Entrance animation */
        @keyframes bubbleIn {
          from {
            opacity: 0;
            transform: perspective(1000px) rotateX(10deg) translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: perspective(1000px) rotateX(2deg) translateY(0) scale(1);
          }
        }

        .macos-chat-bubble {
          animation: bubbleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Responsive design */
        @media (max-width: 480px) {
          .bubble-wrapper {
            max-width: calc(100vw - 80px);
          }

          .bubble-content {
            font-size: 16px;
            padding: 10px 16px;
          }
        }

        /* 添加一些细节效果 */
        .bubble-content::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          height: 50%;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          border-radius: 23px 23px 12px 12px;
          pointer-events: none;
        }

        /* 底部轻微的反光效果 */
        .bubble-content::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 2px;
          right: 2px;
          height: 20%;
          background: linear-gradient(0deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
          border-radius: 0 0 23px 23px;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
