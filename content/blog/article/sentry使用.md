---
title: 面试官：前端代码线上出错如何解决？使用sentry
date: 2020-04-25
tag: 文章
cover: https://imgkr.cn-bj.ufileos.com/41fc5b8e-5011-4878-af39-1e41c617a656.png
---

## 简介

新时代的前端系统上线之后，通常会遇到以下几个问题

- 前端报错，用户使用功能异常，没有通知开发人员的渠道
- 了解到报错后，因为前端做代码混淆和压缩，删除 source map，没有办法准确定位错误位置
- 不清楚用户的操作系统、浏览器、请求内容和存储等信息，无法进行问题复现

上述问题目前有统一的解决方案，就是使用 web bug 埋点追踪系统，目前开源免费好用的系统，就是今天要介绍的 sentry

## sentry 的特性

在使用上，sentry 既可以直接在其网站`https://sentry.io/`中查看 bug 追踪信息，也支持企业进行内部搭建

在功能上，sentry 支持

- 发送错误通知
- 给出客户端相关信息，包括浏览器版本、操作系统和请求内容等
- 代码版本（release 版本号）
- 上传代码源文件（source map）

## 如何使用 sentry

下面将以一个 React 项目为例，讲解如何使用 sentry

### 1、注册账号并创建项目

访问 sentry 的官网：`https://sentry.io/`

注册的时候会创建**组织**，注册完成后新建项目，选择 React 创建即可

![](https://files.mdnice.com/pic/656e7a55-a4d9-4afd-8adc-b7628cc59279.jpg)

创建后会有一个官方指导，该如何使用代码

![](https://files.mdnice.com/pic/b2449828-313f-4f59-a219-e40654af7c84.jpg)

按照步骤操作即可，其中要注意 dsn 的添加，这个是每个项目特有的，不要放错

其中默认界面是英文的，并且时区不是中国的时区，会有 8 个小时的时差，建议更改过来，更改位置在用户设置的具体项目设置中

![](https://imgkr.cn-bj.ufileos.com/fcc400c6-5c31-4f83-af52-26e31bcccb32.png =50%x)

![](https://imgkr.cn-bj.ufileos.com/efff163e-0b58-499c-bb00-998cd6dce519.png)

### 2、前端启动

首先安装 sentry 的浏览器包

```shell
$ yarn add @sentry/browser
```

然后初始化项目并且抛出一个错误

```js
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './App';

Sentry.init({dsn: "your dsn"});

ReactDOM.render(<App />, document.getElementById('root'));
```

然后在 App 中加入了一个 button，并且点击后会出现错误代码，导致程序报错

```js
<button
  onClick={() => {
    const a = {}

    // 此处同样会报错
    console.log(a.name.name)

    // 抛出错误
    new Error('抛出错误')
  }}
>
  throw error
</button>
```

此时启动该项目，然后点击 button，查看 console 就可以发现出现了报错

![](https://imgkr.cn-bj.ufileos.com/da3d6324-1bd2-4fbb-9977-b2529f0058cf.png =50%x)

![](https://imgkr.cn-bj.ufileos.com/6e7b286a-b2f0-4b65-9892-781ee65adbf4.png)

此时查看 chrome 的 network，就会发现 sentry 已经发了一个请求出去，通知我们的系统了

![](https://imgkr.cn-bj.ufileos.com/55a3ec28-6956-4157-87e0-a48572005496.png)

然后再去我们的系统查看，在问题导航处就会发现一个新的 issue

![](https://imgkr.cn-bj.ufileos.com/563d6b20-2ef3-43b6-9df3-3d1acf328f88.png)

打开后可以看到详细信息，其中会发现并不能准确的找到源代码的错误位置，只是会有整个错误的路径和出错人的操作系统，浏览器信息等

![](https://imgkr.cn-bj.ufileos.com/00ea7839-52c9-4ab8-837c-621926985c6b.png)

如果连续触发几次这个错误，会发现只要是同一个错误，错误条数并不会增加，只是在事件和用户数量上做增加

![](https://imgkr.cn-bj.ufileos.com/e3a78aa7-dd01-4b50-81b4-15f26c66ed8f.png)

### 3、设置发布项目的 release 版本号

上文提到目前为止并没有办法判断用户错误出现的具体的源代码位置，原因就是 source map 没有上传 sentry

而设置 release 版本号本质是为了后续的 source map 上传做准备，用来区分不同版本的 source map，好进行报错的代码映射

通过下述方式指定 release

```js
import * as Sentry from '@sentry/browser'

Sentry.init({
  release: 'test004',
  dsn: 'https://<key>@sentry.io/<project>'
})
```

其中`test004`就是 release 版本号，如果此时点击 button 触发异常，查看 sentry 就会看到版本的位置出现了内容，在没有指定 release 版本号的时候这里显示的是`n/a`

![](https://imgkr.cn-bj.ufileos.com/2906529f-0c32-4648-bc2d-e6609234bc9f.png)

### 3、source map 上传

只有在开发环境，我们才会使用 sourceMap，线上环境如果加载 sourceMap，不仅影响用户体验，而且也会暴露源代码。

下面讲一下上传 sourceMap 到 sentry 上的几种方式

#### sentry-cli 命令行上传

首先安装 sentry-cli

```shell
$ yarn global add sentry-cli
```

然后修改生成的`~/.sentryclirc`，必须将 org 和 project 补充上去

```shell
[auth]
token=<token>

[defaults]
url=https://sentry.io/
org=mdnice
project=test004
```

然后将应用进行打包，生成 build 目录，通过指令将目录中的.map 文件上传

```shell
$ sentry-cli releases files <release名称> upload-sourcemaps --url-prefix <线上资源URI> <打包出来的js文件所在目录>

$ sentry-cli releases files test004 upload-sourcemaps --url-prefix '~/static/js' './build/static/js'
```

成功后打开 sentry 控制台的版本即可看到上传的文件

![](https://imgkr.cn-bj.ufileos.com/e8d43c37-32fd-48c6-bd94-7ff3138e69ab.png)

此时再点击 button 触发异常，可以发现已经能够映射到具体的代码行位置了，这就是由于上传 source map 的原因

![](https://imgkr.cn-bj.ufileos.com/cce207ba-8c32-4713-bd0c-d2cc2718b486.png)

#### 通过 webpack 插件（@sentry/webpack-plugin）上传

命令行的方式不够工程化，官方有 webpack 插件可以使用

首先安装下面两个包

```shell
$ yarn add @sentry/cli
$ yarn add @sentry/webpack-plugin
```

然后再 webpack.config.js 代码中配置如下代码

```js
const SentryPlugin = require('@sentry/webpack-plugin');

new SentryPlugin({
  release: 'test004',
  include: './build',
  urlPrefix: '~/',
  ignore: ['node_modules', 'webpack.config.js'],
})
```

这样打包的时候即可直接上传 sentry，不用再执行单独的命令去做了

这个插件没有删除打包后文件.map 的配置项，如果要删除需要自行处理

### 4、sentry 的其他功能

如果上述基础功能不够用的话，还有一些其他高级功能

- 配置 beforeSend，可以弹出对话框，让用户进行更详细的信息反馈

```js
Sentry.init({
  dsn: "your dsn",
  release: "test004",
  beforeSend(event, hint) {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      Sentry.showReportDialog({ eventId: event.event_id });
    }
    return event;
  },
});
```

![](https://imgkr.cn-bj.ufileos.com/2531eb7c-6755-494d-8b43-9207a82804c7.png)

- 还有可以自定义 bug 上下文信息

```js
Sentry.setUser({"email": "xx@xx.cn"});
Sentry.setTag('api', 'api/list/get')
Sentry.setLevel('error');
Sentry.setExtra('data', {
  req: {a:1},
  res: {b:1},
  header:headers
})
Sentry.captureException(new Error('throw new api'))
```

![](https://imgkr.cn-bj.ufileos.com/b45c5b1c-83d8-49d9-a292-71d9593e01f9.png)

![](https://imgkr.cn-bj.ufileos.com/24f2a1e8-067e-4709-9894-c39374a24828.png)

## 总结

sentry 是个很优秀的 bug 追踪系统，为上线应用获取 bug 信息，隐藏 source map 有着极其重要的贡献，也欢迎大家使用
