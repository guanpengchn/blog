---
title: 画解算法：面试题3. 数组中重复的数字
date: 2020-02-12
tag: 剑指offer
cover: https://imgkr.cn-bj.ufileos.com/4b6c21d9-0892-4339-b9df-34f37cfe8688.png
---

## 题目链接

https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/

## 题目描述

找出数组中重复的数字。

在一个长度为 n 的数组 nums 里的所有数字都在 0 ～ n-1 的范围内。数组中某些数字是重复的，  
但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个  
重复的数字。

**示例 1：**

```
输入：
[2, 3, 1, 0, 2, 5, 3]
输出：2 或 3
```

**限制：**

`2 <= n <= 100000`

## 解题方案

### 思路 1

- 标签：哈希
- 使用 HashSet 来进行处理，因为 HashSet 本身不允许出现重复元素，所以**当添加元素失败或已经包含该数字时**，则表示出现了重复元素，将其返回即可。思路较为简单，就不给图了
- 时间复杂度：O(n)，空间复杂度：O(n)

### 代码 1

- Java 版本

```Java
class Solution {
    public int findRepeatNumber(int[] nums) {
        Set<Integer> numsSet = new HashSet<>();
        for(int num: nums) {
            if(!numsSet.add(num)) {
                return num;
            }
        }
        return -1;
    }
}
```

- JavaScript 版本

```JavaScript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    const numsSet = new Set();
    for(const num of nums) {
        if(numsSet.has(num)) {
            return num;
        } else {
            numsSet.add(num);
        }
    }
    return -1;
};
```

### 思路 2

- 标签：哈希
- 从题目描述中我们可以看出，因为所有数字都在 0 ～ n-1 的范围内，其实完全可以省掉额外的空间开辟，将每个位置的数交换映射到其对应的数组下标下面，当出现新的元素与其对应的下标中的数字相等时，即为重复数字
- 这本质还是哈希的思想，思路 1 是使用库函数申请额外空间，思路 2 则是数组本身做哈希表，达到了节省空间的目的
- 此处会用到 while 循环，原因是保证交换过来的新元素位置也要正确
- 时间复杂度：O(n)，空间复杂度：O(1)

### 代码 2

- Java 版本

```Java
class Solution {
    public int findRepeatNumber(int[] nums) {
        int len = nums.length;
        for (int i = 0; i < len; i++) {
            while (nums[i] != i) {
                if (nums[i] == nums[nums[i]]) {
                    return nums[i];
                }
                int temp = nums[i];
                nums[i] = nums[temp];
                nums[temp] = temp;
            }
        }
        return -1;
    }
}
```

- JavaScript 版本

```JavaScript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    const len = nums.length;
    for (let i = 0; i < len; i++) {
        while (nums[i] != i) {
            if (nums[i] == nums[nums[i]]) {
                return nums[i];
            }
            const temp = nums[i];
            nums[i] = nums[temp];
            nums[temp] = temp;
        }
    }
    return -1;
};
```

### 画解 2

![offer3-1](https://imgkr.cn-bj.ufileos.com/99c767e0-5f31-480b-990d-6adee52ae7f4.png)
![offer3-2](https://imgkr.cn-bj.ufileos.com/a7a0e4f6-205a-469d-ac46-e3db7276c7f3.png)
![offer3-3](https://imgkr.cn-bj.ufileos.com/c999f836-7092-481e-8d01-f06ddb0e4bc3.png)
![offer3-4](https://imgkr.cn-bj.ufileos.com/4b6c21d9-0892-4339-b9df-34f37cfe8688.png)

<span style="display:block;text-align:center;">后台回复「<strong>算法</strong>」，加入天天算法群</span>
<span style="display:block;text-align:center;">觉得算法直击灵魂，欢迎点击<strong>在看</strong>和<strong>转发</strong></span>

![](https://imgkr.cn-bj.ufileos.com/741c4d5c-cfb4-43d9-858b-146661b590df.gif)
