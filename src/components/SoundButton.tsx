import React from 'react';
import { useSoundManager } from '../hooks/useSfx';

interface SoundButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  style?: React.CSSProperties;
  soundType?: 'click' | 'hover' | 'success' | 'error' | 'notification';
  disabled?: boolean;
}

const SoundButton: React.FC<SoundButtonProps> = ({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
  style,
  soundType = 'click',
  disabled = false,
}) => {
  const soundManager = useSoundManager();

  const handleClick = () => {
    if (!disabled) {
      // 根据类型播放不同音效
      switch (soundType) {
        case 'click':
          soundManager.playClick();
          break;
        case 'success':
          soundManager.playSuccess();
          break;
        case 'error':
          soundManager.playError();
          break;
        case 'notification':
          soundManager.playNotification();
          break;
        default:
          soundManager.playClick();
      }
      
      onClick?.();
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      soundManager.playHover();
      onMouseEnter?.();
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      onMouseLeave?.();
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        ...style,
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SoundButton;
