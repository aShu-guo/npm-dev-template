import { renderIcon } from '@/common/utils';
import { HomeOutlined, HomeFilled } from '@ant-design/icons-vue';

export const HomeRoutes = {
  HomeIndex: {
    path: '/home',
    name: 'HomeIndex',
  },
};

const routes = [
  {
    ...HomeRoutes.HomeIndex,
    component: () => import('@/pages/home/index.vue'),
    meta: {
      title: '首页',
      icon: renderIcon(HomeOutlined),
      iconActive: renderIcon(HomeFilled),
    },
  },
];

export default routes;
