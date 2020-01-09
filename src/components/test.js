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
    <div class="card widget profile">

    </div>
  )
}
