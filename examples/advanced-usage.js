/**
 * dom-toolkit 进阶使用示例
 * 演示高级功能：组合操作、批量操作、复杂自动化
 */

// 1. 滚动后点击
console.log('=== 滚动后点击 ===');
domToolkit.scroll("down", 1000)
  .then(() => {
    console.log('滚动完成，开始点击');
    return domToolkit.click(200, 300);
  })
  .then(() => {
    console.log('滚动后点击完成');
  })
  .catch(err => console.error('操作失败:', err));

// 2. 批量自动化操作
console.log('=== 批量自动化操作 ===');
setTimeout(() => {
  const operations = [
    { click: { x: 100, y: 200 } },
    { click: { x: 200, y: 300 } },
    { click: { x: 300, y: 400 } }
  ];
  
  domToolkit.batch(operations, { delayBetween: 1000 })
    .then(() => {
      console.log('批量点击完成');
    })
    .catch(err => console.error('批量操作失败:', err));
}, 2000);

// 3. 滚动并批量操作
console.log('=== 滚动并批量操作 ===');
setTimeout(() => {
  const advancedOperations = [
    { scroll: { top: true } },
    { click: { x: 150, y: 250 } },
    { scroll: { down: true, distance: 500 } },
    { click: { x: 250, y: 350 } },
    { scroll: { down: true, distance: 500 } },
    { click: { x: 350, y: 450 } }
  ];
  
  domToolkit.batchOperate(advancedOperations, { 
    scrollDelay: 800, 
    operationDelay: 500 
  })
    .then(() => {
      console.log('滚动并批量操作完成');
    })
    .catch(err => console.error('高级操作失败:', err));
}, 8000);

// 4. 双击和右键点击
console.log('=== 双击和右键点击 ===');
setTimeout(() => {
  // 双击操作
  domToolkit.doubleClick(400, 300)
    .then(() => console.log('双击完成'))
    .catch(err => console.error('双击失败:', err));
  
  // 右键点击
  setTimeout(() => {
    domToolkit.rightClick(450, 350)
      .then(() => console.log('右键点击完成'))
      .catch(err => console.error('右键点击失败:', err));
  }, 1000);
}, 12000);

// 5. 拖拽操作
console.log('=== 拖拽操作 ===');
setTimeout(() => {
  domToolkit.drag(100, 400, 400, 400, { duration: 1000 })
    .then(() => console.log('拖拽完成'))
    .catch(err => console.error('拖拽失败:', err));
}, 15000);

// 6. 文本输入（如果有输入框）
console.log('=== 文本输入测试 ===');
setTimeout(() => {
  // 尝试找到一个输入框并输入文本
  const inputElement = document.querySelector('input[type="text"], input[type="search"], textarea');
  if (inputElement) {
    const rect = inputElement.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    domToolkit.type(x, y, "自动化测试输入", { clear: true, typingDelay: 50 })
      .then(() => console.log('文本输入完成'))
      .catch(err => console.error('文本输入失败:', err));
  } else {
    console.log('未找到输入框，跳过文本输入测试');
  }
}, 18000);

// 7. 滚动到元素
console.log('=== 滚动到元素 ===');
setTimeout(() => {
  // 尝试找到页面中的一个元素并滚动到该元素
  const targetElement = document.querySelector('h1, h2, .title, #main');
  if (targetElement) {
    domToolkit.scrollToElement(targetElement, { 
      behavior: 'smooth', 
      block: 'center' 
    })
      .then(() => console.log('滚动到元素完成'))
      .catch(err => console.error('滚动到元素失败:', err));
  } else {
    console.log('未找到目标元素，跳过滚动到元素测试');
  }
}, 20000);

// 8. 错误处理示例
console.log('=== 错误处理示例 ===');
setTimeout(() => {
  // 尝试点击不存在的位置
  domToolkit.click(-1000, -1000)
    .then(() => console.log('意外成功'))
    .catch(err => console.log('预期的错误:', err.message));
}, 22000);

console.log('进阶示例已启动，请观察页面变化和控制台输出...');