import { useRef } from 'react';
import { Howl } from 'howler';

// 预定义音效实例
const clickSfx = new Howl({
  src: ['/sounds/AlertBonk.mp3'],
  volume: 0.5,
  html5: true,
});

const hoverSfx = new Howl({
  src: ['/sounds/AlertGrowl.mp3'],
  volume: 0.3,
  html5: true,
});

const successSfx = new Howl({
  src: ['/sounds/AlertSosumi.mp3'],
  volume: 0.4,
  html5: true,
});

const errorSfx = new Howl({
  src: ['/sounds/AlertWildEep.mp3'],
  volume: 0.4,
  html5: true,
});

const notificationSfx = new Howl({
  src: ['/sounds/AlertIndigo.mp3'],
  volume: 0.3,
  html5: true,
});

// 新增音效实例
const menuOpenSfx = new Howl({
  src: ['/sounds/MenuOpen.mp3'],
  volume: 0.4,
  html5: true,
});

const buttonClickDownSfx = new Howl({
  src: ['/sounds/ButtonClickDown.mp3'],
  volume: 0.4,
  html5: true,
});

const windowFocusSfx = new Howl({
  src: ['/sounds/WindowFocus.mp3'],
  volume: 0.3,
  html5: true,
});

const thumpSfx = new Howl({
  src: ['/sounds/Thump.mp3'],
  volume: 0.4,
  html5: true,
});

// 播放音效的函数
export const playClick = () => {
  clickSfx.play();
};

export const playHover = () => {
  hoverSfx.play();
};

export const playSuccess = () => {
  successSfx.play();
};

export const playError = () => {
  errorSfx.play();
};

export const playNotification = () => {
  notificationSfx.play();
};

// 新增音效函数
export const playMenuOpen = () => {
  menuOpenSfx.play();
};

export const playButtonClickDown = () => {
  buttonClickDownSfx.play();
};

export const playWindowFocus = () => {
  windowFocusSfx.play();
};

export const playThump = () => {
  thumpSfx.play();
};

// 自定义音效Hook
export const useSfx = (src: string, volume: number = 0.5) => {
  const soundRef = useRef<Howl | null>(null);

  const play = () => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: [src],
        volume: volume,
        html5: true,
      });
    }
    soundRef.current.play();
  };

  const stop = () => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  };

  return { play, stop };
};

// 音效管理器Hook
export const useSoundManager = () => {
  const isEnabled = useRef(true);

  const enable = () => {
    isEnabled.current = true;
  };

  const disable = () => {
    isEnabled.current = false;
  };

  const playWithCheck = (playFunction: () => void) => {
    if (isEnabled.current) {
      playFunction();
    }
  };

  return {
    enable,
    disable,
    isEnabled: () => isEnabled.current,
    playClick: () => playWithCheck(playClick),
    playHover: () => playWithCheck(playHover),
    playSuccess: () => playWithCheck(playSuccess),
    playError: () => playWithCheck(playError),
    playNotification: () => playWithCheck(playNotification),
    playMenuOpen: () => playWithCheck(playMenuOpen),
    playButtonClickDown: () => playWithCheck(playButtonClickDown),
    playWindowFocus: () => playWithCheck(playWindowFocus),
    playThump: () => playWithCheck(playThump),
  };
};
