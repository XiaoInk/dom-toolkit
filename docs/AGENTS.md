# AGENTS.md - DOM Toolkit 开发指南

本指南为在 DOM Toolkit 代码库中工作的智能编码代理提供必要信息。

## 🚀 快速命令

### 构建命令
```bash
npm run build              # 构建主库文件
npm run build:inject       # 构建控制台注入版本
npm run build:modules      # 构建独立模块
npm run build:all          # 构建所有版本
npm run dev               # 开发模式构建（监听文件变化）
```

### 测试验证
```bash
# 本地测试服务器
python3 -m http.server 8080

# 访问测试页面
open http://localhost:8080/full-test.html     # 完整功能验证
open http://localhost:8080/cdn-demo.html      # CDN使用示例
```

## 📁 项目结构

```
dom-toolkit/
├── src/                    # 源代码（IIFE模块）
│   ├── index.js           # 统一API入口
│   ├── coordinate.js      # 鼠标坐标显示模块
│   ├── detector.js        # 元素检测工具模块
│   ├── interactor.js      # 点击/交互操作模块
│   └── scroller.js       # 滚动控制模块
├── dist/                  # 构建输出
│   ├── index.js          # 主库文件（推荐使用）
│   ├── dom-toolkit.inject.min.js  # 控制台注入版本
│   └── modules/          # 独立模块
│       ├── coordinate.min.js
│       ├── detector.min.js
│       ├── interactor.min.js
│       └── scroller.min.js
├── examples/              # 使用示例和演示
│   ├── cdn-demo.html     # CDN使用演示
│   ├── basic-usage.js    # 基础使用示例
│   └── advanced-usage.js # 高级使用示例
├── full-test.html        # 功能验证页面
├── README.md             # 用户文档
└── vite*.config.js       # 构建配置文件
```

## 📝 代码风格指南

### IIFE 模块模式
所有源文件必须使用 IIFE（立即调用函数表达式）模式：

```javascript
/**
 * 模块描述
 */
(function() {
  'use strict';
  
  const moduleName = {
    isReady: false,
    
    // 方法示例
    methodName(param1, param2 = {}) {
      return new Promise((resolve, reject) => {
        try {
          // 实现逻辑
          if (!condition) {
            reject(new Error('描述性错误信息'));
            return;
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
  };
  
  // 导出 - 必须包含此模式
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = moduleName;
  } else {
    window.domToolkitModuleName = moduleName;
  }
})();
```

### 命名规范
- **文件名**：kebab-case（`coordinate.js`、`element-detector.js`）
- **函数名**：camelCase（`getElementAt`、`startRealtimeDetection`）
- **变量名**：camelCase
- **常量名**：UPPER_SNAKE_CASE
- **全局导出**：`window.domToolkitModuleName`

### 导入/导出模式
```javascript
// 在模块中引用其他模块
const otherModule = window.domToolkitOtherModule;

// 优雅处理缺失模块
if (typeof domToolkitOtherModule !== 'undefined') {
  // 使用模块功能
} else {
  return Promise.reject(new Error('OtherModule not loaded'));
}
```

## 🔧 API 设计模式

### 基于坐标的操作
```javascript
// 标准方法签名
function(x, y, options = {}) {
  return new Promise((resolve, reject) => {
    // 实现逻辑
  });
}

// 示例
clickAt(x, y, options = {}) {
  const { delay = 0, button = 0 } = options;
  // 实现...
}
```

### Promise 基础API
```javascript
// ✅ 好的做法
async function clickElement(x, y) {
  try {
    const result = await domToolkit.click(x, y);
    return result;
  } catch (error) {
    console.error('Click failed:', error);
    throw error;
  }
}

// ❌ 避免 - 同步操作也应返回Promise
function getResult() {
  return Promise.resolve(result);
}
```

### 错误处理
```javascript
return new Promise((resolve, reject) => {
  try {
    const element = document.elementFromPoint(x, y);
    if (!element) {
      reject(new Error(`在坐标 (${x}, ${y}) 处未找到元素`));
      return;
    }
    resolve(element);
  } catch (error) {
    reject(error);
  }
});
```

## 🎨 DOM 交互指南

### 坐标系统
- **视口坐标**：使用 `clientX/clientY`（相对于可见区域）
- **页面坐标**：使用 `pageX/pageY`（包含滚动）
- **获取边界**：`element.getBoundingClientRect()`

### 事件创建
```javascript
// 鼠标事件
const mouseEvent = new MouseEvent('click', {
  clientX: x,
  clientY: y,
  button: 0,
  ctrlKey: false,
  shiftKey: false,
  bubbles: true,
  cancelable: true
});

// 键盘事件
const keyEvent = new KeyboardEvent('keydown', {
  key: 'Enter',
  keyCode: 13,
  bubbles: true,
  cancelable: true
});

// 输入事件
const inputEvent = new InputEvent('input', {
  data: character,
  bubbles: true,
  cancelable: true
});
```

### CSS-in-JS 样式
```javascript
// 使用cssText批量设置样式
element.style.cssText = `
  position: fixed;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 10px;
  z-index: 10000;
  user-select: none;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;
```

## 🏗️ 构建系统

### Vite 配置
- **主库构建**：`vite.config.js` - 生成统一API
- **注入版本**：`vite.inject.config.js` - 控制台专用
- **模块构建**：`vite.*.config.js` - 独立模块（每个模块一个配置）

### 构建输出
```bash
# 主库（推荐）
dist/index.js                    # 完整工具包，包含统一API

# 控制台注入
dist/dom-toolkit.inject.min.js   # 压缩版本，用于控制台注入

# 独立模块
dist/modules/coordinate.min.js    # 坐标显示模块
dist/modules/detector.min.js      # 元素检测模块
dist/modules/interactor.min.js   # 交互操作模块
dist/modules/scroller.min.js     # 滚动控制模块
```

## 🧪 测试和验证

### 本地测试流程
1. **启动服务器**：`python3 -m http.server 8080`
2. **功能验证**：访问 `full-test.html`
3. **示例测试**：访问 `examples/cdn-demo.html`
4. **控制台测试**：在浏览器控制台直接测试

### 模块加载验证
```javascript
// 检查所有模块是否正确加载
console.log('模块状态检查:', {
  coordinates: typeof domToolkitCoordinates !== 'undefined',
  detector: typeof domToolkitDetector !== 'undefined',
  interactor: typeof domToolkitInteractor !== 'undefined',
  scroller: typeof domToolkitScroller !== 'undefined'
});
```

### 功能测试清单
- ✅ 坐标显示启动/停止
- ✅ 元素检测和高亮
- ✅ 单击/双击/右键操作
- ✅ 文本输入（含清空）
- ✅ 拖拽操作
- ✅ 滚动控制（方向/位置/相对）
- ✅ 批量操作执行
- ✅ 错误处理和恢复

## 📈 性能优化

### 事件处理
```javascript
// ✅ 正确的事件监听器管理
const handler = (e) => { /* 处理逻辑 */ };
document.addEventListener('mousemove', handler);

// 清理时移除
document.removeEventListener('mousemove', handler);
```

### DOM 操作
```javascript
// ✅ 批量DOM操作
const fragment = document.createDocumentFragment();
items.forEach(item => fragment.appendChild(item));
container.appendChild(fragment);

// ✅ 及时清理创建的元素
setTimeout(() => {
  if (element.parentNode) {
    element.parentNode.removeChild(element);
  }
}, duration);
```

### 内存管理
```javascript
// 清理定时器
const timerId = setTimeout(callback, 1000);
clearTimeout(timerId);

// 清理事件监听器
document.removeEventListener(eventType, handler);

// 清空对象引用
element = null;
```

## 🔄 模块开发

### 创建新模块
1. **创建文件**：`src/new-module.js`
2. **IIFE封装**：使用标准模式
3. **导出全局**：`window.domToolkitNewModule`
4. **更新主入口**：在 `src/index.js` 中添加外观
5. **构建配置**：如需独立构建，创建 `vite.new-module.config.js`
6. **添加测试**：在 `full-test.html` 中添加验证

### 模块依赖
```javascript
// 在主API中优雅处理模块依赖
click: function(x, y, options) {
  return window.domToolkitInteractor ? 
    window.domToolkitInteractor.clickAt(x, y, options) :
    Promise.reject(new Error('interactor模块未加载'));
}
```

### 向后兼容
```javascript
// 提供兼容性别名
clickAt: function(x, y, options) {
  return this.click(x, y, options);  // 调用新方法
}
```

## 🐛 调试技巧

### 控制台输出
```javascript
// 开发时的调试输出
console.log(`点击坐标: (${x}, ${y})`);
console.log('检测到元素:', element);
console.error('操作失败:', error);

// 生产环境删除或注释console.log
```

### 错误追踪
```javascript
// 详细的错误信息
reject(new Error(`在坐标 (${x}, ${y}) 处点击失败: ${error.message}`));

// 操作状态检查
if (!element || element.tagName === 'undefined') {
  reject(new Error('无效的DOM元素'));
  return;
}
```

### 调试辅助函数
```javascript
// 调试坐标转换
function debugCoordinates(x, y) {
  const element = document.elementFromPoint(x, y);
  console.log(`坐标 (${x}, ${y}) 对应元素:`, element);
  return element;
}
```

## 📦 发布和部署

### 版本管理
1. 更新 `package.json` 中的版本号
2. 更新 `README.md` 中的版本信息
3. 运行 `npm run build:all` 确保所有构建正常
4. 测试所有构建输出的功能

### CDN 更新
```html
<!-- 确保CDN链接正确 -->
<script src="https://cdn.jsdelivr.net/npm/dom-toolkit@1.0.0/dist/index.js"></script>
```

### 文档更新
- 更新 `README.md` 用户文档
- 更新 `AGENTS.md` 开发指南
- 检查 `examples/` 中的示例是否最新

## ⚠️ 注意事项

### 浏览器兼容性
- **目标环境**：现代浏览器（ES6+）
- **不支持**：Internet Explorer
- **使用**：标准DOM API，不依赖jQuery

### 安全考虑
- **不要**暴露敏感信息到控制台
- **避免**在页面上留下调试元素
- **清理**所有创建的事件监听器

### 常见陷阱
1. **坐标系统混淆**：视口坐标 vs 页面坐标
2. **异步操作**：忘记处理Promise错误
3. **内存泄漏**：未清理事件监听器
4. **时序问题**：DOM操作未完成就进行下一步

## 🎯 开发最佳实践

### 代码组织
```javascript
// 模块结构示例
(function() {
  const moduleName = {
    // 私有变量
    privateVar: null,
    
    // 公共属性
    isReady: false,
    
    // 公共方法
    start() { /* 启动逻辑 */ },
    stop() { /* 停止逻辑 */ },
    
    // 私有方法（以_开头）
    _privateMethod() { /* 私有逻辑 */ }
  };
  
  // 导出
  window.domToolkitModuleName = moduleName;
})();
```

### 方法设计
```javascript
// ✅ 良好的方法设计
function operation(param, options = {}) {
  return new Promise((resolve, reject) => {
    // 参数验证
    if (!param) {
      reject(new Error('参数不能为空'));
      return;
    }
    
    try {
      // 核心逻辑
      const result = performOperation(param, options);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
```

### 错误处理模式
```javascript
// 统一的错误处理
function handleApiError(error, context) {
  const errorMessage = `${context}失败: ${error.message}`;
  console.error(errorMessage, error);
  return new Error(errorMessage);
}
```

---

**DOM Toolkit 开发团队**  
遵循此指南可确保代码质量和项目的可维护性。