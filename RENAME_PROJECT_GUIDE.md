# 项目重命名指南

## 当前状态

- 项目文件夹名称：`my-lottie-demo` (需要更改)
- package.json 名称：`nadar-design-website` ✅ (已正确)

## 重命名步骤

### 1. 重命名项目文件夹

在终端中执行以下命令：

```bash
# 进入项目的父目录
cd /Users/nadarlau/Work/1\ Projects/

# 重命名文件夹
mv my-lottie-demo nadar-design-website

# 进入新的项目目录
cd nadar-design-website
```

### 2. 更新 Git 远程仓库（如果使用 Git）

如果你使用 Git 并且有远程仓库：

```bash
# 检查当前远程仓库
git remote -v

# 如果需要更新远程仓库名称，在 GitHub/GitLab 等平台上重命名仓库
# 然后更新本地远程 URL
git remote set-url origin https://github.com/yourusername/nadar-design-website.git
```

### 3. 更新 IDE/编辑器设置

- 在 VS Code 中重新打开项目文件夹
- 更新任何工作区设置中的路径引用

### 4. 验证更改

重命名后，确保以下内容正确：

- [ ] 文件夹名称：`nadar-design-website`
- [ ] package.json name：`nadar-design-website` ✅
- [ ] 项目可以正常运行：`npm run dev`
- [ ] 构建正常：`npm run build`

## 快速重命名脚本

如果你想要一键完成重命名，可以创建这个脚本：

```bash
#!/bin/bash
# rename_project.sh

# 获取当前目录名
CURRENT_DIR=$(basename "$PWD")
NEW_NAME="nadar-design-website"

if [ "$CURRENT_DIR" != "$NEW_NAME" ]; then
    echo "当前目录: $CURRENT_DIR"
    echo "重命名为: $NEW_NAME"

    # 进入父目录
    cd ..

    # 重命名文件夹
    mv "$CURRENT_DIR" "$NEW_NAME"

    # 进入新目录
    cd "$NEW_NAME"

    echo "✅ 项目已重命名为: $NEW_NAME"
    echo "📁 新路径: $(pwd)"
else
    echo "✅ 项目名称已经是正确的: $NEW_NAME"
fi
```

## 注意事项

1. **备份重要数据** - 重命名前确保所有重要文件已保存
2. **关闭相关应用** - 关闭正在使用该文件夹的应用程序
3. **更新书签** - 更新任何指向旧路径的书签或快捷方式
4. **团队协作** - 如果是团队项目，通知其他成员路径变更

## 验证命令

重命名完成后，运行这些命令验证：

```bash
# 检查项目名称
pwd
basename "$PWD"

# 检查 package.json
cat package.json | grep '"name"'

# 测试项目运行
npm run dev
```

完成这些步骤后，你的项目就会完全重命名为 "nadar-design-website" 了！
