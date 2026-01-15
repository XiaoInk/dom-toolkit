/**
 * 元素交互模块
 */
(function() {
  const interactor = {
    clickAt(x, y, options = {}) {
      return new Promise((resolve, reject) => {
        const { delay = 0, button = 0, ctrlKey = false, shiftKey = false } = options;
        
        setTimeout(() => {
          try {
            const element = document.elementFromPoint(x, y);
            if (!element) {
              reject(new Error(`在坐标 (${x}, ${y}) 未找到元素`));
              return;
            }
            
            const event = new MouseEvent('click', {
              clientX: x,
              clientY: y,
              button: button,
              ctrlKey: ctrlKey,
              shiftKey: shiftKey,
              bubbles: true,
              cancelable: true
            });
            
            element.dispatchEvent(event);
            
            resolve({
              element: element,
              tagName: element.tagName.toLowerCase(),
              coordinates: { x, y }
            });
          } catch (error) {
            reject(error);
          }
        }, delay);
      });
    },
    
    doubleClick(x, y, options = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.clickAt(x, y, { ...options });
          await new Promise(resolve => setTimeout(resolve, 50));
          await this.clickAt(x, y, { ...options });
          
          const element = document.elementFromPoint(x, y);
          if (element) {
            const dblClickEvent = new MouseEvent('dblclick', {
              clientX: x,
              clientY: y,
              bubbles: true,
              cancelable: true
            });
            element.dispatchEvent(dblClickEvent);
          }
          
          resolve({ x, y, eventType: 'dblclick' });
        } catch (error) {
          reject(error);
        }
      });
    },
    
    rightClick(x, y, options = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.clickAt(x, y, { ...options, button: 2 });
          
          const element = document.elementFromPoint(x, y);
          if (element) {
            const contextMenuEvent = new MouseEvent('contextmenu', {
              clientX: x,
              clientY: y,
              button: 2,
              bubbles: true,
              cancelable: true
            });
            element.dispatchEvent(contextMenuEvent);
          }
          
          resolve({ x, y, eventType: 'contextmenu' });
        } catch (error) {
          reject(error);
        }
      });
    },
    
    type(x, y, text, options = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          // 先点击获得焦点
          await this.clickAt(x, y, options);
          
          const element = document.elementFromPoint(x, y);
          if (!element) {
            reject(new Error(`在坐标 (${x}, ${y}) 未找到元素`));
            return;
          }
          
          // 清空现有内容（如果指定）
          if (options.clear && element.value !== undefined) {
            element.value = '';
          }
          
          // 逐字符输入
          const typingDelay = options.typingDelay || 100;
          for (let i = 0; i < text.length; i++) {
            const char = text[i];
            
            const keydownEvent = new KeyboardEvent('keydown', {
              key: char,
              char: char,
              keyCode: char.charCodeAt(0),
              bubbles: true,
              cancelable: true
            });
            
            const keyupEvent = new KeyboardEvent('keyup', {
              key: char,
              char: char,
              keyCode: char.charCodeAt(0),
              bubbles: true,
              cancelable: true
            });
            
            const inputEvent = new InputEvent('input', {
              data: char,
              bubbles: true,
              cancelable: true
            });
            
            element.dispatchEvent(keydownEvent);
            
            if (element.value !== undefined) {
              element.value += char;
              element.dispatchEvent(inputEvent);
            }
            
            element.dispatchEvent(keyupEvent);
            
            if (typingDelay > 0) {
              await new Promise(resolve => setTimeout(resolve, typingDelay));
            }
          }
          
          resolve({ x, y, text, element });
        } catch (error) {
          reject(error);
        }
      });
    },
    
    drag(startX, startY, endX, endY, options = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          const { duration = 500 } = options;
          const startElement = document.elementFromPoint(startX, startY);
          if (!startElement) {
            reject(new Error(`在起始坐标 (${startX}, ${startY}) 未找到元素`));
            return;
          }
          
          // 开始拖拽
          const dragStartEvent = new MouseEvent('mousedown', {
            clientX: startX,
            clientY: startY,
            button: 0,
            bubbles: true,
            cancelable: true
          });
          startElement.dispatchEvent(dragStartEvent);
          
          // 模拟拖拽过程
          const steps = 20;
          const stepDelay = duration / steps;
          
          for (let i = 1; i <= steps; i++) {
            const progress = i / steps;
            const currentX = startX + (endX - startX) * progress;
            const currentY = startY + (endY - startY) * progress;
            
            const moveEvent = new MouseEvent('mousemove', {
              clientX: currentX,
              clientY: currentY,
              button: 0,
              bubbles: true,
              cancelable: true
            });
            
            document.dispatchEvent(moveEvent);
            await new Promise(resolve => setTimeout(resolve, stepDelay));
          }
          
          // 结束拖拽
          const dragEndEvent = new MouseEvent('mouseup', {
            clientX: endX,
            clientY: endY,
            button: 0,
            bubbles: true,
            cancelable: true
          });
          document.dispatchEvent(dragEndEvent);
          
          resolve({ startX, startY, endX, endY });
        } catch (error) {
          reject(error);
        }
      });
    },
    
    batch(operations, options = {}) {
      return new Promise(async (resolve, reject) => {
        const { delayBetween = 1000 } = options;
        const results = [];
        
        try {
          for (let i = 0; i < operations.length; i++) {
            const operation = operations[i];
            let result;
            
            if (operation.click) {
              result = await this.clickAt(operation.click.x, operation.click.y, operation.click.options);
            } else if (operation.doubleClick) {
              result = await this.doubleClick(operation.doubleClick.x, operation.doubleClick.y, operation.doubleClick.options);
            } else if (operation.type) {
              result = await this.type(operation.type.x, operation.type.y, operation.type.text, operation.type.options);
            } else if (operation.drag) {
              result = await this.drag(operation.drag.startX, operation.drag.startY, operation.drag.endX, operation.drag.endY, operation.drag.options);
            }
            
            results.push(result);
            
            // 操作间延迟
            if (delayBetween > 0 && i < operations.length - 1) {
              await new Promise(resolve => setTimeout(resolve, delayBetween));
            }
          }
          
          resolve(results);
        } catch (error) {
          reject(error);
        }
      });
    }
  };
  
  // 导出
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = interactor;
  } else {
    window.domToolkitInteractor = interactor;
  }
})();