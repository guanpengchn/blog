---
title: docker-compose使用volume部署mysql时permission deny问题解决
date: 2018-08-10
tag: 笔记
cover: https://files.mdnice.com/pic/25b82bfe-4f9a-4686-889d-d5ed1b431435.png
---

## 问题

整体情况为使用docker做mysql的容器，然后结合其他服务一起通过docker-compose启动，并且为了一次性建表和设置用户权限我又在mysql中封装了setup.sh、schema.sql、privileges.sql这些自定义的脚本，在Dockerfile构造时执行，到目前为止都是正常的。

但是由于每次down掉容器后，mysql的数据会丢失无法持久化，所以在docker-compose.yml中配置了volume参数，然后就产生了如下的报错，包括调试过程中的报错。

首先列几个可能的报错，这些都和这个有关系。

问题一：mysqld: Can't create/write to file '/var/lib/mysql/is\_writable' \(Errcode: 13 - Permission denied\)

问题二：'su' command in Docker returns 'must be run from terminal'

问题三：/usr/bin/mysqld\_safe: 637: /usr/bin/mysqld\_safe: cannot create /var/lib/mysql/c0ce8fdc06d0.err: Permission denied

以上几个问题都是我在调试过程中出现的报错，采用过以下办法解决：

1、在docker-compos.yml中添加

```
user:"1000:50"
```

2、保证volume配置对应的是/var/lib/mysql目录，不能是/var/lib/mysql/data更深一层目录

3、在Dockerfile中添加权限指令chmod一类的，来修改文件权限

上述的方法均无效，在列出真正的解决方案之前，我把我重要的几个配置文件列出来



* docker-compose.yml

```
plate-nginx:
build: ./nginx
container_name: plate-nginx
links:
- plate-client:plate-client
- plate-server:plate-server
ports:
- "80:80"
- "443:443"
- "7000:7000"
plate-client:
build: ./client
container_name: plate-client
volumes:
- "/home/picture:/app/client/app/upload"
ports:
- "3000:3000"
- "3001:3001"
plate-server:
build: ./server
container_name: plate-server
ports:
- "7001:7001"
plate-mysql:
build: ./mysql
container_name: plate-mysql
volumes:
- "/home/data:/var/lib/mysql"
ports:
- "3306:3306"
environment:
MYSQL_USER: root
MYSQL_ROOT_PASSWORD: 123456
phpmyadmin:
image: phpmyadmin/phpmyadmin
container_name: phpmyadmin
links:
- plate-mysql:plate-mysql
ports:
- "8888:80"
environment:
MYSQL_USER: root
MYSQL_ROOT_PASSWORD: 123456
PMA_HOST: plate-mysql
PMA_PORT: 3306

```

* mysql下的Dockerfile

```
FROM mysql:5.6

#设置免密登录
ENV MYSQL_ALLOW_EMPTY_PASSWORD yes

#将所需文件放到容器中
COPY setup.sh /mysql/setup.sh
COPY schema.sql /mysql/schema.sql
COPY privileges.sql /mysql/privileges.sql

#设置容器启动时执行的命令
CMD ["sh", "/mysql/setup.sh"]

```

* setup.sh

```
#!/bin/bash
set -e

#查看mysql服务的状态，方便调试，这条语句可以删除
echo `service mysql status`

echo '1.启动mysql....'
#启动mysql
service mysql start
sleep 3
echo `service mysql status`

echo '2.开始导入数据....'
#导入数据
mysql < /mysql/schema.sql
echo '3.导入数据完毕....'

sleep 3
echo `service mysql status`

#重新设置mysql密码
echo '4.开始修改密码....'
mysql < /mysql/privileges.sql
echo '5.修改密码完毕....'

#sleep 3
echo `service mysql status`
echo `mysql容器启动完毕,且数据导入成功`

tail -f /dev/null
```

## 解决方案

真正的问题所在其实就是在服务器上的volume目录/home/data和容器里目录/var/lib/mysql拥有者不一样导致的，那么如何查看拥有者，需要使用如下几条指令

* 查看容器中/var/lib/mysql的所有者

```
docker run -ti --rm --entrypoint="/bin/bash" plate_plate-mysql -c "ls -la /var/lib/mysql"
```

![9-1](https://user-images.githubusercontent.com/13995641/43958991-cea41fe8-9cdf-11e8-86f8-f8620d2dad12.png)


可以从图中看出来这个目录的所有者是mysql用户组

* 查看服务器中/home/data的所有者

```
ls -la /home/data
```

![9-2](https://user-images.githubusercontent.com/13995641/43958996-d7675154-9cdf-11e8-92ef-9db81f6aa0c4.png)

在systemd-bus-proxy这个位置原来是root，这里由于被我修改了所以是这样，也就是说，这两个目录的所有者不同导致的权限问题，现在把他们的id统一就可以了，统一前要先查出来容器里的mysql用户组id，然后修改服务器的/home/data下的用户组id

* 查出来容器里的mysql用户组id

```
docker run -ti --rm --entrypoint="/bin/bash" plate_plate-mysql -c "cat /etc/group"
```

![9-3](https://user-images.githubusercontent.com/13995641/43959006-ddab4a02-9cdf-11e8-8caf-91ab169db55a.png)


可以看到mysql用户组的id为999

* 修改服务器文件用户组id

```
chown -R 999 /home/data
```

![9-2](https://user-images.githubusercontent.com/13995641/43958996-d7675154-9cdf-11e8-92ef-9db81f6aa0c4.png)

修改后再去查看就如上图一样，权限变成了systemd-bus-proxy，至于为什么没变成mysql呢，因为999是docker容器里面的权限id，不是服务器的，所以服务器不识别也是自然的，之后再重启，执行

```
docker-compose build && docker-compose up -d
```

就不会再有报错了






