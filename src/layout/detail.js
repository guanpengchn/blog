import React, { useEffect } from "react"
import { Link } from "gatsby"

import CardContainer from "../components/listCard/cardContainer"
import Toc from "../components/toc"
import styles from "./detail.module.css"
import dateIcon from "../icon/date.svg"

import "gitalk/dist/gitalk.css"
import Gitalk from "gitalk"

export default ({ post, previous, next, recommendArticles }) => {
  useEffect(() => {
    const gitalk = new Gitalk({
      clientID: "1850aa2b9accc8cfb5cf",
      clientSecret: "237c3a5d73fd9b22e43ea1d76cb4d6e2e973b1a0",
      repo: "blog-comment",
      owner: "guanpengchn",
      admin: ["guanpengchn"],
      id: post.fields.slug, // Ensure uniqueness and length less than 50
      distractionFreeMode: false, // Facebook-like distraction free mode
    })

    gitalk.render("gitalk-container")
  })

  return (
    <div className="outerContainer">
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-12-tablet is-8-desktop is-8-widescreen is-8-fullhd has-order-1 column-main">
              <div className="card">
                <article className={styles.article}>
                  <header className={styles.header}>
                    <h1 className={styles.title}>{post.frontmatter.title}</h1>
                    <div className={styles.tagContainer}>
                      <div className={styles.dateContainer}>
                        <img className={styles.icon} alt="" src={dateIcon} />
                        <p className={styles.date}>{post.frontmatter.date}</p>
                      </div>
                      <div className={styles.analysisContainer}>
                        <span id="busuanzi_container_page_pv">
                          本文总阅读量：
                          <span id="busuanzi_value_page_pv"></span>次
                        </span>
                      </div>
                    </div>
                  </header>
                  <section
                    id="articleDetail"
                    dangerouslySetInnerHTML={{ __html: post.html }}
                  />
                </article>
              </div>

              <div className="card card-transparent">
                <div className="level post-navigation is-flex-wrap is-mobile">
                  <div className="level-start">
                    {previous && (
                      <Link
                        className={styles.link}
                        to={previous.fields.slug}
                        rel="prev"
                      >
                        ← {previous.frontmatter.title}
                      </Link>
                    )}
                  </div>
                  <div className="level-end">
                    {next && (
                      <Link
                        className={styles.link}
                        to={next.fields.slug}
                        rel="next"
                      >
                        {next.frontmatter.title} →
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div className="card">
                <div id="gitalk-container"></div>
              </div>
            </div>

            <div className="column is-4-tablet is-4-desktop  is-hidden-touch is-4-widescreen is-3-fullhd has-order-2 column-right">
              <CardContainer articles={recommendArticles} title="相关文章" />
              {post.tableOfContents && <Toc post={post} />}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
