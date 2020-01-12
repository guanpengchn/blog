---
title: Java虚拟机调优
date: 2018-08-10
tag: Java
cover: https://user-images.githubusercontent.com/13995641/43963312-88834806-9cec-11e8-8fbd-2e04e96d2d57.png
---

## Java内存结构

* 一个线程对应一个栈，一个方法对应一个栈帧
* 持久代perm也叫做方法区，永久区
* 永久区存放class文件，静态变量，字符串常量，方法和执行引擎都去永久区找

![15-3](https://user-images.githubusercontent.com/13995641/43963312-88834806-9cec-11e8-8fbd-2e04e96d2d57.png)


## 堆内存

* new出来的对象如果很大直接放到老年代中，否则放到新生代
* 发生gc新生代没有被回收的会被放到survivor区
* 再次发生gc，新生代没有被回收的和survivor没有被回收的，放到了另一个survivor区
* 往复循环
* 两个survivor会被叫为from，to或者s0，s1

![15-5](https://user-images.githubusercontent.com/13995641/43963325-912572ae-9cec-11e8-9204-923fcaecaf34.png)


* 比例设置

![15-9](https://user-images.githubusercontent.com/13995641/43963336-9966213e-9cec-11e8-97ec-c599794efda3.png)

## GC如何确定垃圾

* 强引用，软引用，虚引用，弱引用
* main方法里的对象可以作为roots，class加载器也是

![15-6](https://user-images.githubusercontent.com/13995641/43963347-a9d7c2f2-9cec-11e8-9688-7b354cbbe238.png)

## 垃圾收集算法

* Mark-Sweep标记清除，实际上不是擦除，而是做了标记，有内存碎片问题，导致需要fullGC来整理，耗费时间
* Copying复制，效率高，但是浪费内存空间，survivor区就是这个算法，因为新生代一般剩下的不多
* Mark-Compact标记压缩，老年代用这个算法，因为每次更改的都不多

![15-7](https://user-images.githubusercontent.com/13995641/43963507-0e8f38e2-9ced-11e8-8866-ebb7ff647a8d.png)

![15-8](https://user-images.githubusercontent.com/13995641/43963524-184fa8d0-9ced-11e8-87ff-72eb968e5929.png)

![15-10](https://user-images.githubusercontent.com/13995641/43964794-2e767bcc-9cf0-11e8-8530-eb8893e2fef7.png)

## jvm采用分代算法

* new
* 存活对象少
* 使用copying，占用内存空间也不大，效率也高
* old
* 垃圾少
* 一般使用mark-compact

## JVM参数

* -标准参数，所有jvm都应该支持
* -X非标，每个jvm实现都不同
* -XX不稳定参数，下一个版本可能会取消

## 垃圾收集器

* Serial Collector
* Parallel Collector 并发量大，每次垃圾收集停顿时间长
* CMS Collector 停顿时间短
* G1 Collector 中合并发量大和停顿时间短

## java对象的分配

* 占用1%是为了减少加锁，要不然多线程要加锁影响速度
- 逃逸指的是对象在线程外部也有引用，线程结束后无法回收

![15-11](https://user-images.githubusercontent.com/13995641/43964807-3693ee52-9cf0-11e8-93b3-bc4b4787527d.png)

## 常用参数设置

* 堆设置

* -Xms：初始堆大小
* -Xmx：最大堆大小
* -Xss：线程栈大小
* -XX:NewSize=n：年轻代大小
* -XX:NewRatio=n：设置年轻代和年老代的比值。如3：代表年轻：年老为1：3，年轻代占整个年轻代年老代的1/4
* -XX:SurvivorRatio=n：年轻代中Eden区与两个Survivor区的比值，注意Survivor区有两个。如：3，表示Eden：Survivor=3：2，一个Survivor区占整个年轻代的1/5，比2因为有两个
* -XX:MaxPermSize=n：设置持久代大小

* 收集器设置

* -XX:+UseSerialGC：设置串行收集器
* -XX:+UseParallelGC：设置并行收集器
* -XX:+UseConcMarkSweepGC：设置并发收集器

* 垃圾回收统计信息

* -XX:+PrintGC
* -XX:+PrintGCDetails
* -Xloggc:filename

* -Xss的理解

* 该参数指的是栈中每个线程的空间大小，即线程栈的大小
* 如果分配的小，那么可启动的线程多，并发性好
* 如果分配的大，那么递归调用就可以很深，但是可启动的线程变少，并发性差

## 典型tomcat优化配置

* set JAVA\_OPTS=

* -Xms4g
* -Xmx4g
* -Xss512k
* -XX:+AggressiveOpts //凡是能优化的都开启
* -XX:+UseBiasedLocking
* -XX:PermSize=64M //jdk1.8取消了
* -XX:MaxPermSize=300M //class越来越多，最大给300M
* -XX:+DisableExplicitGC //System.gc\(\)不起作用，因为有人调用会打乱调优

* 如果服务器上只有一个java虚拟机程序，可以让他尽量占内存

* 如果业务中new出来的东西特别多，Eden区要调大一点

* 业务中有很多对象在不停的运行，老年代的多，就把老年代的调多，调调比例

![15-1](https://user-images.githubusercontent.com/13995641/43964864-595e644e-9cf0-11e8-845f-7b4f71cc51b3.png)

## JMeter和Load Runner等性能测试工具

* 修改catalina.bat做调优

![15-2](https://user-images.githubusercontent.com/13995641/43964884-6468c8de-9cf0-11e8-80c1-1c6056bfe124.png)

## 参考资料

[JVM 数据存储介绍及性能优化](https://www.ibm.com/developerworks/cn/java/j-lo-JVM-Optimize/index.html)

[马士兵Java虚拟机调优](https://www.bilibili.com/video/av11226146?from=search&seid=9762556901275123755)

