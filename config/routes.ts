export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './User/Login',
          },
        ],
      },
    ],
  },
  {
    name: '用户',
    path: '/account',
    hideInMenu: true,
    routes: [
      {
        name: '个人设置',
        path: '/account/settings/:type?/:subtype?',
        component: './Account/Settings',
      },
    ],
  },
  {
    name: '首页',
    icon: 'smile',
    path: '/welcome',
    component: './Welcome',
  },
  {
    name: '社区',
    icon: 'reddit',
    path: '/community',
    routes: [
      {
        name: '热门',
        path: '/community/hot',
        component: './Community/List',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
