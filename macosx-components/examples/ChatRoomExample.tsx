import React, { useState, useEffect } from 'react';
import { MacOSWindow, MacOSThemeProvider, ChatContainer, ChatInput } from '../index';
import type { ChatMessage } from '../index';

const ChatRoomExample: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Welcome to the chat room! 🎉',
      role: 'human',
      username: 'admin',
      createdAt: new Date(Date.now() - 300000), // 5 minutes ago
    },
    {
      id: '2',
      content: "Hey everyone! How's it going?",
      role: 'human',
      username: 'alice',
      createdAt: new Date(Date.now() - 240000), // 4 minutes ago
    },
    {
      id: '3',
      content: 'Pretty good! Just working on some **React** components.',
      role: 'human',
      username: 'bob',
      createdAt: new Date(Date.now() - 180000), // 3 minutes ago
    },
    {
      id: '4',
      content: '!!!!URGENT: Server maintenance in 10 minutes!',
      role: 'human',
      username: 'admin',
      createdAt: new Date(Date.now() - 120000), // 2 minutes ago
    },
    {
      id: '5',
      content: "Thanks for the heads up! I'll save my work.",
      role: 'human',
      username: 'charlie',
      createdAt: new Date(Date.now() - 60000), // 1 minute ago
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previousMessages, setPreviousMessages] = useState<string[]>([]);
  const currentUserId = 'user';

  // Simulate receiving messages from other users
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance every 5 seconds
        const users = ['alice', 'bob', 'charlie', 'admin'];
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomMessages = [
          'Anyone else working on the weekend?',
          'Just pushed some updates to the repo',
          'Coffee break time! ☕',
          'The weather is nice today',
          "How's everyone doing?",
          'Just finished a big feature!',
          'Time for lunch 🍕',
          'Working from home today',
        ];

        const newMessage: ChatMessage = {
          id: `random-${Date.now()}`,
          content: randomMessages[Math.floor(Math.random() * randomMessages.length)],
          role: 'human',
          username: randomUser,
          createdAt: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (messageText: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: messageText,
      role: 'human',
      username: currentUserId,
      createdAt: new Date(),
      isPending: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setPreviousMessages((prev) => [...prev, messageText]);
    setInput('');

    // Simulate @ryo mention response
    if (messageText.toLowerCase().includes('@ryo')) {
      setIsLoading(true);

      setTimeout(() => {
        const ryoMessage: ChatMessage = {
          id: `ryo-${Date.now()}`,
          content: `Hey ${currentUserId}! I saw you mentioned me. How can I help?`,
          role: 'human',
          username: 'ryo',
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, ryoMessage]);
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleCopyMessage = (message: ChatMessage) => {
    navigator.clipboard.writeText(message.content).catch(console.error);
  };

  const handleDeleteMessage = (message: ChatMessage) => {
    // Only allow deleting own messages or if admin
    if (message.username === currentUserId || currentUserId === 'admin') {
      setMessages((prev) => prev.filter((m) => m.id !== message.id));
    }
  };

  const handleSpeakMessage = (message: ChatMessage) => {
    console.log('Speaking message:', message.content);
    // TODO: Implement text-to-speech
  };

  const handleNudge = () => {
    const nudgeMessage: ChatMessage = {
      id: `nudge-${Date.now()}`,
      content: '👋 *nudges the room*',
      role: 'human',
      username: currentUserId,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, nudgeMessage]);
  };

  const handleClearChat = () => {
    setMessages([]);
    setPreviousMessages([]);
  };

  const handleStop = () => {
    setIsLoading(false);
  };

  return (
    <MacOSThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-600 p-8">
        <div style={{ position: 'absolute', left: 100, top: 100 }}>
          <MacOSWindow
            title="Chat Room - #general"
            onClose={() => console.log('Chat room closed')}
            onMinimize={() => console.log('Chat room minimized')}
            onMaximize={() => console.log('Chat room maximized')}
            isForeground={true}
            windowConstraints={{
              minWidth: 500,
              minHeight: 600,
            }}
          >
            <div className="flex flex-col h-full bg-white">
              {/* Chat header */}
              <div className="border-b border-gray-200 p-3 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">#general</h3>
                    <p className="text-xs text-gray-500">
                      {messages.filter((m) => m.username && m.username !== currentUserId).length +
                        1}{' '}
                      members online
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-500">Connected</span>
                  </div>
                </div>
              </div>

              {/* Messages area */}
              <div className="flex-1 min-h-0">
                <ChatContainer
                  messages={messages}
                  isLoading={isLoading}
                  onCopyMessage={handleCopyMessage}
                  onDeleteMessage={handleDeleteMessage}
                  onSpeakMessage={handleSpeakMessage}
                  onClear={handleClearChat}
                  currentUserId={currentUserId}
                  fontSize={13}
                  emptyStateMessage="Welcome to the chat room! Say hello!"
                />
              </div>

              {/* Input area */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <ChatInput
                  value={input}
                  onChange={setInput}
                  onSubmit={handleSendMessage}
                  onStop={handleStop}
                  onNudge={handleNudge}
                  isLoading={isLoading}
                  showNudgeButton={true}
                  showVoiceButton={true}
                  fontSize={13}
                  previousMessages={previousMessages}
                  placeholder="Type a message... (try mentioning @ryo)"
                />

                {/* Typing indicator */}
                {input.toLowerCase().includes('@ryo') && (
                  <div className="mt-2 text-xs text-blue-600">Ryo will respond to this message</div>
                )}
              </div>
            </div>
          </MacOSWindow>
        </div>
      </div>
    </MacOSThemeProvider>
  );
};

export default ChatRoomExample;
