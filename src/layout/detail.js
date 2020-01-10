import React, { useEffect } from "react"
import { Link } from "gatsby"

import RecommendListCard from "../components/listCard/recommendListCard"
import Toc from "../components/toc"
import styles from "./detail.module.css"

import "gitalk/dist/gitalk.css"
import Gitalk from "gitalk"

export default ({ post, previous, next }) => {
  useEffect(() => {
    const gitalk = new Gitalk({
      clientID: "1850aa2b9accc8cfb5cf",
      clientSecret: "237c3a5d73fd9b22e43ea1d76cb4d6e2e973b1a0",
      repo: "blog-comment",
      owner: "guanpengchn",
      admin: [
        "guanpengchn",
      ],
      id: post.fields.slug,      // Ensure uniqueness and length less than 50
      distractionFreeMode: false, // Facebook-like distraction free mode
    })

    gitalk.render("gitalk-container")
  })

  return (
    <div className="outerContainer">
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-12-tablet is-8-desktop is-8-widescreen is-8-fullhd has-order-2 column-main">
              <div className="card">
                <article className={styles.article}>
                  <header className={styles.header}>
                    <h1 className={styles.title}>{post.frontmatter.title}</h1>
                    <p className={styles.date}>{post.frontmatter.date}</p>
                  </header>
                  <section dangerouslySetInnerHTML={{ __html: post.html }} />
                  <hr />
                </article>
              </div>

              <div className="card card-transparent">
                <div className="level post-navigation is-flex-wrap is-mobile">
                  <div className="level-start">
                    {previous && (
                      <Link to={previous.fields.slug} rel="prev">
                        ← {previous.frontmatter.title}
                      </Link>
                    )}
                  </div>
                  <div className="level-end">
                    {next && (
                      <Link to={next.fields.slug} rel="next">
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

            <div className="column is-4-tablet is-4-desktop  is-hidden-touch is-hidden-desktop-only is-4-widescreen is-4-fullhd   has-order-3 column-right">
              <Toc post={post} />
              <RecommendListCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
