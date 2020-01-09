import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Swiper from "react-id-swiper"

import styles from "./carousel.module.css"

import "swiper/css/swiper.css"

export default () => {
  // const data = useStaticQuery(graphql`
  //   query BioQuery {
  //     site {
  //       siteMetadata {
  //         author
  //         qrcode
  //       }
  //     }
  //   }
  // `)

  // const { author, qrcode } = data.site.siteMetadata
  const params = {
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false
    // },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    spaceBetween: 30,
    direction: "vertical"
  }
  return (
    <Swiper {...params}>
      <div className="blog-slider card">
        <div className="blog-slider__item">
          <div className="blog-slider__img">
            <a href="https://www.imkun.dev/archives/Fantastic 主题使用指南">
              <img
                src="https://www.imkun.dev/upload/2019/10/philipp-katzenberger-jVx8JaO2Ddc-unsplash-867676cd9aa04069ab8e5b0a25a6715d.jpg"
                alt="Fantastic 主题使用指南"
              />
            </a>
          </div>
          <div className="blog-slider__content">
            <span className="blog-slider__code">Tue Oct 1</span>
            <div className="blog-slider__title ">
              <a
                className="title is-5"
                href="https://www.imkun.dev/archives/Fantastic 主题使用指南"
              >
                Fantastic 主题使用指南
              </a>
            </div>
            <div className="blog-slider__text" content="">
              基本使用说明个性化设置文章设置文章分享组件自定义链接基本使用说明置顶文章显示只需要把文章设置为置顶即
            </div>
            <a
              href="https://www.imkun.dev/archives/Fantastic 主题使用指南"
              className="blog-slider__button"
            >
              阅读更多
            </a>
          </div>
        </div>
      </div>
      <div className="blog-slider card">
        <div className="blog-slider__item">
          <div className="blog-slider__img">
            <a href="https://www.imkun.dev/archives/Halo 新主题 Fantastic ">
              <img
                src="https://www.imkun.dev/upload/2019/10/Screen%20Shot%202019-10-19%20at%2010.37.30-adf67d050f514dc296f529fff1884fcc.png"
                alt="Halo 新主题 Fantastic "
              />
            </a>
          </div>
          <div className="blog-slider__content">
            <span className="blog-slider__code">Tue Oct 1</span>
            <div className="blog-slider__title ">
              <a
                className="title is-5"
                href="https://www.imkun.dev/archives/Halo 新主题 Fantastic "
              >
                Halo 新主题 Fantastic{" "}
              </a>
            </div>
            <div className="blog-slider__text" content="">
              预览地址访问预览截图使用方法克隆或者下载。压缩为zip压缩包之后在后台的主题设置直接上传即可使用。用
            </div>
            <a
              href="https://www.imkun.dev/archives/Halo 新主题 Fantastic "
              className="blog-slider__button"
            >
              阅读更多
            </a>
          </div>
        </div>
      </div>
    </Swiper>
  )
}
