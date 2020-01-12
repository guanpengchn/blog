---
title: Ionic打包后运行在IOS机器的操作过程
date: 2018-07-07
tag: 笔记
cover: https://imgkr.cn-bj.ufileos.com/9bda0377-12ca-417b-a8c9-380e48834ade.png
---

首先准备一台mac，将iphone和mac用数据线连接成功，处于充电状态，并且允许调试。

安装Xcode，安装完毕后设置Accounts，并用npm安装相关包依赖，可参考文档[iOS Setup](https://ionicframework.com/docs/installation/ios "iOS Setup")

![ios-xcode-accounts](https://user-images.githubusercontent.com/13995641/60767604-cd622c80-a0ec-11e9-947f-9d76fb711c9b.png)

设置accounts时要注意添加Team，也就是点击上图右下角的Manage Certificates...

执行指令生成项目

```bash
ionic cordova prepare ios
```

执行过后会在项目中看到platforms目录下有ios目录产生

<img width="281" alt="1" src="https://user-images.githubusercontent.com/13995641/60767513-c850ad80-a0eb-11e9-9244-5ed3970f5d9a.png">

如果是第一次使用IOS开发，先打开Xcode，打开刚才的ios目录。

查看项目中的targets，修改bundle identifier名字，因为可能已经被占用了，然后添加Team，并且查看Signing Certificate是否有报错，而且要注意将设备改成iPhone

<img width="1026" alt="2" src="https://user-images.githubusercontent.com/13995641/60767641-3e094900-a0ed-11e9-88ea-b27d3af64bb6.png">

同时还要将Project中的Signing也添加Team

<img width="1033" alt="3" src="https://user-images.githubusercontent.com/13995641/60767687-c7b91680-a0ed-11e9-8ccc-bcb204722228.png">

都做好了之后，选择File->Project Setteings

<img width="884" alt="4" src="https://user-images.githubusercontent.com/13995641/60767748-6cd3ef00-a0ee-11e9-9257-c5c0c3209b26.png">

点击Legacy Build System，使用原来的编译系统，避免下方这两个error

```bash
CordovaError: Promise rejected with non-error: Error code 65
CordovaError: Promise rejected with non-error: Error code 70
```

Google上很多解决方案提到了用命令行执行原来的编译系统，但是我测试不好用

```bash
//  不好用
ionic cordova run ios -- --buildFlag="-UseModernBuildSystem=0"
```

建议使用Xcode的原来编译系统进行编译，如下图所示

<img width="535" alt="5" src="https://user-images.githubusercontent.com/13995641/60767754-912fcb80-a0ee-11e9-9c3b-a70b4c961b8c.png">

最后点击三角箭头运行，会遇到xcode提示“codesign 想要访问您的钥匙串中的密钥”，这时输入电脑登录密码即可，安装到手机上后还打不开APP，需要在手机上操作

> 设置->通用->设备管理->“你的Apple ID”->信任“你的Apple ID”->信任

![6](https://user-images.githubusercontent.com/13995641/60767789-3f3b7580-a0ef-11e9-866d-6d82f9101574.png)

这时候APP就能打开了，完成了全部工作