import React from "react"

import Bio from "../components/bio"
import Category from "../components/category"
import Carousel from "../components/carousel"
import Articles from "../components/articles"
import Newest from "../components/newest"
import Filter from "../components/filter"

import styles from "./content.module.css"

export default () => {
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
