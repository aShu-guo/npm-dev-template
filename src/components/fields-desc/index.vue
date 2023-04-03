<template>
  <a-descriptions :label-style="{ width: '11%', justifyContent: 'flex-end' }" v-bind="$attrs">
    <template #title>
      <slot name="title"></slot>
    </template>
    <a-descriptions-item
      v-for="field in fields"
      :key="field.name"
      :label="field.name"
      :span="field.span ? field.span : 3"
    >
      <!--   是字符串、数值、undefined类型   -->
      <span v-if="typeof field.value === 'string' || typeof field.value === 'number' || field.value === undefined">
        {{ renderEmptyText(field.value) }}
      </span>
      <component v-else :is="field.value" />
    </a-descriptions-item>
  </a-descriptions>
</template>

<script setup name="FieldsDesc">
import { renderEmptyText } from '@/common/table';

defineProps({
  fields: { type: Array },
});
</script>

<style lang="less" scoped>
:deep(.ant-descriptions-item) {
  //padding-bottom: 18px;

  .ant-descriptions-item-label {
    font-size: 14px;
    font-weight: 500;
    color: #e0e5e5;
    line-height: 40px;
  }

  .ant-descriptions-item-content {
    width: 100%;
    margin-left: 10px;
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    color: #aaafb3;
    line-height: 40px;
  }
}
</style>
