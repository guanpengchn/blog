---
title: Markdown Nice新特性：七牛云图床
date: 2019-09-21
tag: 开源
cover: https://files.mdnice.com/pic/ad977794-6dab-4b3e-a290-0eda69657df3.png
---

<img style="width: 120px" src="https://files.mdnice.com/pic/1adca100-9876-48b1-a65a-b875ab342be8.jpg"/>

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

![新建存储空间](https://files.mdnice.com/pic/32174aff-0441-4715-8772-6823d719cc21.jpg)

填入相关信息，其中**存储空间名称**和**存储区域**即为我们需要的值，同时要将访问控制设置为**公开空间**，如下图所示：

![配置好相关信息](https://files.mdnice.com/pic/1379d432-e26e-4990-b92d-2ae197b3a251.jpg)

填完后点击确认创建存储空间成功，可以去内容管理处上传一张图片测试一下。

![上传图片](https://files.mdnice.com/pic/799ba7e8-92ec-40d0-8ec0-902168951f63.jpg)

### 获取AccessKey和SecretKey

首先去右上角个人头像那里，点击秘钥管理，如图所示：

![密钥管理](https://files.mdnice.com/pic/6a0f07d5-0436-4b57-bc8a-b41a19877d3c.jpg)

点击后查看当前是否有可用秘钥，如果没有点击右下角创建秘钥，建立成功后即可见到AccessKey和SecretKey了，图床中配置这两个即可，如下图所示：

![创建并获取密钥](https://files.mdnice.com/pic/2cb2b9b7-0724-4fe0-ae7a-613eeb460eb1.jpg)

### 获取自定义域名

点击新建的存储空间名，可以在空间概览中看到其测试域名，注意测试域名都是**http协议**的，如图所示：

![OSS基础情况](https://files.mdnice.com/pic/a774ee44-9b63-4f3e-8ea8-65f5ffe2ed77.jpg)

> 注意：测试域名只能使用30天，过期后域名失效，**之前使用该域名的图片也会失效**，如果想要长期使用需要购买域名并进行配置，配置流程请观看《**七牛云域名配置**》文章

### 自定义空间名

自定义空间名是一个选填项，填写后可以通过路径前缀来区分文件，比如填写`image/`后，如图所示：

![自定义空间名](https://files.mdnice.com/pic/26a21439-fb3e-4817-aa7c-43c2de2d3025.jpg)

## 总结

如果不出意外，上述都配置正确，就可以在Markdown Nice上正常使用七牛云图床了，速度不是一般的快，体验不是一般的好，**粘贴微信图片失败率大幅度降低**！

![上传效果](https://files.mdnice.com/pic/f2079b08-f846-481d-857e-847c759d45df.jpg)

如上图所示，记得先配置七牛云中的6个值，再点击右上角切换七牛云，即可同时上传多张图片了！

mdnice目前建立了用户群，欢迎使用者加入，有众多公众号大佬一起交流！**二维码如果过期可以关注公众号联系我。**

![](https://files.mdnice.com/pic/62a1238c-af6e-4db7-abe8-a715ceba6d0e.jpg)

<span style="display:block;text-align:center;">更多mdnice信息，<strong>请关注公众号</strong></span>
<span style="display:block;text-align:center;">觉得新特性直击灵魂，欢迎点击<strong>在看</strong>和<strong>转发</strong></span>

![](https://files.mdnice.com/pic/a579af32-e666-4ce9-a6c6-212c7cee0f1b.jpg)