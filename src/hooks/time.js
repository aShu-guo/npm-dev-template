import dayjs from 'dayjs';
import { ref } from 'vue';

/*
单位	缩写	详情
day	d	日
week	w	周
month	M	月
quarter	Q	季度 ( 依赖 QuarterOfYear 插件 )
year	y	年
hour	h	小时
minute	m	分钟
second	s	秒
millisecond	ms	毫秒
 */
/**
 * 获取最近时间
 * @param unit 单位，同dayjs
 * @param num 数值
 * @param format 格式
 * @param initialTime 初始时间
 */
export const useRecentTime = function (unit, num, format = 'YYYY-MM-DD HH:mm:ss', initialTime = dayjs()) {
  const arr = ref([]);
  let initial = dayjs(initialTime);
  for (let i = 0; i < num; i++) {
    arr.value.push(initial.format(format));
    initial = initial.subtract(1, unit);
  }
  return arr;
};
