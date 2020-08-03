---
title: 画聊前端CSP——内容安全策略
date: 2020-03-09
tag: 聊聊
cover: https://files.mdnice.com/pic/739deb2e-86e5-421a-9666-c98daeae1682.jpg
---

最近将结合开发中的实际问题写一系列文章，讲讲如何按步骤去解决编程问题

## 1、案例

在开发浏览器插件过程中，我的画（图片）显示不出来了

![](https://files.mdnice.com/pic/c3066d5c-8737-4676-81a4-e8b68e17f53c.jpg)

## 2、思考

显示不出来的原因可能有哪些？

1. 图片链接错误（查看代码获取）
2. 其他未知报错（查看日志获取）

## 3、查看

1、查看代码，并访问图片链接，发现没有问题

```html
<img src="https://files.mdnice.com/pic/b90b1454-ac1d-4dba-b625-a7accc2bbd70.jpg" />
```

还是这么的可爱

<img src="https://files.mdnice.com/pic/b90b1454-ac1d-4dba-b625-a7accc2bbd70.jpg" />

2、查看控制台日志，发现报错

> Refused to load the image 'https://files.mdnice.com/pic/b90b1454-ac1d-4dba-b625-a7accc2bbd70.jpg' because it violates the following **Content Security Policy directive: "img-src 'self' data:**".

仔细阅读后提取关键字，翻译报错

> 内容安全策略指令`"img-src 'self' data`拒绝读取这张可爱的图片

发现不懂含义，进行搜索，查找相关知识点

## 4、学习技术

### 什么是 CSP

CSP 的实质就是白名单策略，预先设定好哪些资源能被加载执行而哪些不能，为了防止跨域脚本攻击而制定。

![](https://files.mdnice.com/pic/739deb2e-86e5-421a-9666-c98daeae1682.jpg)

### 怎么用 CSP

两种方法可以启用 CSP。一种是通过 HTTP 头信息的 Content-Security-Policy 的字段。

![](https://files.mdnice.com/pic/712a52b4-7793-4e88-9db1-22691cfe102e.jpg)

另一种是通过网页的<meta>标签。

```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">
```

以下面这段代码为例，讲一下具体含义

> Content-Security-Policy: script-src 'self'; font-src 'none'; style-src test.com; img-src * data:

|策略|含义|
|---|---|
|script-src 'self';|js文件只有当前域可加载|
|font-src 'none';|字体文件不可加载|
|style-src test.com;|css文件test.com域可加载|
|img-src * data|图片文件任何域和base64编码可加载|

如果策略启用后，加载了不对应的资源就会出现报错

比如html中使用了如下link标签

```html
<link href="test2.com/test2.css" rel="stylesheet" type="text/css"/>
```

因为不符合`style-src test.com;`策略，无法加载该css文件并会报错。

### 指令的资源和范围

- 资源

|资源|说明|
|---|---|
|default-src|全部资源|
|script-src|js文件|
|style-src|css文件|
|img-src|图片文件|
|font-src|字体文件|
|connect-src|请求连接文件|
|media-src|媒体文件，video、audio标签|
|frame-src|iframe标签|

- 范围

|范围|说明|
|---|---|
|\*|全部允许加载|
|'none'|无法加载|
|'self'|当前域名可加载|
|data|base64编码过的图片|
|test.com|特定域名可加载|
|https:|https的域名可加载|


## 5、解决问题

### 得出结论

回顾错误：**Content Security Policy directive: "img-src 'self' data:"**

这说明在代码中存在`img-src 'self' data`图片策略，导致该报错出现，这条策略的含义比对表格可知：**图片文件只允许当前域（http://localhost:3000）和base64加载**，而图片所属的域是**https://imgkr.cn-bj.ufileos.com/**，故而有次报错。

### 解决方案

将CSP有关图片的部分配置为：

```
img-src * data
或者
img-src https://imgkr.cn-bj.ufileos.com/ 'self' data
```

可爱的头像出来了！

![](https://files.mdnice.com/pic/6f9a24df-bd7e-451e-a9c7-5be542492908.jpg)

## 尾巴

解决问题的核心步骤是：**思考->查看->学习技术->解决问题**

解决问题过程中，通常会引出更多问题，结合更多问题去学习知识才能让这次报错不虚此行。

<span style="display:block;text-align:center;">觉得文章直击灵魂，欢迎点击<strong>在看</strong>和<strong>转发</strong></span>

![](https://files.mdnice.com/pic/ac7f25b4-eae2-4ffc-9317-04d60f3dbdde.jpg)