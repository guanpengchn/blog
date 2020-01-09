import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import styles from "./bio.module.css"
import github from "../icon/github.svg"
import zhihu from "../icon/zhihu.svg"
import juejin from "../icon/juejin.svg"

export default () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author
          qrcode
          description
        }
      }
    }
  `)

  const { author, qrcode, description } = data.site.siteMetadata
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <img className={styles.qrcode} src={qrcode} alt=" Quinn" />
        <p className={styles.author}>{author}</p>
        <p className={styles.desc}>{description}</p>
        <section className={styles.platforms}>
          <a
            className={styles.platform}
            target="_blank"
            title="GitHub"
            href="https://github.com/guanpengchn"
          >
            <img className={styles.icon} alt="" src={github} />
          </a>

          <a
            className={styles.platform}
            target="_blank"
            title="Zhihu"
            href="https://www.zhihu.com/people/guan-peng-86-10"
          >
            <img className={styles.icon} alt="" src={zhihu} />
          </a>
          <a
            className={styles.platform}
            target="_blank"
            title="Juejin"
            href="https://juejin.im/user/59c3205b6fb9a00a532763e2"
          >
            <img className={styles.icon} alt="" src={juejin} />
          </a>
        </section>
      </div>
    </div>
  )
}
