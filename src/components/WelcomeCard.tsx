interface WelcomeCardProps {
  className?: string;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ className = '' }) => {
  return (
    <div
      className={`welcome-card ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        padding: '20px 32px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      }}
    >
      <h2
        style={{
          fontFamily: 'FigmaPractice-Display, system-ui, -apple-system, sans-serif',
          fontSize: '32px',
          color: '#fff',
          margin: '0',
          fontWeight: 'normal',
          textAlign: 'center',
          letterSpacing: '0.02em',
        }}
      >
        Welcome!
      </h2>
    </div>
  );
};