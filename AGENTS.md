# AGENTS.md - DOM Toolkit 开发指南

本指南为在 DOM Toolkit 代码库中工作的智能编码代理提供必要信息。

## 快速命令

### 构建命令
```bash
npm run build          # 构建主库文件
npm run build:inject    # 构建控制台注入版本
npm run build:modules   # 构建独立的 ES 模块
npm run build:all       # 构建所有版本
npm run dev            # 开发模式构建（监听文件变化）
```

### 测试
⚠️ **未配置测试框架** - 需要手动测试：
- 使用浏览器控制台进行测试
- 加载 `examples/` 目录中的示例
- 使用 CDN 演示测试：`examples/cdn-demo.html`

## 项目结构

```
dom-toolkit/
├── src/                    # 源代码（所有 IIFE 模块）
│   ├── index.js           # 主 API 接口
│   ├── coordinate.js      # 鼠标坐标显示
│   ├── detector.js        # 元素检测工具
│   ├── interactor.js      # 点击/触摸交互
│   └── scroller.js       # 滚动控制
├── dist/                  # 构建输出
├── examples/              # 使用示例和演示
└── vite*.config.js        # 构建配置
```

## 代码风格指南

### 模块模式
所有源文件必须使用 IIFE（立即调用函数表达式）模式：

```javascript
/**
 * 模块描述
 */
(function() {
  'use strict';
  
  const moduleName = {
    // 模块属性和方法
    isReady: false,
    
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
  
  // 导出到全局或模块系统
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
- **常量名**：UPPER_SNAKE_CASE（较少使用）
- **全局导出**：`window.domToolkitModuleName`

### 导入/导出模式
- 使用条件导出以支持浏览器/Node.js 兼容性
- 导出到 `window.domToolkitModuleName` 供浏览器使用
- 通过 `window.domToolkitModuleName` 引用其他模块
- 优雅处理缺失模块，使用 Promise 拒绝

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

### DOM 交互指南
- 所有坐标都是视口相对坐标（clientX/clientY）
- 使用 `getBoundingClientRect()` 进行元素定位
- 清理 DOM 元素（事件监听器、创建的元素）
- UI 覆盖层使用 z-index 10000+
- 在适用时处理鼠标和触摸事件

### CSS-in-JS 样式
```javascript
element.style.cssText = `
  position: fixed;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 10px;
  z-index: 10000;
`;
```

## API 设计模式

### 基于坐标的操作
- 所有交互都接受 `(x, y)` 作为前两个参数
- 可选的 `options` 参数作为最后一个参数
- 异步操作返回 Promise

### 方法命名
- 使用描述性动词：`getElementAt`、`startRealtimeDetection`
- 提供兼容性别名：`clickAt` → `click`
- 使用一致的前缀：`start*`、`stop*`、`get*`、`set*`

### 基于 Promise 的 API
```javascript
// 好的做法
click(x, y, options = {}) {
  return new Promise((resolve, reject) => {
    // 实现
  });
}

// 避免 - 同步操作仍应返回已解析的 Promise
getResult() {
  return Promise.resolve(result);
}
```

## 添加新功能

### 1. 创建模块
- 在 `src/` 中添加新文件，遵循 IIFE 模式
- 导出为 `window.domToolkitNewModule`

### 2. 更新主索引
- 在 `src/index.js` 中添加外观方法
- 优雅处理模块加载
- 提供兼容性别名

### 3. 构建配置
- 如需新的入口点，更新 `vite*.config.js`
- 使用 `npm run build:all` 测试所有构建目标

### 4. 文档
- 在 `README.md` 中更新新的 API 方法
- 在 `examples/` 目录中添加示例
- 为公共方法包含 JSDoc 注释

## 浏览器兼容性

### 目标环境
- 现代浏览器（ES6+）
- 不需要 IE 支持
- 使用标准 DOM API（不使用 jQuery）

### 功能检测
```javascript
if (!window.MouseEvent || !document.elementFromPoint) {
  return Promise.reject(new Error('浏览器不支持'));
}
```

## 性能考虑

### 事件处理
- 不再需要时移除事件监听器
- 在可能的情况下使用被动事件监听器
- 节流/防抖高频事件（鼠标、滚动）

### DOM 操作
- 批量 DOM 操作
- 多次插入时使用文档片段
- 使用后清理创建的元素

### 内存管理
- 清除定时器/间隔
- 移除事件监听器
- 完成后将对象引用设为 null

## 调试

### 控制台输出
- 使用 `console.log` 进行调试（生产环境不要）
- 包含带上下文的描述性消息
- 中文错误消息可接受（与现有代码匹配）

### 浏览器测试
- 开发期间在多个浏览器中测试
- 验证不同屏幕尺寸下的坐标计算
- 测试鼠标和触摸交互

## 代码质量说明

### 当前状态
- ✅ 良好的关注点分离
- ✅ 一致的模块模式
- ✅ 基于 Promise 的 API
- ❌ 未配置代码检查
- ❌ 无测试框架
- ❌ 中英文注释混用

### 建议
- 考虑添加 ESLint 以保持代码一致性
- 添加单元测试框架（Jest/Vitest）
- 标准化注释语言（新代码建议英文）
- 添加 TypeScript 定义以获得更好的 IDE 支持

## 构建输出

### 主库（`dist/dom-toolkit.js`）
- 包含所有模块的完整包
- 浏览器使用的 IIFE 格式

### 注入版本（`dist/dom-toolkit.inject.min.js`）
- 支持控制台注入
- 激进压缩
- 顶级变量混淆

### 独立模块（`dist/modules/*.min.js`）
- 分离的 ES 模块
- 用于选择性加载
- 现代包优化

## 开发工作流

1. **修改代码**：编辑 `src/` 中的文件
2. **监听模式**：`npm run dev` 自动构建
3. **测试**：在浏览器控制台中手动测试
4. **构建全部**：提交前运行 `npm run build:all`
5. **验证**：测试所有三种构建输出

## 模块依赖

- `index.js` - 主外观（依赖所有其他模块）
- `coordinate.js` - 独立
- `detector.js` - 独立  
- `interactor.js` - 独立
- `scroller.js` - 独立

模块设计为独立工作。只加载你需要的部分。