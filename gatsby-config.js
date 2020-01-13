module.exports = {
  siteMetadata: {
    title: `编程如画`,
    author: `灵魂画手`,
    qrcode: `https://my-wechat.mdnice.com/mdnice/%E4%BA%8C%E7%BB%B4%E7%A0%81_20191007150357.gif`,
    description: `不装了，摊牌了，我是全栈`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
    social: {
      github: `https://github.com/guanpengchn`,
      zhihu: `https://www.zhihu.com/people/guan-peng-86-10`,
      juejin: `https://juejin.im/user/59c3205b6fb9a00a532763e2`
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `灵魂画手的编程博客`,
        short_name: `画手编程`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/logo.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-baidu-analytics`,
      options: {
        // baidu analytics siteId
        // siteId: "688e2ffdaec58e98ecac48733bc53c48",
        siteId: "e8fd97b20fc38fd14b7e2d6f3df6b64a",
        // Put analytics script in the head instead of the body [default:false]
        head: false,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
