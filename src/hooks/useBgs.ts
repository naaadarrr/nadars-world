import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

interface UseBgsProps {
  enabled: boolean;
  src: string;
  volume?: number;
  loop?: boolean;
}

export const useBgs = ({ enabled, src, volume = 0.3, loop = true }: UseBgsProps) => {
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // 如果已经存在音频实例，先停止并销毁
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }

    // 创建新的音频实例
    soundRef.current = new Howl({
      src: [src],
      volume: volume,
      loop: loop,
      html5: true, // 使用HTML5 Audio，更好的兼容性
      preload: true, // 预加载音频
    });

    // 如果启用，开始播放
    if (enabled) {
      soundRef.current.play();
    }

    // 清理函数
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
    };
  }, [src, enabled, volume, loop]);

  // 播放/暂停控制
  const play = () => {
    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  const pause = () => {
    if (soundRef.current) {
      soundRef.current.pause();
    }
  };

  const stop = () => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  };

  // 音量控制
  const setVolume = (newVolume: number) => {
    if (soundRef.current) {
      soundRef.current.volume(newVolume);
    }
  };

  // 淡入淡出效果
  const fadeIn = (duration: number = 1000) => {
    if (soundRef.current) {
      soundRef.current.fade(0, volume, duration);
    }
  };

  const fadeOut = (duration: number = 1000) => {
    if (soundRef.current) {
      soundRef.current.fade(volume, 0, duration);
    }
  };

  return {
    play,
    pause,
    stop,
    setVolume,
    fadeIn,
    fadeOut,
    isPlaying: soundRef.current?.playing() || false,
  };
};
