import { useState, useRef, useEffect } from 'react';

interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
}

interface IpodDisplayProps {
  className?: string;
  style?: React.CSSProperties;
}

const songs: Song[] = [
  {
    id: 1,
    title: "Chill Lofi",
    artist: "Relaxing Beats",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
  },
  {
    id: 2,
    title: "Ocean Waves",
    artist: "Nature Sounds", 
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-04.wav"
  },
  {
    id: 3,
    title: "Rain Drop",
    artist: "Ambient",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-03.wav"
  },
  {
    id: 4,
    title: "Bird Song",
    artist: "Morning Vibes",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-02.wav"
  },
  {
    id: 5,
    title: "Cool with You",
    artist: "NewJeans",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-01.wav"
  }
];

export const IpodDisplay: React.FC<IpodDisplayProps> = ({ className, style }) => {
  const [currentScreen, setCurrentScreen] = useState<'main' | 'music' | 'nowplaying'>('main');
  const [selectedSongIndex, setSelectedSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 播放/暂停功能
  const togglePlay = () => {
    if (!currentSong) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  // 选择歌曲
  const selectSong = (song: Song) => {
    setCurrentSong(song);
    setCurrentScreen('nowplaying');
    setIsPlaying(true);
  };

  // 上一首/下一首
  const nextSong = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex(s => s.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % songs.length;
      const nextSongToPlay = songs[nextIndex];
      setCurrentSong(nextSongToPlay);
      setIsPlaying(true);
    } else if (songs.length > 0) {
      // 如果没有当前歌曲，播放第一首
      setCurrentSong(songs[0]);
      setCurrentScreen('nowplaying');
      setIsPlaying(true);
    }
  };

  const prevSong = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex(s => s.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
      const prevSongToPlay = songs[prevIndex];
      setCurrentSong(prevSongToPlay);
      setIsPlaying(true);
    } else if (songs.length > 0) {
      // 如果没有当前歌曲，播放最后一首
      setCurrentSong(songs[songs.length - 1]);
      setCurrentScreen('nowplaying');
      setIsPlaying(true);
    }
  };

  // 音频结束时自动播放下一首
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        nextSong();
      };
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, [currentSong]);

  // 当选择新歌曲时更新音频源
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log('Audio play failed:', error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSong, isPlaying]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'main':
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', marginBottom: '4px' }}>♪ iPod</div>
            {currentSong ? (
              <div style={{ fontSize: '8px', lineHeight: '1.2' }}>
                <div style={{ color: '#00ff00', fontWeight: 'bold', marginBottom: '1px' }}>
                  {isPlaying ? '♪' : '⏸'} {currentSong.title}
                </div>
                <div style={{ color: '#00cc00', fontSize: '7px' }}>
                  {currentSong.artist}
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '10px', marginTop: '4px', color: '#00aa00' }}>
                Press Menu
              </div>
            )}
          </div>
        );
      
      case 'music':
        return (
          <div style={{ fontSize: '9px', lineHeight: '1.1', padding: '2px' }}>
            <div style={{ marginBottom: '3px', fontWeight: 'bold', color: '#00ff00', fontSize: '8px' }}>
              ♪ MUSIC LIBRARY
            </div>
            {songs.map((song, index) => (
              <div
                key={song.id}
                style={{
                  backgroundColor: index === selectedSongIndex ? '#00ff00' : 'transparent',
                  color: index === selectedSongIndex ? '#000' : '#00ff00',
                  padding: '1px 3px',
                  cursor: 'pointer',
                  fontSize: '7px',
                  marginBottom: '1px',
                  borderRadius: '1px',
                  display: 'flex',
                  flexDirection: 'column',
                  lineHeight: '1.0',
                }}
                onClick={() => selectSong(song)}
              >
                <div style={{ fontWeight: 'bold' }}>{song.title}</div>
                <div style={{ 
                  fontSize: '6px', 
                  opacity: index === selectedSongIndex ? 0.7 : 0.8,
                  marginTop: '1px'
                }}>
                  {song.artist}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'nowplaying':
        return (
          <div style={{ textAlign: 'center', fontSize: '9px', padding: '2px' }}>
            <div style={{ fontSize: '7px', marginBottom: '3px', color: '#00aa00' }}>
              {isPlaying ? '♪ NOW PLAYING' : '⏸ PAUSED'}
            </div>
            <div style={{ 
              fontSize: '10px', 
              fontWeight: 'bold', 
              marginBottom: '3px',
              color: '#00ff00',
              lineHeight: '1.1',
              maxHeight: '22px',
              overflow: 'hidden'
            }}>
              {currentSong?.title || 'No Song'}
            </div>
            <div style={{ 
              fontSize: '8px', 
              color: '#00cc00',
              lineHeight: '1.1'
            }}>
              {currentSong?.artist || 'Unknown Artist'}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      className={className}
      style={{
        width: '200px',
        height: '320px',
        background: 'linear-gradient(145deg, #f0f0f0, #d0d0d0)',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        ...style,
      }}
    >
      {/* iPod Screen */}
      <div
        style={{
          width: '140px',
          height: '100px',
          background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
          borderRadius: '8px',
          border: '2px solid #333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00ff00',
          fontSize: '12px',
          fontFamily: 'monospace',
          textAlign: 'center',
          padding: '8px',
          overflow: 'hidden',
        }}
      >
        {renderScreen()}
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} style={{ display: 'none' }} />

      {/* Click Wheel */}
      <div
        style={{
          width: '120px',
          height: '120px',
          background: 'linear-gradient(145deg, #e0e0e0, #c0c0c0)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)',
          position: 'relative',
        }}
      >
        {/* Center Button - Select/Play */}
        <div
          style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(145deg, #f0f0f0, #d0d0d0)',
            borderRadius: '50%',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (currentScreen === 'nowplaying') {
              togglePlay();
            } else if (currentScreen === 'music') {
              selectSong(songs[selectedSongIndex]);
            }
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
        
        {/* Menu Button */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            fontSize: '8px',
            color: '#666',
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '4px',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (currentScreen === 'main') {
              setCurrentScreen('music');
            } else {
              setCurrentScreen('main');
            }
          }}
        >
          MENU
        </div>
        
        {/* Next Button */}
        <div
          style={{
            position: 'absolute',
            right: '8px',
            fontSize: '10px',
            color: '#666',
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
            transition: 'all 0.2s ease',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (currentScreen === 'music') {
              setSelectedSongIndex((prev) => (prev + 1) % songs.length);
            } else if (currentScreen === 'nowplaying') {
              nextSong();
            } else {
              // 从主屏幕也可以直接下一首
              nextSong();
            }
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.color = '#333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#666';
          }}
        >
          ⏭
        </div>
        
        {/* Play/Pause Button */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            fontSize: '10px',
            color: '#666',
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
            transition: 'all 0.2s ease',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (currentSong) {
              togglePlay();
            } else if (songs.length > 0) {
              // 如果没有当前歌曲，开始播放第一首
              selectSong(songs[0]);
            }
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.color = '#333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#666';
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </div>
        
        {/* Previous Button */}
        <div
          style={{
            position: 'absolute',
            left: '8px',
            fontSize: '10px',
            color: '#666',
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
            transition: 'all 0.2s ease',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (currentScreen === 'music') {
              setSelectedSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
            } else if (currentScreen === 'nowplaying') {
              prevSong();
            } else {
              // 从主屏幕也可以直接上一首
              prevSong();
            }
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.color = '#333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#666';
          }}
        >
          ⏮
        </div>
      </div>
    </div>
  );
};