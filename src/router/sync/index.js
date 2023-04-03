/**
 * 静态路由 - 无需从接口中响应并添加的路由
 */
import LoginRecordRoutes from '@/router/sync/login';
import HomeRecordRoutes, { HomeRoutes } from '@/router/sync/home';
import PermissionRoutes from '@/router/sync/permission';

const routes = [
  {
    path: '/',
    name: 'base-layout',
    component: () => import('@/layouts/base-layout/index.vue'),
    redirect: HomeRoutes.HomeIndex.path,
    children: [...HomeRecordRoutes, ...PermissionRoutes],
  },
  ...LoginRecordRoutes,
];

export default routes;
