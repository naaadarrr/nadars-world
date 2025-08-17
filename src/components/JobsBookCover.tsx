import React from 'react';

interface JobsBookCoverProps {
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  coverImage?: string;
}

export const JobsBookCover: React.FC<JobsBookCoverProps> = ({ onClick, className, style, coverImage }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // 默认跳转到Figma链接
      window.open('https://www.figma.com/proto/XVcrpQIkZwYohpi4vKXuli/%E8%AF%BB%E4%B9%A6%E5%88%86%E4%BA%AB%E4%BC%9A?page-id=0%3A1&node-id=116-6&p=f&viewport=143%2C-128%2C0.04&t=uiAFJhshRUXAt3hG-1&scaling=contain&content-scaling=fixed&starting-point-node-id=101%3A565', '_blank');
    }
  };

  return (
    <div
      className={className}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ...style,
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      }}
    >
      {/* 书籍封面设计 */}
      <div
        style={{
          width: '140px',
          height: '200px',
          background: coverImage 
            ? `url(${coverImage})` 
            : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};