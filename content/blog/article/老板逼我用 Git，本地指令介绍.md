---
title: 老板逼我用 Git，本地指令介绍
date: 2020-06-11
tag: 文章
cover: https://files.mdnice.com/pic/b025898b-84da-484b-b5ec-70fe1384add2.jpg
---

最近打算写个系列文章，GitHub 和 Git 工作流，主要包括 Git 简介、GitHub 简介和 Git 工作流，本篇文章包含以下内容：

[TOC]

## Git 简介

最近老板表示：画手呀，快到 618 了，你作为一个技术人员设计下产品文案吧

![](https://files.mdnice.com/pic/b025898b-84da-484b-b5ec-70fe1384add2.jpg)

迫于压力，不得不去写文案，但是作为一个技术人员出身，我敏感的意识到在修改文案的时候，可能会加一行文字，减一行文字，或者新增文件删除文件，如果我操作错了，想找回之前的内容怎么办？像下图一样拷贝多个文件副本固然是一种解决方式，但更好的就是使用 Git

![](https://files.mdnice.com/pic/894ed64f-cff5-45a9-bdab-9088e1e531a0.jpg)

Git 是目前世界上最先进的分布式版本控制系统，能够帮助我们做版本控制，很方便的查看每一步的文件变化，并且可以回退到任何一个版本，用于与他人之间协作

Git 指令分为**本地相关指令**和**远程相关指令**，本地指令用于在本地生成版本库，远程指令用于多台电脑之间的版本同步

> 注：很多同学都常常会分不清本地和远程，其实版本控制就和上图一样，Git 指令就相当于自动帮你在本地做了副本拷贝，远程操作其实目的是将你的文件发给其他人，用于团队协作，**所以如果没有团队协作的需求，只使用本地指令做本地的版本控制是完全可以的**

### Git 本地指令——基础

**老板**：画手同学，前几天让你修改的文案我看了，我觉得这几次修改之后，还是第一次的文案比较好，按照第一次的来吧。

**我**：第一次的我也没单独留存呀。。。

![](https://files.mdnice.com/pic/8a45a01e-5be2-41d1-9786-388b6110b1a6.jpg)

机智的我忽然想到，我不是使用了 Git 么，肯定是可以找回的，于是我找出了 Git 本地基础指令列表，看看能不能解决我的问题

```bash
$ git init // 初始化仓库
$ git status // 查看仓库的状态
$ git add [dir/file] // 向暂存区中添加文件
$ git commit // 保存仓库的历史记录
$ git log // 查看提交日志
$ git diff // 查看更改前后的差别
$ git reset [id] // 回溯历史版本
```

上述指令结合下面的图来看最直观

![](https://files.mdnice.com/pic/ca8b5627-0861-497b-b610-12c974b219eb.jpg)

上图中的工作区就是指的实际的文件目录，版本库则是`.git`目录中保存的信息，通常不会去打开这个目录。

比如下图中 testgit 目录就是工作区，其中会有一个隐藏的`.git`目录，这个就是真正的版本库

![](https://files.mdnice.com/pic/948ae737-05e7-48a1-ba29-34e0f8ab9642.png)

![](https://files.mdnice.com/pic/a5b909d4-e42c-450b-8f66-683fe662ba72.png)

`git init` 就是将版本库初始化出来，把当前目录变成一个 git 仓库，当前目录下就会多出一个`.git`目录，用于存放上图中的关系信息

`git status`可以始终观察图中的文件状态，以确定到底文件都在哪个位置

`git add [dir/file]` 用于将某个文件或者目录从工作区中添加映射到 index 区域（也叫做暂存区）

`git commit` 用于从 index 区域向真正的版本信息库 master 区域去提交，形成新的版本

`git log` 用于查看当前代码库的所有版本记录

`git diff`用于查看某些版本的区别，具体哪些版本可以在 diff 后加入对应的参数进行比较

`git reset [id]`用于做历史版本回退，回退的位置取决于 id

每次写完了都不满意，需要大幅度修改，但是老板又是一个反复无常的心性，改完之后又会觉得之前的版本好

其中我每次修改完内容之后，就会做一次提交，记录版本

```bash
$ git add .
$ git commit
```

每个节点就是一个版本，会对应不同版本的文件内容，是一条不断前进的单链表结构

![](https://imgkr.cn-bj.ufileos.com/cb5edb38-b9be-4532-8bc3-ecb3457c7a06.gif)

假如老板想要之前的版本了，我就回退回去

```
$ git reset [id]
```

![](https://imgkr.cn-bj.ufileos.com/b862bc9f-7e6c-44b8-a92b-a1eb43349fd2.gif)

![](https://files.mdnice.com/pic/6a81f64b-a781-4cce-855a-b83a8032c1c7.png)

### Git 本地指令——分支

老板：我觉得吧，1 个文案太少不够用，你还是写 2 个策划文案吧，到时候我挑一下

![](https://files.mdnice.com/pic/408db4db-e1b2-4823-88bf-0ca8ea19120f.png)

得到新的工作内容后，画手我灵机一动，翻出了 Git 本地分支指令，如下：

```bash
$ git branch [name] // 显示、创建分支一览表
$ git checkout [name] // 切换分支
$ git merge [name] // 合并分支
```

分支是用来同时做多个不同版本控制来使用的，老板觉得 1 个文案太少不够用，要我写 2 个策划文案（备胎），到时候他去选择一下，但是我又只想编辑一个文件怎么办？这个时候就可以分成 2 个分支来分别去写，不同的分支内容可以完全不同

首先我创建 2 个分支，分别是 article1 和 article2，这 2 个分支都是基于默认分支（master）来创建的，也就是说创建完成后内容和 master 文件内容是一致的

```bash
$ git branch article1
$ git branch article2
```

![](https://imgkr.cn-bj.ufileos.com/012393cf-0632-4d76-8b74-c42fc1ef523b.gif)

现在我开始编写 article1 的内容，编写完成后提交

```bash
$ git checkout article1 // 切换分支
$ git add .  // 表示当前目录所有文件加入暂存区
$ git commit
```

![](https://imgkr.cn-bj.ufileos.com/6223c342-1ced-4f40-91ef-8b026c5f1720.gif)

再编写 article2 的内容，编写完成后提交

```bash
$ git checkout article2 // 切换分支
$ git add .  // 表示当前目录所有文件加入暂存区
$ git commit
```

![](https://imgkr.cn-bj.ufileos.com/6310d926-6af1-44cc-936d-7c326b0f0d17.gif)

此时 2 个分支文件内容是不相同的，老板分别看过我的 2 个文案，觉得都很不错（想法真多），想融合一下，这个时候就需要合并分支，将 article1 合并到 article2 上来

```bash
$ git merge article1
```

![](https://imgkr.cn-bj.ufileos.com/ce405bd4-ee50-4374-9b5b-75c95bb575dd.gif)

