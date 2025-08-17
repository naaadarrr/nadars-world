import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Trash, Volume2, Pause } from 'lucide-react';
import { useMacOSTheme } from './MacOSThemeProvider';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'human';
  username?: string;
  createdAt?: Date;
  isPending?: boolean;
}

interface ChatBubbleProps {
  message: ChatMessage;
  isOwn?: boolean;
  showActions?: boolean;
  onCopy?: (message: ChatMessage) => void;
  onDelete?: (message: ChatMessage) => void;
  onSpeak?: (message: ChatMessage) => void;
  className?: string;
  fontSize?: number;
  highlightSegment?: { messageId: string; start: number; end: number } | null;
  isSpeaking?: boolean;
}

// Helper function to get user color based on username
const getUserColorClass = (username?: string): string => {
  if (!username) return 'bg-gray-100 text-black';

  const userColors = [
    'bg-pink-100 text-black',
    'bg-purple-100 text-black',
    'bg-indigo-100 text-black',
    'bg-teal-100 text-black',
    'bg-lime-100 text-black',
    'bg-amber-100 text-black',
    'bg-cyan-100 text-black',
    'bg-rose-100 text-black',
  ];

  const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return userColors[hash % userColors.length];
};

// Helper function to check if message is urgent (starts with "!!!!")
const isUrgentMessage = (content: string): boolean => content.startsWith('!!!!');

// Helper function to clean urgent prefix
const cleanUrgentPrefix = (content: string): string => {
  return isUrgentMessage(content) ? content.slice(4).trimStart() : content;
};

// Helper function to parse simple markdown
const parseSimpleMarkdown = (text: string): React.ReactNode[] => {
  if (!text) return [text];

  let result: React.ReactNode[] = [];
  const currentText = text;

  // Process bold patterns first (**text** or __text__)
  const boldRegex = /(\\*\\*.*?\\*\\*|__.*?__)/g;
  let lastIndex = 0;
  let boldMatch;

  while ((boldMatch = boldRegex.exec(currentText)) !== null) {
    // Add text before the match
    if (boldMatch.index > lastIndex) {
      result.push(currentText.substring(lastIndex, boldMatch.index));
    }

    // Add the bold text
    const boldContent = boldMatch[0].replace(/^\\*\\*|\\*\\*$|^__|__$/g, '');
    result.push(
      <span key={`bold-${boldMatch.index}`} className="font-bold">
        {boldContent}
      </span>,
    );

    lastIndex = boldMatch.index + boldMatch[0].length;
  }

  // Add any remaining text after the last bold match
  if (lastIndex < currentText.length) {
    result.push(currentText.substring(lastIndex));
  }

  // Now process italic in each text segment
  result = result.flatMap((segment, i) => {
    if (typeof segment !== 'string') return segment;

    const italicParts: React.ReactNode[] = [];
    const italicRegex = /(\\*[^*]+\\*|_[^_]+_)/g;
    let lastItalicIndex = 0;
    let italicMatch;

    while ((italicMatch = italicRegex.exec(segment)) !== null) {
      // Add text before the match
      if (italicMatch.index > lastItalicIndex) {
        italicParts.push(segment.substring(lastItalicIndex, italicMatch.index));
      }

      // Add the italic text
      const italicContent = italicMatch[0].replace(/^\\*|\\*$|^_|_$/g, '');
      italicParts.push(
        <span key={`italic-${i}-${italicMatch.index}`} className="italic">
          {italicContent}
        </span>,
      );

      lastItalicIndex = italicMatch.index + italicMatch[0].length;
    }

    // Add any remaining text after the last italic match
    if (lastItalicIndex < segment.length) {
      italicParts.push(segment.substring(lastItalicIndex));
    }

    return italicParts.length > 0 ? italicParts : segment;
  });

  return result;
};

// Animated component for urgent messages
function UrgentMessageAnimation() {
  const [frame, setFrame] = useState(0);
  const frames = ['!   ', '!!  ', '!!! ', '!!  ', '!   '];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return <span className="text-red-400 animate-pulse">{frames[frame]}</span>;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isOwn = false,
  showActions = true,
  onCopy,
  onDelete,
  onSpeak,
  className = '',
  fontSize = 13,
  highlightSegment,
  isSpeaking = false,
}) => {
  const { theme } = useMacOSTheme();
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const isUrgent = isUrgentMessage(message.content);
  const displayContent = cleanUrgentPrefix(message.content);

  // Determine bubble color
  let bubbleColorClass = '';
  if (isUrgent) {
    bubbleColorClass = 'bg-transparent text-current';
  } else if (message.role === 'user' || isOwn) {
    bubbleColorClass = 'bg-yellow-100 text-black';
  } else if (message.role === 'assistant') {
    bubbleColorClass = 'bg-blue-100 text-black';
  } else if (message.role === 'human') {
    bubbleColorClass = getUserColorClass(message.username);
  }

  // Helper to detect if we're on a touch device
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedMessageId(message.id);
      setTimeout(() => setCopiedMessageId(null), 2000);
      onCopy?.(message);
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  };

  const handleDelete = () => {
    onDelete?.(message);
  };

  const handleSpeak = () => {
    onSpeak?.(message);
  };

  const highlightActive =
    isSpeaking && highlightSegment && highlightSegment.messageId === message.id;

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', duration: 0.4 }}
      className={`flex flex-col w-full ${isOwn ? 'items-end' : 'items-start'} ${className}`}
      onMouseEnter={() => !isTouchDevice() && setHoveredMessageId(message.id)}
      onMouseLeave={() => !isTouchDevice() && setHoveredMessageId(null)}
      onTouchStart={(e) => {
        if (isTouchDevice()) {
          e.preventDefault();
          setHoveredMessageId(message.id);
        }
      }}
    >
      {/* Message metadata */}
      <div
        className="text-xs text-gray-500 mb-1 flex items-center gap-2"
        style={{ fontSize: Math.max(10, fontSize - 3) }}
      >
        {showActions && isOwn && (
          <>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: hoveredMessageId === message.id ? 1 : 0,
                scale: 1,
              }}
              className="h-3 w-3 text-gray-400 hover:text-red-600 transition-colors"
              onClick={handleDelete}
              aria-label="Delete message"
            >
              <Trash className="h-3 w-3" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: hoveredMessageId === message.id ? 1 : 0,
                scale: 1,
              }}
              className="h-3 w-3 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={handleCopy}
              aria-label="Copy message"
            >
              {copiedMessageId === message.id ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </motion.button>
          </>
        )}

        <span className="max-w-[120px] inline-block overflow-hidden text-ellipsis whitespace-nowrap">
          {message.username || (isOwn ? 'You' : 'Assistant')}
        </span>

        <span className="text-gray-400">
          {message.createdAt
            ? (() => {
                const messageDate = new Date(message.createdAt);
                const today = new Date();
                const isBeforeToday =
                  messageDate.getDate() !== today.getDate() ||
                  messageDate.getMonth() !== today.getMonth() ||
                  messageDate.getFullYear() !== today.getFullYear();

                return isBeforeToday
                  ? messageDate.toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                    })
                  : messageDate.toLocaleTimeString([], {
                      hour: 'numeric',
                      minute: '2-digit',
                    });
              })()
            : 'Sending...'}
        </span>

        {showActions && !isOwn && (
          <>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: hoveredMessageId === message.id ? 1 : 0,
                scale: 1,
              }}
              className="h-3 w-3 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={handleCopy}
              aria-label="Copy message"
            >
              {copiedMessageId === message.id ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </motion.button>
            {onSpeak && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: hoveredMessageId === message.id ? 1 : 0,
                  scale: 1,
                }}
                className="h-3 w-3 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={handleSpeak}
                aria-label="Speak message"
              >
                {isSpeaking ? <Pause className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
              </motion.button>
            )}
          </>
        )}
      </div>

      {/* Message bubble */}
      <motion.div
        layout="position"
        className={`
          relative max-w-[80%] px-4 py-2 rounded-2xl shadow-sm select-text
          ${bubbleColorClass}
          ${isOwn ? 'rounded-br-md' : 'rounded-bl-md'}
          ${isUrgent ? 'animate-pulse' : ''}
        `}
        style={{
          fontSize,
          fontFamily: theme.fonts.ui,
          ...(isUrgent && {
            background: 'linear-gradient(45deg, #fee2e2, #fecaca, #fee2e2)',
            animation: 'pulse 2s infinite',
          }),
        }}
      >
        {/* Urgent message indicator */}
        {isUrgent && (
          <div className="absolute -left-8 top-1/2 -translate-y-1/2">
            <UrgentMessageAnimation />
          </div>
        )}

        {/* Message content */}
        <div className="relative">
          {highlightActive && highlightSegment ? (
            <div>
              {displayContent.substring(0, highlightSegment.start)}
              <span className="bg-yellow-300 bg-opacity-50 rounded px-1">
                {displayContent.substring(highlightSegment.start, highlightSegment.end)}
              </span>
              {displayContent.substring(highlightSegment.end)}
            </div>
          ) : (
            <div className="whitespace-pre-wrap break-words">
              {parseSimpleMarkdown(displayContent)}
            </div>
          )}
        </div>

        {/* Pending indicator */}
        {message.isPending && (
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
        )}
      </motion.div>
    </motion.div>
  );
};
