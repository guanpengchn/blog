import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import CardContainer from "./cardContainer"
import {convert2Articles} from "../../utils/helper"

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
            tag
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  const articles = convert2Articles(data);

  return (
    <div className="column is-4-tablet is-4-desktop  is-hidden-touch is-hidden-desktop-only is-4-widescreen is-4-fullhd   has-order-3 column-right">
      <CardContainer articles={articles} title="热门文章"/>
    </div>
  )
}
