import React from "react"

import SEO from "../components/seo"

import Navbar from "../layout/navbar"
import Category from "../layout/category"
import Footer from "../layout/footer"
import { convert2Articles, sortArticles } from "../utils/helper"

export default ({ data }) => {
  const articles = convert2Articles(data)
  const sortedArticles = sortArticles(articles)

  return (
    <>
      <SEO title="专栏" />
      <Navbar />
      <Category articles={sortedArticles} />
      <Footer />
    </>
  )
}

export const pageQuery = graphql`
  query blogColumnQuery($tag: String!) {
    allMarkdownRemark(filter: { frontmatter: { tag: { eq: $tag } } }) {
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
`
