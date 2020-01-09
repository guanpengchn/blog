import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import "../styles/common.css"
import "../styles/bulma.min.css"

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
  return (
    <div className="column is-4-tablet is-4-desktop  is-hidden-touch is-hidden-desktop-only is-4-widescreen is-4-fullhd   has-order-3 column-right">
      <div className="card widget">
        <div className="card-content">
          <h3 className="menu-label">最新文章</h3>
          <article className="media">
            <a
              href="https://www.imkun.dev/archives/JAVA动态代理详解"
              className="media-left"
            >
              <p className="image is-64x64">
                <img
                  className="thumbnail"
                  src="https://www.imkun.dev/upload/2019/10/5cfc6e807953b67140-528da2e9b8344f66a47e51e80ba11b63.jpg"
                  alt="JAVA动态代理详解"
                />
              </p>
            </a>
            <div className="media-content">
              <div className="content">
                <div>
                  <time
                    className="has-text-grey is-size-7 is-uppercase"
                  >
                    Mon Dec 16
                  </time>
                </div>
                <a
                  href="https://www.imkun.dev/archives/JAVA动态代理详解"
                  className="title has-link-black-ter is-size-6 has-text-weight-normal"
                >
                  JAVA动态代理详解
                </a>
              </div>
            </div>
          </article>
          <article className="media">
            <a
              href="https://www.imkun.dev/archives/Java后端面试整理(3)"
              className="media-left"
            >
              <p className="image is-64x64">
                <img
                  className="thumbnail"
                  src="https://www.imkun.dev/upload/2019/10/niclas-illg-wzVQp_NRIHg-unsplash-5949fb35a3d642699d109230c0387047.jpg"
                  alt="Java后端面试整理(3)"
                />
              </p>
            </a>
            <div className="media-content">
              <div className="content">
                <div>
                  <time
                    className="has-text-grey is-size-7 is-uppercase"
                  >
                    Sun Oct 27
                  </time>
                </div>
                <a
                  href="https://www.imkun.dev/archives/Java后端面试整理(3)"
                  className="title has-link-black-ter is-size-6 has-text-weight-normal"
                >
                  Java后端面试整理(3)
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
