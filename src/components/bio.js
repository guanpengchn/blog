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
          social {
            github
            zhihu
            juejin
          }
        }
      }
    }
  `)

  const { author, qrcode, description, social } = data.site.siteMetadata
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
            rel="noopener noreferrer"
            title="GitHub"
            href={social.github}
          >
            <img className={styles.icon} alt="" src={github} />
          </a>

          <a
            className={styles.platform}
            target="_blank"
            rel="noopener noreferrer"
            title="Zhihu"
            href={social.zhihu}
          >
            <img className={styles.icon} alt="" src={zhihu} />
          </a>
          <a
            className={styles.platform}
            target="_blank"
            rel="noopener noreferrer"
            title="Juejin"
            href={social.juejin}
          >
            <img className={styles.icon} alt="" src={juejin} />
          </a>
        </section>
      </div>
    </div>
  )
}
