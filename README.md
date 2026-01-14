# DOM Toolkit

DOM操作工具集 - 坐标检测、元素交互、页面滚动

## 🚀 快速开始

### 1. 本地使用（推荐）
```html
<!-- 加载完整工具包 -->
<script src="dist/index.js"></script>
<script>
  // 使用统一API接口
  domToolkit.click(100, 200);
  domToolkit.scroll('down', 300);
</script>
```

### 2. CDN使用
```html
<script src="https://cdn.jsdelivr.net/npm/dom-toolkit/dist/index.js"></script>
<script>
  // 使用domToolkit对象
  domToolkit.click(100, 200);
</script>
```

### 3. 独立模块使用
```html
<!-- 按需加载模块 -->
<script src="dist/modules/coordinate.min.js"></script>
<script src="dist/modules/detector.min.js"></script>
<script src="dist/modules/interactor.min.js"></script>
<script src="dist/modules/scroller.min.js"></script>

<script>
  // 直接使用模块
  domToolkitCoordinates.startDisplay();
  domToolkitInteractor.clickAt(100, 200);
  domToolkitScroller.scroll('down', 300);
</script>
```

### 4. 控制台注入
```javascript
// 注入完整工具包
const script = await fetch('https://cdn.jsdelivr.net/npm/dom-toolkit/dist/index.js').then(r=>r.text());
eval(script);

// 注入独立模块
await fetch('https://cdn.jsdelivr.net/npm/dom-toolkit/dist/modules/interactor.min.js').then(r=>r.text()).then(eval);
```

## 📦 项目结构

```
dom-toolkit/
├── src/                    # 源代码
│   ├── index.js           # 统一API入口
│   ├── coordinate.js      # 坐标显示模块
│   ├── detector.js        # 元素检测模块
│   ├── interactor.js      # 交互操作模块
│   └── scroller.js       # 滚动控制模块
├── dist/                  # 构建输出
│   ├── index.js          # 完整工具包（推荐）
│   ├── dom-toolkit.inject.min.js  # 控制台注入版本
│   └── modules/          # 独立模块
│       ├── coordinate.min.js
│       ├── detector.min.js
│       ├── interactor.min.js
│       └── scroller.min.js
├── examples/              # 使用示例
│   ├── cdn-demo.html     # CDN演示页面
│   ├── basic-usage.js    # 基础使用示例
│   └── advanced-usage.js # 高级使用示例
└── full-test.html        # 功能验证页面
```

## 🛠️ 构建命令

```bash
# 安装依赖
npm install

# 构建所有版本
npm run build:all

# 构建特定版本
npm run build              # 主库文件
npm run build:inject       # 控制台注入版本
npm run build:modules      # 独立模块

# 开发模式（监听文件变化）
npm run dev
```

## 📋 API 文档

### 🎯 统一API (domToolkit)

#### 坐标相关
```javascript
// 启动/停止坐标显示
domToolkit.coordinates.startDisplay();
domToolkit.coordinates.stopDisplay();

// 获取当前页面滚动位置
const position = domToolkit.getPosition();
```

#### 元素检测
```javascript
// 获取指定坐标的元素信息
const element = domToolkit.detector.getElementAt(x, y);

// 高亮显示指定坐标的元素
domToolkit.detector.highlightAt(x, y, duration);

// 启动/停止实时元素检测
domToolkit.detector.startRealtimeDetection();
domToolkit.detector.stopRealtimeDetection();
```

#### 交互操作
```javascript
// 点击操作
await domToolkit.click(x, y, options);
await domToolkit.doubleClick(x, y, options);
await domToolkit.rightClick(x, y, options);

// 文本输入
await domToolkit.type(x, y, text, options);

// 拖拽操作
await domToolkit.drag(startX, startY, endX, endY, options);

// 批量操作
await domToolkit.batch(operations, options);
```

#### 滚动控制
```javascript
// 方向滚动
await domToolkit.scroll('down', 300);        // 向下滚动300像素
await domToolkit.scroll('up');               // 滚动到顶部
await domToolkit.scroll({bottom: true});    // 滚动到底部

// 相对滚动
await domToolkit.scrollBy(0, 500);           // 向下滚动500像素

// 滚动到元素
await domToolkit.scrollToElement('#content');

// 复杂批量操作
await domToolkit.batchOperate(operations, options);
```

### 🔧 独立模块API

#### 坐标模块 (domToolkitCoordinates)
```javascript
// 启动坐标显示
domToolkitCoordinates.startDisplay();

// 停止坐标显示
domToolkitCoordinates.stopDisplay();

// 获取页面滚动位置
const pos = domToolkitCoordinates.getPosition();
```

#### 元素检测模块 (domToolkitDetector)
```javascript
// 获取元素信息
const element = domToolkitDetector.getElementAt(x, y);

// 高亮元素
domToolkitDetector.highlightAt(x, y, 2000);

// 实时检测
domToolkitDetector.startRealtimeDetection();
domToolkitDetector.stopRealtimeDetection();
```

#### 交互模块 (domToolkitInteractor)
```javascript
// 单击
await domToolkitInteractor.clickAt(x, y, options);

// 双击
await domToolkitInteractor.doubleClickAt(x, y, options);

// 右键点击
await domToolkitInteractor.rightClickAt(x, y, options);

// 文本输入
await domToolkitInteractor.typeAt(x, y, 'Hello World', {
  clear: true,
  typingDelay: 100
});

// 拖拽
await domToolkitInteractor.dragFromTo(startX, startY, endX, endY, {
  duration: 500
});

// 批量点击
await domToolkitInteractor.batchClick([
  {x: 100, y: 100},
  {x: 200, y: 200}
], {delayBetween: 500});
```

#### 滚动模块 (domToolkitScroller)
```javascript
// 方向滚动
await domToolkitScroller.scroll('down', 300);
await domToolkitScroller.scroll('up');
await domToolkitScroller.scroll('left', 200);
await domToolkitScroller.scroll('right', 400);

// 位置滚动
await domToolkitScroller.scroll({top: true});
await domToolkitScroller.scroll({bottom: true});
await domToolkitScroller.scroll({x: 100, y: 200});

// 相对滚动
await domToolkitScroller.scrollBy(0, 500);
await domToolkitScroller.scrollBy(-200, 0);

// 滚动到元素
await domToolkitScroller.scrollToElement('#content', {
  behavior: 'smooth',
  block: 'start'
});

// 滚动并点击
await domToolkitScroller.scrollAndClick(0, 1000, 200, 300);

// 复杂批量操作
await domToolkitScroller.scrollAndBatchOperate([
  {scroll: {top: true}},
  {click: {x: 100, y: 200}},
  {scroll: {down: true, distance: 500}},
  {type: {x: 100, y: 100, text: 'Hello'}}
]);
```

## 🎯 使用示例

### 基础功能测试
```javascript
// 启动坐标显示
domToolkit.coordinates.startDisplay();

// 检测元素
const element = domToolkit.detector.getElementAt(100, 200);
console.log('检测到元素:', element);

// 点击元素
await domToolkit.click(100, 200);

// 滚动页面
await domToolkit.scroll('down', 300);
```

### 表单自动填写
```javascript
// 滚动到表单
await domToolkit.scrollToElement('#form');

// 填写用户名
await domToolkit.type(userX, userY, 'admin', {clear: true});

// 填写密码
await domToolkit.type(passX, passY, 'password123', {clear: true});

// 点击提交按钮
await domToolkit.click(submitX, submitY);
```

### 批量数据采集
```javascript
const results = [];
const operations = [
  {scroll: {top: true}},
  {click: {x: 100, y: 200}},  // 点击第一个项目
  {scroll: {down: true, distance: 400}},
  {click: {x: 100, y: 600}},  // 点击第二个项目
  {scroll: {down: true, distance: 400}},
  {click: {x: 100, y: 1000}}  // 点击第三个项目
];

await domToolkit.batchOperate(operations, {
  scrollDelay: 500,
  operationDelay: 300
});
```

### 自动化测试场景
```javascript
async function testLoginPage() {
  try {
    // 启动坐标显示
    domToolkit.coordinates.startDisplay();
    
    // 检测页面元素
    const usernameField = domToolkit.detector.getElementAt(usernameX, usernameY);
    const passwordField = domToolkit.detector.getElementAt(passwordX, passwordY);
    const loginButton = domToolkit.detector.getElementAt(loginX, loginY);
    
    // 填写表单
    await domToolkit.type(usernameX, usernameY, 'testuser', {clear: true});
    await domToolkit.type(passwordX, passwordY, 'testpass', {clear: true});
    
    // 点击登录
    await domToolkit.click(loginX, loginY);
    
    // 等待页面加载
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 验证登录成功
    const welcomeElement = domToolkit.detector.getElementAt(welcomeX, welcomeY);
    if (welcomeElement && welcomeElement.textContent.includes('欢迎')) {
      console.log('✅ 登录测试通过');
    } else {
      console.log('❌ 登录测试失败');
    }
    
  } catch (error) {
    console.error('测试执行失败:', error);
  }
}
```

## 🔍 验证和调试

### 功能验证页面
1. 打开 `tests/full-test.html` 进行完整功能测试
2. 打开 `tests/quick-test.html` 进行快速测试
3. 打开 `examples/cdn-demo.html` 查看使用示例

### 快速启动
```bash
# 启动测试服务器
./start-test-server.sh

# 或手动启动
python3 -m http.server 8080
# 然后访问 http://localhost:8080/tests/full-test.html
```

### 控制台调试
```javascript
// 检查模块加载状态
console.log('模块状态:', {
  coordinates: typeof domToolkitCoordinates !== 'undefined',
  detector: typeof domToolkitDetector !== 'undefined', 
  interactor: typeof domToolkitInteractor !== 'undefined',
  scroller: typeof domToolkitScroller !== 'undefined'
});

// 测试基础功能
domToolkit.coordinates.startDisplay();
domToolkit.detector.startRealtimeDetection();
```

### 常见问题排查

1. **模块加载失败**
   - 检查文件路径是否正确
   - 确认网络连接（CDN使用）
   - 查看浏览器控制台错误信息

2. **坐标不准确**
   - 确保使用视口坐标（clientX/clientY）
   - 检查页面缩放比例
   - 验证元素边界获取

3. **滚动无效**
   - 检查滚动容器是否正确
   - 确认滚动目标在范围内
   - 验证滚动距离计算

## ⚙️ 配置选项

### 通用选项
```javascript
const options = {
  delay: 1000,           // 延迟执行（毫秒）
  behavior: 'smooth',     // 滚动行为：'auto' | 'smooth'
  duration: 500,         // 操作持续时间
  element: container     // 指定容器元素
};
```

### 点击选项
```javascript
const clickOptions = {
  button: 0,             // 鼠标按钮：0=左键, 1=中键, 2=右键
  ctrlKey: false,        // Ctrl键状态
  shiftKey: false,       // Shift键状态
  delay: 0              // 延迟时间
};
```

### 输入选项
```javascript
const typeOptions = {
  clear: true,           // 输入前清空
  typingDelay: 100,      // 打字延迟
  delay: 0              // 执行延迟
};
```

### 拖拽选项
```javascript
const dragOptions = {
  duration: 500,         // 拖拽持续时间
  steps: 20,            // 拖拽步数
  delay: 0              // 执行延迟
};
```

## 🌟 高级特性

### 实时元素检测
- 按住Ctrl键移动鼠标显示元素信息
- 自动高亮当前检测的元素
- 显示元素坐标、尺寸、属性等信息

### 批量操作队列
- 支持复杂的操作序列
- 自动处理操作间的延迟
- 错误处理和状态恢复

### 智能滚动系统
- 自动计算滚动边界
- 支持多种滚动方式
- 平滑滚动和精确定位

## 📝 开发指南

### 添加新功能
1. 在 `src/` 目录创建新模块
2. 使用IIFE模式封装代码
3. 导出为 `window.domToolkitNewModule`
4. 在 `src/index.js` 中添加外观方法
5. 更新构建配置（如需要）

### 代码规范
- 使用IIFE模块模式
- 统一错误处理机制
- 基于Promise的异步API
- 完整的JSDoc注释

### 测试流程
1. 本地开发：`npm run dev`
2. 构建验证：`npm run build:all`
3. 功能测试：打开 `full-test.html`
4. 示例验证：检查 `examples/` 目录

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

---

**DOM Toolkit** - 让DOM操作更简单、更可靠！