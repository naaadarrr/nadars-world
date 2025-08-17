import React, { useState, useCallback } from 'react';
import { MacOSWindow } from './MacOSWindow';
import { ChatContainer } from './ChatContainer';
import { ChatInput } from './ChatInput';
import type { ChatMessage } from './ChatBubble';

interface ChatAppProps {
  title?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isForeground?: boolean;
  currentUserId?: string;
  initialMessages?: ChatMessage[];
  onSendMessage?: (message: string) => Promise<void>;
  isLoading?: boolean;
  error?: Error | null;
  className?: string;
  fontSize?: number;
  showNudgeButton?: boolean;
  showVoiceButton?: boolean;
  emptyStateMessage?: string;
}

export const ChatApp: React.FC<ChatAppProps> = ({
  title = 'Chat',
  onClose,
  onMinimize,
  onMaximize,
  isForeground = true,
  currentUserId = 'user',
  initialMessages = [],
  onSendMessage,
  isLoading = false,
  error = null,
  className = '',
  fontSize = 13,
  showNudgeButton = true,
  showVoiceButton = true,
  emptyStateMessage = 'Start a new conversation?',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [previousMessages, setPreviousMessages] = useState<string[]>([]);

  // Handle sending a message
  const handleSendMessage = useCallback(
    async (messageText: string) => {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        content: messageText,
        role: 'user',
        username: currentUserId,
        createdAt: new Date(),
        isPending: false,
      };

      // Add user message immediately
      setMessages((prev) => [...prev, userMessage]);

      // Add to message history
      setPreviousMessages((prev) => [...prev, messageText]);

      // Call external handler if provided
      if (onSendMessage) {
        try {
          await onSendMessage(messageText);
        } catch (error) {
          console.error('Failed to send message:', error);
          // You might want to show an error state here
        }
      } else {
        // Default behavior: simulate assistant response
        setTimeout(() => {
          const assistantMessage: ChatMessage = {
            id: `assistant-${Date.now()}`,
            content: `I received your message: "${messageText}"`,
            role: 'assistant',
            username: 'Assistant',
            createdAt: new Date(),
            isPending: false,
          };
          setMessages((prev) => [...prev, assistantMessage]);
        }, 1000);
      }
    },
    [currentUserId, onSendMessage],
  );

  // Handle copying a message
  const handleCopyMessage = useCallback((message: ChatMessage) => {
    navigator.clipboard.writeText(message.content).catch(console.error);
  }, []);

  // Handle deleting a message
  const handleDeleteMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => prev.filter((m) => m.id !== message.id));
  }, []);

  // Handle speaking a message (placeholder)
  const handleSpeakMessage = useCallback((message: ChatMessage) => {
    console.log('Speaking message:', message.content);
    // TODO: Implement text-to-speech functionality
  }, []);

  // Handle nudge action
  const handleNudge = useCallback(() => {
    const nudgeMessage: ChatMessage = {
      id: `nudge-${Date.now()}`,
      content: '👋 *nudge*',
      role: 'user',
      username: currentUserId,
      createdAt: new Date(),
      isPending: false,
    };
    setMessages((prev) => [...prev, nudgeMessage]);
  }, [currentUserId]);

  // Handle clearing chat
  const handleClearChat = useCallback(() => {
    setMessages([]);
    setPreviousMessages([]);
  }, []);

  // Handle stopping generation (placeholder)
  const handleStop = useCallback(() => {
    console.log('Stopping generation...');
    // TODO: Implement stop functionality
  }, []);

  return (
    <MacOSWindow
      title={title}
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isForeground={isForeground}
      className={className}
      windowConstraints={{
        minWidth: 400,
        minHeight: 500,
      }}
    >
      <div className="flex flex-col h-full bg-white">
        {/* Chat messages area */}
        <div className="flex-1 min-h-0">
          <ChatContainer
            messages={messages}
            isLoading={isLoading}
            error={error}
            onCopyMessage={handleCopyMessage}
            onDeleteMessage={handleDeleteMessage}
            onSpeakMessage={handleSpeakMessage}
            onClear={handleClearChat}
            currentUserId={currentUserId}
            fontSize={fontSize}
            emptyStateMessage={emptyStateMessage}
          />
        </div>

        {/* Chat input area */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={handleSendMessage}
            onStop={handleStop}
            onNudge={handleNudge}
            isLoading={isLoading}
            showNudgeButton={showNudgeButton}
            showVoiceButton={showVoiceButton}
            fontSize={fontSize}
            previousMessages={previousMessages}
            placeholder="Type a message..."
          />
        </div>
      </div>
    </MacOSWindow>
  );
};
