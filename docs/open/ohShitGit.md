之前看过一个特别有趣的网站 - [Oh shit, git!](http://ohshitgit.com/ "Oh shit, git!")

这个网站上面整理了一些 Git 新手在使用 Git 时常会遇到的各种突发状况，并贴心的给出了应对方案。

我大致瞄了一眼，文章里面提到的一些问题，大部分新手确实会经常遇到，我简单翻译了一下，希望对你有所帮助。

> 注：为了使场景描述更加生动，因此加入了新手女神与高级舔狗两个角色来配合讲解


**女神：哎呀，刚刚有个地方搞错了，怎么重新来过呢？**

女神莫慌，Git 的牛逼之处，在于它自带时光机效果，能让你在项目的历史代码中任意穿梭。

如果项目的某一处地方它自己不小心坏掉了，不妨试下下面的这行命令：

```bash
$ git reflog
```

这条命令能列出你在 Git 上的所有操作记录，你只要找到 HEAD@{index} 前面所对应的操作索引，并使用下面命令即可：

```bash
$ git reset HEAD@{index}
```

> 注：使用时需将HEAD@{index}替换为对应索引。

**女神：想改个小东西，但代码不小心提交（commit）了，这可咋整？**

这个简单，首先，添加下当前已改动的代码：

```bash
$ git add .
```

然后，运行下面这条命令，它就会把你刚刚添加的代码合并到最后一次提交上了：

```bash
$ git commit --amend
```

**女神：哼！刚刚写的提交历史写得不够好，我想重写一下！**

好的，还是上面提到过的那条代码，运行一下，就可以重写提交历史啦：

```bash
$ git commit --amend
```

**女神：这下惨了，我刚刚不小心把新分支的代码提交到主分支上了！**

女神别着急，我们一步步来，你先创建个新分支（some-new-branch-name）：

```bash
$ git branch some-new-branch-name
```

然后把刚才的提交从主分支中移除：

```bash
$ git reset HEAD~ --hard
```

需要注意的是，上面的代码只会切换到最后一条提交记录上，如果你已跑到其它提交记录上怎么办？没关系，你可以用 git reset HEAD@{number} 再跑回来。

等你跑回来之后，我们再切换到新分支上：

```bash
$ git checkout some-new-branch-name
```

好了，完成啦，现在主分支干干净净，刚刚不小心提交的代码也被移到新分支上了。

需要注意的是，上面的代码只对本地仓库有效，如果你已经把代码提交到远程仓库上，那就得跟队友商量下解决方案了。

啥？我就是你队友？这可真让我受宠若惊！不过没事，等下我帮你在线上主分支上 reset 然后 push -f 一下就好啦~

**女神：完蛋了，我把代码提交到错误的分支上了！**

别怕别怕，有我在呢。

我们先撤销最后一次提交，但保留变更代码：

```bash
$ git reset HEAD~ --soft
$ git stash
```

再切到你想要提交的正确分支（name-of-the-correct-branch）上，并把变更代码提交上去：

```bash
$ git checkout name-of-the-correct-branch
$ git stash pop
$ git add .
$ git commit -m "your message here"
```

OK，到这里就搞定了。如果想要逼格高点，也可以用 `cherry-pick` 这个命令来完成上面那些操作。具体的操作步骤如下。

首先，切换到正确的分支上：

```bash
$ git checkout name-of-the-correct-branch
```

然后使用 cherry-pick 来获取最新一条提交记录：

```bash
$ git cherry-pick master
```

最后再把主分支上那条提交错误的记录删除：

```bash
$ git checkout master
$ git reset HEAD~ —-hard
```

**女神：咦？为啥我运行 diff 后啥都没有？**

遇到这种情况，应该是文件没有加入到暂存区的缘故。解决方案很简单，咱们要么把文件加入到暂存区，要么就直接使用下面这条命令：

```bash
$ git diff --staged
```

这样，就可以看到未存入暂存区文件的 diff 效果啦。

**女神：这项目怎么这么乱！好烦呐！我不玩了！**

别气别气，别气坏了身子就不好了，么么哒  

如果本地代码仓库把自己折腾得乱七八糟，不用怕，用下面这招，一击必杀：

```bash
$ cd ..
$ sudo rm -r fucking-git-repo-dir
$ git clone https://some.github.url/fucking-git-repo-dir.git
$ cd fucking-git-repo-dir
```

是的，这就是备胎（线上仓库）的强大之处，只要你备胎尚在，你就可以大大方方的把本地仓库删了，clone 备胎，从头再来。

**女神：好啦，我没什么问题了，谢谢你哦~**

不不不，这块问题还多着呢？扫描下方二维码，听我跟你细细道来…

<span style="display:block;text-align:center;">作者：GitHub Daily</span>
<span style="display:block;text-align:center;">来源：知乎</span>

![](https://i.loli.net/2019/05/20/5ce23b33cc01d73486.gif)