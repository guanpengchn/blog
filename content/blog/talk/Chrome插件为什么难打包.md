---
title: 画聊前端CSP——内容安全策略
date: 2020-03-09
tag: 画聊
cover: https://imgkr.cn-bj.ufileos.com/39ebc3e0-af8d-4e6e-a796-b9750fc0add0.png
---

Chrome 浏览器有着丰富的插件系统，也有众多的开发者拥簇

但是在国内的环境下，由于科学上网的原因，众多使用者无法去访问 Chrome 网上应用商店，这对于插件的使用造成了极大的阻碍

## 1、案例

为方便使用者获取插件，需要将开发好的插件打包成 crx 格式，上传网盘，供用户下载使用

## 2、思考

打包的解决方案可能有哪几种？

1. 在本地直接打包（查看文档获取）
2. 将发布在 Chrome 应用店中的下载下来即可（查看应用商店）

## 3、查看

1、在本地打包

```html
<img
  src="https://imgkr.cn-bj.ufileos.com/43d5f3b4-e0c0-41ce-8b4f-409872b614c1.png"
/>
```

还是这么的可爱

<img src="https://imgkr.cn-bj.ufileos.com/43d5f3b4-e0c0-41ce-8b4f-409872b614c1.png" />

2、查看控制台日志，发现报错

> Refused to load the image 'https://imgkr.cn-bj.ufileos.com/43d5f3b4-e0c0-41ce-8b4f-409872b614c1.png' because it violates the following **Content Security Policy directive: "img-src 'self' data:**".

仔细阅读后提取关键字，翻译报错

> 内容安全策略指令`"img-src 'self' data`拒绝读取这张可爱的图片

发现不懂含义，进行搜索，查找相关知识点

## 4、学习技术

### 什么是 CSP

CSP 的实质就是白名单策略，预先设定好哪些资源能被加载执行而哪些不能，为了防止跨域脚本攻击而制定。

![](https://imgkr.cn-bj.ufileos.com/39ebc3e0-af8d-4e6e-a796-b9750fc0add0.png)

### 怎么用 CSP

两种方法可以启用 CSP。一种是通过 HTTP 头信息的 Content-Security-Policy 的字段。

![](https://imgkr.cn-bj.ufileos.com/8d8b8854-be54-4e73-b1c4-8f957aa6fb62.png)

另一种是通过网页的<meta>标签。

```html
<meta
  http-equiv="Content-Security-Policy"
  content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:"
/>
```

以下面这段代码为例，讲一下具体含义

> Content-Security-Policy: script-src 'self'; font-src 'none'; style-src test.com; img-src \* data:

| 策略                | 含义                               |
| ------------------- | ---------------------------------- |
| script-src 'self';  | js 文件只有当前域可加载            |
| font-src 'none';    | 字体文件不可加载                   |
| style-src test.com; | css 文件 test.com 域可加载         |
| img-src \* data     | 图片文件任何域和 base64 编码可加载 |

如果策略启用后，加载了不对应的资源就会出现报错

比如 html 中使用了如下 link 标签

```html
<link href="test2.com/test2.css" rel="stylesheet" type="text/css" />
```

因为不符合`style-src test.com;`策略，无法加载该 css 文件并会报错。

### 指令的资源和范围

- 资源

| 资源        | 说明                        |
| ----------- | --------------------------- |
| default-src | 全部资源                    |
| script-src  | js 文件                     |
| style-src   | css 文件                    |
| img-src     | 图片文件                    |
| font-src    | 字体文件                    |
| connect-src | 请求连接文件                |
| media-src   | 媒体文件，video、audio 标签 |
| frame-src   | iframe 标签                 |

- 范围

| 范围     | 说明                |
| -------- | ------------------- |
| \*       | 全部允许加载        |
| 'none'   | 无法加载            |
| 'self'   | 当前域名可加载      |
| data     | base64 编码过的图片 |
| test.com | 特定域名可加载      |
| https:   | https 的域名可加载  |

## 5、解决问题

### 得出结论

回顾错误：**Content Security Policy directive: "img-src 'self' data:"**

这说明在代码中存在`img-src 'self' data`图片策略，导致该报错出现，这条策略的含义比对表格可知：**图片文件只允许当前域（http://localhost:3000）和base64加载**，而图片所属的域是**https://imgkr.cn-bj.ufileos.com/**，故而有次报错。

### 解决方案

将 CSP 有关图片的部分配置为：

```
img-src * data
或者
img-src https://imgkr.cn-bj.ufileos.com/ 'self' data
```

可爱的头像出来了！

![](https://imgkr.cn-bj.ufileos.com/822a9e78-a36d-401b-bb10-04c1d8a07802.png)

## 尾巴

解决问题的核心步骤是：**思考->查看->学习技术->解决问题**

解决问题过程中，通常会引出更多问题，结合更多问题去学习知识才能让这次报错不虚此行。
