import SyncRecordRoutes from '@/router/sync/index';
import NProgress from 'nprogress';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...SyncRecordRoutes],
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = to.meta.title || '';

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
