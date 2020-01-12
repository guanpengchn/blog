---
title: Permission denied on accessing host directory in docker
date: 2018-08-10
tag: 笔记
cover: https://imgkr.cn-bj.ufileos.com/9bda0377-12ca-417b-a8c9-380e48834ade.png
---

按照阮一峰的做一个apache的php环境docker启动，结果发现出现权限问题，和volume参数有关，即便进入docker内部使用root权限也无法解决，查找到有一个解决方案，在docker启动命令中加入如下参数

```
--privileged=true
```

```bash
docker container run \
--rm \
--privileged=true \
--name wordpress \
--volume "$PWD/":/var/www/html \
php:5.6-apache

```

参考连接：[https://stackoverflow.com/questions/24288616/permission-denied-on-accessing-host-directory-in-docker](https://stackoverflow.com/questions/24288616/permission-denied-on-accessing-host-directory-in-docker)

