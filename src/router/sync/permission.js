import { renderIcon } from '@/common/utils';
import { LockOutlined, LockFilled } from '@ant-design/icons-vue';

export const PermissionRoutes = {
  Index: {
    path: '/permission',
    name: 'PermissionIndex',
  },
  User: {
    path: '/permission/user',
    name: 'UserPermission',
  },
};

const routes = [
  {
    ...PermissionRoutes.Index,
    component: () => import('@/layouts/blank-layout/index.vue'),
    redirect: PermissionRoutes.User.path,
    meta: {
      title: '权限管理',
      icon: renderIcon(LockOutlined),
      iconActive: renderIcon(LockFilled),
    },
    children: [
      {
        ...PermissionRoutes.User,
        component: () => import('@/pages/permission/user/index.vue'),
        meta: { title: '用户管理' },
      },
    ],
  },
];

export default routes;
