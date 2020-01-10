import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Swiper from "react-id-swiper"

// import styles from "./carousel.module.css"

import "swiper/css/swiper.css"

export default () => {
  const data = useStaticQuery(graphql`
    query CarouselQuery {
      allMarkdownRemark(limit: 3) {
        nodes {
          excerpt(truncate: true, pruneLength: 40)
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            isTop
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

  const articles = nodes
    .filter(node => node.frontmatter.isTop)
    .map(node => {
      const { excerpt } = node
      const { date, title, cover, tags, isTop } = node.frontmatter
      const { slug } = node.fields
      let tag = ""
      if (tags) {
        const tagArr = tags.split(/\s+/)
        if (tagArr) {
          tag = tagArr[0]
        }
      }
      return { date, title, cover, tag, excerpt, isTop, slug }
    })
    
  const params = {
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    spaceBetween: 30,
    direction: "vertical",
  }
  return (
    <Swiper {...params}>
      {articles.map((article, index) => (
        <div className="blog-slider card" key={index}>
          <div className="blog-slider__item">
            <div className="blog-slider__img">
              <a href={article.slug}>
                <img src={article.cover} alt={article.title} />
              </a>
            </div>
            <div className="blog-slider__content">
              <span className="blog-slider__code">{article.date}</span>
              <div className="blog-slider__title ">
                <a className="title is-5" href={article.slug}>
                  {article.title}
                </a>
              </div>
              <div className="blog-slider__text" content="">
                {article.excerpt}
              </div>
              <a href={article.slug} className="blog-slider__button">
                阅读更多
              </a>
            </div>
          </div>
        </div>
      ))}
    </Swiper>
  )
}
