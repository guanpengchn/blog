import React from "react"

import SEO from "../components/seo"

import Navbar from "../layout/navbar"
import Content from "../layout/content"
import Footer from "../layout/footer"

class BlogIndex extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.nodes
    const { currentPage, numPages } = this.props.pageContext

    return (
      <>
        <SEO title="All posts" />
        <Navbar />
        <Content posts={posts} currentPage={currentPage} numPages={numPages}/>
        <Footer />
      </>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
`
