# dom-toolkit

DOM操作工具集 - 坐标检测、元素交互、页面滚动

## 快速开始

### 控制台注入（最简单）
复制下面代码到浏览器控制台：

```javascript
(function(){/*完整的压缩代码*/})();
```

### CDN使用
```html
<script src="https://cdn.jsdelivr.net/npm/dom-toolkit/dist/dom-toolkit.min.js"></script>
<script>
  // 使用domToolkit对象
  domToolkit.click(100, 200);
</script>
```

### evaluateJavaScript注入
```javascript
const script = await fetch('https://cdn.jsdelivr.net/npm/dom-toolkit/dist/dom-toolkit.inject.min.js').then(r=>r.text());
await page.evaluateJavaScript(script);
```

## 脚本文件

### 1. mouse-coordinates.js
**功能**: 实时显示鼠标坐标
- 在页面右上角显示当前鼠标的屏幕坐标
- 按住Shift键移动鼠标可在控制台查看详细坐标信息（包括文档坐标）
- 可通过关闭按钮关闭显示

**使用方法**:
1. 打开浏览器控制台（F12）
2. 复制粘贴`mouse-coordinates.js`的内容并回车
3. 移动鼠标查看坐标显示

### 2. element-detector.js
**功能**: 通过坐标获取DOM元素信息
- `getElementAt(x, y)`: 获取指定坐标的元素详细信息
- `highlightAt(x, y, duration)`: 高亮显示指定坐标的元素
- `startElementDetection()`: 启动实时检测模式（按住Ctrl键移动鼠标）

**使用方法**:
```javascript
// 加载脚本
// 复制粘贴element-detector.js内容并回车

// 获取指定坐标的元素
const element = getElementAt(100, 200);
console.log(element);

// 高亮显示元素（默认2秒）
highlightAt(100, 200);

// 启动实时检测
startElementDetection();
```

### 3. coordinate-clicker.js
**功能**: 通过坐标点击DOM元素（含滚动功能）

#### 🖱️ 点击操作:
- `clickAt(x, y, options)`: 单击指定坐标
- `doubleClickAt(x, y, options)`: 双击指定坐标
- `rightClickAt(x, y, options)`: 右键点击
- `typeAt(x, y, text, options)`: 在指定坐标输入文本
- `dragFromTo(startX, startY, endX, endY, options)`: 拖拽操作
- `batchClick(coordinates, options)`: 批量点击

#### 📜 滚动操作:
- `scroll(directionOrOptions, distance, options)`: 滚动（支持方向参数或对象参数）
- `scrollBy(x, y, options)`: 相对滚动
- `scrollToElement(element, options)`: 滚动到指定元素
- `getScrollPosition(element)`: 获取当前滚动位置
- `scrollToAndClick(scrollX, scrollY, clickX, clickY, options)`: 滚动并点击
- `scrollAndBatchOperate(operations, options)`: 分步滚动并批量操作

**使用方法**:
```javascript
// 加载脚本
// 复制粘贴coordinate-clicker.js内容并回车

// 简单点击
clickAt(100, 200);

// 延迟点击（1秒后）
clickAt(100, 200, {delay: 1000});

// Ctrl+点击
clickAt(100, 200, {ctrlKey: true});

// 输入文本（先点击输入框获得焦点）
typeAt(300, 400, "Hello World", {clear: true, typingDelay: 100});

// 拖拽
dragFromTo(100, 100, 200, 200, {duration: 500});

// 批量点击
batchClick([
    {x: 100, y: 100},
    {x: 200, y: 200, delay: 500},
    {x: 300, y: 300}
], {delayBetween: 1000});

// 滚动操作 - 统一的scroll函数
// 方式1：方向参数
scroll("up", 300);         // 向上滚动300像素
scroll("down", 500);       // 向下滚动500像素
scroll("left", 200);       // 向左滚动200像素
scroll("right", 400);      // 向右滚动400像素

// 方式2：对象参数（功能更丰富）
scroll({top: true});       // 滚动到页面顶部
scroll({bottom: true});    // 滚动到页面底部
scroll({up: true, distance: 300});    // 向上滚动300像素
scroll({down: true, distance: 500});  // 向下滚动500像素
scroll({x: 100, y: 200}); // 滚动到指定坐标

// 滚动到底部/顶部（不指定距离）
scroll("down");            // 滚动到底部
scroll("up");              // 滚动到顶部

// 相对滚动
scrollBy(0, 500);         // 向下滚动500像素
scrollBy(-200, 0);        // 向左滚动200像素

scrollToElement("#content"); // 滚动到指定元素
```

## 测试步骤

### 第一步：打开测试页面
已为您打开豆瓣电影页面：https://movie.douban.com/subject/36638134/

### 第二步：测试坐标显示
1. 按F12打开开发者工具
2. 在Console标签页中复制粘贴`mouse-coordinates.js`的内容并回车
3. 移动鼠标，观察右上角的坐标显示
4. 按住Shift键移动鼠标，观察控制台输出的详细坐标信息

### 第三步：测试元素检测
1. 在Console中运行`element-detector.js`
2. 尝试获取页面元素的坐标（如电影标题、评分按钮等）
3. 使用`getElementAt(x, y)`获取元素信息
4. 使用`highlightAt(x, y)`高亮显示元素
5. 运行`startElementDetection()`启动实时检测模式

### 第四步：测试点击功能
1. 在Console中运行`coordinate-clicker.js`
2. 使用坐标点击页面上的各种元素：
   - 链接、按钮
   - 输入框（配合typeAt使用）
   - 可拖拽元素（配合dragFromTo使用）

## 实际应用示例

### 示例1：点击豆瓣电影页面的"想看"按钮
```javascript
// 1. 先用鼠标坐标显示器找到按钮坐标
// 2. 点击按钮
clickAt(buttonX, buttonY);
```

### 示例2：在搜索框中输入内容
```javascript
// 1. 点击搜索框
clickAt(searchBoxX, searchBoxY);
// 2. 输入搜索内容
typeAt(searchBoxX, searchBoxY, "搜索关键词", {clear: true});
// 3. 点击搜索按钮
clickAt(searchButtonX, searchButtonY);
```

### 示例3：批量操作
```javascript
// 批量点击电影列表中的多个项目
const movieCoordinates = [
    {x: 150, y: 200},
    {x: 150, y: 350},
    {x: 150, y: 500}
];
batchClick(movieCoordinates, {delayBetween: 500});
```

### 示例4：滚动后点击操作
```javascript
// 滚动到页面底部并点击某个元素
scrollTo({bottom: true}).then(() => {
    return clickAt(300, 1000);
});

// 或者使用便捷函数
scrollToAndClick(0, 2000, 200, 300); // 滚动到(0,2000)后点击(200,300)
```

### 示例5：滚动功能使用示例
```javascript
// 方向滚动方式
scroll("up", 300);         // 向上滚动300像素
scroll("down");             // 滚动到底部
scroll("left", 200);        // 向左滚动200像素
scroll("right", 400);       // 向右滚动400像素

// 对象参数方式（功能更丰富）
scroll({top: true});        // 滚动到顶部
scroll({bottom: true});     // 滚动到底部
scroll({up: true, distance: 300});  // 向上滚动300像素
scroll({x: 100, y: 200});  // 滚动到指定坐标
```

### 示例6：复杂分步操作
```javascript
// 分步滚动并执行多个操作
const operations = [
    {
        scrollTo: { top: true },
        click: { x: 100, y: 200 }
    },
    {
        scrollTo: { down: true, distance: 500 }, // 向下滚动500像素
        type: { x: 200, y: 300, text: "搜索内容", options: { clear: true } }
    },
    {
        scroll: "down", // 滚动到底部
        doubleClick: { x: 150, y: 1500 }
    }
];

scrollAndBatchOperate(operations, { scrollDelay: 800, operationDelay: 500 });
```

## 滚动操作详解

### scroll() 函数说明

**方式1：方向参数**
```javascript
scroll(direction, distance, options)

// 参数说明：
// direction: 'up' | 'down' | 'left' | 'right' - 滚动方向
// distance: number | null - 滚动距离（像素），null表示滚动到底部
// options: { behavior, duration, element }

// 示例：
scroll("up", 200);        // 向上滚动200像素
scroll("down", 500);       // 向下滚动500像素
scroll("down");            // 滚动到底部（不指定距离）
scroll("right", 300);      // 向右滚动300像素
```

**方式2：对象参数**
```javascript
scroll(options)

// 参数说明：
{
    // 基础位置参数
    x: 0,           // 水平滚动位置
    y: 0,           // 垂直滚动位置
    
    // 位置快捷参数
    top: true,      // 滚动到顶部
    bottom: true,   // 滚动到底部
    left: true,     // 滚动到左侧
    right: true,    // 滚动到右侧
    
    // 方向滚动参数
    up: false,      // 向上滚动
    down: false,    // 向下滚动
    left: false,    // 向左滚动
    right: false,   // 向右滚动
    distance: 300,  // 滚动距离（配合方向参数使用，不指定则滚动到底部）
    
    // 其他参数
    behavior: 'smooth', // 'auto' | 'smooth'
    element: document.querySelector('.container'), // 指定滚动容器
    duration: 500   // 动画持续时间
}
```

### 方向滚动参数说明
```javascript
// scroll() 函数用法
scroll(direction, distance, options)

// 参数说明：
// direction: 'up' | 'down' | 'left' | 'right' - 滚动方向
// distance: number | null - 滚动距离（像素），null表示滚动到底部
// options: { behavior, duration, element }

// 示例：
scroll("up", 200);        // 向上滚动200像素
scroll("down", 500);       // 向下滚动500像素
scroll("down");            // 滚动到底部（不指定距离）
scroll("right", 300);      // 向右滚动300像素
```

### 方向滚动参数说明
```javascript
// scroll() 函数用法
scroll(direction, distance, options)

// 参数说明：
// direction: 'up' | 'down' | 'left' | 'right' - 滚动方向
// distance: number | null - 滚动距离（像素），null表示滚动到底部
// options: { behavior, duration, element }

// 示例：
scroll("up", 200);        // 向上滚动200像素
scroll("down", 500);       // 向下滚动500像素
scroll("down");            // 滚动到底部（不指定距离）
scroll("right", 300);      // 向右滚动300像素
```

### scrollToElement() 参数说明
```javascript
scrollToElement('#content', {
    behavior: 'smooth',
    block: 'start',    // 'start' | 'center' | 'end' | 'nearest'
    inline: 'nearest', // 'start' | 'center' | 'end' | 'nearest'
    duration: 500
});
```

### scrollAndBatchOperate() 操作格式
```javascript
const operations = [
    {
        scrollTo: { y: 500 },  // 滚动操作
        click: { x: 100, y: 200, options: { delay: 100 } }, // 点击操作
        type: { x: 100, y: 100, text: "文本", options: {} }, // 输入操作
        doubleClick: { x: 200, y: 200, options: {} } // 双击操作
    }
];
```

## 注意事项

1. **坐标系统**: 脚本使用的是视口坐标（clientX/clientY），不包括页面滚动
2. **元素遮挡**: 如果元素被其他元素遮挡，`elementFromPoint`会返回最上层的元素
3. **异步操作**: 所有点击和滚动函数都返回Promise，可以使用async/await或.then()处理结果
4. **滚动时机**: 滚动后建议添加适当延迟，确保页面稳定后再进行点击操作
5. **浏览器兼容**: 脚本基于现代浏览器API，建议使用Chrome、Firefox等主流浏览器
6. **权限限制**: 某些网站可能有CSP策略，可能需要在开发者工具中临时禁用CSP
7. **滚动性能**: 平滑滚动在某些情况下可能影响后续操作的精确度
8. **方向滚动**: 方向参数（up/down/left/right）会自动计算边界，防止超出滚动范围
9. **距离参数**: 当使用方向参数时，不指定`distance`会滚动到相应方向的极端位置
10. **容器滚动**: 支持`element`参数指定滚动容器，默认使用`window`对象
11. **统一API**: `scroll()`函数支持两种调用方式：方向参数和对象参数，功能更强大且简洁

## 调试技巧

1. **先检测再点击**: 使用元素检测器确认目标元素的坐标和属性
2. **使用高亮**: 在点击前先用highlightAt确认目标位置
3. **检查事件**: 在Network面板观察点击后的网络请求
4. **错误处理**: 使用try-catch包裹点击和滚动操作，捕获可能的错误
5. **滚动验证**: 使用`getScrollPosition()`检查当前滚动位置，确保滚动操作生效
6. **分步调试**: 复杂操作建议分解为多个步骤，逐步验证每个步骤的结果