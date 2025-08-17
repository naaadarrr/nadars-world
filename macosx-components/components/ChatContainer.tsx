import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { ChatBubble } from './ChatBubble';
import type { ChatMessage } from './ChatBubble';
import { useMacOSTheme } from './MacOSThemeProvider';

interface ChatContainerProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  onClear?: () => void;
  onCopyMessage?: (message: ChatMessage) => void;
  onDeleteMessage?: (message: ChatMessage) => void;
  onSpeakMessage?: (message: ChatMessage) => void;
  currentUserId?: string;
  fontSize?: number;
  highlightSegment?: { messageId: string; start: number; end: number } | null;
  isSpeaking?: boolean;
  className?: string;
  emptyStateMessage?: string;
  showScrollToBottom?: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isLoading = false,
  error,
  onRetry,
  onClear,
  onCopyMessage,
  onDeleteMessage,
  onSpeakMessage,
  currentUserId,
  fontSize = 13,
  highlightSegment,
  isSpeaking = false,
  className = '',
  emptyStateMessage = 'Start a new conversation?',
  showScrollToBottom = true,
}) => {
  const { theme } = useMacOSTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (autoScrollEnabled && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, autoScrollEnabled]);

  // Handle scroll events to detect if user is at bottom
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isAtBottomNow = scrollHeight - scrollTop - clientHeight < 10;

      setIsAtBottom(isAtBottomNow);

      if (isAtBottomNow) {
        setAutoScrollEnabled(true);
      } else if (autoScrollEnabled) {
        setAutoScrollEnabled(false);
      }
    }
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      setAutoScrollEnabled(true);
      setIsAtBottom(true);
    }
  };

  return (
    <div className={`flex flex-col h-full relative ${className}`}>
      {/* Messages container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 macos-scrollbar"
        onScroll={handleScroll}
        style={{
          fontFamily: theme.fonts.ui,
        }}
      >
        <AnimatePresence initial={false} mode="sync">
          {/* Empty state */}
          {messages.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center h-full"
            >
              <div className="flex items-center gap-2 text-gray-500">
                <MessageSquare className="h-4 w-4" />
                <span style={{ fontSize }}>{emptyStateMessage}</span>
                {onClear && (
                  <button
                    onClick={onClear}
                    className="text-blue-500 hover:text-blue-700 underline"
                    style={{ fontSize }}
                  >
                    New chat
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Messages */}
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message}
              isOwn={message.role === 'user' || message.username === currentUserId}
              onCopy={onCopyMessage}
              onDelete={onDeleteMessage}
              onSpeak={onSpeakMessage}
              fontSize={fontSize}
              highlightSegment={highlightSegment}
              isSpeaking={isSpeaking}
            />
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start"
            >
              <div
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-2xl rounded-bl-md max-w-[80%]"
                style={{ fontSize, fontFamily: theme.fonts.ui }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                  <span>Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error state */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center p-4"
            >
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
                <div className="text-red-800 text-sm mb-2">
                  {error.message || 'An error occurred'}
                </div>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="text-red-600 hover:text-red-800 underline text-sm"
                  >
                    Try again
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll to bottom button */}
      {showScrollToBottom && (
        <AnimatePresence>
          {!isAtBottom && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ type: 'spring', duration: 0.2 }}
              className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
              onClick={scrollToBottom}
              aria-label="Scroll to bottom"
              style={{
                background: 'linear-gradient(rgba(160,160,160,0.625), rgba(255,255,255,0.625))',
                boxShadow:
                  '0 2px 3px rgba(0,0,0,0.2), 0 1px 1px rgba(0,0,0,0.3), inset 0 0 0 0.5px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(2px)',
              }}
            >
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </motion.button>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
