import React from "react"
import { Link } from "gatsby"

import styles from "./articles.module.css"

export default ({ posts, currentPage, numPages }) => {
  const articles = posts.map(node => {
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

  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

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
          {!isFirst && (
            <div className="pagination-previous">
              <Link to={prevPage} rel="prev">
                上一页
              </Link>
            </div>
          )}

          {!isLast && (
            <div className="pagination-next">
              <Link to={nextPage} rel="next">
                下一页
              </Link>
            </div>
          )}

          <ul className="pagination-list is-hidden-mobile">
            {Array.from({ length: numPages }, (_, i) => (
              <li
                key={`pagination-number${i + 1}`}
                style={{
                  margin: 0,
                }}
              >
                <Link
                  to={`/${i === 0 ? "" : i + 1}`}
                  className="pagination-link"
                  style={{
                    textDecoration: "none",
                    color: i + 1 === currentPage ? "#ffffff" : "",
                    background: i + 1 === currentPage ? "#007acc" : "",
                  }}
                >
                  {i + 1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
