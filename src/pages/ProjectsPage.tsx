
// import SoundButton from "../components/SoundButton";
import { useSoundManager } from "../hooks/useSfx";

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
}

export default function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const soundManager = useSoundManager();
  const projects = [
    {
      id: 1,
      title: 'MacOS Components Library',
      description: 'A React component library that recreates the macOS interface',
      tech: ['React', 'TypeScript', 'CSS'],
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Interactive Animations',
      description: 'Collection of interactive loading animations and micro-interactions',
      tech: ['Lottie', 'Framer Motion', 'React'],
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Design System',
      description: 'Comprehensive design system with components and guidelines',
      tech: ['Figma', 'React', 'Storybook'],
      status: 'Planning',
    },
    {
      id: 4,
      title: 'Mouse Follower Effect',
      description: 'Global mouse follower with image switching animation (now available site-wide)',
      tech: ['React', 'TypeScript', 'Canvas API'],
      status: 'Completed',
    },
  ];

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
          onClick={() => {
            soundManager.playButtonClickDown(); // 返回按钮音效
            onNavigate('home');
          }}
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
          Projects
        </h1>
      </div>

      {/* 项目列表 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 20px',
          zIndex: 10,
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '32px',
              width: '100%',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => {
              if (project.title === 'Mouse Follower Effect') {
                soundManager.playSuccess();
                onNavigate('mouse-follower');
              } else {
                soundManager.playClick();
              }
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px',
              }}
            >
              <h3
                style={{
                  fontFamily: 'AlphaLyrae-Medium, sans-serif',
                  fontSize: '24px',
                  color: '#fff',
                  margin: 0,
                  fontWeight: '500',
                }}
              >
                {project.title}
              </h3>
              <span
                style={{
                  background:
                    project.status === 'Completed'
                      ? 'rgba(34, 197, 94, 0.2)'
                      : project.status === 'In Progress'
                        ? 'rgba(59, 130, 246, 0.2)'
                        : 'rgba(156, 163, 175, 0.2)',
                  color:
                    project.status === 'Completed'
                      ? '#22c55e'
                      : project.status === 'In Progress'
                        ? '#3b82f6'
                        : '#9ca3af',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontFamily: 'AlphaLyrae-Medium, sans-serif',
                  fontWeight: '500',
                }}
              >
                {project.status}
              </span>
            </div>

            <p
              style={{
                fontFamily: 'AlphaLyrae-Medium, sans-serif',
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: '0 0 20px 0',
                lineHeight: 1.5,
              }}
            >
              {project.description}
            </p>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontFamily: 'AlphaLyrae-Medium, sans-serif',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>





    </>
  );
}
