import { useRef, useEffect } from 'react';

const GRID_SIZE = 48; // 网格间距
const HIGHLIGHT_RADIUS = 120; // 高亮半径
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

interface GridHighlightProps {
  mouse: { x: number; y: number } | null;
}

const GridHighlight: React.FC<GridHighlightProps> = ({ mouse }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 绘制网格和高亮
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 画基础网格
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= CANVAS_WIDTH; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y <= CANVAS_HEIGHT; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_WIDTH, y);
      ctx.stroke();
    }

    // 画高亮
    if (mouse) {
      ctx.save();
      ctx.shadowColor = 'rgba(255,255,255,0.5)';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 2;
      for (let x = 0; x <= CANVAS_WIDTH; x += GRID_SIZE) {
        if (Math.abs(x - mouse.x) < HIGHLIGHT_RADIUS) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, CANVAS_HEIGHT);
          ctx.stroke();
        }
      }
      for (let y = 0; y <= CANVAS_HEIGHT; y += GRID_SIZE) {
        if (Math.abs(y - mouse.y) < HIGHLIGHT_RADIUS) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(CANVAS_WIDTH, y);
          ctx.stroke();
        }
      }
      ctx.restore();
    }
  }, [mouse]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: '#000',
      }}
    />
  );
};

export default GridHighlight;
