const algorithmArr = [
  '',
  'record',
  '1',
  '2',
  '3',
  '7',
  '9',
  '13',
  '14',
  '15',
  '16',
  '19',
  '21',
  '24',
  '27',
  '35',
  '53',
  '58',
  '66',
  '67',
  '70',
  '77',
  '83',
  '88',
  '96',
  '100',
  '101',
  '104',
  '111',
  '112',
  '136',
  '152',
  '162',
  '171',
  '198',
  '216',
  '219',
  '242',
  '389',
  '507',
  '520',
  '674',
  '704',
  '771',
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
  'Java开发的面试准备路径',
  '技术人员的简历如何排版',
  '蚂蚁金服读书感',
  '牛客访谈',
  'FlipaClip——人人都是灵魂画师',
  '区块链的真实面试情况和应用场景',
  '常用正则表达式',
]

module.exports = {
  title: 'LeetCode Drawing',
  description: 'LeetCode Drawing',
  base: '/',
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