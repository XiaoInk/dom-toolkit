/**
 * DOM Toolkit - 主入口文件
 * 统一导出所有功能模块
 */
(function() {
  'use strict';
  
  // 主工具包对象
  const domToolkit = {
    // 坐标功能
    coordinates: window.domToolkitCoordinates || {},
    
    // 元素检测
    detector: window.domToolkitDetector || {},
    
    // 交互操作 - 统一API
    click: function(x, y, options) {
      return window.domToolkitInteractor ? 
        window.domToolkitInteractor.clickAt(x, y, options) : 
        Promise.reject(new Error('interactor模块未加载'));
    },
    
    clickAt: function(x, y, options) {
      return this.click(x, y, options);
    },
    
    doubleClick: function(x, y, options) {
      return window.domToolkitInteractor ? 
        window.domToolkitInteractor.doubleClickAt(x, y, options) : 
        Promise.reject(new Error('interactor模块未加载'));
    },
    
    rightClick: function(x, y, options) {
      return window.domToolkitInteractor ? 
        window.domToolkitInteractor.rightClickAt(x, y, options) : 
        Promise.reject(new Error('interactor模块未加载'));
    },
    
    type: function(x, y, text, options) {
      return window.domToolkitInteractor ? 
        window.domToolkitInteractor.typeAt(x, y, text, options) : 
        Promise.reject(new Error('interactor模块未加载'));
    },
    
    drag: function(startX, startY, endX, endY, options) {
      return window.domToolkitInteractor ? 
        window.domToolkitInteractor.dragFromTo(startX, startY, endX, endY, options) : 
        Promise.reject(new Error('interactor模块未加载'));
    },
    
    batch: function(operations, options) {
      return window.domToolkitInteractor ? 
        window.domToolkitInteractor.batch(operations, options) : 
        Promise.reject(new Error('interactor模块未加载'));
    },
    
    // 滚动控制
    scroll: function(directionOrOptions, distance, options) {
      return window.domToolkitScroller ? 
        window.domToolkitScroller.scroll(directionOrOptions, distance, options) : 
        Promise.reject(new Error('scroller模块未加载'));
    },
    
    scrollBy: function(x, y, options) {
      return window.domToolkitScroller ? 
        window.domToolkitScroller.scrollBy(x, y, options) : 
        Promise.reject(new Error('scroller模块未加载'));
    },
    
    scrollToElement: function(element, options) {
      return window.domToolkitScroller ? 
        window.domToolkitScroller.scrollToElement(element, options) : 
        Promise.reject(new Error('scroller模块未加载'));
    },
    
    getPosition: function(element) {
      return window.domToolkitScroller ? 
        window.domToolkitScroller.getScrollPosition(element) : 
        { x: 0, y: 0 };
    },
    
    scrollAndClick: function(scrollX, scrollY, clickX, clickY, options) {
      return window.domToolkitScroller ? 
        window.domToolkitScroller.scrollAndClick(scrollX, scrollY, clickX, clickY, options) : 
        Promise.reject(new Error('scroller模块未加载'));
    },
    
    batchOperate: function(operations, options) {
      return window.domToolkitScroller ? 
        window.domToolkitScroller.batchOperate(operations, options) : 
        Promise.reject(new Error('scroller模块未加载'));
    }
  };
  
  // 导出到全局
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = domToolkit;
  } else {
    window.domToolkit = domToolkit;
  }
  
  // 兼容性别名
  window.domToolkitClick = domToolkit.click;
  window.domToolkitScroll = domToolkit.scroll;
  
})();