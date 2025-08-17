#!/bin/bash

# Nadar Design Website - 项目重命名脚本
# 使用方法: chmod +x rename_project.sh && ./rename_project.sh

echo "🎨 Nadar Design Website - 项目重命名工具"
echo "=========================================="

# 获取当前目录信息
CURRENT_DIR=$(basename "$PWD")
PARENT_DIR=$(dirname "$PWD")
NEW_NAME="nadar-design-website"

echo "📁 当前目录: $CURRENT_DIR"
echo "📍 完整路径: $PWD"
echo "🎯 目标名称: $NEW_NAME"
echo ""

# 检查是否需要重命名
if [ "$CURRENT_DIR" = "$NEW_NAME" ]; then
    echo "✅ 项目名称已经正确！无需重命名。"
    exit 0
fi

# 确认重命名
echo "❓ 确定要将项目文件夹重命名吗？(y/N)"
read -r response

if [[ ! "$response" =~ ^[Yy]$ ]]; then
    echo "❌ 重命名已取消"
    exit 0
fi

echo ""
echo "🔄 开始重命名..."

# 检查目标目录是否已存在
if [ -d "$PARENT_DIR/$NEW_NAME" ]; then
    echo "❌ 错误: 目标目录 '$NEW_NAME' 已存在"
    echo "请先处理现有目录或选择其他名称"
    exit 1
fi

# 执行重命名
cd "$PARENT_DIR" || exit 1

if mv "$CURRENT_DIR" "$NEW_NAME"; then
    echo "✅ 文件夹重命名成功！"
    
    # 进入新目录
    cd "$NEW_NAME" || exit 1
    
    echo "📁 新路径: $(pwd)"
    
    # 验证 package.json
    if [ -f "package.json" ]; then
        PACKAGE_NAME=$(grep '"name"' package.json | sed 's/.*"name": *"\([^"]*\)".*/\1/')
        echo "📦 package.json 名称: $PACKAGE_NAME"
        
        if [ "$PACKAGE_NAME" = "nadar-design-website" ]; then
            echo "✅ package.json 名称正确"
        else
            echo "⚠️  package.json 名称需要手动更新"
        fi
    fi
    
    # 检查是否是 Git 仓库
    if [ -d ".git" ]; then
        echo ""
        echo "📝 Git 仓库检测到"
        echo "💡 提示: 如果你有远程仓库，记得更新远程 URL："
        echo "   git remote set-url origin https://github.com/yourusername/nadar-design-website.git"
    fi
    
    echo ""
    echo "🎉 项目重命名完成！"
    echo "💻 现在可以运行: npm run dev"
    
else
    echo "❌ 重命名失败"
    exit 1
fi