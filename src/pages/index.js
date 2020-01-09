import React from "react"

import SEO from "../components/seo"

import Navbar from "../layout/navbar"
import Content from "../layout/content"

import "../styles/common.css"
import "../styles/bulma.min.css"
import "../styles/slider.css"

class BlogIndex extends React.Component {
  render() {
    return (
      <>
        <SEO title="All posts" />
        <Navbar />
        <Content />
      </>
    )
  }
}

export default BlogIndex
