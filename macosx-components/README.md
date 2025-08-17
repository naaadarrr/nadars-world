# macOS X 风格窗口和聊天组件

这是从 ryOS 项目中提取的 macOS X 风格窗口和聊天组件，可以在其他 React 项目中使用。

## 特性

### 🪟 窗口组件

- 🎨 完整的 macOS X Aqua 主题样式
- 🚦 经典的红绿灯按钮（关闭、最小化、最大化）
- 🪟 可拖拽和调整大小的窗口
- 📱 响应式设计，支持移动端
- 🎵 可选的音效支持
- 🌈 毛玻璃效果和阴影
- ⌨️ 键盘快捷键支持

### 💬 聊天组件

- 🗨️ macOS 风格的聊天气泡
- 👥 多用户聊天支持
- 🎨 用户名颜色哈希
- ⚡ 紧急消息动画效果
- 📝 Markdown 格式支持（粗体、斜体）
- 🔊 文本转语音支持
- 📋 消息复制和删除
- 👋 Nudge 功能
- 🎤 语音输入支持
- 📜 消息历史导航

## 安装

```bash
npm install framer-motion zustand
```

## 使用方法

### 基础窗口使用

```tsx
import { MacOSWindow, MacOSThemeProvider } from './macosx-components';

function App() {
  return (
    <MacOSThemeProvider>
      <MacOSWindow
        title="Terminal"
        onClose={() => console.log('Window closed')}
        isForeground={true}
      >
        <div className="p-4 bg-black text-green-400 font-mono">
          <div>$ echo "Hello macOS!"</div>
          <div>Hello macOS!</div>
          <div>$ _</div>
        </div>
      </MacOSWindow>
    </MacOSThemeProvider>
  );
}
```

### 聊天应用使用

```tsx
import { ChatApp, MacOSThemeProvider, ChatMessage } from './macosx-components';

function ChatDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "👋 hey! i'm ryo. ask me anything!",
      role: 'assistant',
      username: 'Ryo',
      createdAt: new Date(),
    },
  ]);

  const handleSendMessage = async (messageText: string) => {
    // 处理发送消息的逻辑
    console.log('Sending:', messageText);
  };

  return (
    <MacOSThemeProvider>
      <ChatApp
        title="@ryo"
        onClose={() => console.log('Chat closed')}
        currentUserId="user"
        initialMessages={messages}
        onSendMessage={handleSendMessage}
        showNudgeButton={true}
        showVoiceButton={true}
      />
    </MacOSThemeProvider>
  );
}
```

### 自定义聊天容器

```tsx
import { MacOSWindow, ChatContainer, ChatInput, MacOSThemeProvider } from './macosx-components';

function CustomChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  return (
    <MacOSThemeProvider>
      <MacOSWindow title="Custom Chat">
        <div className="flex flex-col h-full">
          <ChatContainer
            messages={messages}
            onCopyMessage={(msg) => navigator.clipboard.writeText(msg.content)}
            onDeleteMessage={(msg) => setMessages((prev) => prev.filter((m) => m.id !== msg.id))}
            currentUserId="user"
          />
          <div className="p-4 border-t">
            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={(text) => {
                // 处理消息发送
                setInput('');
              }}
            />
          </div>
        </div>
      </MacOSWindow>
    </MacOSThemeProvider>
  );
}
```

## 组件结构

### 窗口组件

- `MacOSThemeProvider.tsx` - 主题提供者
- `MacOSWindow.tsx` - 主窗口组件
- `TrafficLights.tsx` - 红绿灯按钮组件
- `WindowFrame.tsx` - 窗口框架组件

### 聊天组件

- `ChatApp.tsx` - 完整的聊天应用组件
- `ChatContainer.tsx` - 聊天消息容器
- `ChatBubble.tsx` - 单个聊天气泡
- `ChatInput.tsx` - 聊天输入框

### 其他

- `hooks/` - 相关的 React hooks
- `styles/` - CSS 样式文件
- `types/` - TypeScript 类型定义
- `examples/` - 使用示例

## 自定义

你可以通过修改主题配置来自定义窗口的外观：

```tsx
const customTheme = {
  colors: {
    windowBg: '#ECECEC',
    titleBar: {
      activeBg: 'linear-gradient(to bottom, #f6f6f6 0%, #dadada 100%)',
      // ... 其他颜色配置
    },
  },
};
```

## 🎯 主要

组件

### 窗口组件

- **MacOSThemeProvider**: 主题提供者，管理 CSS 变量
- **MacOSWindow**: 主窗口组件
- **TrafficLights**: 红绿灯按钮组件
- **WindowFrame**: 窗口框架和拖拽逻辑
- **useWindowManager**: 窗口管理 hook

### 聊天组件

- **ChatApp**: 完整的聊天应用，包含窗口和聊天功能
- **ChatContainer**: 聊天消息容器，处理消息显示和滚动
- **ChatBubble**: 单个聊天气泡，支持不同用户样式
- **ChatInput**: 聊天输入框，支持语音、Nudge 等功能

## 🎨 聊天组件特性

### 消息类型支持

- **用户消息**: 黄色气泡，右对齐
- **助手消息**: 蓝色气泡，左对齐
- **多用户消息**: 基于用户名的颜色哈希
- **紧急消息**: 以 `!!!!` 开头的消息会有红色动画效果

### 交互功能

- **消息操作**: 复制、删除、朗读
- **Nudge 功能**: 发送 👋 提醒
- **语音输入**: 支持语音转文字（需要实现）
- **消息历史**: 上下箭头键导航历史消息
- **自动滚动**: 智能滚动到底部，支持手动控制

### Markdown 支持

- **粗体**: `**文本**` 或 `__文本__`
- **斜体**: `*文本*` 或 `_文本_`
- **链接**: `[文本](URL)` 或直接 URL

## 📱 响应式设计

组件在移动设备上会自动适配：

- 触摸友好的交互
- 适配安全区域
- 优化的手势支持
- 移动端特定的样式调整

## 🎵 音效支持

聊天组件支持可选的音效：

- 消息发送音效
- 接收消息音效
- Nudge 音效
- 错误提示音效

## 🔧 高级配置

### 自定义主题

```tsx
const customTheme = {
  ...macosTheme,
  colors: {
    ...macosTheme.colors,
    windowBg: '#F0F0F0',
    trafficLights: {
      close: '#FF5F57',
      minimize: '#FFBD2E',
      maximize: '#28CA42',
    },
  },
};

<MacOSThemeProvider theme={customTheme}>{/* 你的组件 */}</MacOSThemeProvider>;
```

### 聊天消息格式

```tsx
interface ChatMessage {
  id: string; // 唯一标识符
  content: string; // 消息内容
  role: 'user' | 'assistant' | 'human'; // 消息角色
  username?: string; // 用户名（可选）
  createdAt?: Date; // 创建时间（可选）
  isPending?: boolean; // 是否为待发送状态
}
```

## 🚀 快速开始

1. 复制 `macosx-components` 文件夹到你的项目
2. 安装依赖：`npm install framer-motion zustand`
3. 导入样式：`import './macosx-components/styles/macos.css'`
4. 开始使用组件！

查看 `examples/` 目录获取更多使用示例。
