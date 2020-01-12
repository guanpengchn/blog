import React from "react"

import styles from "./category.module.css"

export default ({ articles }) => {
  const tag = articles[0].tag

  return (
    <div className="outerContainer">
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <h2 className={styles.tag}>{tag}</h2>

                <ul className={styles.ul}>
                  {articles.map((article, index) => (
                    <li className={styles.li} key={index}>
                      <span className={styles.item}>
                        <span className={styles.title}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={article.slug}
                            className={styles.slug}
                          >
                            {article.title}
                          </a>
                        </span>
                        <span className={styles.row}>
                          <span className={styles.date}>{article.date}</span>
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
