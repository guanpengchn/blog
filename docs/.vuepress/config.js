const algorithmArr = [
  '',
  'record',
  '1',
  '16',
  '24',
  '77',
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
  'muma',
  'futureHistory',
  'interviewSpring',
  'interviewAutumn',
  'peopleHistory'
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
    markdown: {
      html: true
    },
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