### Git
- 安装：https://git-scm.com/
- 配置：
    `git config user.name "你的姓名"`
    `git config user.email "你的邮箱"`
- 通过`--global` 选项可以设置全局配置信息:
    `git config --global user.name "你的姓名"`
    `git config --global user.email "你的邮箱"`
- 检查配置：
    // 打印所有config
    git config --list
    // 打印指定config
    git config user.name
- git的三中常用状态
    - 已修改（modified）
    - 已暂存（staged）
    - 已提交（committed）
    - 未追踪（Untracked）特殊状态
- git 提供了三个不同的工作区，用来存放不同的内容
    - 1.工作目录
    - 2.暂存区域
    - 3.Git 仓库
    - `git status`查看工作区文件的状态
****
### 创建仓库 - repository
- 进入希望纳入 git 版本控制的项目目录，使用 `git init` 初始化
```bash
git init
#该命令将创建一个名为 `.git` 的子目录，这个子目录含有你初始化的 Git 仓库中所有的必须文件，这个目录也是上面我们说的三个区域之一，这个目录也是 Git 保存数据记录的地方，非常重要，如非必要，不要轻易改动
```
- 乱码解决
```js
菜单 -> 设置 -> 文本 -> 本地 / 编码
或修改配置文件
[gui]  
    encoding = utf-8  
    // 代码库统一使用utf-8  
[i18n]  
    commitencoding = utf-8  
    // log编码
[svn]  
    pathnameencoding = utf-8  
    // 支持中文路径
[core]
    quotepath = false 
    // status引用路径不再是八进制（反过来说就是允许显示中文了）
```
****
### 添加工作区文件到暂存区`git add`
```bash
git add 1.txt
# 添加多个文件
git add 2.txt 3.txt
# 添加整个目录
git add ./a
# 添加多个目录
git add ./b ./c
# 添加所有文件
git add .
```
****
### 创建版本`git commit`
- 将暂存区里的改动给提交到本地 git 仓库，也就是为这次工作（一般会把某个具有特定意义的工作作为一个版本，它可以是多个文件的变化） 每次提交同时会生成一个 40 位的哈希值，作为该次提交版本的唯一 id
****
### 提交备注 -每次提交都需要填写备注信息
```bash
git commit
# 会调用默认（或自定义）的文本编辑器
git commit -m #单行备注
```
****
### 修改默认编辑器
```bash
git config core.editor notepad
# 添加 vscode 编辑器 - mac
# 通过 vim 打开环境变量配置文件
vim ~/.bash_profile
# 添加环境变量
export PATH=/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin:$PATH
# 保存退出
source ~/.bash_profile
# 测试：在终端中直接通过命令 code 调用 vscode
git config --global core.editor "code --wait"
```
****
### 查看提交日志`git log`
```bash
# 完整格式
git log
# 简要格式（单行）
git log --oneline
```
****
### 修复提交
- `git commit --amend`修复（替换上一次）提交，在不增加一个新的提交版本的情况下将新修改的代码追加到前一次的提交中
```bash
git commit --amend -m 提交
```
****
### 删除`git rm`
```bash
# 从 git 仓库与工作区中删除指定文件
git rm 文件
# 只删除 git 仓库中的文件
git rm --cached 文件
# rm 以后，需要 commit 这次操作，否则 rm 将保留在暂存区
git commit -m 修正
```
****
### 撤销重置`git reset`
- 从暂存区中撤销到工作区
```bash
# 从暂存区中撤销一个指定文件
git reset HEAD 文件名称
# 从暂存区中国年撤销所有文件
git reset HEAD .
```
- 该命令既可以用于回退版本
```bash
# 回退到指定的 commitID 版本
git reset --hard commitID
```
****
### 比较
```bash
# 比较 工作区和暂存区
git diff 文件 
# 比较 暂存区和仓库
git diff --cached [commitId] 文件
# 比较 工作区和仓库
git diff commitId filename
# 比较 仓库不同版本
git diff commitId1 commitId2
```
****
### 分支 默认是在主线（master）上进行开发的
- 查看分支
```bash
git branch
```
- 创建分支
```bash
git branch 分支名称
```
- 切换分支
```bash
git checkout 分支名称
# 也可以使用 checkout -b 来新建分支
git checkout -b 分支名称
```
- 分支合并
```bash
# B 合并到 A，需要切换到 A 分支
git merge 被合并分支
# 查看已经合并的分支
git branch --merged
# 查看未合并的分支
git branch --no-merged
```
- 删除分支
```bash
# 如果分支为未合并状态，则不允许删除
git branch -d 分支名称
# 强制删除
git branch -D 分支名称
```
- 合并记录`rebase`
```bash
# 合并 HEAD 前两个祖先记录
git rebase -i HEAD~2
```
****
### rebase 操作
```bash
# p, pick = use commit => 使用
# r, reword = use commit, but edit the commit message => 使用，但重新编辑说明
# e, edit = use commit, but stop for amending => 使用
# s, squash = use commit, but meld into previous commit => 使用，但合并上一次
# f, fixup = like "squash", but discard this commit's log message => 就像 squash 那样，但会抛弃这个 Commit 的 Commit message
# x, exec = run command (the rest of the line) using shell => 执行脚本
# d, drop = remove commit => 移除
```
```bash
git rebase -i HEAD~3
# 弹出编辑器，根据需要的进行修改，然后保存
# 如果为 r，s 则会再次弹出编辑器，修改新的 commit message，修改之后保存
```
>   如果出现一些问题，可以通过 `git rebase --edit-todo` 和 `git rebase --continue` 进行重新编辑保存
****
### 标签tag有的时候，我们希望给某一个特定的历史提交打上一些标签
```bash
git tag -a v1.0.0 HEAD/commitId #新建标签
git tag #查看标签
```
****
### github
-  SSH
   -  https://help.github.com/cn/articles/connecting-to-github-with-ssh
    - https://help.github.com/cn/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
-  生成 SSH 秘钥
```bash
ssh-keygen -t rsa -C "zmouse@miaov.com"
```
- 使用 `ssh-add` 代理，如果没有启动，可以手动启动
```bash
eval $(ssh-agent -s)
```
- 添加 私钥
```bash
ssh-add 私钥路径
```
- 添加公钥 个人中心 -> 设置 -> ssh -> 添加
- 测试连接
```bash
ssh -T git@github.com
```
- 连接远程
```bash
git remote add origin git@github.com:miaov-zmouse/kkb-test.git
```
- 同步本地仓库到远程
```bash
git push -u origin master
# -u 简化后续操作
git push origin master
```
- 远程分支
```bash
# 提交到远程（分支）
git push origin [本地分支名称]:[远程分支名称]
# 远程先创建好分支然后拉取到本地
git checkout -b [本地分支名称] origin/[远程分支名称]
# 拉取远程分支到本地
git pull origin [远程分支名称]:[本地分支名称]
# 查看远程仓库
git remote show origin
# 查看本地分支
git branch
# 查看远程分支
git branch -r
# 查看所有分支
git branch -a
# 删除本地分支
git branch -d [本地分支名称]
# 删除远程分支
git push origin --delete [远程分支名称]
# 或者
git push origin :[远程分支名称]
# 设置默认提交分支
git branch --set-upstream-to=origin/[远程分支名称] [本地分支名称]
```
### GUI 工具
https://git-scm.com/download/gui/win