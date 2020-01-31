import orderTags from "./order"

export const convert2Articles = data => {
  const { nodes } = data.allMarkdownRemark

  const articles = nodes.map(node => {
    const { excerpt } = node
    const { date, title, cover, tag } = node.frontmatter
    const { slug } = node.fields
    return { date, title, cover, tag, excerpt, slug }
  })

  return articles
}

// 排序：先根据tag找到排序列表，然后排序列表中的值和slug进行对应
export const sortArticles = articles => {
  const { tag } = articles[0]
  const orders = orderTags[tag]
  console.log(tag)
  if (orders) {
    const articleObj = {}
    for (const article of articles) {
      articleObj[article.slug] = article
    }

    const sortedArticles = []
    for (const order of orders) {
      // 避免出现有问题的
      if (articleObj[order] === undefined) {
        return articles
      }
      sortedArticles.push(articleObj[order])
    }
    return sortedArticles
  } else {
    const sortedArticles = articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    return sortedArticles
  }
}
