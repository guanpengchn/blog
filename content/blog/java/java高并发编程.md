---
title: java高并发编程
date: 2018-08-10
tag: Java
cover: https://user-images.githubusercontent.com/13995641/43964934-84541acc-9cf0-11e8-96fc-725267b910c4.png
---

## synchronized

* 锁定的不是代码块，方法，而是对象，一定要明确，也就是对象锁

![16-1](https://user-images.githubusercontent.com/13995641/43964934-84541acc-9cf0-11e8-96fc-725267b910c4.png)

* 静态的属性和方法要锁定当前类的Class对象，也就是所谓的类锁

```java
public static void mm(){
    synchronized(T.class) {
        count--;
    }
}
```

* 同步方法和非同步方法同时存在时，非同步方法可以被多个占有该对象的线程同时调用

* synchronized获得的锁是可重入的，包括子类调用父类的同步方法

* 异常会导致锁释放

* 尽量使用细粒度的锁

## volatile

* java线程模型？JMM

![16-2](https://user-images.githubusercontent.com/13995641/43964973-9bae7e06-9cf0-11e8-9bac-e5a4c65e175c.png)

* volatile只保证了可见性，synchronized保证可见性和原子性，synchronized比volatile效率低

## Atom*

* 方法都是原子性的，简单的同步效率高

* 但是多个方法不构成原子性

## 其他

* 不要用字符串做锁定对象
* 锁定对象o如果变成另一个对象，则锁定的对象发生改变，所以应该避免

## wait和notify

* sleep不释放锁
* notify只是唤醒一个线程，但是不释放锁
* wait释放锁

## CountDownLatch门闩/syclicbarrier/semaphore

* 不需要锁定对象，也就不需要synchronized
* 线程中await等待门闩打开
* 使用countDown减到0就启动并继续执行线程

## ReentrantLock重入锁

* 需要手动释放锁lock,unlock
* 可以使用trylock来获取是否拿到锁，然后做判断处理，可以指定时间
* 和synchronized不存在性能区别
* lockInterruptibly可以对interrupt方法做出反馈
* ReentrantLock可以指定为公平锁，谁等的时间长把锁给谁，synchronized就是竞争锁没有公平锁，公平锁效率比竞争锁低

## 生产者消费者

* wait 99%的情况下和while一起使用，在被notify之后再判断一次，而if就不会做
* 永远使用notifyAll不适用notify
* Lock Condition，可以精确控制哪些线程被叫醒

## ThreadLocal

* 自己线程自己用，别的线程用不了，需要自己做，互相之间没影响
* ThreadLocal是空间换时间，synchronized是时间换空间，ThreadLocal时间效率更高

## 线程安全的单例模式Singleton

* 不加锁同时实现懒加载

## 并发容器Map/Set

* ConcurrentHashMap要比Hashtable效率高，Hashtable是加锁，ConcurrentHashMap是把数据分了16份只锁其中一段，而1.8使用CAS，所以效率高，同样也比Collection.synchronized要高
* ConcurrentSkipListMap用于高并发排序，[跳表](https://blog.csdn.net/sunxianghuang/article/details/52221913)

## 并发容器队列

* CopyOnWriteArrayList，写的时候非常费时间，读的时候不用加锁，适合写少读多，[只能保证最终数据一致性](https://blog.csdn.net/qq_19431333/article/details/78112904)
* Collection.synchronized可以把list专成加锁的list
* Queue高并发分类
* ConcurrentLinkedQueue
* BlockingQueue
* LinkedBlockingQueue
* ArrayBlockingQueue，BQ在put时如果满了就会等待，take如果空了就会等待
* TransferQueue
* SynchronousQueue
* DelayQueue
* ConcurrentQueue，offer方法类似于add，但是offer在有界的情况下不会报异常只会返回boolean，poll方法把第一个（index=0）拿出来并且删掉，peek方法则是把第一个拿出来但不删除
* Deque为双端队列
* DelayQueue中每个元素都有等待时间，可以用来定时执行任务
* LinkedTransferQueue是生产者发现消费者在的话就不往队列里扔了直接发给生产者，transfer方法先执行会导致阻塞，实时消息处理使用的比较多
* SynchronousQueue没有容量的队列，容量为0，消费者必须马上消费掉，所以不能用add函数，只能用put实际上调用的是transfer

## 相关工具类

* Executor
* ExecutorService的excute函数自动调用没有返回值的runnable，submit可以执行有返回值和没有返回值的callable和runnable，所有的java线程池都实现了该接口
* callable有返回值和runnable没有，其他差不多
* Executors是工具类，有一些工厂方法
* FutureTask，通过get方法阻塞获取结束的值，是把Callable做了个包装好放进线程中启动

## 线程池

* FixedThreadPool固定个数线程池
* CachedThreadPool缓存线程池，里面的线程有生存周期，默认60s
* SingleThreadExecutor只有一个线程
* ScheduledThreadPool以固定频率来执行任务
* WorkStealingPool每个线程都维护自己的一个任务，执行完自己的之后会从别人的那里偷任务执行，是daemon线程，精灵线程，主线程结束还会存在但看不到输出，封装了ForkJoinPool
* ForkJoinPool分叉合并线程池，RecursiveAction没有返回值所以不能join使用runnable，RecursiveTask<T>有返回值可以join，join本身是阻塞的，用于大规模数据计算
* ThreadPoolExecutor所有的线程池底层都是他实现的，可以用它做自定义线程池
* ParallelStreamAPI

## 参考资料

* [Java线程同步：synchronized锁住的是代码还是对象](https://blog.csdn.net/xiao__gui/article/details/8188833)
* [Java对象锁和类锁全面解析（多线程synchronized关键字）](https://blog.csdn.net/u013142781/article/details/51697672)
* [java synchronized同步方法调用另一个同步方法，锁机制问题](https://www.zhihu.com/question/19708552)
* [线程 3. 锁对象](https://www.jianshu.com/p/558bcbb2b300)