import React from "react"

export default ({ post }) => {
  return (
    <div className="card widget">
      <div className="card-content">
        <section dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />
      </div>
    </div>
  )
}
