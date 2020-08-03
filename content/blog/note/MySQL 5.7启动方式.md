---
title: MySQL 5.7启动方式
date: 2019-07-07
tag: 笔记
cover: https://files.mdnice.com/pic/25b82bfe-4f9a-4686-889d-d5ed1b431435.png
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