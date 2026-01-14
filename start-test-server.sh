#!/bin/bash

# DOM Toolkit 测试服务器启动脚本

echo "🚀 启动 DOM Toolkit 测试服务器..."
echo "📁 项目根目录: $(pwd)"
echo "🌐 测试服务器地址: http://localhost:8080"
echo ""
echo "📋 可用的测试页面:"
echo "  • http://localhost:8080/tests/full-test.html  - 完整功能验证"
echo "  • http://localhost:8080/tests/quick-test.html - 快速测试"
echo "  • http://localhost:8080/examples/cdn-demo.html - CDN使用示例"
echo ""
echo "🔧 开发命令:"
echo "  • npm run dev      - 开发模式（监听文件变化）"
echo "  • npm run build    - 构建主库"
echo "  • npm run build:all - 构建所有版本"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

# 启动HTTP服务器
python3 -m http.server 8080