import React from "react"
import { graphql } from "gatsby"

import Navbar from "../layout/navbar"
import SEO from "../components/seo"
import Footer from "../layout/footer"
import Detail from "../layout/detail"

import {convert2Articles} from "../utils/helper"

export default ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext
  const recommendArticles = convert2Articles(data)

  return (
    <>
      <Navbar />
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Detail
        post={post}
        previous={previous}
        next={next}
        recommendArticles={recommendArticles}
      />
      <Footer />
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $tag: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
      fields {
        slug
      }
      tableOfContents(maxDepth: 3)
    }
    allMarkdownRemark(
      filter: { frontmatter: { tag: { eq: $tag } } }
      limit: 5
    ) {
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
