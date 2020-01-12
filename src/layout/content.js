import React from "react"

import Bio from "../components/bio"
import Category from "../components/category"
import Carousel from "../components/carousel"
import Articles from "../components/articles"
import Newest from "../components/listCard/newListCard"
// import Filter from "../components/filter"

export default ({ posts }) => {
  return (
    <div className="outerContainer">
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-8-tablet is-8-desktop is-9-widescreen is-9-fullhd has-order-2 column-main">
              <div className="columns">
                <div className="column is-12-tablet is-12-desktop is-12-widescreen has-order-2 column-main">
                  <Carousel />
                  {/* <Filter /> */}
                  <div className="level distance">
                    <div className="columns">
                      <Articles posts={posts} />
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
