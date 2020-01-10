import React from "react"
import { graphql } from "gatsby"

import Navbar from "../layout/navbar"
import SEO from "../components/seo"
import Footer from "../layout/footer"
import Detail from "../layout/detail"

export default ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <>
      <Navbar />
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Detail post={post} previous={previous} next={next} />
      <Footer />
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
      tableOfContents
    }
  }
`
