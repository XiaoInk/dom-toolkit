/**
 * dom-toolkit 基础使用示例
 * 演示基本功能：坐标显示、点击、滚动、元素检测
 */

// 1. 坐标显示功能
console.log('=== 坐标显示功能 ===');
domToolkit.coordinates.startDisplay();

// 2. 基础点击操作
console.log('=== 基础点击操作 ===');
setTimeout(() => {
  // 点击页面中央位置
  domToolkit.click(window.innerWidth / 2, window.innerHeight / 2)
    .then(() => console.log('点击完成'))
    .catch(err => console.error('点击失败:', err));
}, 2000);

// 3. 页面滚动功能
console.log('=== 页面滚动功能 ===');
setTimeout(() => {
  // 向下滚动500像素
  domToolkit.scroll("down", 500)
    .then(() => console.log('滚动完成'))
    .catch(err => console.error('滚动失败:', err));
}, 3000);

// 4. 元素检测功能
console.log('=== 元素检测功能 ===');
setTimeout(() => {
  // 检测页面中心位置的元素
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  const element = domToolkit.detector.getElementAt(centerX, centerY);
  if (element) {
    console.log('检测到元素:', element);
    
    // 高亮显示该元素
    domToolkit.detector.highlightAt(centerX, centerY, 3000);
  } else {
    console.log('未检测到元素');
  }
}, 4000);

// 5. 相对滚动
console.log('=== 相对滚动 ===');
setTimeout(() => {
  // 向上滚动200像素
  domToolkit.scrollBy(0, -200)
    .then(() => console.log('相对滚动完成'))
    .catch(err => console.error('相对滚动失败:', err));
}, 5000);

// 6. 滚动到顶部
console.log('=== 滚动到顶部 ===');
setTimeout(() => {
  domToolkit.scroll({ top: true })
    .then(() => console.log('滚动到顶部完成'))
    .catch(err => console.error('滚动到顶部失败:', err));
}, 6000);

console.log('基础示例已启动，请观察页面变化和控制台输出...');