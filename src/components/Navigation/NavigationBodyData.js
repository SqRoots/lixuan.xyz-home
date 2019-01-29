const NavigationBodyData = [
  {
    text: '首页',
    routerName: 'Home',
    model: false,
    icon: 'home',
    children: [],
  },
  {
    text: '网站',
    routerName: 'Web',
    model: false,
    icon: 'public',
    children: [
      { model: 'inactive', icon: 'language', text: '综合', query: { category: '综合' } },
      { model: 'inactive', icon: 'functions', text: '理科', query: { category: '理科' } },
      { model: 'inactive', icon: 'account_circle', text: '博客', query: { category: '博客' } },
    ],
  },
  {
    text: '数据',
    routerName: 'Data',
    model: false,
    icon: 'archive',
    children: [
      { model: 'inactive', icon: 'fas fa-database', text: '综合', query: { category: '综合' } },
      { model: 'inactive', icon: 'fab fa-pied-piper', text: '文献', query: { category: '文献' } },
      { model: 'inactive', icon: 'fas fa-language', text: '语言', query: { category: '语言' } },
      { model: 'inactive', icon: 'fas fa-globe-asia', text: 'GIS', query: { category: 'GIS' } },
      // { icon: 'attach_money', text: '财经', query: { category: '财经' } },
    ],
  },
  {
    text: '软件',
    routerName: 'Software',
    model: false,
    icon: 'widgets',
    children: [
      { model: 'inactive', icon: 'functions', text: '数理', query: { category: '数理' } },
      { model: 'inactive', icon: 'widgets', text: '其它', query: { category: '其它' } },
      // { icon: 'photo', text: '多媒体' },
      // { icon: 'storage', text: '数据库' },
      // { icon: 'settings', text: '系统工具' },
    ],
  },
  {
    text: '格言',
    routerName: 'Motto',
    model: false,
    icon: 'border_color',
    children: [],
  },
  {
    text: '关于',
    routerName: 'About',
    model: false,
    icon: 'info',
    children: [
      { model: 'inactive', icon: 'widgets', text: '拙作', query: { category: '拙作' } },
      { model: 'inactive', icon: 'functions', text: '个人简介', query: { category: '个人简介' } },
    ],
  },
];

export default NavigationBodyData;
