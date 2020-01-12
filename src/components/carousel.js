import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Swiper from "react-id-swiper"

// import styles from "./carousel.module.css"

export default () => {
  const data = useStaticQuery(graphql`
    query CarouselQuery {
      allMarkdownRemark(
        filter: { frontmatter: { isTop: { eq: true } } }
        limit: 5
      ) {
        nodes {
          excerpt(truncate: true, pruneLength: 30)
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

  const { nodes } = data.allMarkdownRemark

  const articles = nodes.map(node => {
    const { excerpt } = node
    const { date, title, cover, tag } = node.frontmatter
    const { slug } = node.fields
    return { date, title, cover, tag, excerpt, slug }
  })

  const [direction, setDirection] = useState("vertical")

  useEffect(() => {
    if (window.innerWidth < 768) {
      setDirection("horizontal")
    } else {
      setDirection("vertical")
    }
  }, [])

  if (typeof window !== "undefined") {
    window.onresize = function() {
      if (window.innerWidth < 768) {
        setDirection("horizontal")
      } else {
        setDirection("vertical")
      }
    }
  }

  const params = {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    rebuildOnUpdate: true,
  }

  return (
    <Swiper {...params} direction={direction}>
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
