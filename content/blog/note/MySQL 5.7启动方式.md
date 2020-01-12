---
title: MySQL 5.7启动方式
date: 2019-07-07
tag: 笔记
cover: https://imgkr.cn-bj.ufileos.com/9bda0377-12ca-417b-a8c9-380e48834ade.png
---

再次被坑惨，以前好像就有这样的经历

先初始化，再使用服务
```bash
mysqld --initialize
```

重置密码
```bash
SET PASSWORD = PASSWORD('your_new_password');
```