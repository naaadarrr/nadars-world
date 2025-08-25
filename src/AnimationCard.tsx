import { useRef, useState } from 'react';

interface AnimationCardProps {
  card: {
    id: string;
    title: string;
    component: React.ReactNode;
  };
  onCardClick: (id: string) => void;
}

const AnimationCard: React.FC<AnimationCardProps> = ({ card, onCardClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const [isShowLight, setIsShowLight] = useState(false);
  const [lightPos, setLightPos] = useState({ left: '0px', top: '0px' });

  return (
    <div
      ref={cardRef}
      className="moving-border-card"
      onClick={() => onCardClick(card.id)}
      onMouseMove={(e) => {
        e.stopPropagation();
        if (cardRef.current) {
          setIsShowLight(true);

          const rect = cardRef.current.getBoundingClientRect();
          const offsetX = e.clientX - rect.left;
          const offsetY = e.clientY - rect.top;

          // 设置光源位置
          setLightPos({
            left: offsetX + 'px',
            top: offsetY + 'px',
          });

          // 计算3D旋转
          const maxXRotation = 20; // 增加旋转角度让效果更明显
          const maxYRotation = 20;
          const rangeX = rect.width / 2;
          const rangeY = rect.height / 2;

          const rotateX = ((offsetY - rangeY) / rangeY) * maxXRotation;
          const rotateY = -1 * ((offsetX - rangeX) / rangeX) * maxYRotation;

          cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        }
      }}
      onMouseLeave={() => {
        setIsShowLight(false);
        if (cardRef.current) {
          cardRef.current.style.transform =
            'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
      }}
      onMouseEnter={() => {
        // 鼠标进入时的初始化
      }}
    >
      {/* Inner background */}
      <div className="moving-border-card-inner" />

      {/* Light source */}
      <div ref={lightRef} className={`card-light ${isShowLight ? 'show' : ''}`} style={lightPos} />

      {/* Card content */}
      <div className="card-content-3d">
        {/* 动画预览区域 */}
        <div
          style={{
            width: '100%',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            borderRadius: '80px',
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }}
        >
          {card.component}
        </div>

        {/* 卡片信息 */}
        <div>
          <h3
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '20px',
              color: '#fff',
              margin: '0',
              fontWeight: '500',
              textAlign: 'center',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
            }}
          >
            {card.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AnimationCard;
