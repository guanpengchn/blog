---
title: Chrome插件如何打包
date: 2020-03-10
tag: 聊聊
cover: https://files.mdnice.com/pic/41ead526-d32b-4518-b57a-b91491d060ff.png
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

![](https://files.mdnice.com/pic/f0ca58e7-15d2-4ce7-a5d4-2dae7d353bbc.jpg)

选择需要打包的文件夹，点击打包扩展程序即可

![](https://files.mdnice.com/pic/6cfa3862-d156-4e0a-8e71-1a37bb7f7e08.jpg)

打包成功后会得到 crx 文件，如果需要安装，将其拖入即可，如下图所示：

![](https://files.mdnice.com/pic/6ebdf63d-b6f1-41a3-958c-1cadbb50e4f4.jpg)

但是非常遗憾的是，在目前的 Chrome 中，如果该应用没有发布应用商店,会得到以下提示：

![](https://files.mdnice.com/pic/61782ef1-e49e-4c66-8d01-d6f98af6c12b.jpg)

这也就意味着这个插件无法正常使用，这种方法宣告失败！**因此所有这样讲如何打包 Chrome 插件的文章都可以不用看了**

### 方案二：应用商店下载

既然提示没有在 Chrome 网上应用商店中，那么就将其上传到商店中是不是就可以了？

事实并非如此！

下图是插件上传成功的图片，并且已经完成发布，可以在商店中搜索到

![](https://files.mdnice.com/pic/ded9a601-8cde-41cb-8e06-e67b1d986329.jpg)

当点击添加插件的时候，会发现插件直接进行下载并且完成安装，不会在本地留下痕迹，因此无法顺利拿到 crx 文件

![](https://files.mdnice.com/pic/a1837d8b-01c9-4ab1-a6f0-4328d960dc6d.jpg)

### 方案三：第三方网站

通过 `https://chrome-extension-downloader.com/` 这个网站，输入 Chrome 插件地址，即可将其下载到本地

![](https://files.mdnice.com/pic/fe7f00eb-7532-4e38-bbf0-11a81e4eae68.jpg)

满心欢喜的将其拖入后，发现依然不行，会有以下报错：

![](https://files.mdnice.com/pic/a8ee2097-f008-40e9-9044-41895cc428fc.jpg)

这是由于在最新版 Chrome 73 版本上， Chrome 插件将签名从 crx2 更新到 crx3 导致的

针对该情况，无论是解压缩还是修改签名等操作，均是无用的，所以该方案也不可行

### 方案四：可用方案

> https://clients2.google.com/service/update2/crx?response=redirect&prodversion=[PRODVERSION]&acceptformat=crx2,crx3&x=id%3D[EXTENSIONID]%26uc

使用上方地址，将[PRODVERSION]换成浏览器版本，比如：

![](https://files.mdnice.com/pic/2ca12b91-3147-4ed5-bb74-14756cf26fe7.jpg)

将[EXTENSIONID]换成插件 id，比如：

![](https://files.mdnice.com/pic/5dbbf159-c546-4381-951a-44f97e7fc932.jpg)

此时得到的插件就是可用的插件了，并且与Chrome 商店中的一致，当用户下载并安装后，访问Chrome商店时可以看到其安装状态

![](https://files.mdnice.com/pic/5b2c548a-0eef-4575-b48b-c3479ec8dfc2.jpg)

### 尾巴

虽然只有第四个方案是可用的，但是整个的探索过程还是很值得记录的，有很多文章介绍的都是老版本的情况，列举出不可用的方案也是希望开发者能够少走弯路。

<span style="display:block;text-align:center;">觉得文章直击灵魂，欢迎点击<strong>在看</strong>和<strong>转发</strong></span>

![](https://files.mdnice.com/pic/456ba2f0-6ba4-472b-af8a-606d9bce280a.jpg)

