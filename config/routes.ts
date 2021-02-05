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
        path: '/account/settings',
        name: '个人设置',
        component: './Account/Settings',
      },
    ],
  },
  {
    name: '欢迎使用',
    icon: 'smile',
    path: '/welcome',
    component: './Welcome',
  },
  {
    name: 'admin',
    icon: 'crown',
    path: '/admin',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
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
