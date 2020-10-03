---
title: 本地 IDE 已废！编辑器大结局！GitHub 的云 VSCode 实测
date: 2020-09-11
tag: 文章
cover: https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599738419708-image.png
---

之前写过一篇文章[GitHub 里面可以直接用 VS Code 了，真香！](https://mp.weixin.qq.com/s/GGiwnvi3YrSCnTi_zkHhcw)当时该功能还处于申请 Beta 权限阶段，有朋友申请成功了，大鹏就赶紧去体验了一下，体验之后的感受就是：

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599738419708-image.png)

## 1、创建环境

首先进入 GitHub 找到任意一个项目，有 Beta 权限的用户点击 code 之后会发现多出来一个【**Open with Codespaces**】选项，Codespaces 就是 GitHub 云端 VSCode 的产品名称

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599738464139-0在线编辑.png)

点击后要进行下一步的选择，如果你之前建立过该项目的编辑环境，则可以进行恢复，或者也可以选择【**New codespace**】创建新环境，Beta 阶段最多只允许创建 2 个

![环境选择](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599738629963-0.1会保存之前的编辑环境.png)

选择环境之后，就会开始进行初始化

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599738968454-1初始化.png)

初始化完成后就可以看到完整的开发环境了，整体布局和 VSCode 几乎一模一样，VSCode 可以使用的插件在这里都能找到

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599738983549-2vscode出现.png)

## 2、开发服务器概况

打开开发环境之后，相信大家和我一样，会产生很多疑问，**这会不会只是个编辑器？编辑好了之后代码又不能运行？搞这个意义大么？**

在这里我要告诉大家：

![不好意思，口型没对好](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599739493538-e5414e61a9203ac368db54ea526ff2cb.gif)

### 基本信息

- 硬盘空间：180GB

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599739621610-12硬盘空间.png)

- CPU：2 核

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599739639023-13cpu信息.png)

- 内存：4GB

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599739651906-14内存信息.png)

- 操作系统：Ubuntu

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599739670998-15操作系统信息.png)

可以看到，整个开发服务器的配置还是很给力的，开发一些小项目，是非常够用的

### 开发环境

开发服务器配置倒是还可以，但是开发环境什么的还要自己安装好麻烦

在这里我要告诉大家：

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599740547023-开发环境安装好了.gif)

常用的 node、python、java、go 这些语言全都有！

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599740640537-5开发环境很全.png)

gcc、mvn、gradle 这些也都不在话下，都不用自己安装直接用就行！

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599740678862-5.1开发环境很全.png)

## 3、开发示例

说了这么多，就看环境各种好了，真的能做开发么，在这里给大家一个完整的示例。

首先打开一个前端项目，直接执行`yarn`指令安装开发包

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599740851948-4直接带yarn.png)

安装完成后执行`yarn start`指令启动项目，下图中可以看到启动成功了

![启动成功](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599740881706-7启动成功.png)

这时候遇到了一个问题，启动成功了这个启动地址是本地的`http://localhost:3000`，这也没法访问呀。不慌，点击本地地址访问，这个时候就能看到真的有页面！

![](https://imgkr2.cn-bj.ufileos.com/f96fbb76-087b-4380-9736-f0dab1f2a3fa.gif?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=4nBP%252BNTzlO%252FhgPu30kLXZ8HShw8%253D&Expires=1599827423)

访问`http://localhost:3000`之后会自动跳转到 GitHub 提供的页面网址

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599741071258-10访问后自动跳转.png)

除此之外，在左侧开发代码的时候，右侧也会自动更新变化，和本地开发的体验完全一致！

## 4、其他功能

除了和本地开发体验一致的之外，还可以看到更多的优势

- 不需要自己配置 SSH 了，GitHub 直接帮你配置好了

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599741207671-11自动配置好了github的git配置.png)

- 本地 VSCode 编辑器的菜单栏进行了移动，更好的优化显示空间

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599741303004-6上方的菜单移动到了这里.png)

- Pull Request 和 Issue 的查看非常方便，结合 GitHub Action 简直爽歪歪

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599741333467-8可以和pr还有issue关联.png)

- 还有一个 Live Share 功能，使用这个可以一起看代码编程

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599741372055-9live%20share.png)

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-10/1599741518038-结对编程.jpg)

## 5、小结

【本地 IDE 已废！编辑器大结局！】这句话并非完全的标题党，GitHub 处于 Beta 阶段的云编辑器有相当多的优点！

- 用完即走，有网络可以随时随地开发，不消耗本地资源
- 开发环境一应俱全，注册个账号就能直接在线写代码
- 结合 GitHub Actions 自动集成部署无痛点
- 结合 Issue、Projects、Wiki 和私有仓库等功能，对于小团队开发吸引力极强

VSCode 在本地开发编辑器中已经占据了半壁江山，如今 GitHub 的 Codespaces 则更上一层楼，期待该功能早日公测，给开发者更多选择和优质的体验

**<center>欢迎关注加入4000人算法刷题群</center>**
**<center>公众号中更多开源信息等着你</center>**

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-11/1599805100027-image.png)
