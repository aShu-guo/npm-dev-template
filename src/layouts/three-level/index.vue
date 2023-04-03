<template>
  <PageContainer>
    <a-tabs v-model:activeKey="activeKeyRef" @change="change" size="large">
      <a-tab-pane v-for="(route, index) in tabs" :key="index" :tab="route.tab" />
    </a-tabs>
    <!--    {{ tabs }}-->
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </PageContainer>
</template>

<script setup>
import { onUnmounted, ref, shallowRef, watch } from 'vue';
import { PageContainer } from '@ant-design-vue/pro-layout';
import { useRouter } from 'vue-router';
import { getValue, removeValue, setValue } from '@/common/cache';
const CacheKey = 'active-key';

const activeKeyRef = ref(getValue(CacheKey) || 0);
const router = useRouter();
const tabs = shallowRef([]);
const initTabs = () => {
  const matched = router.currentRoute.value.matched;
  const parent = matched[matched.length - 2];

  const tmp = [];
  parent.children.map((child) => {
    tmp.push({
      tab: child.meta.title,
      path: child.path,
    });
  });
  tabs.value = tmp;
};

initTabs();

watch(
  () => router.currentRoute.value.meta.activeMenu,
  () => {
    initTabs();
    activeKeyRef.value = 0;
    setValue(CacheKey, activeKeyRef.value);
  },
);

const change = (index) => {
  router.replace(tabs.value[index].path);
  setValue(CacheKey, activeKeyRef.value);
};

onUnmounted(() => {
  removeValue(CacheKey);
});
</script>

<style lang="less" scoped></style>
