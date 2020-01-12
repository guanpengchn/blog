---
title: golang和java中的shuffle
date: 2018-08-10
tag: 笔记
cover: https://imgkr.cn-bj.ufileos.com/9bda0377-12ca-417b-a8c9-380e48834ade.png
---

## golang和java中的shuffle

有篇文章中讲了[golang中shuffle的使用](https://yourbasic.org/golang/shuffle-slice-array/)
代码如下：

```golang
a := []int{1, 2, 3, 4, 5, 6, 7, 8}
rand.Seed(time.Now().UnixNano())
rand.Shuffle(len(a), func(i, j int) { a[i], a[j] = a[j], a[i] })
```

结果

```
[5 8 6 4 3 7 2 1]
```

golang-1.10中[shuffle](https://github.com/golang/go/blob/master/src/math/rand/rand.go)的实现

```golang
// Shuffle pseudo-randomizes the order of elements.
// n is the number of elements. Shuffle panics if n < 0.
// swap swaps the elements with indexes i and j.
func (r *Rand) Shuffle(n int, swap func(i, j int)) {
	if n < 0 {
		panic("invalid argument to Shuffle")
	}

	// Fisher-Yates shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
	// Shuffle really ought not be called with n that doesn't fit in 32 bits.
	// Not only will it take a very long time, but with 2³¹! possible permutations,
	// there's no way that any PRNG can have a big enough internal state to
	// generate even a minuscule percentage of the possible permutations.
	// Nevertheless, the right API signature accepts an int n, so handle it as best we can.
	i := n - 1
	for ; i > 1<<31-1-1; i-- {
		j := int(r.Int63n(int64(i + 1)))
		swap(i, j)
	}
	for ; i > 0; i-- {
		j := int(r.int31n(int32(i + 1)))
		swap(i, j)
	}
}
```

golang的实现和java有很大区别，下面看下java的实现

```java
public static void shuffle(List<?> list) {
    Random rnd = r;
    if (rnd == null) {
        r = rnd = new Random();
    }

    shuffle(list, rnd);
}

public static void shuffle(List<?> list, Random rnd) {
    int size = list.size();
    if (size >= 5 && !(list instanceof RandomAccess)) {
        Object[] arr = list.toArray();

        for(int i = size; i > 1; --i) {
            swap(arr, i - 1, rnd.nextInt(i));
        }

        ListIterator it = list.listIterator();

        for(int i = 0; i < arr.length; ++i) {
            it.next();
            it.set(arr[i]);
        }
    } else {
        for(int i = size; i > 1; --i) {
            swap(list, i - 1, rnd.nextInt(i));
        }
    }

}
```

首先获取集合的元素个数，如果小于`5`个或者实现了`RandomAccess`接口，就循环一遍，随机交换集合中两个相邻的元素的位置，`RandomAccess`是一个标记接口，如果实现了这个接口就表示支持快速的随机访问操作，类似于数组。

如果大于等于`5`个元素也没有实现`RandomAccess`接口，那么就转为数组，之后也是循环，随机交换集合中两个相邻的元素的位置，最后再将数组放回原来的list中。

之所以做这样的区别是和速度有关系，其中涉及到了RandomAccess这个类，有篇[文章](https://juejin.im/post/5a26134af265da43085de060)讲了这个类的用处

ArrayList实现了RandomAccess，而LinkedList没实现这个接口，所以ArrayList是做直接的下标遍历，而LinkedList是先转成Array结构，再用下标遍历
