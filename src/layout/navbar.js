import React from "react"
import { Link } from "gatsby"

import styles from "./navbar.module.css"
import logo from "../images/logo.png"

export default () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarItem}>
        <section className={styles.leftNav}>
          <Link to="/" className={styles.logoLink}>
            <img className={styles.logo} alt="" src={logo} />
          </Link>
          <Link to="/">首页</Link>
          <Link to="/category/画解算法">画解算法专栏</Link>
          {/* <Link to="/photos">相册</Link> */}
          {/* <Link to="/about">关于</Link> */}
        </section>
      </div>
    </nav>
  )
}
