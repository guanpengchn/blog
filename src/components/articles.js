import React, { useState } from "react"

import styles from "./articles.module.css"
import Pagination from "./pagination"
import { INDEX_PAZE_SIZE } from "../utils/constrant"

export default ({ posts }) => {
  const numPages = Math.ceil(posts.length / INDEX_PAZE_SIZE)
  const [currentPage, setCurrentPage] = useState(1)

  const start = (currentPage - 1) * INDEX_PAZE_SIZE
  const end = currentPage * INDEX_PAZE_SIZE

  const articles = posts.slice(start, end).map(node => {
    const { excerpt } = node
    const { date, title, cover, tag } = node.frontmatter
    const { slug } = node.fields
    return { date, title, cover, tag, excerpt, slug }
  })

  const handleChangePage = (e, currentPage) => {
    setCurrentPage(currentPage)
  }

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
            <div className="level article-meta is-size-7 is-mobile is-overflow-x-auto">
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

            <div id="is-hidden-touch " className="content is-hidden-touch">
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

      <Pagination
        numPages={numPages}
        currentPage={currentPage}
        onChange={handleChangePage}
      />
    </div>
  )
}
