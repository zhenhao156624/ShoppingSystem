#!/usr/bin/env bash

echo "🧪 ShoppingSystem 测试运行脚本"
echo "================================="

echo ""
echo "📊 运行后端测试..."
cd backend && bun test

echo ""
echo "🎨 运行前端测试..."
cd ../frontend && bun test

echo ""
echo "✅ 测试运行完成！"