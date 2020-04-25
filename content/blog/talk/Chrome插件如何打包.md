---
title: Chrome插件如何打包
date: 2020-03-10
tag: 聊聊
cover: https://imgkr.cn-bj.ufileos.com/93db5cfc-998f-4981-842a-fb01b1f3a946.png
---

Chrome 浏览器有着丰富的插件系统，也有众多的开发者拥簇

但是在国内的环境下，由于科学上网的原因，众多使用者无法去访问 Chrome 网上应用商店，这对于插件的使用造成了极大的阻碍

## 1、场景

为方便使用者获取插件，需要将开发好的插件打包成 crx 格式，上传网盘，供用户下载使用

## 2、思考

打包的解决方案可能有哪几种？

1. 在本地直接打包（查看文档获取）
2. 将发布在 Chrome 应用店中的下载下来即可（查看应用商店）

## 3、解决方案

### 方案一：本地打包

有很多文档介绍该如何进行插件打包，操作步骤如下

访问`chrome://extensions`，打开开发者模式，点击打包扩展程序

![](https://imgkr.cn-bj.ufileos.com/0f4e4992-c514-4188-b170-7ff4299b7e42.png)

选择需要打包的文件夹，点击打包扩展程序即可

![](https://imgkr.cn-bj.ufileos.com/5fe2f2eb-1cac-4997-867c-15c1f40c6e9b.png)

打包成功后会得到 crx 文件，如果需要安装，将其拖入即可，如下图所示：

![](https://imgkr.cn-bj.ufileos.com/5594c08a-e90c-49c2-81cc-ac53ec2a9f8b.png)

但是非常遗憾的是，在目前的 Chrome 中，如果该应用没有发布应用商店,会得到以下提示：

![](https://imgkr.cn-bj.ufileos.com/47f06e37-b9a9-4e85-8e5c-ade8c7947c1c.png)

这也就意味着这个插件无法正常使用，这种方法宣告失败！**因此所有这样讲如何打包 Chrome 插件的文章都可以不用看了**

### 方案二：应用商店下载

既然提示没有在 Chrome 网上应用商店中，那么就将其上传到商店中是不是就可以了？

事实并非如此！

下图是插件上传成功的图片，并且已经完成发布，可以在商店中搜索到

![](https://imgkr.cn-bj.ufileos.com/53040a15-baa5-4373-a25e-da078e1a55b9.png)

当点击添加插件的时候，会发现插件直接进行下载并且完成安装，不会在本地留下痕迹，因此无法顺利拿到 crx 文件

![](https://imgkr.cn-bj.ufileos.com/c0b402c0-7bc3-4691-851d-e6258cab70eb.png)

### 方案三：第三方网站

通过 `https://chrome-extension-downloader.com/` 这个网站，输入 Chrome 插件地址，即可将其下载到本地

![](https://imgkr.cn-bj.ufileos.com/f6fa2429-832a-4e11-8d23-0892d792151f.png)

满心欢喜的将其拖入后，发现依然不行，会有以下报错：

![](https://imgkr.cn-bj.ufileos.com/d9377f49-5a47-4a96-9616-1ed4f4f7b028.png)

这是由于在最新版 Chrome 73 版本上， Chrome 插件将签名从 crx2 更新到 crx3 导致的

针对该情况，无论是解压缩还是修改签名等操作，均是无用的，所以该方案也不可行

### 方案四：可用方案

> https://clients2.google.com/service/update2/crx?response=redirect&prodversion=[PRODVERSION]&acceptformat=crx2,crx3&x=id%3D[EXTENSIONID]%26uc

使用上方地址，将[PRODVERSION]换成浏览器版本，比如：

![](https://imgkr.cn-bj.ufileos.com/840f7ac8-2225-4fbd-b60a-20a990497d0a.png)

将[EXTENSIONID]换成插件 id，比如：

![](https://imgkr.cn-bj.ufileos.com/cf430dc1-1d0a-4d39-8640-86308e7355f6.png)

此时得到的插件就是可用的插件了，并且与Chrome 商店中的一致，当用户下载并安装后，访问Chrome商店时可以看到其安装状态

![](https://imgkr.cn-bj.ufileos.com/16ebd63c-dff9-4048-8882-ae71b749f1fc.png)

### 尾巴

虽然只有第四个方案是可用的，但是整个的探索过程还是很值得记录的，有很多文章介绍的都是老版本的情况，列举出不可用的方案也是希望开发者能够少走弯路。

<span style="display:block;text-align:center;">觉得文章直击灵魂，欢迎点击<strong>在看</strong>和<strong>转发</strong></span>

![](https://imgkr.cn-bj.ufileos.com/c3690018-4a92-4766-ac7e-ac54dd54c093.jpg)

