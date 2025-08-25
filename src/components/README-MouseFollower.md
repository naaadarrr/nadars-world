# 🐎 鼠标跟随效果组件

这个项目提供了多种鼠标跟随效果组件，可以让图片跟随鼠标移动，增加网站的交互性和趣味性。

## 📦 组件列表

### 1. MouseFollower (基础版)
最简单的鼠标跟随效果，适合快速集成。

### 2. AdvancedMouseFollower (高级版)
支持多种跟随效果和动画，功能更丰富。

### 3. MouseFollowerControls (控制面板)
提供实时参数调整的控制面板。

### 4. MouseFollowerDemo (演示页面)
完整的演示页面，展示所有功能。

## 🚀 快速开始

### 基础使用

```tsx
import MouseFollower from './components/MouseFollower';

function App() {
  return (
    <div>
      {/* 你的应用内容 */}
      <MouseFollower 
        enabled={true}
        size={60}
        offsetX={30}
        offsetY={30}
        smoothness={0.15}
      />
    </div>
  );
}
```

### 高级使用

```tsx
import AdvancedMouseFollower from './components/AdvancedMouseFollower';

function App() {
  return (
    <div>
      {/* 你的应用内容 */}
      <AdvancedMouseFollower
        enabled={true}
        size={60}
        offsetX={30}
        offsetY={30}
        smoothness={0.15}
        effect="elastic"
        trailLength={5}
        rotation={true}
        scale={true}
      />
    </div>
  );
}
```

## ⚙️ 参数说明

### MouseFollower 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enabled` | `boolean` | `true` | 是否启用跟随效果 |
| `size` | `number` | `60` | 图片尺寸（像素） |
| `offsetX` | `number` | `30` | X轴偏移量 |
| `offsetY` | `number` | `30` | Y轴偏移量 |
| `smoothness` | `number` | `0.15` | 平滑度（0-1） |

### AdvancedMouseFollower 额外参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `effect` | `'smooth' \| 'bounce' \| 'elastic' \| 'trail'` | `'smooth'` | 跟随效果类型 |
| `trailLength` | `number` | `5` | 轨迹长度（仅轨迹效果） |
| `rotation` | `boolean` | `true` | 是否启用旋转 |
| `scale` | `boolean` | `true` | 是否启用缩放 |

## 🎨 效果类型

### 1. Smooth (平滑跟随)
最基础的跟随效果，图片会平滑地跟随鼠标移动。

### 2. Bounce (弹跳效果)
图片会以弹跳的方式跟随鼠标，增加趣味性。

### 3. Elastic (弹性效果)
模拟物理弹性，图片会有惯性跟随效果。

### 4. Trail (轨迹效果)
鼠标移动时会留下轨迹，形成拖尾效果。

## 🎮 控制面板使用

```tsx
import { useState } from 'react';
import AdvancedMouseFollower from './components/AdvancedMouseFollower';
import MouseFollowerControls from './components/MouseFollowerControls';

function App() {
  const [settings, setSettings] = useState({
    enabled: true,
    size: 60,
    offsetX: 30,
    offsetY: 30,
    smoothness: 0.15,
    effect: 'smooth' as const,
    trailLength: 5,
    rotation: true,
    scale: true
  });

  return (
    <div>
      {/* 你的应用内容 */}
      
      {/* 控制面板 */}
      <MouseFollowerControls
        settings={settings}
        onSettingsChange={setSettings}
      />
      
      {/* 鼠标跟随器 */}
      <AdvancedMouseFollower {...settings} />
    </div>
  );
}
```

## 🎯 使用建议

### 1. 性能优化
- 在移动设备上建议禁用或使用较小的图片尺寸
- 避免在滚动密集型页面使用轨迹效果

### 2. 用户体验
- 确保图片不会遮挡重要的交互元素
- 考虑在用户偏好设置中提供开关选项

### 3. 自定义图片
- 替换 `horse.png` 为你自己的图片
- 建议使用 PNG 格式的透明背景图片
- 图片尺寸建议在 60x60 到 120x120 像素之间

## 🔧 自定义样式

你可以通过修改组件的样式来适应你的设计：

```tsx
<MouseFollower
  size={80}
  offsetX={40}
  offsetY={40}
  smoothness={0.2}
  // 可以通过 CSS 类名或内联样式进一步自定义
  style={{
    filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))',
  }}
/>
```

## 🐛 常见问题

### Q: 图片不显示？
A: 检查图片路径是否正确，确保 `horse.png` 文件存在。

### Q: 跟随效果不流畅？
A: 尝试调整 `smoothness` 参数，值越大跟随越紧密但可能不够平滑。

### Q: 在移动设备上不工作？
A: 移动设备通常没有鼠标事件，建议添加触摸事件支持或禁用。

### Q: 性能问题？
A: 减少图片尺寸，关闭旋转和缩放效果，或使用基础版组件。

## 📝 更新日志

- **v1.0.0**: 初始版本，支持基础跟随效果
- **v1.1.0**: 添加高级效果和控制面板
- **v1.2.0**: 优化性能和添加更多自定义选项

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个组件！

## 📄 许可证

MIT License
