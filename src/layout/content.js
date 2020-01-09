import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Bio from "../components/bio"
import Category from "../components/category"
import Carousel from "../components/carousel"
import Articles from "../components/articles"
import Newest from "../components/newest"
import Filter from "../components/filter"

import "../styles/common.css"
import "../styles/bulma.min.css"

import styles from "./content.module.css"

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
            }
          }
        }
      }
    }
  `)
  const posts = data.allMarkdownRemark.edges
  // {posts.map(({ node }) => {
  //   const title = node.frontmatter.title || node.fields.slug
  //   return (
  //     <article key={node.fields.slug}>
  //       <header>
  //         <h3>
  //           <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
  //             {title}
  //           </Link>
  //         </h3>
  //         <small>{node.frontmatter.date}</small>
  //       </header>
  //       <section>
  //         <p
  //           dangerouslySetInnerHTML={{
  //             __html: node.frontmatter.description || node.excerpt,
  //           }}
  //         />
  //       </section>
  //     </article>
  //   )
  // })}
  return (
    <div className="outerContainer">
      <section className={styles.section}>
        <div className="container">
          <div className="columns">
            <div className="column is-8-tablet is-8-desktop is-9-widescreen is-9-fullhd has-order-2 column-main">
              <div className="columns">
                <div className="column is-12-tablet is-12-desktop is-12-widescreen has-order-2 column-main">
                  <Carousel />
                  <Filter />
                  <div className="level">
                    <div className="columns">
                      <Articles />
                      <Newest />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="column is-4-tablet is-4-desktop  is-3-widescreen has-order-1 column-left">
              <Bio />
              <Category />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
