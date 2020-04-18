---
title: Markdown Nice新特性：七牛云图床
date: 2019-09-21
tag: 开源
cover: https://imgkr.cn-bj.ufileos.com/90461766-4971-47b8-a400-ed8721ffeb68.png
---

<img style="width: 120px" src="https://draw-wechat.oss-cn-hangzhou.aliyuncs.com/mdnice%20logo_20190823192027.png"/>

## Markdown Nice简介

**简介**：Markdown Nice是支持自定义样式的 Markdown 编辑器，可用于微信公众号、知乎等多个平台排版

**体验地址**：`https://mdnice.com`

## Markdown Nice新特性

- 支持七牛云KODO作为自定义图床
- 需要配置六个选项，分别为：

|字段名|填写|
|---|---|
|存储空间名称|**必填**|
|存储区域|**必填**|
|AccessKey|**必填**|
|SecretKey|**必填**|
|自定义域名|**必填**|
|自定义命名空间|选填|

- 使用七牛云会有 10GB 免费空间，超出后会产生相应的费用，请参考七牛云官网

`https://www.qiniu.com/products/kodo`

## 配置步骤

### 获取 存储空间名称 和 存储区域

打开七牛云控制台，选择对象存储，点击新建存储空间，如下图所示：

![新建存储空间](https://draw-wechat.oss-cn-hangzhou.aliyuncs.com/%E6%96%B0%E5%BB%BA%E5%AD%98%E5%82%A8%E7%A9%BA%E9%97%B4_20190921100426.png)

填入相关信息，其中**存储空间名称**和**存储区域**即为我们需要的值，同时要将访问控制设置为**公开空间**，如下图所示：

![配置好相关信息](https://draw-wechat.oss-cn-hangzhou.aliyuncs.com/%E9%85%8D%E7%BD%AE%E5%A5%BD%E7%9B%B8%E5%85%B3%E4%BF%A1%E6%81%AF_20190921100620.png)

填完后点击确认创建存储空间成功，可以去内容管理处上传一张图片测试一下。

![上传图片](https://draw-wechat.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87_20190921110805.png)

### 获取AccessKey和SecretKey

首先去右上角个人头像那里，点击秘钥管理，如图所示：

![密钥管理](https://draw-wechat.oss-cn-hangzhou.aliyuncs.com/%E5%AF%86%E9%92%A5%E7%AE%A1%E7%90%86_20190921101902.png)

点击后查看当前是否有可用秘钥，如果没有点击右下角创建秘钥，建立成功后即可见到AccessKey和SecretKey了，图床中配置这两个即可，如下图所示：

![创建并获取密钥](https://draw-wechat.oss-cn-hangzhou.aliyuncs.com/%E5%88%9B%E5%BB%BA%E5%AF%86%E9%92%A5_20190921102406.png)

### 获取自定义域名

点击新建的存储空间名，可以在空间概览中看到其测试域名，注意测试域名都是**http协议**的，如图所示：

![OSS基础情况](https://draw-wechat.oss-cn-hangzhou.aliyuncs.com/OSS%E5%9F%BA%E7%A1%80%E6%83%85%E5%86%B5_20190921110724.png)

> 注意：测试域名只能使用30天，过期后域名失效，**之前使用该域名的图片也会失效**，如果想要长期使用需要购买域名并进行配置，配置流程请观看《**七牛云域名配置**》文章

### 自定义空间名

自定义空间名是一个选填项，填写后可以通过路径前缀来区分文件，比如填写`image/`后，如图所示：

![自定义空间名](https://draw-wechat.oss-cn-hangzhou.aliyuncs.com/%E8%87%AA%E5%AE%9A%E4%B9%89%E7%A9%BA%E9%97%B4%E5%90%8D_20190921111637.png)

## 总结

如果不出意外，上述都配置正确，就可以在Markdown Nice上正常使用七牛云图床了，速度不是一般的快，体验不是一般的好，**粘贴微信图片失败率大幅度降低**！

![上传效果](https://draw-wechat.oss-cn-hangzhou.aliyuncs.com/%E4%B8%83%E7%89%9B%E4%BA%91%E4%B8%8A%E4%BC%A0_20190921111923.png)

如上图所示，记得先配置七牛云中的6个值，再点击右上角切换七牛云，即可同时上传多张图片了！

mdnice目前建立了用户群，欢迎使用者加入，有众多公众号大佬一起交流！**二维码如果过期可以关注公众号联系我。**

![](http://draw-wechat.oss-cn-hangzhou.aliyuncs.com/mdnice%E7%94%A8%E6%88%B7%E7%BE%A4_20190919223209.jpeg)

<span style="display:block;text-align:center;">更多mdnice信息，<strong>请关注公众号</strong></span>
<span style="display:block;text-align:center;">觉得新特性直击灵魂，欢迎点击<strong>在看</strong>和<strong>转发</strong></span>

![](https://imgkr.cn-bj.ufileos.com/c3690018-4a92-4766-ac7e-ac54dd54c093.jpg)