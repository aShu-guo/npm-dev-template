/**
 * 动态路由 - 需从接口中响应并添加的路由
 */
const routes = [
  {
    path: '/',
    name: 'base-layout',
    component: () => import('@/layouts/base-layout/index.vue'),
    children: [],
  },
];
export default routes;
