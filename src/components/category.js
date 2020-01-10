import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import styles from "./category.module.css"

export default () => {
  const data = useStaticQuery(graphql`
    query CategoryQuery {
      allMarkdownRemark {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
  `)

  const { nodes } = data.allMarkdownRemark
  const category = {}
  for (const node of nodes) {
    const { tags } = node.frontmatter
    if (tags) {
      const tagArr = tags.split(/\s+/)
      for (const tagItem of tagArr) {
        if (category[tagItem] === undefined) {
          category[tagItem] = 1
        } else {
          category[tagItem] += 1
        }
      }
    }
  }

  const categoryArr = []
  Object.keys(category).forEach(name => {
    let o = {}
    o.name = name
    o.num = category[name]
    categoryArr.push(o)
  })

  categoryArr.sort((a, b) => b.num - a.num)

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>分类</h3>
        <ul className={styles.menuList}>
          {categoryArr.map((item, index) => (
            <li key={index}>
              <a className={styles.menu} href={"/categories/" + item.name}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.tag}>{item.num}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
