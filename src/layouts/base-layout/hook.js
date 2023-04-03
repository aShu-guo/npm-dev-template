import { onMounted, ref } from 'vue';

export const useResizeTable = () => {
  const extra = ref('');
  onMounted(() => {
    // tab高度
    const navHeight = document.querySelector('.ant-tabs-nav-wrap')?.clientHeight || 0;
    // 搜索栏高度
    const paramsBoxHeight = document.querySelector('.page-params-box').clientHeight;
    const otherHeight = 65 + 60 + 68 + 82 + (20 + 24); //table header高度 + 面包屑高度 + header高度 + 分页组件高度 + margin高度
    extra.value = navHeight + paramsBoxHeight + otherHeight + 'px';
  });
  return { extra };
};
