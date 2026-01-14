/**
 * 页面滚动控制模块
 */
(function() {
  const scroller = {
    getScrollPosition(element = null) {
      if (element) {
        return {
          x: element.scrollLeft,
          y: element.scrollTop,
          scrollWidth: element.scrollWidth,
          scrollHeight: element.scrollHeight,
          clientWidth: element.clientWidth,
          clientHeight: element.clientHeight
        };
      } else {
        return {
          x: window.pageXOffset || document.documentElement.scrollLeft,
          y: window.pageYOffset || document.documentElement.scrollTop,
          scrollWidth: document.documentElement.scrollWidth,
          scrollHeight: document.documentElement.scrollHeight,
          clientWidth: window.innerWidth,
          clientHeight: window.innerHeight
        };
      }
    },
    
    scroll(directionOrOptions, distance = null, options = {}) {
      return new Promise((resolve, reject) => {
        try {
          // 如果第一个参数是对象，则作为完整选项处理
          if (typeof directionOrOptions === 'object') {
            return this.scrollToPosition(directionOrOptions);
          }
          
          // 否则作为方向滚动处理
          const direction = directionOrOptions;
          const { behavior = 'smooth', duration = 500, element = null } = options;
          
          // 获取当前滚动位置
          const currentPos = this.getScrollPosition(element);
          const maxX = element ? 
            element.scrollWidth - element.clientWidth : 
            document.documentElement.scrollWidth - window.innerWidth;
          const maxY = element ? 
            element.scrollHeight - element.clientHeight : 
            document.documentElement.scrollHeight - window.innerHeight;
          
          let targetX = currentPos.x;
          let targetY = currentPos.y;
          
          // 根据方向计算目标位置
          switch(direction.toLowerCase()) {
            case 'up':
              targetY = distance !== null ? 
                Math.max(0, currentPos.y - distance) : 0;
              break;
            case 'down':
              targetY = distance !== null ? 
                Math.min(maxY, currentPos.y + distance) : maxY;
              break;
            case 'left':
              targetX = distance !== null ? 
                Math.max(0, currentPos.x - distance) : 0;
              break;
            case 'right':
              targetX = distance !== null ? 
                Math.min(maxX, currentPos.x + distance) : maxX;
              break;
            default:
              throw new Error(`无效的方向: ${direction}. 请使用: up, down, left, right`);
          }
          
          const scrollOptions = {
            left: targetX,
            top: targetY,
            behavior: behavior
          };
          
          // 执行滚动
          if (element) {
            element.scrollTo(scrollOptions);
          } else {
            window.scrollTo(scrollOptions);
          }
          
          // 等待滚动完成
          setTimeout(() => {
            resolve({ 
              direction, 
              distance, 
              from: { x: currentPos.x, y: currentPos.y }, 
              to: { x: targetX, y: targetY } 
            });
          }, duration);
          
        } catch (error) {
          reject(error);
        }
      });
    },
    
    scrollToPosition(options = {}) {
      return new Promise((resolve, reject) => {
        try {
          const {
            x = 0,
            y = 0,
            top = false,
            bottom = false,
            left = false,
            right = false,
            up = false,
            down = false,
            distance = null,
            behavior = 'smooth',
            element = null,
            duration = 500
          } = options;
          
          // 获取当前滚动位置
          const currentPos = this.getScrollPosition(element);
          let targetX = currentPos.x;
          let targetY = currentPos.y;
          
          // 处理方向滚动
          if (up) {
            targetY = distance !== null ? 
              Math.max(0, currentPos.y - distance) : 0;
          } else if (down) {
            const maxY = element ? 
              element.scrollHeight - element.clientHeight : 
              document.documentElement.scrollHeight - window.innerHeight;
            targetY = distance !== null ? 
              Math.min(maxY, currentPos.y + distance) : maxY;
          } else if (left) {
            targetX = distance !== null ? 
              Math.max(0, currentPos.x - distance) : 0;
          } else if (right) {
            const maxX = element ? 
              element.scrollWidth - element.clientWidth : 
              document.documentElement.scrollWidth - window.innerWidth;
            targetX = distance !== null ? 
              Math.min(maxX, currentPos.x + distance) : maxX;
          } else if (x !== 0 || y !== 0) {
            targetX = x;
            targetY = y;
          } else if (top) {
            targetY = 0;
            targetX = 0;
          } else if (bottom) {
            targetY = element ? 
              element.scrollHeight - element.clientHeight : 
              document.documentElement.scrollHeight - window.innerHeight;
          } else if (left) {
            targetX = 0;
          } else if (right) {
            targetX = element ? 
              element.scrollWidth - element.clientWidth : 
              document.documentElement.scrollWidth - window.innerWidth;
          }
          
          const scrollOptions = {
            left: targetX,
            top: targetY,
            behavior: behavior
          };
          
          // 执行滚动
          if (element) {
            element.scrollTo(scrollOptions);
          } else {
            window.scrollTo(scrollOptions);
          }
          
          // 等待滚动完成
          setTimeout(() => {
            resolve({ 
              from: { x: currentPos.x, y: currentPos.y }, 
              to: { x: targetX, y: targetY },
              options: options
            });
          }, duration);
          
        } catch (error) {
          reject(error);
        }
      });
    },
    
    scrollBy(x, y, options = {}) {
      return new Promise((resolve, reject) => {
        try {
          const { behavior = 'smooth', duration = 500, element = null } = options;
          
          // 执行相对滚动
          if (element) {
            element.scrollBy({ left: x, top: y, behavior: behavior });
          } else {
            // 使用原生window.scrollBy避免递归
            const nativeScrollBy = window.scrollBy;
            window.scrollBy = undefined; // 临时移除自定义函数
            window.scrollBy({ left: x, top: y, behavior: behavior });
            window.scrollBy = nativeScrollBy; // 恢复自定义函数
          }
          
          setTimeout(() => {
            resolve({ x, y });
          }, duration);
          
        } catch (error) {
          reject(error);
        }
      });
    },
    
    scrollToElement(element, options = {}) {
      return new Promise((resolve, reject) => {
        try {
          const { behavior = 'smooth', block = 'start', inline = 'nearest', duration = 500 } = options;
          
          if (typeof element === 'string') {
            element = document.querySelector(element);
          }
          
          if (!element) {
            reject(new Error('未找到目标元素'));
            return;
          }
          
          element.scrollIntoView({
            behavior: behavior,
            block: block,
            inline: inline
          });
          
          setTimeout(() => {
            const rect = element.getBoundingClientRect();
            resolve({ element, rect });
          }, duration);
          
        } catch (error) {
          reject(error);
        }
      });
    },
    
    scrollAndClick(scrollX, scrollY, clickX, clickY, options = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          const { scrollDuration = 500, clickDelay = 300 } = options;
          
          // 先滚动到指定位置
          await this.scrollToPosition({ x: scrollX, y: scrollY, duration: scrollDuration });
          
          // 等待滚动稳定
          await new Promise(resolve => setTimeout(resolve, clickDelay));
          
          // 执行点击（引入interactor模块）
          if (window.domToolkitInteractor) {
            const clickResult = await window.domToolkitInteractor.clickAt(clickX, clickY, options);
            
            resolve({
              scrollPosition: { x: scrollX, y: scrollY },
              clickPosition: { x: clickX, y: clickY },
              clickResult: clickResult
            });
          } else {
            reject(new Error('interactor模块未加载'));
          }
          
        } catch (error) {
          reject(error);
        }
      });
    },
    
    batchOperate(operations, options = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          const { scrollDelay = 500, operationDelay = 300 } = options;
          const results = [];
          
          for (let i = 0; i < operations.length; i++) {
            const operation = operations[i];
            
            // 如果有滚动操作
            if (operation.scroll) {
              await this.scroll(operation.scroll.direction, operation.scroll.distance, { 
                duration: scrollDelay,
                ...operation.scroll.options 
              });
              await new Promise(resolve => setTimeout(resolve, operationDelay));
            } else if (operation.scrollTo) {
              await this.scrollToPosition({ 
                ...operation.scrollTo, 
                duration: scrollDelay 
              });
              await new Promise(resolve => setTimeout(resolve, operationDelay));
            }
            
            // 执行具体操作
            if (window.domToolkitInteractor) {
              if (operation.click) {
                const result = await window.domToolkitInteractor.clickAt(
                  operation.click.x, 
                  operation.click.y, 
                  operation.click.options
                );
                results.push({ type: 'click', result });
              } else if (operation.type) {
                const result = await window.domToolkitInteractor.type(
                  operation.type.x, 
                  operation.type.y, 
                  operation.type.text, 
                  operation.type.options
                );
                results.push({ type: 'type', result });
              } else if (operation.doubleClick) {
                const result = await window.domToolkitInteractor.doubleClick(
                  operation.doubleClick.x, 
                  operation.doubleClick.y, 
                  operation.doubleClick.options
                );
                results.push({ type: 'doubleClick', result });
              }
            }
            
            // 操作间延迟
            if (i < operations.length - 1) {
              await new Promise(resolve => setTimeout(resolve, operationDelay));
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
    module.exports = scroller;
  } else {
    window.domToolkitScroller = scroller;
  }
})();