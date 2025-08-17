import React, { useState } from 'react';
import { useMacOSTheme } from './MacOSThemeProvider';

interface TrafficLightsProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isForeground?: boolean;
  className?: string;
}

export const TrafficLights: React.FC<TrafficLightsProps> = ({
  onClose,
  onMinimize,
  onMaximize,
  isForeground = true,
  className = '',
}) => {
  const { theme } = useMacOSTheme();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const buttonStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '8px',
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.6)',
  };

  const getButtonColor = (type: 'close' | 'minimize' | 'maximize', isHovered: boolean) => {
    if (!isForeground) {
      return '#D0D0D0'; // Inactive state
    }

    const colors = theme.colors.trafficLights;
    if (!colors) return '#D0D0D0';

    switch (type) {
      case 'close':
        return isHovered ? colors.closeHover || colors.close : colors.close;
      case 'minimize':
        return isHovered ? colors.minimizeHover || colors.minimize : colors.minimize;
      case 'maximize':
        return isHovered ? colors.maximizeHover || colors.maximize : colors.maximize;
      default:
        return '#D0D0D0';
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent window dragging
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Close button */}
      <button
        style={{
          ...buttonStyle,
          backgroundColor: getButtonColor('close', hoveredButton === 'close'),
        }}
        onMouseEnter={() => setHoveredButton('close')}
        onMouseLeave={() => setHoveredButton(null)}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
        aria-label="Close"
      >
        {hoveredButton === 'close' && isForeground && '×'}
      </button>

      {/* Minimize button */}
      <button
        style={{
          ...buttonStyle,
          backgroundColor: getButtonColor('minimize', hoveredButton === 'minimize'),
        }}
        onMouseEnter={() => setHoveredButton('minimize')}
        onMouseLeave={() => setHoveredButton(null)}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          e.stopPropagation();
          onMinimize?.();
        }}
        aria-label="Minimize"
      >
        {hoveredButton === 'minimize' && isForeground && '−'}
      </button>

      {/* Maximize button */}
      <button
        style={{
          ...buttonStyle,
          backgroundColor: getButtonColor('maximize', hoveredButton === 'maximize'),
        }}
        onMouseEnter={() => setHoveredButton('maximize')}
        onMouseLeave={() => setHoveredButton(null)}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          e.stopPropagation();
          onMaximize?.();
        }}
        aria-label="Maximize"
      >
        {hoveredButton === 'maximize' && isForeground && '+'}
      </button>
    </div>
  );
};
