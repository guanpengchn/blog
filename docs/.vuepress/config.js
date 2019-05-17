const algorithmArr = [
  '',
  'record',
  '884'
]

const javaArr = [
  '',
]


const openArr = [
  '',
  'mdnice',
]

module.exports = {
  title: 'Nice Notes',
  description: 'how to pronunciation',
  base: '/nice-notes/',
  locales: {
    '/': {
      lang: '简体中文',
      description: 'nice-notes'
    }
  },
  themeConfig: {
    repo: 'guanpengchn/nice-notes',
    docsRepo: 'guanpengchn/nice-notes',
    docsDir: 'docs',
    editLinks: true,
    locales: {
      '/': {
        lang: '简体中文',
        selectText: 'Languages',
        editLinkText: '在 GitHub 上编辑此页',
        title: 'Nice Notes',
        description: 'nice-notes的中文介绍',
        nav: [
          { text: '算法题', link: '/algorithm/' },
          { text: 'Java', link: '/java/' },
          { text: '开源分享', link: '/open/' },
        ],
        sidebar: {
          '/algorithm/': [
            {
              title: '算法题',
              collapsable: false,
              children: algorithmArr
            }
          ],
          '/java/': [
            {
              title: 'Java',
              collapsable: false,
              children: javaArr
            }
          ],
          '/open/': [
            {
              title: '开源分享与项目',
              collapsable: false,
              children: openArr
            }
          ]
        }
      }
    }
  }
}