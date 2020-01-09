import React from "react"
import { Link } from "gatsby"

import styles from "./navbar.module.css"

export default () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarItem}>
        <section className={styles.leftNav}>
          <Link to="/">首页</Link>
          <Link to="/photos">相册</Link>
          <Link to="/friends">友链</Link>
        </section>
      </div>
    </nav>
  )
}
