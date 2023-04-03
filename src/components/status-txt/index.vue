<template>
  <div class="status-txt-box">
    {{ mapping[status].name }}
  </div>
</template>

<script setup name="StatusTxt">
import { computed } from 'vue';

const props = defineProps({
  mapping: { type: Object, default: () => ({}), required: true },
  status: { type: [String, Number], default: '' },
  point: { type: Boolean, default: true },
});
const color = computed(() => props.mapping[props.status].color);
const style = computed(() => {
  return props.point ? { width: '6px', marginLeft: '10px' } : {};
});
</script>

<style lang="less" scoped>
.status-txt-box {
  color: v-bind(color);
  position: relative;
  margin-left: v-bind('style.marginLeft');

  &:before {
    position: absolute;
    content: '';
    left: -16px;
    width: v-bind('style.width');
    height: 6px;
    top: 50%;
    transform: translateY(-50%);
    background: v-bind(color);
    border-radius: 50%;
  }
}
</style>
