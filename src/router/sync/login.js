export const LoginRoutes = {
  Login: {
    path: '/login',
    name: 'LoginIndex',
  },
};

const routes = [
  {
    ...LoginRoutes.Login,
    component: () => import('@/pages/login/index.vue'),
    meta: {
      title: '登录',
      hideInMenu: true,
    },
  },
];

export default routes;
