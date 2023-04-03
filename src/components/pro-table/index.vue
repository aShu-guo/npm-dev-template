<template>
  <a-table
    v-bind="$attrs"
    @change="handleTableChange"
    :columns="rawColumns"
    :scroll="{ y: 1000 }"
    :data-source="data.rows"
    :row-class-name="(_record, index) => (index % 2 === 0 ? 'table-striped' : '')"
    :pagination="false"
  >
    <template #bodyCell="scopeParams">
      <slot name="bodyCell" v-bind="scopeParams"></slot>
    </template>
  </a-table>
  <a-pagination
    v-model:current="pageState.pageNo"
    v-model:page-size="pageState.pageSize"
    @change="() => handleTableChange()"
    showSizeChanger
    showQuickJumper
    :total="data.total"
    :show-total="
      (total, range) =>
        `共${total}条记录 第${Math.ceil(range[1] / pageState.pageSize)}&nbsp;&nbsp;/&nbsp;&nbsp;${Math.ceil(
          total / pageState.pageSize,
        )}页`
    "
  />
</template>

<script setup>
/**
 * 内置table组件
 */
import { onMounted, ref, toRaw } from 'vue';
import { defineUI } from '@/common/table';
import { useResizeTable } from '@/layouts/base-layout/hook';

const props = defineProps({
  api: { type: Function, required: true, default: () => () => Promise.resolve({ rows: [], total: 0 }) },
  columns: { type: Array, default: () => [], required: true },
});
const data = ref({ rows: [], total: 0 });
const pageState = ref({ pageNo: 1, pageSize: 10 });
const rawColumns = defineUI(props.columns, pageState);
const { extra } = useResizeTable();

const handleTableChange = async (_, filters, sorter) => {
  const { rows, total } = await props.api(toRaw(pageState.value), filters, sorter);
  data.value.rows = rows;
  data.value.total = total;
};

const submit = (reset) => {
  if (reset) {
    pageState.value.pageNo = 1;
    pageState.value.pageSize = 10;
  }
  handleTableChange();
};
onMounted(() => {
  submit();
});

const reset = () => {
  pageState.value.pageNo = 1;
  pageState.value.pageSize = 10;
  handleTableChange();
};

defineExpose({ reset, submit });
</script>

<style lang="less" scoped>
:deep(.ant-table-body) {
  height: calc(100vh - v-bind(extra)) !important;
  max-height: calc(100vh - v-bind(extra)) !important;
}
</style>
