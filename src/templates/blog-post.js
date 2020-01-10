import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Navbar from "../layout/navbar"
import SEO from "../components/seo"
import RecommendListCard from "../components/listCard/recommendListCard"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext

    return (
      <>
        <Navbar />
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <div className="outerContainer">
          <section className="section">
            <div className="container">
              <div className="columns">
                <div class="column is-12-tablet is-8-desktop is-8-widescreen is-8-fullhd has-order-2 column-main">
                  <div class="card">
                    <article>
                      <header>
                        <h1
                          style={{
                            marginBottom: 0,
                          }}
                        >
                          {post.frontmatter.title}
                        </h1>
                        <p
                          style={{
                            display: `block`,
                          }}
                        >
                          {post.frontmatter.date}
                        </p>
                      </header>
                      <section
                        dangerouslySetInnerHTML={{ __html: post.html }}
                      />
                      <hr />
                      <footer>
                        <Bio />
                      </footer>
                    </article>
                  </div>

                  <div class="card card-transparent">
                    <div class="level post-navigation is-flex-wrap is-mobile">
                      <div class="level-start">
                        <a
                          class="level level-item has-link-grey article-nav-prev"
                          href="https://www.imkun.dev/archives/Java 泛型中的E、T、K、V、N的基本含义"
                        >
                          <i class="level-item fas fa-chevron-left"></i>
                          {previous && (
                            <Link to={previous.fields.slug} rel="prev">
                              ← {previous.frontmatter.title}
                            </Link>
                          )}
                        </a>
                      </div>
                      <div class="level-end">
                        <a
                          class="level level-item has-link-grey article-nav-next"
                          href="https://www.imkun.dev/archives/Halo 新主题 Fantastic "
                        >
                          {next && (
                            <Link to={next.fields.slug} rel="next">
                              {next.frontmatter.title} →
                            </Link>
                          )}
                          <i class="level-item fas fa-chevron-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <RecommendListCard />
              </div>
            </div>
          </section>
        </div>
      </>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
