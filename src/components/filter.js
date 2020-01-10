import React from "react"
// import { useStaticQuery, graphql } from "gatsby"

import styles from "./filter.module.css"

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
    <div className={styles.container}>
      <div className={styles.tabs}>
        <ul>
          <li className="is-active">
            <a alt="" href="/">
              全部
            </a>
          </li>
          <li>
            <a alt="" href="https://www.imkun.dev/categories/javascript">
              javascript
            </a>
          </li>
          <li>
            <a alt="" href="https://www.imkun.dev/categories/1571288928251">
              软件
            </a>
          </li>
          <li>
            <a alt="" href="https://www.imkun.dev/categories/css">
              css
            </a>
          </li>
          <li>
            <a alt="" href="https://www.imkun.dev/categories/db">
              db
            </a>
          </li>
          <li>
            <a alt="" href="https://www.imkun.dev/categories/spring-boot">
              Spring Boot
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
