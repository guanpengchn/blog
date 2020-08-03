---
title: vue-element-admin使用琐记
date: 2018-08-10
tag: 笔记
cover: https://files.mdnice.com/pic/25b82bfe-4f9a-4686-889d-d5ed1b431435.png
---

做项目主要用了前端框架vue.js，其中使用了开源后台系统[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)，用别人的开源工具果然有很大成长，知道很多东西，做一篇笔记，记录下零零碎碎学到的东西

## [vue-i18n](http://panjiachen.github.io/vue-element-admin/#/i18n/index)

该项目实现国际化的原理是在cookie中存储一个键值对，来判断语言，进而做相关转换

![1](https://user-images.githubusercontent.com/13995641/43965126-0fc2a290-9cf1-11e8-9661-d5a2d0ec53e7.png)

### 常见的[$t](https://github.com/PanJiaChen/vue-element-admin/blob/6a5197ad51ab84133fbd2afd40de636a2f7449cb/src/views/table/complexTable.vue#L31)

* 想使用complexTable，经常能看到`$t`的出现，查了下github才懂，原来这个是vue-i18n要用的，它对应的位置是`@/view/lang`下的各种语言包文件，比如标题那行对应了[此处](https://github.com/PanJiaChen/vue-element-admin/blob/6a5197ad51ab84133fbd2afd40de636a2f7449cb/src/lang/zh.js#L112)，也就是相当于这行决定了显示的值

## 公共组件化[complexTable](http://panjiachen.github.io/vue-element-admin/#/table/complex-table)

该组件用来做复杂表格显示使用，带着分页整体比较合心意

### vue中的[slot和slot-scope](https://github.com/PanJiaChen/vue-element-admin/blob/6a5197ad51ab84133fbd2afd40de636a2f7449cb/src/views/table/complexTable.vue#L32)

有一篇文章[《深入理解vue中的slot和slot-scope》](https://segmentfault.com/a/1190000012996217)讲的已经很全面了，但在最后一个demo那里描述的不够清楚，主要是传输数据那里，自己探索之后补充一下。

简单改了下代码如下：

* 父组件

```html
<template>
  <div class="father">
    <h3>这里是父组件</h3>
    <!--第一次使用：用flex展示数据-->
    <child>
      <template slot-scope="user">
        <div class="tmpl">
          <span v-for="item in user.data2">{{item}}</span>
        </div>
      </template>

    </child>

    <!--第二次使用：用列表展示数据-->
    <child>
      <template slot-scope="user">
        <ul>
          <li v-for="item in user.data2">{{item}}</li>
        </ul>
      </template>

    </child>

    <!--第三次使用：直接显示数据-->
    <child>
      <template slot-scope="user">
       {{user.data2}}
      </template>

    </child>

    <!--第四次使用：不使用其提供的数据, 作用域插槽退变成匿名插槽-->
    <child>
      我就是模板
    </child>
  </div>
</template>
```

* 子组件

```vue
<template>
  <div class="child">

    <h3>这里是子组件</h3>
    // 作用域插槽
    <slot  :data2="data"></slot>
  </div>
</template>

 export default {
    data: function(){
      return {
        data: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']
      }
    }
}
```

其实只是改了一个变量名，可以看到`user`就是一个父组件的区域，在父组件范围使用，和子组件没有关系。而`data2`是和子组件的`slot`标签动态绑定相关联的，绑定的数据`data`就只和子组件自己有关联，原来都叫做data混在了一块看不清楚，区分一下就清晰了

### 父组件给子组件传值

组件相关可以看[官网文档](https://cn.vuejs.org/v2/guide/components.html)，这里我主要理解的是props这个属性是子组件的，不是父组件的


## 跨域问题

- CORS

CORS基本没什么问题，在服务端配置好之后，然后配置config文件夹下`dev.env.js`，配置如下

```javascript
module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"http://10.10.154.2:8088/CNDRGs"'
}
```

- 代理

由于项目中要考虑兼容ie8和ie9的问题，所以可以考虑使用代理来做，配置如下

config/index.js

```javascript
module.exports = {
  dev: {

    ...

    proxyTable: {
      "/CNDRGs": {
        target:"http://10.10.154.2:8088",
        changeOrigin:true,
        pathRewrite: {
          '^/CNDRGs': '/CNDRGs/'
        }
      }
    }

    ...
  }
}
```

其中第一个`/CNDRGs`和`^/CNDRGs`是对应关系，要保持一致，`/CNDRGs/`是服务器端在基础host上附加的路径，这里在做重定向

另外一个就是api文件修改，以src/api/deathTopTen.js为例

```javascript
import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/CNDRGs/drgdead',
    method: 'get',
    params: query,
    baseURL: ''
  })
}
```

注意要添加`baseURL: ''`这一行，否则会直接从10.10.154.2请求，就达不到代理的目的了，代理的目的是从自身处请求，再有自身的服务去发请求

url中的`/CNDRGs`也是和proxyTable中的`/CNDRGs`和`^/CNDRGs`是对应关系

