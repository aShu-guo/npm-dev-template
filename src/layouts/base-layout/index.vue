<template>
  <pro-layout
    class="base-layout-box"
    :locale="locale"
    navTheme="dark"
    headerTheme="dark"
    layout="mix"
    :splitMenus="false"
    :menuData="menuData"
    :collapsed="false"
    :breadcrumb="{ routes: breadcrumb }"
    v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys"
  >
    <!--  api参考地址：https://sunshinelixun.github.io/pro-components/components/pro-layout.html  -->
    <!--  自定义菜单头部 最高层  -->
    <template #menuHeaderRender>
      <span style="color: #ffffff">Vue3 Admin template</span>
    </template>

    <!--  自定义侧边栏菜单（没有子节点的菜单）  -->
    <template #menuItemRender="{ item }">
      <a-menu-item
        :key="item.path"
        :disabled="item.meta?.disabled"
        :icon="state.selectedKeys.indexOf(item.path) >= 0 ? item.meta?.iconActive : item.meta?.icon"
      >
        <router-link :to="{ path: item.path }">
          <span class="ant-pro-menu-item-title">{{ item.meta.title }}</span>
        </router-link>
      </a-menu-item>
    </template>

    <!--  自定义侧边栏菜单（有子节点的菜单）  -->
    <template #subMenuItemRender="{ item }">
      <a-sub-menu
        :key="item.path"
        :disabled="item.meta?.disabled"
        :icon="
          state.selectedKeys.every((selected) => selected.indexOf(item.path) >= 0)
            ? item.meta?.iconActive
            : item.meta?.icon
        "
      >
        <template #title>{{ item.meta.title }}</template>
        <a-menu-item
          v-for="node in item.children"
          :key="node.path"
          :disabled="node.meta?.disabled"
          :icon="state.selectedKeys.indexOf(node.path) >= 0 ? node.meta?.iconActive : node.meta?.icon"
        >
          <router-link :to="{ path: node.path }">
            <span class="ant-pro-menu-item-title">{{ node.meta.title }}</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </template>

    <!--  自定义面包屑：需要传入breadcrumb使用  -->
    <template #breadcrumbRender="{ route, routes }">
      <span :class="routes.indexOf(route) === routes.length - 1 ? '' : 'super-route-name'">
        {{ route.breadcrumbName }}
      </span>
    </template>

    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </pro-layout>
</template>

<script setup>
import { getMenuData, clearMenuItem } from '@ant-design-vue/pro-layout';
import '@ant-design-vue/pro-layout/dist/style.less';
import ProLayout from '@ant-design-vue/pro-layout';
// import { useUserStore } from '@/stores';
import { computed, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

// const userStore = useUserStore();

const state = reactive({
  openKeys: [],
  selectedKeys: [],
});
const locale = (i18n) => i18n;
const router = useRouter();
const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));

watch(
  () => router.currentRoute.value,
  (newVal) => {
    // 初次进入页面，选中当前key
    state.selectedKeys = [].concat(newVal.meta.activeMenu ? newVal.meta.activeMenu : newVal.path);
  },
  { immediate: true },
);
// 初始化面包屑
const breadcrumb = computed(() => {
  const breadcrumbs = router.currentRoute.value.matched
    .concat()
    .filter((_item, index) => index > 0 && index < 3)
    .map((item) => {
      return {
        path: item.path,
        icon: item.meta.icon,
        params: item.meta?.params,
        breadcrumbName: item.meta.title || '',
      };
    });

  if (router.currentRoute.value.meta.parentTitle) {
    const current = router.currentRoute.value.matched.slice(-1)[0];

    breadcrumbs.splice(-1, 0, { path: '', icon: '', params: '', breadcrumbName: current.meta.parentTitle });
    return breadcrumbs;
  }
  return breadcrumbs;
});
</script>
<style lang="less"></style>
