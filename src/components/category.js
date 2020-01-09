import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import styles from "./category.module.css"

export default () => {
  // const data = useStaticQuery(graphql`
  //   query BioQuery {
  //     site {
  //       siteMetadata {
  //         author
  //         qrcode
  //       }
  //     }
  //   }
  // `)

  // const { author, qrcode } = data.site.siteMetadata
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>分类</h3>
        <ul className={styles.menuList}>
          <li>
            <a
              className={styles.menu}
              href="https://www.imkun.dev/categories/javascript"
            >
              <span className={styles.name}>javascript</span>
              <span className={styles.tag}>2</span>
            </a>
          </li>
          <li>
            <a
              className={styles.menu}
              href="https://www.imkun.dev/categories/1571288928251"
            >
              <span className={styles.name}>软件</span>
              <span className={styles.tag}>3</span>
            </a>
          </li>
          <li>
            <a
              className={styles.menu}
              href="https://www.imkun.dev/categories/css"
            >
              <span className={styles.name}>css</span>
              <span className={styles.tag}>1</span>
            </a>
          </li>
          <li>
            <a
              className={styles.menu}
              href="https://www.imkun.dev/categories/db"
            >
              <span className={styles.name}>db</span>
              <span className={styles.tag}>1</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
