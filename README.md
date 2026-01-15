# DOM Toolkit

<div align="center">

![DOM Toolkit Logo](https://img.shields.io/badge/DOM-Toolkit-blue?style=for-the-badge)
[![npm version](https://badge.fury.io/js/dom-toolkit.svg)](https://badge.fury.io/js/dom-toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()

🛠️ 一个轻量级的 DOM 操作工具集，提供坐标检测、元素交互和页面滚动功能

</div>

## ✨ 特性

- 🎯 **精确坐标检测** - 实时鼠标坐标显示和元素位置检测
- 🖱️ **智能元素交互** - 支持点击、输入、拖拽等多种交互方式
- 📜 **灵活滚动控制** - 提供平滑滚动和批量操作功能
- 📦 **模块化设计** - 可按需加载，支持独立模块使用
- 🌐 **跨环境支持** - 同时支持浏览器和 Node.js 环境
- 📱 **零依赖** - 纯原生 JavaScript，无外部依赖

## 🚀 快速开始

### CDN 引入

```html
<!-- 完整版本 -->
<script src="https://cdn.jsdelivr.net/gh/xiaoink/dom-toolkit@latest/dist/index.js"></script>

<!-- 或使用独立模块 -->
<script src="https://cdn.jsdelivr.net/gh/xiaoink/dom-toolkit@latest/dist/modules/coordinate.min.iife.js"></script>
<script src="https://cdn.jsdelivr.net/gh/xiaoink/dom-toolkit@latest/dist/modules/detector.min.iife.js"></script>
<script src="https://cdn.jsdelivr.net/gh/xiaoink/dom-toolkit@latest/dist/modules/interactor.min.iife.js"></script>
<script src="https://cdn.jsdelivr.net/gh/xiaoink/dom-toolkit@latest/dist/modules/scroller.min.iife.js"></script>

<!-- 版本锁定引用 -->
<script src="https://cdn.jsdelivr.net/gh/xiaoink/dom-toolkit@v1.0.0/dist/index.js"></script>
```

### NPM 安装

```bash
npm install dom-toolkit
```

```javascript
// ES6 模块
import { domToolkit } from 'dom-toolkit';

// CommonJS
const { domToolkit } = require('dom-toolkit');
```

## 📖 使用示例

### 坐标检测

```javascript
// 开始显示坐标
window.domToolkitCoordinates.startDisplay();

// 获取页面滚动位置
const position = window.domToolkitCoordinates.getPosition();
console.log(`页面位置: ${position.x}, ${position.y}`);
```

### 元素交互

```javascript
// 点击指定坐标
await domToolkit.click(100, 200);

// 双击
await domToolkit.doubleClick(100, 200);

// 右键点击
await domToolkit.rightClick(100, 200);

// 文本输入
await domToolkit.type(100, 200, 'Hello World', {
  typingDelay: 100,
  clear: true
});

// 拖拽操作
await domToolkit.drag(100, 100, 300, 300, {
  duration: 500
});
```

### 页面滚动

```javascript
// 滚动到指定方向
await domToolkit.scroll('down', 200);
await domToolkit.scroll('up', null, { duration: 300 });

// 滚动到绝对位置
await domToolkit.scrollBy(0, 500);

// 滚动到元素
const element = document.querySelector('#target');
await domToolkit.scrollToElement(element);

// 滚动并点击
await domToolkit.scrollAndClick(0, 500, 100, 100);
```

### 元素检测

```javascript
// 获取指定位置的元素信息
const elementInfo = window.domToolkitDetector.getElementAt(100, 200);
console.log(elementInfo);

// 高亮显示元素
window.domToolkitDetector.highlightAt(100, 200, 2000);

// 启动实时检测
window.domToolkitDetector.startRealtimeDetection();
```

### 批量操作

```javascript
// 批量交互操作
const operations = [
  { click: { x: 100, y: 200, options: { delay: 100 } } },
  { type: { x: 100, y: 200, text: 'Hello', options: { typingDelay: 50 } } },
  { click: { x: 300, y: 400, options: {} } }
];

const results = await domToolkit.batch(operations, {
  delayBetween: 500
});
```

## 📦 模块结构

DOM Toolkit 采用模块化架构，支持按需加载：

| 模块 | 文件 | 大小 | 功能 |
|------|------|------|------|
| **coordinate** | `coordinate.min.iife.js` | ~1.9KB | 坐标检测与显示 |
| **detector** | `detector.min.iife.js` | ~2.9KB | 元素检测与分析 |
| **interactor** | `interactor.min.iife.js` | ~3.2KB | DOM 元素交互 |
| **scroller** | `scroller.min.iife.js` | ~4.4KB | 页面滚动控制 |
| **完整版** | `index.js` | ~2.1KB | 所有功能集成 |

## 🔧 API 文档

### 核心方法

#### 坐标模块 (`window.domToolkitCoordinates`)

- `startDisplay()` - 开始显示坐标
- `stopDisplay()` - 停止显示坐标
- `getPosition()` - 获取当前页面位置

#### 检测模块 (`window.domToolkitDetector`)

- `getElementAt(x, y)` - 获取指定位置元素信息
- `highlightAt(x, y, duration)` - 高亮显示元素
- `startRealtimeDetection()` - 启动实时检测
- `stopRealtimeDetection()` - 停止实时检测

#### 交互模块 (`window.domToolkitInteractor`)

- `clickAt(x, y, options)` - 单击
- `doubleClick(x, y, options)` - 双击
- `rightClick(x, y, options)` - 右键点击
- `type(x, y, text, options)` - 文本输入
- `drag(startX, startY, endX, endY, options)` - 拖拽
- `batch(operations, options)` - 批量操作

#### 滚动模块 (`window.domToolkitScroller`)

- `scroll(direction, distance, options)` - 方向滚动
- `scrollBy(x, y, options)` - 相对滚动
- `scrollToPosition(options)` - 滚动到位置
- `scrollToElement(element, options)` - 滚动到元素
- `scrollAndClick(scrollX, scrollY, clickX, clickY, options)` - 滚动点击
- `batchOperate(operations, options)` - 批量滚动操作

#### 主包统一接口 (`window.domToolkit`)

- `click/clickAt(x, y, options)` - 单击
- `doubleClick(x, y, options)` - 双击
- `rightClick(x, y, options)` - 右键点击
- `type(x, y, text, options)` - 文本输入
- `drag(startX, startY, endX, endY, options)` - 拖拽
- `batch(operations, options)` - 批量交互操作
- `scroll(direction, distance, options)` - 方向滚动
- `scrollBy(x, y, options)` - 相对滚动
- `scrollToElement(element, options)` - 滚动到元素
- `scrollAndClick(scrollX, scrollY, clickX, clickY, options)` - 滚动点击
- `batchOperate(operations, options)` - 批量滚动操作
- `getPosition(element)` / `getScrollPosition(element)` - 获取滚动位置
- `coordinates` - 坐标模块引用
- `detector` - 检测模块引用

### 选项参数

所有异步操作都支持以下通用选项：

```javascript
{
  delay: 0,           // 执行延迟（毫秒）
  button: 0,          // 鼠标按钮（0=左键，1=中键，2=右键）
  ctrlKey: false,     // Ctrl 键状态
  shiftKey: false,    // Shift 键状态
  altKey: false,      // Alt 键状态
  metaKey: false      // Meta 键状态
}
```

## 🌍 浏览器兼容性

| 浏览器 | 版本 |
|--------|------|
| Chrome | 60+ |
| Firefox | 55+ |
| Safari | 12+ |
| Edge | 79+ |
| IE | ❌ |

## 🛠️ 开发

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/xiaoink/dom-toolkit.git
cd dom-toolkit

# 安装依赖
npm install

# 开发模式（文件监听）
npm run dev

# 构建
npm run build

# 构建所有版本
npm run build:all
```

### 项目结构

```
dom-toolkit/
├── src/                   # 源代码
│   ├── index.js           # 主入口文件
│   ├── coordinate.js      # 坐标检测模块
│   ├── detector.js        # 元素检测模块
│   ├── interactor.js      # 元素交互模块
│   └── scroller.js        # 滚动控制模块
├── dist/                  # 构建输出
├── config/                # 构建配置
├── tests/                 # 测试文件
└── AGENTS.md              # 开发指南
```

### 构建

```bash
# 构建主包
npm run build

# 构建独立模块
npm run build:modules

# 构建可注入版本
npm run build:inject

# 构建所有产物
npm run build:all
```

### 测试

```bash
# 接口测试（检查所有方法是否存在）
npm run test:interface

# 完整功能测试（实际演示所有功能）
npm run test:full

# 默认打开接口测试
npm run test
```

项目提供了两个测试页面：

1. **接口测试** (`tests/interface-test.html`)
   - 检查所有模块加载状态
   - 验证主包统一接口完整性
   - 测试各独立模块接口存在性

2. **完整功能测试** (`tests/full-test.html`)
   - 实际演示所有功能
   - 包含点击、输入、拖拽、滚动等操作
   - 提供实时测试日志和视觉反馈

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看 [AGENTS.md](./AGENTS.md) 了解开发规范。

### 贡献流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范

- 使用 IIFE 模式封装模块
- 中文注释和错误信息
- Promise 基础的异步 API
- 完整的错误处理
- 遵循项目既定的命名约定

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

## 🔗 相关链接

- **CDN 引用**: https://cdn.jsdelivr.net/gh/xiaoink/dom-toolkit@latest/dist/index.js
- **GitHub 仓库**: https://github.com/xiaoink/dom-toolkit
- **在线演示**: https://xiaoink.github.io/dom-toolkit
- **问题反馈**: https://github.com/xiaoink/dom-toolkit/issues
- **更新日志**: https://github.com/xiaoink/dom-toolkit/releases

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给它一个星标！**

Made with ❤️ by [xiaoink](https://github.com/xiaoink)

</div>