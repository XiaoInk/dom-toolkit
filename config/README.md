# 构建配置文件说明

本目录包含所有Vite构建配置文件：

## 配置文件

- `vite.config.js` - 主库构建配置
- `vite.inject.config.js` - 控制台注入版本构建
- `vite.modules.config.js` - 模块构建（已废弃）
- `vite.coordinate.config.js` - 坐标模块独立构建
- `vite.detector.config.js` - 检测模块独立构建  
- `vite.interactor.config.js` - 交互模块独立构建
- `vite.scroller.config.js` - 滚动模块独立构建

## 使用方法

```bash
# 从项目根目录执行
vite build --config config/vite.config.js
npm run build:coordinate  # 使用config/vite.coordinate.config.js
```