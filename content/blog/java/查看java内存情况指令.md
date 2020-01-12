---
title: 查看java内存情况指令
date: 2018-12-10
tag: Java
cover: https://imgkr.cn-bj.ufileos.com/9bda0377-12ca-417b-a8c9-380e48834ade.png
---

- jinfo:可以输出并修改运行时的java 进程的opts。 
- jps:与unix上的ps类似，用来显示本地的java进程，可以查看本地运行着几个java程序，并显示他们的进程号。 
- jstat:一个极强的监视VM内存工具。可以用来监视VM内存内的各种堆和非堆的大小及其内存使用量。 
- jmap:打印出某个java进程（使用pid）内存内的所有'对象'的情况（如：产生那些对象，及其数量）。 
- jconsole:一个java GUI监视工具，可以以图表化的形式显示各种数据。并可通过远程连接监视远程的服务器VM。 

详细：在使用这些工具前，先用JPS命令获取当前的每个JVM进程号，然后选择要查看的JVM。 
jstat工具特别强大，有众多的可选项，详细查看堆内各个部分的使用量，以及加载类的数量。使用时，需加上查看进程的进程id，和所选参数。以下详细介绍各个参数的意义。 
jstat -class pid:显示加载class的数量，及所占空间等信息。 
jstat -compiler pid:显示VM实时编译的数量等信息。 
jstat -gc pid:可以显示gc的信息，查看gc的次数，及时间。其中最后五项，分别是young gc的次数，young gc的时间，full gc的次数，full gc的时间，gc的总时间。 
jstat -gccapacity:可以显示，VM内存中三代（young,old,perm）对象的使用和占用大小，如：PGCMN显示的是最小perm的内存使用量，PGCMX显示的是perm的内存最大使用量，PGC是当前新生成的perm内存占用量，PC是但前perm内存占用量。其他的可以根据这个类推， OC是old内纯的占用量。 
- jstat -gcnew pid: new对象的信息。 
- jstat -gcnewcapacity pid: new对象的信息及其占用量。 
- jstat -gcold pid: old对象的信息。 
- jstat -gcoldcapacity pid: old对象的信息及其占用量。 
- jstat -gcpermcapacity pid: perm对象的信息及其占用量。 
- jstat -util pid: 统计gc信息统计。 
- jstat -printcompilation pid: 当前VM执行的信息。 
除了以上一个参数外，还可以同时加上 两个数字，如：jstat -printcompilation 3024 250 6是每250毫秒打印一次，一共打印6次，还可以加上-h3每三行显示一下标题。 

jmap是一个可以输出所有内存中对象的工具，甚至可以将VM 中的heap，以二进制输出成文本。 
命令：jmap -dump:format=b,file=heap.bin <pid> 
- file：保存路径及文件名 
- pid：进程编号 
- jmap -histo:live  pid| less :堆中活动的对象以及大小 
- jmap -heap pid : 查看堆的使用状况信息 


jinfo:的用处比较简单，就是能输出并修改运行时的java进程的运行参数。用法是jinfo -opt pid 如：查看2788的MaxPerm大小可以用 jinfo -flag MaxPermSize 2788。 

jconsole是一个用java写的GUI程序，用来监控VM，并可监控远程的VM，非常易用，而且功能非常强。使用方法：命令行里打 jconsole，选则进程就可以了。 
JConsole中关于内存分区的说明。 

Eden Space (heap)： 内存最初从这个线程池分配给大部分对象。 
Survivor Space (heap)：用于保存在eden space内存池中经过垃圾回收后没有被回收的对象。 
Tenured Generation (heap)：用于保持已经在 survivor space内存池中存在了一段时间的对象。 
Permanent Generation (non-heap): 保存虚拟机自己的静态(refective)数据，例如类（class）和方法（method）对象。Java虚拟机共享这些类数据。这个区域被分割为只读的和只写的， 
Code Cache (non-heap):HotSpot Java虚拟机包括一个用于编译和保存本地代码（native code）的内存，叫做“代码缓存区”（code cache） 

- jstack ( 查看jvm线程运行状态，是否有死锁现象等等信息) : jstack pid : thread dump 
- jstat -gcutil  pid  1000 100  : 1000ms统计一次gc情况统计100次； 

另外推荐一款查看jmap dump 的内存对象工具 MemoryAnalyzer 
网址：http://www.eclipse.org/mat/，可以查看dump时对象数量，内存占用，线程情况等。