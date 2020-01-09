import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import styles from "./articles.module.css"

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
    <div class="column is-12-tablet is-12-desktop is-8-widescreen is-8-fullhd has-order-2 column-main">
      <div className="card">
        <div className="card-image">
          <a href="https://www.imkun.dev/archives/JAVA动态代理详解">
            <img
              className="thumbnail"
              src="https://www.imkun.dev/upload/2019/10/5cfc6e807953b67140-528da2e9b8344f66a47e51e80ba11b63.jpg"
              alt="JAVA动态代理详解"
            />
          </a>
        </div>
        <div className="card-content article " id="card-content">
          <div className="level article-meta is-size-7 is-uppercase is-mobile is-overflow-x-auto">
            <div className="level-left">
              <time className="level-item has-text-grey">Mon Dec 16</time>
              <div className="level-item">
                <a
                  className="has-link-grey -link"
                  href="https://www.imkun.dev/categories/java"
                >
                  Java
                </a>
                &nbsp;
              </div>
            </div>
          </div>
          <h1 className="title is-size-5 is-size-5-mobile has-text-weight-normal">
            <a
              className={styles.title}
              href="https://www.imkun.dev/archives/JAVA动态代理详解"
            >
              JAVA动态代理详解
            </a>
          </h1>

          <div id="is-hidden-touch" className={styles.content}>
            本文主要介绍Java中两种常见的动态代理方式：静态代理、JDK原生动态代理和CGLIB动态代理。
          </div>
          <div className="level is-mobile">
            <div className="level-start">
              <div className="level-item">
                <a
                  className="button is-size-7 is-light"
                  href="https://www.imkun.dev/archives/JAVA动态代理详解#more"
                >
                  阅读更多
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-image">
          <a href="https://www.imkun.dev/archives/Java后端面试整理(3)">
            <img
              className="thumbnail"
              src="https://www.imkun.dev/upload/2019/10/niclas-illg-wzVQp_NRIHg-unsplash-5949fb35a3d642699d109230c0387047.jpg"
              alt="Java后端面试整理(3)"
            />
          </a>
        </div>
        <div className="card-content article " id="card-content">
          <div className="level article-meta is-size-7 is-uppercase is-mobile is-overflow-x-auto">
            <div className="level-left">
              <time className="level-item has-text-grey">Sun Oct 27</time>
              <div className="level-item">
                <a
                  className="has-link-grey -link"
                  href="https://www.imkun.dev/categories/java"
                >
                  Java
                </a>
                &nbsp;
              </div>
            </div>
          </div>
          <h1 className="title is-size-5 is-size-5-mobile has-text-weight-normal">
            <a
              className={styles.title}
              href="https://www.imkun.dev/archives/Java后端面试整理(3)"
            >
              Java后端面试整理(3)
            </a>
          </h1>

          <div id="is-hidden-touch" className={styles.content}>
            范式分布式事务索引引擎扩展分片复制数据库系统原理什么是事务的ACID？原子性：事务被视为不可分割的最
          </div>
          <div className="level is-mobile">
            <div className="level-start">
              <div className="level-item">
                <a
                  className="button is-size-7 is-light"
                  href="https://www.imkun.dev/archives/Java后端面试整理(3)#more"
                >
                  阅读更多
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-transparent">
        <nav
          className="pagination is-centered"
          role="navigation"
          aria-label="pagination"
        >
          <div className="pagination-previous is-invisible is-hidden-mobile">
            <a
              className="is-flex-grow has-text-black-ter"
              href="https://www.imkun.dev/page/0"
            >
              上一页
            </a>
          </div>
          <div className="pagination-next">
            <a
              className="is-flex-grow has-text-black-ter"
              href="https://www.imkun.dev/page/2"
            >
              下一页
            </a>
          </div>
          <ul className="pagination-list is-hidden-mobile">
            <li>
              <a
                className="pagination-link is-current"
                href="https://www.imkun.dev/page/1"
              >
                1
              </a>
            </li>
            <li>
              <a
                className="pagination-link"
                href="https://www.imkun.dev/page/2"
              >
                2
              </a>
            </li>
            <li>
              <a
                className="pagination-link"
                href="https://www.imkun.dev/page/3"
              >
                3
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
