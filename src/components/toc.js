import React, { useEffect } from "react"

import styles from "./toc.module.css"

export default ({ post }) => {
  useEffect(() => {
    const listener = () => {
      let text
      let distance = Number.MAX_SAFE_INTEGER

      const articleDetail = document.getElementById("articleDetail")
      const heading2Arr = articleDetail.getElementsByTagName("h2")
      for (const heading2 of heading2Arr) {
        const temY = heading2.getBoundingClientRect().y
        if (temY <= 5 && Math.abs(temY) < distance) {
          distance = Math.abs(temY)
          text = heading2.innerText
        }
      }

      const heading3Arr = articleDetail.getElementsByTagName("h3")
      for (const heading3 of heading3Arr) {
        const temY = heading3.getBoundingClientRect().y
        if (temY <= 5 && Math.abs(temY) < distance) {
          distance = Math.abs(temY)
          text = heading3.innerText
        }
      }

      const tocEle = document.getElementById("toc")
      const tocLinkArr = tocEle.getElementsByTagName("a")

      for (const tocLink of tocLinkArr) {
        tocLink.className = ""

        if (text && tocLink.innerText && tocLink.innerText === text) {
          tocLink.className = "active-toc"
        }
      }
    }

    if (typeof window !== "undefined") {
      window.onscroll = listener
    }
    return () => {
      if (typeof window !== "undefined") {
        window.onscroll = ""
      }
    }
  }, [])

  return (
    <div className="card widget sticky">
      <div className="card-content ">
        <section
          id="toc"
          className={styles.toc}
          dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
        />
      </div>
    </div>
  )
}
