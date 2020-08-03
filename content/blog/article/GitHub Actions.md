---
title: 持续集成利器，GitHub Actions
date: 2020-07-03
tag: 文章
cover: https://files.mdnice.com/pic/9147800f-0362-4693-8885-17d7c6f63af7.jpg
---

## 简介

GitHub Actions 是 GitHub 推出的持续集成服务，于 2018 年 10 月推出，目前已经可以投入到正式环境中使用。

### 什么是持续集成呢？

回忆一下代码从开发到上线的过程，通常要经过

> 代码开发 -> 代码提交 -> 服务器编译、测试、打包 -> 服务器部署（大规模部署用 docker）

整个过程中，除了代码开发和代码提交这两个步骤是依赖于开发人员的。

后面的服务器编译、测试、打包和部署都是重复性工作，完全可以用程序替代，没有必要用人工去手动操作，而且如果要部署 100 台服务器，全部靠手工的话，运维人员一定会累吐血

![](https://files.mdnice.com/pic/d78077f1-6db2-4a9f-be56-bed57b3c1ec1.jpg)

于是为了解决上述问题，机智的程序员们发明了持续集成！

### 持续集成的做什么的？

持续集成的目标：代码提交之后的所有服务器编译、测试、打包和部署所有流程都自动执行。

![](https://files.mdnice.com/pic/9147800f-0362-4693-8885-17d7c6f63af7.jpg)

之前通常的方案如下图所示，其中虚线框中的就是持续集成部分

![](https://files.mdnice.com/pic/2d525f19-9245-4fe7-8e5c-a2a97cc66a84.jpg)

可以看出来整个流程还是十分流畅的，但是其中 jenkins 是需要开发人员手工搭建的，并且要占用服务器的一定资源，有一些麻烦

那有没有更好的方案呢？那就是今天要讲的 GitHub Actions！

## GitHub Actions

### 如何查找 actions

GitHub Actions 可以理解为提交代码到 GitHub 后 GitHub 直接提供服务器帮助你做编译、测试、打包的工作，不需要再去手工搭建任何持续集成的工具，也不需要占用自己的服务器资源做这些事情

之后每一个操作就可以理解为是一个 action，很多个操作叠加起来就是 actions

官方提供了 actions 市场，可以根据自己的需求选择，`https://github.com/marketplace?type=actions`

![](https://files.mdnice.com/pic/c4ebbec0-70a8-4af3-b653-29fad9e09d2e.jpg)

### 如何编写 actions

GitHub Actions 配置文件放在仓库的 `.github/workflows` 目录下面，以 yaml 文件的形式存在，文件名根据自己的需求命名，比如`main.yml`或者`develop.yml`

其中文件的配置项可参考 `https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions` 官方文档来进行编写，下面介绍一些常见的选项

- name：name 表示当前 action 的名称，根据自己的需求进行命名
- on：on 表示触发条件，比如当代码 push 到 master 分支的时候触发，则

```yml
on:
  push:
    branches:
      - master
```

- jobs：jobs 表示实际需要执行的工作，比如下方代码，表示使用 ubuntu 执行构建工作，执行步骤上使用了 appleboy/ssh-action 这个仓库的能力

```yml
jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: executing remote ssh commands using password
        uses: appleboy/ssh-action@master
```

## 实例：登录服务器打包

现在有一个已经开发完成的 React 前端应用，希望每次push代码到master分支后，能够自动登录自己的服务器，拉取最新的代码并进行打包上线，应该怎么处理？

首先这里面涉及到ssh登录的问题，所以查找到了一个仓库`https://github.com/appleboy/ssh-action`，能够自动模拟ssh登录，按照文档建立`.github/workflows/main.yml`文件

```yml
name: remote ssh command
on:
  push:
    branches:
      - master
jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: executing remote ssh commands using password
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          password: ${{ secrets.PASSWORD }}
          command_timeout: 5m
          script: |
            cd ~/test
            git pull origin master
            yarn
            yarn build
```

配置文件中前面的内容很容易理解，从 with 开始的部分，涉及到登录个人服务器信息，需要使用账号和密码，那么如果将账号密码明文放在GitHub中，一定会非常不安全，GitHub也不会允许这样的事情出现，于是就有secrets配置

选择 settings->secrets，然后添加文件中的 secrets，这里的值不会被泄露出去

![](https://files.mdnice.com/pic/fc6b3b3a-5fd6-4203-85f2-15d744c1ee19.jpg)

其中 HOST值为 IP地址，USERNAME 为用户名，PASSWORD为登录密码

```bash
比如 ssh root@10.20.0.1
HOST = 10.20.0.1
USERNAME = root
PASSWORD = ******（服务器登录密码）
```

根据配置文件，在登录完成后会连续执行script中的指令

```
script: |
  cd ~/test
  git pull origin master
  yarn build
```

这里的含义就是访问代码目录，拉取最新代码，然后进行打包（其中代码目录、Git、Node.js、yarn等环境要提前准备好），这样就可以仅仅通过一个yaml配置文件，结合GitHub Actions 达到目标

## 小结

GitHub Actions将应用版本管理和持续集成非常好的结合了起来，形成了开发部署利器。

除了上述的例子之外，还有很多功能值得探索，建议大家多多尝试，给自己的代码插上持续集成的翅膀！

![](https://files.mdnice.com/pic/dba30765-0d74-487d-bc65-b10bd7b71064.jpg)



