/**
 * 鼠标坐标检测模块
 */
(function() {
  const coordinates = {
    displayElement: null,
    isDisplaying: false,
    
    startDisplay() {
      if (this.isDisplaying) return;
      
      // 创建坐标显示器
      this.displayElement = document.createElement('div');
      this.displayElement.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        z-index: 10000;
        user-select: none;
        pointer-events: none;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      `;
      
      const coordText = document.createElement('div');
      coordText.textContent = 'X: 0, Y: 0';
      this.displayElement.appendChild(coordText);
      
      // 关闭按钮
      const closeBtn = document.createElement('button');
      closeBtn.textContent = '×';
      closeBtn.style.cssText = `
        position: absolute;
        top: 2px;
        right: 5px;
        background: none;
        border: none;
        color: white;
        font-size: 16px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        pointer-events: auto;
      `;
      closeBtn.onclick = () => this.stopDisplay();
      this.displayElement.appendChild(closeBtn);
      
      // 更新坐标函数
      const updateCoordinates = (e) => {
        coordText.textContent = `X: ${e.clientX}, Y: ${e.clientY}`;
      };
      
      document.addEventListener('mousemove', updateCoordinates);
      document.body.appendChild(this.displayElement);
      this.isDisplaying = true;
      
      // 保存事件监听器以便移除
      this.updateHandler = updateCoordinates;
    },
    
    stopDisplay() {
      if (!this.isDisplaying) return;
      
      document.removeEventListener('mousemove', this.updateHandler);
      if (this.displayElement && this.displayElement.parentNode) {
        this.displayElement.parentNode.removeChild(this.displayElement);
      }
      this.isDisplaying = false;
      this.displayElement = null;
    },
    
    getPosition() {
      return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop
      };
    }
  };
  
  // 导出
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = coordinates;
  } else {
    window.domToolkitCoordinates = coordinates;
  }
})();