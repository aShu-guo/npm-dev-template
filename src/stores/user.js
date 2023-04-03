import { clearValue, getAliveValue, setAliveValue } from '@/common/cache';
import { CacheKey } from '@/common/cache/key';
import { HomeRoutes } from '@/router/sync/home';
import { defineStore } from 'pinia';
import router from '@/router';
import { LoginRoutes } from '@/router/sync/login';

export const useUserStore = defineStore('userinfo', {
  state: () => {
    const profile = getAliveValue(CacheKey.USERINFO)?.value;
    return {
      token: getAliveValue(CacheKey.ACCESS_TOKEN)?.value || '',
      name: profile?.name || '',
      // avatar: profile?.avatar || '',
      roles: [],
      // deptName: profile?.deptName || [],
    };
  },
  getters: {
    isSAdmin: (state) => state.roles.indexOf('超级管理员'),
    isAdmin: (state) => state.roles.indexOf('管理员'),
  },
  actions: {
    async login(_params) {
      const { username, Authorization } = await Promise.resolve({
        username: '小明',
        Authorization: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      });
      this.$patch({ name: username, toke: Authorization });

      setAliveValue(CacheKey.ACCESS_TOKEN, Authorization);
      setAliveValue(CacheKey.USERINFO, { name: username });
      router.push(HomeRoutes.HomeIndex.path);
    },
    async logout() {
      clearValue();
      router.push(LoginRoutes.Login.path);
    },
  },
});
