# AGENTS.md - DOM Toolkit 开发指南

本指南为在 DOM Toolkit 项目中工作的代理编码人员提供重要信息。

## 项目概述

DOM Toolkit 是一个模块化的 JavaScript 库，用于 DOM 操作，包括坐标检测、元素交互和页面滚动。项目使用原生 JavaScript 配合 Vite 进行构建，支持浏览器和 Node.js 环境。

## 构建命令

### 主要构建命令
```bash
# 构建主包
npm run build

# 构建所有产物（主包 + 注入版本 + 独立模块）
npm run build:all

# 开发模式（文件监听）
npm run dev

# 构建可注入版本
npm run build:inject

# 构建独立模块
npm run build:coordinate
npm run build:detector
npm run build:interactor
npm run build:scroller

# 构建所有模块（等同于独立模块命令）
npm run build:modules
```

### 测试
```bash
# 手动测试（打开浏览器）
npm run test
# 注意：无自动化测试框架 - 通过 HTML 文件手动测试
```

## 代码架构

### 模块结构
- **主入口**: `src/index.js` - 统一 API 整合所有模块
- **坐标模块**: `src/coordinate.js` - 鼠标坐标检测和显示
- **检测模块**: `src/detector.js` - 元素检测和分析
- **交互模块**: `src/interactor.js` - DOM 交互（点击、输入、拖拽）
- **滚动模块**: `src/scroller.js` - 页面滚动控制

### 全局命名空间
- 主工具包: `window.domToolkit`
- 独立模块: `window.domToolkitCoordinates`, `window.domToolkitDetector` 等
- 向后兼容别名: `window.domToolkitClick`, `window.domToolkitScroll`

## 代码风格指南

### 文件结构
- 所有模块使用 IIFE（立即执行函数表达式）
- 导出至全局 `window` 对象以支持浏览器兼容性
- 支持 CommonJS (`module.exports`) 以兼容 Node.js

### 命名约定
- **函数**: 驼峰命名法（如 `clickAt`, `scrollToElement`）
- **变量**: 驼峰命名法
- **常量**: 静态值使用下划线大写
- **全局导出**: `domToolkit` 前缀（如 `domToolkitCoordinates`）

### 注释和文档
- 用户注释和描述使用中文
- 函数使用 JSDoc 风格注释，包含参数和返回值
- 模块头部包含用途描述

### 错误处理
- 始终验证参数并抛出描述性错误
- 异步操作使用 Promise 拒绝
- DOM 操作前检查元素存在性
- 可能时返回包含元素上下文的一致错误对象

### 异步操作
- 所有异步操作使用基于 Promise 的 API
- 使用 try/catch 块实现适当的错误处理
- 在选项中支持可选的延迟参数
- 返回包含元素信息的详细响应对象

### DOM 事件处理
- 创建包含所有必需属性的 MouseEvent 对象
- 支持修饰键（ctrlKey, shiftKey, altKey, metaKey）
- 确保事件默认冒泡且可取消
- 使用 `document.elementFromPoint()` 进行基于坐标的元素检测

### 选项模式
- 使用选项对象配合默认值：`options = {}`
- 常用选项属性：
  - `delay`: 执行前等待的毫秒数
  - `button`: 鼠标按钮编号（0=左键，1=中键，2=右键）
  - `ctrlKey`, `shiftKey`, `altKey`, `metaKey`: 修饰键状态

### CSS-in-JS 样式
- 使用模板字面量创建动态 CSS
- 必要时包含厂商前缀
- 覆盖层元素使用固定定位
- 设置高 z-index 值（10000+）用于 UI 覆盖层

## 构建配置

### Vite 配置文件
- 主配置: `vite.config.js` - 主包配置
- 模块配置: `config/vite.{module}.config.js` - 独立模块构建
- 注入配置: `config/vite.inject.config.js` - 可注入版本
- 输出格式: IIFE 用于浏览器兼容性

### 压缩设置
- 生产环境使用 Terser 并移除控制台输出
- 删除 `console.log`、`console.debug`、`debugger` 语句
- 生产环境启用名称混淆
- 开发环境保留函数名便于调试

## 开发工作流

### 测试策略
- 通过浏览器中的 HTML 文件手动测试
- 彻底测试所有基于坐标的交互
- 验证跨浏览器兼容性
- 测试模块加载和全局导出

### 模块集成
- 模块独立但可相互依赖
- 访问其他模块时使用可选链和回退
- 依赖缺失时提供优雅降级
- 保持与全局变量模式的向后兼容性

## 常见模式

### 点击实现
```javascript
clickAt(x, y, options = {}) {
  return new Promise((resolve, reject) => {
    const { delay = 0, button = 0 } = options;
    
    setTimeout(() => {
      try {
        const element = document.elementFromPoint(x, y);
        if (!element) {
          reject(new Error(`在坐标 (${x}, ${y}) 未找到元素`));
          return;
        }
        
        const event = new MouseEvent('click', {
          clientX: x, clientY: y, button,
          bubbles: true, cancelable: true
        });
        
        element.dispatchEvent(event);
        resolve({ element, tagName: element.tagName.toLowerCase(), coordinates: { x, y } });
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
}
```

### 模块导出模式
```javascript
(function() {
  const moduleName = {
    // 模块实现
  };
  
  // 导出到全局和 CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = moduleName;
  } else {
    window.domToolkitModuleName = moduleName;
  }
})();
```

## 重要说明

- 无外部依赖 - 纯原生 JavaScript
- 支持浏览器和 Node.js 环境
- 使用 ES6+ 特性，通过适当构建支持旧浏览器
- 所有基于坐标的操作都是像素精确的
- 保持与旧版全局变量的向后兼容性
- 用户界面内容期望使用中文文档

## GitHub Actions 自动化部署

项目使用标准化的 GitHub Actions 进行自动化构建和部署：

### 部署架构
- **部署方式**: 从 main 分支直接部署到 GitHub Pages
- **工作流**: 使用 `actions/deploy-pages@v4` 标准部署
- **权限**: 标准 `contents: read`, `pages: write`, `id-token: write`

### 自动化触发条件
- **推送至 main 分支**: 自动构建并部署到 GitHub Pages (`@latest`)
- **推送版本标签**: 创建正式 Release (`@vX.X.X`)
- **手动触发**: 支持 workflow_dispatch 手动部署

### 部署配置
```yaml
# 标准部署配置
- path: ./dist                    # 部署目录
- source: main branch              # 从 main 分支部署
- folder: / (root)               # 根目录部署
```

### 首次配置步骤
1. 访问 Repository Settings → Pages
2. Source 选择：`Deploy from a branch`
3. Branch 选择：`main`
4. Folder 选择：`/ (root)`
5. 点击 Save

### 部署后访问
- **GitHub Pages**: https://xiaoink.github.io/dom-toolkit
- **CDN**: https://cdn.jsdelivr.net/gh/xiaoink/dom-toolkit@latest/dist/

## 文件位置

- 源文件: `src/`
- 构建配置: `config/`
- 分发包: `dist/`（主包）, `dist/modules/`（独立模块）
- GitHub Actions: `.github/workflows/deploy.yml`
- 无自动化测试 - 仅手动测试