import React from "react"

export default ({ articles, title }) => {
  return (
    <div className="card widget">
      <div className="card-content">
        <h3 className="menu-label">{title}</h3>
        {articles.map((article, index) => (
          <article className="media" key={index}>
            <a href={article.slug} className="media-left">
              <p className="image is-64x64">
                <img
                  className="thumbnail"
                  src={article.cover}
                  alt={article.title}
                />
              </p>
            </a>
            <div className="media-content">
              <div className="content">
                <div style={{paddingTop: "12px"}}>
                  <time className="has-text-grey is-size-7 is-uppercase">
                    {article.date}
                  </time>
                </div>
                <a
                  href={article.slug}
                  className="title has-link-black-ter is-size-6 has-text-weight-normal"
                >
                  {article.title}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
