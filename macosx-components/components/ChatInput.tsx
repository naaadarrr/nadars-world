import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Square, Hand, Mic, MicOff } from 'lucide-react';
import { useMacOSTheme } from './MacOSThemeProvider';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (message: string) => void;
  onStop?: () => void;
  onNudge?: () => void;
  placeholder?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  showNudgeButton?: boolean;
  showVoiceButton?: boolean;
  className?: string;
  fontSize?: number;
  previousMessages?: string[];
}

// Animated ellipsis component
function AnimatedEllipsis() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const patterns = ['.', '..', '...', '..', '.', '.', '..', '...'];
    let index = 0;

    const interval = setInterval(() => {
      setDots(patterns[index]);
      index = (index + 1) % patterns.length;
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return <span>{dots}</span>;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  onStop,
  onNudge,
  placeholder = 'Type a message...',
  isLoading = false,
  isDisabled = false,
  showNudgeButton = true,
  showVoiceButton = true,
  className = '',
  fontSize = 13,
  previousMessages = [],
}) => {
  const { theme } = useMacOSTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading && !isDisabled) {
      onSubmit(value.trim());
      onChange('');
      setHistoryIndex(-1);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setHistoryIndex(-1);
  };

  // Handle keyboard navigation through message history
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' && previousMessages.length > 0) {
      e.preventDefault();
      const nextIndex = Math.min(historyIndex + 1, previousMessages.length - 1);
      setHistoryIndex(nextIndex);
      onChange(previousMessages[previousMessages.length - 1 - nextIndex]);
    } else if (e.key === 'ArrowDown' && historyIndex > -1) {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      onChange(nextIndex === -1 ? '' : previousMessages[previousMessages.length - 1 - nextIndex]);
    }
  };

  // Handle nudge button click
  const handleNudge = () => {
    onNudge?.();
  };

  // Handle voice recording (placeholder implementation)
  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // TODO: Implement actual voice recording functionality
  };

  // Handle stop button click
  const handleStop = () => {
    onStop?.();
  };

  return (
    <AnimatePresence initial={false}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`w-full ${className}`}
      >
        <form onSubmit={handleSubmit} className="flex gap-2">
          <motion.div layout className="flex-1 relative" transition={{ duration: 0.15 }}>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={isLoading ? '' : isRecording ? 'Recording...' : placeholder}
              disabled={isDisabled}
              className={`
                w-full h-9 px-3 pr-16 rounded-full border border-gray-300
                bg-white/80 backdrop-blur-lg transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                disabled:bg-gray-100 disabled:cursor-not-allowed
                ${isFocused ? 'input--focused' : ''}
              `}
              style={{
                fontSize,
                fontFamily: theme.fonts.ui,
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            {/* Loading overlay */}
            <AnimatePresence>
              {isLoading && value.trim() === '' && (
                <motion.div
                  key="thinking-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center pl-3"
                >
                  <span className="text-gray-500 opacity-70" style={{ fontSize }}>
                    Thinking
                    <AnimatedEllipsis />
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {/* Nudge button */}
              {showNudgeButton && (
                <button
                  type="button"
                  onClick={handleNudge}
                  className="w-[22px] h-[22px] flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                  aria-label="Send a Nudge"
                >
                  <Hand className="h-4 w-4 -rotate-45" />
                </button>
              )}

              {/* Voice button */}
              {showVoiceButton && (
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  className={`w-[22px] h-[22px] flex items-center justify-center transition-colors ${
                    isRecording
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  disabled={isLoading}
                  aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
              )}
            </div>
          </motion.div>

          {/* Submit/Stop button */}
          <AnimatePresence mode="popLayout" initial={false}>
            {isLoading ? (
              <motion.div
                key="stop"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
                layout
              >
                <button
                  type="button"
                  onClick={handleStop}
                  className="w-9 h-9 rounded-full flex items-center justify-center relative overflow-hidden transition-transform hover:scale-105"
                  style={{
                    background:
                      'linear-gradient(rgba(254, 205, 211, 0.9), rgba(252, 165, 165, 0.9))',
                    boxShadow:
                      '0 2px 3px rgba(0,0,0,0.2), 0 1px 1px rgba(0,0,0,0.3), inset 0 0 0 0.5px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  {/* Top shine */}
                  <div
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2"
                    style={{
                      top: '2px',
                      height: '30%',
                      width: 'calc(100% - 18px)',
                      borderRadius: '8px 8px 4px 4px',
                      background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.25))',
                      filter: 'blur(0.2px)',
                      zIndex: 2,
                    }}
                  />
                  {/* Bottom glow */}
                  <div
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2"
                    style={{
                      bottom: '1px',
                      height: '38%',
                      width: 'calc(100% - 4px)',
                      borderRadius: '4px 4px 100% 100%',
                      background: 'linear-gradient(rgba(255,255,255,0.15), rgba(255,255,255,0.55))',
                      filter: 'blur(0.3px)',
                      zIndex: 1,
                    }}
                  />
                  <Square className="h-4 w-4 text-black/70 relative z-10" fill="currentColor" />
                </button>
              </motion.div>
            ) : value.trim() !== '' ? (
              <motion.div
                key="send"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
                layout
              >
                <button
                  type="submit"
                  className="w-9 h-9 rounded-full flex items-center justify-center relative overflow-hidden transition-transform hover:scale-105"
                  disabled={isLoading || isDisabled}
                  style={{
                    background:
                      'linear-gradient(rgba(217, 249, 157, 0.9), rgba(190, 227, 120, 0.9))',
                    boxShadow:
                      '0 2px 3px rgba(0,0,0,0.2), 0 1px 1px rgba(0,0,0,0.3), inset 0 0 0 0.5px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  {/* Top shine */}
                  <div
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2"
                    style={{
                      top: '2px',
                      height: '30%',
                      width: 'calc(100% - 16px)',
                      borderRadius: '12px 12px 4px 4px',
                      background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.25))',
                      filter: 'blur(0.2px)',
                      zIndex: 2,
                    }}
                  />
                  {/* Bottom glow */}
                  <div
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2"
                    style={{
                      bottom: '1px',
                      height: '38%',
                      width: 'calc(100% - 4px)',
                      borderRadius: '4px 4px 100% 100%',
                      background: 'linear-gradient(rgba(255,255,255,0.15), rgba(255,255,255,0.55))',
                      filter: 'blur(0.3px)',
                      zIndex: 1,
                    }}
                  />
                  <ArrowUp className="h-6 w-6 text-black/70 relative z-10" />
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};
