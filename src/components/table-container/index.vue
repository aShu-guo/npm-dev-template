<template>
  <div class="mix-content-box">
    <!--  搜索框布局  -->
    <div class="page-params-box" :class="props.layout">
      <div class="params-box">
        <slot name="params"></slot>
      </div>
      <div class="btn-box">
        <slot name="operations"></slot>
      </div>
    </div>
    <div class="extra-opt">
      <slot name="extra-opt"></slot>
    </div>
    <!--  table布局  -->
    <div class="table-box">
      <slot name="table"></slot>
    </div>
  </div>
</template>

<script setup name="PageParams">
/**
 * 搜索框与table布局组件
 */
const props = defineProps({
  layout: {
    type: String,
    default: 'left-right',
    validator: (value) => ['left-right', 'top-bottom'].indexOf(value) >= 0,
  },
});
</script>

<style lang="less" scoped>
.mix-content-box {
  display: flex;
  flex-flow: column;
  //border-radius: 2px;
  background: lightgray;
  padding: 26px 30px 0;

  .page-params-box {
    display: flex;
    background: gray;
    border-radius: 4px;
    padding: 15px 30px 15px 60px;

    .params-box {
      flex: 1;
      margin-right: 60px;

      :deep(.ant-form) {
        width: 100%;
      }
    }
  }

  .extra-opt {
    margin-top: 32px;
  }

  :deep(.table-box) {
    margin-top: 16px;
  }
}

.left-right {
  justify-content: space-between;

  .page-params-box {
    align-items: center;
  }
}

.top-bottom {
  flex-flow: column;
}
</style>
