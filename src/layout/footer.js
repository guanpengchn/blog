import React from "react"

import styles from "./footer.module.css"
import link from "../icon/link.svg"
import leetcode from "../icon/leetcode.svg"
import chat from "../icon/chat.svg"

export default () => {
  return (
    <div className={styles.container}>
      <div className={styles.moreContainer}>
        <h2>更多产品</h2>
        <div className={styles.row}>
          <img alt="" src={chat} className={styles.icon} />
          <a
            rel="noopener noreferrer"
            href="https://mdnice.com/"
            target="_blank"
          >
            微信公众号排版工具
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
            href="https://draw.mdnice.com/algorithm/"
            target="_blank"
          >
            力扣刷题
          </a>
        </div>
      </div>
      <div className={styles.noticeContainer}>
        <h2>注意</h2>
        <p>请勿评论或发表不当言论，违者后果自负。</p>
        <p>
          Copyright Ⓒ 2019-2020 drawcode. All rights reserved.
        </p>
      </div>
    </div>
  )
}