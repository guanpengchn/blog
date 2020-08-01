import React from "react"

import styles from "./footer.module.css"
import link from "../icon/link.svg"
import leetcode from "../icon/leetcode.svg"
import chat from "../icon/chat.svg"
import egg from "../icon/egg.svg"

export default () => {
  return (
    <div className={styles.container}>
      <div className={styles.openContainer}>
        <h2>我的开源</h2>
        <div className={styles.row}>
          <span className={styles.star}>Star 1.2k+ </span>
          <a
            rel="noopener noreferrer"
            href="https://github.com/mdnice/markdown-nice"
            target="_blank"
          >
            微信公众号排版工具
          </a>
        </div>
        <div className={styles.row}>
          <span className={styles.star}>Star 900+ </span>
          <a
            rel="noopener noreferrer"
            href="https://github.com/guanpengchn/awesome-books"
            target="_blank"
          >
            免费高清电子书
          </a>
        </div>
        <div className={styles.row}>
          <span className={styles.star}>Star 200+ </span>
          <a
            rel="noopener noreferrer"
            href="https://github.com/mdnice/markdown-resume"
            target="_blank"
          >
            Markdown 简历排版
          </a>
        </div>
        <div className={styles.row}>
          <span className={styles.star}>Star 100+ </span>
          <a
            rel="noopener noreferrer"
            href="https://github.com/guanpengchn/github-annual-report"
            target="_blank"
          >
            GitHub 年度代码报告
          </a>
        </div>
        <div className={styles.row}>
          <span className={styles.star}>Star 100+ </span>
          <a
            rel="noopener noreferrer"
            href="https://github.com/guanpengchn/blog"
            target="_blank"
          >
            博客源码
          </a>
        </div>
        
      </div>
      <div className={styles.moreContainer}>
        <h2>更多产品</h2>
        <div className={styles.row}>
          <img alt="" src={chat} className={styles.icon} />
          <a
            rel="noopener noreferrer"
            href="https://www.mdnice.com/"
            target="_blank"
          >
            mdnice 社区
          </a>
        </div>
        <div className={styles.row}>
          <img alt="" src={egg} className={styles.icon} />
          <a
            rel="noopener noreferrer"
            href="https://imgkr.com/"
            target="_blank"
          >
            图壳图床
          </a>
        </div>
        <div className={styles.row}>
          <img alt="" src={link} className={styles.icon} />
          <a
            rel="noopener noreferrer"
            href="https://urlify.cn/"
            target="_blank"
          >
            短链接生成
          </a>
        </div>
        <div className={styles.row}>
          <img alt="" src={leetcode} className={styles.icon} />
          <a
            rel="noopener noreferrer"
            href="https://draw.mdnice.com/algorithm/intro/"
            target="_blank"
          >
            力扣刷题
          </a>
        </div>
      </div>
      <div className={styles.noticeContainer}>
        <h2>注意</h2>
        <p>请勿评论或发表不当言论，违者后果自负。</p>
        <p>Copyright Ⓒ 2019-2020 mdnice. All rights reserved.</p>
        <p>
          <span id="busuanzi_container_site_pv">
            本站总访问量 <span id="busuanzi_value_site_pv"></span> 次
          </span>
        </p>
      </div>
    </div>
  )
}
