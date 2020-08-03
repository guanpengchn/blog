---
title: JavaScript的模板字符串，如何保持多行缩进且去除格式化空格？
date: 2018-09-18
tag: 笔记
cover: https://files.mdnice.com/pic/25b82bfe-4f9a-4686-889d-d5ed1b431435.png
---

JavaScript在ES6标准之后，支持了模板字符串，模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。  

```js 
// 普通字符串
`hello world.`

// 多行字符串
`hello
world.`

// 字符串中嵌入变量
var a = 'world';
var b = `hello ${a}`;
```

## 问题描述

使用过程中往往会遇到这样一个问题，在多行字符串使用的时候，为了保证代码整齐通常会换行后缩进，但该缩进会被模板字符串认为是字符串的一部分，这里就产生了矛盾。

```js
var a = `This is a template string.
             Even though each line is indented to keep the
             code neat and tidy, the white space used to indent
             is not in the resulting string`;
console.log(a);
/* 打印结果
"This is a template string.
             Even though each line is indented to keep the
             code neat and tidy, the white space used to indent
             is not in the resulting string" */
```

## 解决方案

针对上述情况有以下几个解决方案，既可以保持代码缩进多行，又不会在结果字符串中包含格式化空格。

1. 传统的字符串拼接+换行符

```js
var a = `This is a template string.\n`
      + `Even though each line is indented to keep the\n`
```

- 优点：简单易懂
- 缺点：拼接繁琐容易出错，没有充分利用模板字符串的优势

2. 字符串替换

```js
var a = (`This is a template string.
             Even though each line is indented to keep the
             code neat and tidy, the white space used to indent
             is not in the resulting string`
            ).replace(/^             /gm, '');
```

- 优点：充分利用了模板字符串
- 缺点：空格数不一致容易导致替换出错，对文本有侵入性可能会替换掉不该替换的内容，增加运算时间

3. 变量替换

```js
const N = "\n";
var a = `This is a template string. ${
           N}Even though each line is indented to keep the ${
           N}code neat and tidy, the white space used to indent ${
           N}is not in the resulting string`;
```

- 优点：简单易懂且充分利用模板字符串的特性，和Scala中的stripMargin很像
- 缺点：需要专门维护换行符变量


以上的方案各有优劣，综合来说第3种方案最值得使用，希望ECMAScript能够针对该点进行优化

## 参考资料

- [Multiline template strings that don't break indentation](https://esdiscuss.org/topic/multiline-template-strings-that-don-t-break-indentation)