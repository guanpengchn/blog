---
title: Java中 VO、 PO、DO、DTO、 BO、 QO、DAO、POJO的概念
date: 2018-12-18
tag: Java
cover: https://user-images.githubusercontent.com/13995641/49711026-0251f200-fc78-11e8-9370-0102f45f47a2.jpg
---

## PO(persistant object) 持久对象

在 o/r 映射的时候出现的概念，如果没有 o/r 映射，没有这个概念存在了。通常对应数据模型 ( 数据库 ), 本身还有部分业务逻辑的处理。可以看成是与数据库中的表相映射的 java 对象。最简单的 PO 就是对应数据库中某个表中的一条记录，多个记录可以用 PO 的集合。 PO 中应该不包含任何对数据库的操作。

## DO（Domain Object）领域对象

就是从现实世界中抽象出来的有形或无形的业务实体。一般和数据中的表结构对应。

## TO(Transfer Object) ，数据传输对象

在应用程序不同 tie( 关系 ) 之间传输的对象

## DTO（Data Transfer Object）数据传输对象

这个概念来源于J2EE的设计模式，原来的目的是为了EJB的分布式应用提供粗粒度的数据实体，以减少分布式调用的次数，从而提高分布式调用的性能和降低网络负载，但在这里，我泛指用于展示层与服务层之间的数据传输对象。

## VO(view object) 值对象

视图对象，用于展示层，它的作用是把某个指定页面（或组件）的所有数据封装起来。

## BO(business object) 业务对象

从业务模型的角度看 , 见 UML 元件领域模型中的领域对象。封装业务逻辑的 java 对象 , 通过调用 DAO 方法 , 结合 PO,VO 进行业务操作。 business object: 业务对象 主要作用是把业务逻辑封装为一个对象。这个对象可以包括一个或多个其它的对象。 比如一个简历，有教育经历、工作经历、社会关系等等。 我们可以把教育经历对应一个 PO ，工作经历对应一个 PO ，社会关系对应一个 PO 。 建立一个对应简历的 BO 对象处理简历，每个 BO 包含这些 PO 。 这样处理业务逻辑时，我们就可以针对 BO 去处理。

## POJO(plain ordinary java object) 简单无规则 java 对象

纯的传统意义的 java 对象。就是说在一些 Object/Relation Mapping 工具中，能够做到维护数据库表记录的 persisent object 完全是一个符合 Java Bean 规范的纯 Java 对象，没有增加别的属性和方法。我的理解就是最基本的 Java Bean ，只有属性字段及 setter 和 getter 方法！。

## DAO(data access object) 数据访问对象

是一个 sun 的一个标准 j2ee 设计模式， 这个模式中有个接口就是 DAO ，它负持久层的操作。为业务层提供接口。此对象用于访问数据库。通常和 PO 结合使用， DAO 中包含了各种数据库的操作方法。通过它的方法 , 结合 PO 对数据库进行相关的操作。夹在业务逻辑与数据库资源中间。配合 VO, 提供数据库的 CRUD 操作

![snap20070108](https://user-images.githubusercontent.com/13995641/49711026-0251f200-fc78-11e8-9370-0102f45f47a2.jpg)
