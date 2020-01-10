import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import styles from "./articles.module.css"

export default () => {
  const data = useStaticQuery(graphql`
    query ArticlesQuery {
      allMarkdownRemark(limit: 10) {
        nodes {
          excerpt(truncate: true, pruneLength: 40)
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            cover
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  const { nodes } = data.allMarkdownRemark

  const articles = nodes.map(node => {
    const { excerpt } = node
    const { date, title, cover, tags } = node.frontmatter
    const { slug } = node.fields
    let tag = ""
    if (tags) {
      const tagArr = tags.split(/\s+/)
      if (tagArr) {
        tag = tagArr[0]
      }
    }
    return { date, title, cover, tag, excerpt, slug }
  })

  return (
    <div className="column is-12-tablet is-12-desktop is-8-widescreen is-8-fullhd has-order-2 column-main">
      {articles.map((article, index) => (
        <div className="card" key={index}>
          <div className="card-image">
            <a href={article.slug}>
              <img
                className="thumbnail"
                src={article.cover}
                alt={article.title}
              />
            </a>
          </div>
          <div className="card-content article " id="card-content">
            <div className="level article-meta is-size-7 is-uppercase is-mobile is-overflow-x-auto">
              <div className="level-left">
                <time className="level-item has-text-grey">{article.date}</time>
                <div className="level-item">
                  <a
                    className="has-link-grey -link"
                    href={"/categories/" + article.tag}
                  >
                    {article.tag}
                  </a>
                </div>
              </div>
            </div>
            <h1 className="title is-size-5 is-size-5-mobile has-text-weight-normal">
              <a className={styles.title} href={article.slug}>
                {article.title}
              </a>
            </h1>

            <div id="is-hidden-touch" className={styles.content}>
              {article.excerpt}
            </div>
            <div className="level is-mobile">
              <div className="level-start">
                <div className="level-item">
                  <a className="button is-size-7 is-light" href={article.slug}>
                    阅读更多
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

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
