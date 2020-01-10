import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import CardContainer from "./cardContainer"

export default () => {
  const data = useStaticQuery(graphql`
    query NewQuery {
      allMarkdownRemark(limit: 5) {
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
    <div className="column is-4-tablet is-4-desktop  is-hidden-touch is-hidden-desktop-only is-4-widescreen is-4-fullhd   has-order-3 column-right">
      <CardContainer articles={articles} />
    </div>
  )
}
