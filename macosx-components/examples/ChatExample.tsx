import React, { useState } from 'react';
import { ChatApp, MacOSThemeProvider } from '../index';
import type { ChatMessage } from '../index';

const ChatExample: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "👋 hey! i'm ryo. ask me anything!",
      role: 'assistant',
      username: 'Ryo',
      createdAt: new Date(Date.now() - 60000), // 1 minute ago
    },
  ]);

  const handleSendMessage = async (messageText: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add assistant response
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      content: generateResponse(messageText),
      role: 'assistant',
      username: 'Ryo',
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
  };

  const generateResponse = (input: string): string => {
    const responses = [
      `That's interesting! You said: "${input}"`,
      `I understand you're asking about "${input}". Let me think about that...`,
      `Great question! Regarding "${input}", I'd say...`,
      `Thanks for sharing that. About "${input}" - here's what I think:`,
      `Hmm, "${input}" is a fascinating topic. Let me elaborate...`,
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <MacOSThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-8">
        <div style={{ position: 'absolute', left: 100, top: 100 }}>
          <ChatApp
            title="@ryo"
            onClose={() => console.log('Chat closed')}
            onMinimize={() => console.log('Chat minimized')}
            onMaximize={() => console.log('Chat maximized')}
            isForeground={true}
            currentUserId="user"
            initialMessages={messages}
            onSendMessage={handleSendMessage}
            fontSize={13}
            showNudgeButton={true}
            showVoiceButton={true}
            emptyStateMessage="Start a conversation with Ryo!"
          />
        </div>
      </div>
    </MacOSThemeProvider>
  );
};

export default ChatExample;
