<template>
  {{ data.displayValue }}
</template>

<script setup>
import { isNumber } from 'lodash-es';
import { reactive, onMounted, watch, onUnmounted } from 'vue';
import { cancelAnimationFrame, requestAnimationFrame } from '@/components/count-to/requestAnimationFrame';

const props = defineProps({
  startVal: { type: Number, required: true },
  endVal: { type: Number, required: true },
  duration: { type: Number, default: 2000 },
  decimals: { type: Number, default: 0, validator: (value) => value >= 0 },
  decimal: { type: String, default: '.' },
  separator: { type: String, default: ',' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  useEasing: { type: Boolean, default: true },
  easingFn: {
    type: Function,
    default(t, b, c, d) {
      return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
    },
  },
});

const formatNumber = (num) => {
  num = num.toFixed(props.decimals);
  num += '';
  const x = num.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? props.decimal + x[1] : '';
  const rgx = /(\d+)(\d{3})/;
  if (props.separator && !isNumber(props.separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + props.separator + '$2');
    }
  }
  return props.prefix + x1 + x2 + props.suffix;
};

const data = reactive({
  displayValue: formatNumber(props.startVal),
  printVal: null,
  startTime: 0,
  timestamp: 0,
  remaining: 0,
  rAF: null,
});

const countDown = props.startVal > props.endVal;

const count = (timestamp) => {
  if (!data.startTime) {
    data.startTime = timestamp;
  }
  data.timestamp = timestamp;
  const progress = timestamp - data.startTime;
  data.remaining = props.duration - progress;
  if (props.useEasing) {
    if (countDown) {
      data.printVal = props.startVal - props.easingFn(progress, 0, props.startVal - props.endVal, props.duration);
    } else {
      data.printVal = props.easingFn(progress, props.startVal, props.endVal - props.startVal, props.duration);
    }
  } else {
    if (countDown) {
      data.printVal = props.startVal - (props.startVal - props.endVal) * (progress / props.duration);
    } else {
      data.printVal = props.startVal + (props.endVal - props.startVal) * (progress / props.duration);
    }
  }
  if (countDown) {
    data.printVal = data.printVal < props.endVal ? props.endVal : data.printVal;
  } else {
    data.printVal = data.printVal > props.endVal ? props.endVal : data.printVal;
  }
  data.displayValue = formatNumber(data.printVal);
  if (progress < props.duration) {
    data.rAF = requestAnimationFrame(count);
  }
};

const start = () => {
  data.startTime = 0;
  data.rAF = requestAnimationFrame(count);
};

onMounted(() => {
  start();
});

watch(
  () => [props.startVal, props.endVal],
  () => {
    start();
  },
);

onUnmounted(() => {
  cancelAnimationFrame(data.rAF);
});
</script>

<style lang="less" scoped></style>
