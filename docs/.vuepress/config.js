const algorithmArr = [
  '',
  'record',
  '1',
  '2',
  '3',
  '7',
  '9',
  '14',
  '16',
  '19',
  '21',
  '24',
  '35',
  '53',
  '77',
  '83',
  '96',
  '101',
  '112',
  '152',
  '162',
  '171',
  '216',
  '242',
  '520',
  '674',
  '704',
  '884',
  '938'
]

const javaArr = [
  '',
]


const openArr = [
  '',
  'mdnice',
  '未来简史读后感',
  '我的春招面试经历',
  '我的秋招面试经历',
  '人类真的幸福么？',
  '套路解决递归问题',
  '杜兰特受伤，后果自己承担',
  'Java看书路径',
  '技术人员的简历如何排版',
  '蚂蚁金服读书感'
]

module.exports = {
  title: 'LeetCode Drawing',
  description: 'LeetCode Drawing',
  base: '/LeetCodeDrawing/',
  locales: {
    '/': {
      lang: '简体中文',
      description: 'LeetCode Drawing'
    }
  },
  themeConfig: {
    repo: 'guanpengchn/LeetCodeDrawing',
    docsRepo: 'guanpengchn/LeetCodeDrawing',
    docsDir: 'docs',
    editLinks: true,
    markdown: {
      html: true,
      // config: md => {
      //   // 使用更多的 markdown-it 插件!
      //   md.use(require('markdown-it-katex'))
      // }
    },
    locales: {
      '/': {
        lang: '简体中文',
        selectText: 'Languages',
        editLinkText: '在 GitHub 上编辑此页',
        title: 'LeetCode Drawing',
        description: 'LeetCode Drawing的中文介绍',
        nav: [
          { text: '算法题', link: '/algorithm/' },
          { text: 'Java', link: '/java/' },
          { text: '开源分享', link: '/open/' },
        ],
        sidebar: {
          '/algorithm/': [
            {
              title: '画解算法',
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