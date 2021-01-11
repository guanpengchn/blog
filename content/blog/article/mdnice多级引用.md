---
title: 新功能！mdnice 制作包含小姐姐的独立样式块
date: 2020-09-25
tag: 文章
cover: https://gitee.com/guanpengchn/picture/raw/master/2020-9-25/1600994758299-新垣结衣.png
---

## 1 问题

使用 mdnice 排版时发现需要独立的样式块怎么办？

比如：

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-24/1600932940755-image.png)

再比如：

![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-24/1600934672433-image.png)

mdnice 虽然排版很整齐，但是这种特定的块设计也做不到呀~~

今天就给大家分享解决方案

## 2 多级引用解决样式块设计

引用的格式是在符号 `>` 后面书写文字，文字的内容可以包含链接、图片、粗体和斜体等。

当使用多个 `>` 符号时，就会变成多级引用，因此可以利用**多级引用**来做样式块设计

### 2.1 一级引用

一级引用是最常用的，目前所有主题都有默认实现

一级引用文本如下：

```text
> ### 一级引用
>
> 读一本好书，就是在和高尚的人谈话。 **——歌德**
>
> [Markdown Nice最全功能介绍](https://mp.weixin.qq.com/s/lM808MxUu6tp8zU8SBu3sg)
>
> ![这里写图片描述](https://files.mdnice.com/wechat.jpg)
```

效果如下：

> ### 一级引用
>
> 读一本好书，就是在和高尚的人谈话。 **——歌德**
>
> [Markdown Nice 最全功能介绍](https://mp.weixin.qq.com/s/lM808MxUu6tp8zU8SBu3sg)
>
> ![这里写图片描述](https://files.mdnice.com/wechat.jpg)

### 2.2 二级引用

二级引用文本如下：

```text
>> 扫码即可进入小姐姐个人主页
>>
>> **免费申请认识小姐姐**
>>
>>![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-24/1600956162799-image.png =80%x)
>>
>> 也可以直接联系我咨询详情
```

二级引用自定义样式：

```css
#nice .multiquote-2 {
  box-shadow: none;
  border-left: none;
}

#nice .multiquote-2 blockquote {
  padding: 20px 30px;
  background-color:rgb(223, 241, 238);
  transform: rotateZ(4deg);
  border: 1px dashed rgba(0,0,0,0.5);
}

#nice .multiquote-2 blockquote p {
  color: rgb(7, 107, 115);
  font-size:14px;
  text-align: center;
  font-weight: bold;
  padding: 5px;
}

#nice .multiquote-2 blockquote strong {
  color: rgb(255, 79, 121);
}
```

效果如下：

> > 扫码即可进入小姐姐个人主页
> >
> > **免费申请认识小姐姐**
> >
> >![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-24/1600956162799-image.png =80%x)
> >
> > 也可以直接联系我咨询详情

### 2.3 三级引用

三级引用与二级引用同理，只要愿意，无限增加 `>` 可以制造 n 级引用

三级引用文本如下：

```text
>>> ### Ta的秘密
>>>
>>> ![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-24/1600956295010-image.png)
>>>
>>> **兴趣爱好**
>>>
>>> 喜欢阅读、旅行、健身
```

三级引用自定义样式：

```css
#nice .multiquote-3 {
  border-left: none;
  padding: 0;
}

#nice .multiquote-3 blockquote {
  border-left: none;
  padding: 0;
}

#nice .multiquote-3 blockquote blockquote {
  border: 1px dashed rgba(0,0,0,0.5);
  padding: 0 20px;
}

#nice .multiquote-3 blockquote blockquote h3 {
  background: pink;
  color:white;
}

#nice .multiquote-3 blockquote blockquote strong {
  color: rgb(255, 79, 121)
}
```

效果如下：

> > > ### Ta 的秘密
> > >
> > > ![](https://gitee.com/guanpengchn/picture/raw/master/2020-9-24/1600956295010-image.png)
> > >
> > > **兴趣爱好**
> > >
> > > 喜欢阅读、旅行、健身

## 3 小结

利用多级引用可以非常好的解决样式块设计问题，`multiquote-1`、`multiquote-2`、`multiquote-3`分别代表一级引用、二级引用、三级引用 css 类选择器，设计时可以充分利用它们

**该能力已经发布到线上，可能根据实际情况会调整类选择器的位置，未来会发布更多优质主题供大家选择**
