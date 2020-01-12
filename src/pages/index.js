import React from "react"

import SEO from "../components/seo"

import Navbar from "../layout/navbar"
import Content from "../layout/content"
import Footer from "../layout/footer"

export default ({ data }) => {
  const posts = data.allMarkdownRemark.nodes
  
  return (
    <>
      <SEO title="首页" />
      <Navbar />
      <Content posts={posts} />
      <Footer />
    </>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt(truncate: true, pruneLength: 50)
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
