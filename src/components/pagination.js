import React from "react"

import { MAX_PAGEINATION_NUM } from "../utils/constrant"

export default ({ numPages, currentPage, onChange }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  let pagination

  // 如果总页数大于可显示页数
  if (numPages > MAX_PAGEINATION_NUM) {
    // 只有后边有省略号
    if (currentPage <= MAX_PAGEINATION_NUM / 2 + 1) {
      pagination = (
        <ul className="pagination-list is-hidden-mobile">
          {Array.from({ length: MAX_PAGEINATION_NUM - 1 }, (_, i) => (
            <li key={i + 1}>
              <a
                onClick={e => onChange(e, i + 1)}
                className="pagination-link"
                style={{
                  color: i + 1 === currentPage ? "#ffffff" : "",
                  background: i + 1 === currentPage ? "#007acc" : "",
                }}
              >
                {i + 1}
              </a>
            </li>
          ))}
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li key={numPages}>
            <a onClick={e => onChange(e, numPages)} className="pagination-link">
              {numPages}
            </a>
          </li>
        </ul>
      )
    }
    // 只有前边有省略号
    else if (numPages - currentPage <= MAX_PAGEINATION_NUM / 2) {
      pagination = (
        <ul className="pagination-list is-hidden-mobile">
          <li key="1">
            <a onClick={e => onChange(e, 1)} className="pagination-link">
              1
            </a>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          {Array.from({ length: MAX_PAGEINATION_NUM - 1 }, (_, i) => (
            <li key={numPages - MAX_PAGEINATION_NUM + i + 2}>
              <a
                onClick={e => onChange(e, numPages - MAX_PAGEINATION_NUM + i + 2)}
                className="pagination-link"
                style={{
                  color:
                    numPages - MAX_PAGEINATION_NUM + i + 2 === currentPage
                      ? "#ffffff"
                      : "",
                  background:
                    numPages - MAX_PAGEINATION_NUM + i + 2 === currentPage
                      ? "#007acc"
                      : "",
                }}
              >
                {numPages - MAX_PAGEINATION_NUM + i + 2}
              </a>
            </li>
          ))}
        </ul>
      )
    }
    // 前后都有省略号
    else {
      pagination = (
        <ul className="pagination-list is-hidden-mobile">
          <li key="1">
            <a onClick={e => onChange(e, 1)} className="pagination-link">
              1
            </a>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          {Array.from({ length: MAX_PAGEINATION_NUM - 1 }, (_, i) => (
            <li key={currentPage + i + 1 - MAX_PAGEINATION_NUM / 2}>
              <a
                onClick={e =>
                  onChange(e, currentPage + i + 1 - MAX_PAGEINATION_NUM / 2)
                }
                className="pagination-link"
                style={{
                  color:
                    currentPage + i + 1 - MAX_PAGEINATION_NUM / 2 === currentPage
                      ? "#ffffff"
                      : "",
                  background:
                    currentPage + i + 1 - MAX_PAGEINATION_NUM / 2 === currentPage
                      ? "#007acc"
                      : "",
                }}
              >
                {currentPage + i + 1 - MAX_PAGEINATION_NUM / 2}
              </a>
            </li>
          ))}
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li key={numPages}>
            <a onClick={e => onChange(e, numPages)} className="pagination-link">
              {numPages}
            </a>
          </li>
        </ul>
      )
    }
  } else {
    // 全部显示
    pagination = (
      <ul className="pagination-list is-hidden-mobile">
        {Array.from({ length: numPages }, (_, i) => (
          <li key={i + 1}>
            <a
              onClick={e => onChange(e, i + 1)}
              className="pagination-link"
              style={{
                color: i + 1 === currentPage ? "#ffffff" : "",
                background: i + 1 === currentPage ? "#007acc" : "",
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="card card-transparent">
      <nav
        className="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        {!isFirst && (
          <div className="pagination-previous">
            <a onClick={e => onChange(e, currentPage - 1)} rel="prev">
              上一页
            </a>
          </div>
        )}

        {!isLast && (
          <div className="pagination-next">
            <a onClick={e => onChange(e, currentPage + 1)} rel="next">
              下一页
            </a>
          </div>
        )}
        {pagination}
      </nav>
    </div>
  )
}
