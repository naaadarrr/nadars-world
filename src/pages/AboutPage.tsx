interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <>
      {/* 返回按钮 */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 20,
          pointerEvents: 'auto',
        }}
      >
        <button
          onClick={() => onNavigate('home')}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            padding: '8px 16px',
            color: '#fff',
            fontFamily: 'AlphaLyrae-Medium, sans-serif',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* 页面标题 */}
      <div
        style={{
          padding: '5vh 0 4vh 0',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          position: 'relative',
        }}
      >
        <h1
          style={{
            fontFamily: 'AlphaLyrae-Medium, sans-serif',
            textAlign: 'center',
            margin: '0 auto',
            fontSize: 'clamp(32px, 5vw, 64px)',
            color: '#fff',
            textShadow: '0 2px 8px #000',
            lineHeight: 1.2,
            padding: '0 20px',
            fontWeight: '500',
          }}
        >
          About Me
        </h1>
      </div>

      {/* 关于内容 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          width: '100%',
          maxWidth: '700px',
          margin: '0 auto',
          padding: '0 20px',
          zIndex: 10,
        }}
      >
        {/* 个人介绍卡片 */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '40px',
            width: '100%',
            backdropFilter: 'blur(10px)',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'AlphaLyrae-Medium, sans-serif',
              fontSize: '28px',
              color: '#fff',
              margin: '0 0 24px 0',
              fontWeight: '500',
            }}
          >
            Hi, I'm Nadar 👋
          </h2>

          <p
            style={{
              fontFamily: 'AlphaLyrae-Medium, sans-serif',
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1.6,
              margin: '0 0 24px 0',
            }}
          >
            I'm a creative designer and developer passionate about crafting beautiful, interactive
            experiences. I specialize in UI/UX design, animation, and front-end development.
          </p>

          <p
            style={{
              fontFamily: 'AlphaLyrae-Medium, sans-serif',
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            When I'm not designing or coding, you can find me exploring new technologies, creating
            animations, or working on open-source projects.
          </p>
        </div>

        {/* 技能卡片 */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '32px',
            width: '100%',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h3
            style={{
              fontFamily: 'AlphaLyrae-Medium, sans-serif',
              fontSize: '24px',
              color: '#fff',
              margin: '0 0 24px 0',
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            Skills & Technologies
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
            }}
          >
            <div>
              <h4
                style={{
                  fontFamily: 'AlphaLyrae-Medium, sans-serif',
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  margin: '0 0 12px 0',
                  fontWeight: '500',
                }}
              >
                Design
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Figma', 'Adobe Creative Suite', 'Sketch', 'Principle'].map((skill) => (
                  <span
                    key={skill}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontFamily: 'AlphaLyrae-Medium, sans-serif',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4
                style={{
                  fontFamily: 'AlphaLyrae-Medium, sans-serif',
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  margin: '0 0 12px 0',
                  fontWeight: '500',
                }}
              >
                Development
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['React', 'TypeScript', 'CSS', 'Framer Motion'].map((skill) => (
                  <span
                    key={skill}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontFamily: 'AlphaLyrae-Medium, sans-serif',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 联系方式 */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '32px',
            width: '100%',
            backdropFilter: 'blur(10px)',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: 'AlphaLyrae-Medium, sans-serif',
              fontSize: '24px',
              color: '#fff',
              margin: '0 0 20px 0',
              fontWeight: '500',
            }}
          >
            Let's Connect
          </h3>

          <p
            style={{
              fontFamily: 'AlphaLyrae-Medium, sans-serif',
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0 0 24px 0',
            }}
          >
            I'm always interested in new opportunities and collaborations.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            {['Email', 'LinkedIn', 'GitHub', 'Dribbble'].map((platform) => (
              <button
                key={platform}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  color: '#fff',
                  fontFamily: 'AlphaLyrae-Medium, sans-serif',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
