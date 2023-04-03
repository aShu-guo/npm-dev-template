<template>
  <div class="home-content-box">
    <h2 class="home-title ml-8">用户数据统计</h2>
    <div class="pv-uv-box">
      <a-space :size="20" style="width: 100%">
        <a-card style="flex: 1" v-for="item in userDataList" :key="item.name">
          <div class="pv-uv-value">
            <div class="value-num">
              <CountTo :start-val="0" :end-val="item.value" separator="," />
            </div>
            <div class="secondary-box">
              <span class="secondary-field">{{ item.name }}</span>
              <span class="field-percent" :class="item.percent > 0 ? 'positive-value' : 'negative-value'">
                <template v-if="item.percent > 0">
                  <CountTo :start-val="0" :end-val="item.percent" separator="," suffix="%" :decimals="2" prefix="+" />
                </template>
                <template v-else>
                  <CountTo :end-val="item.percent" :start-val="0" separator="," suffix="%" :decimals="2" />
                </template>
              </span>
            </div>
          </div>
        </a-card>
      </a-space>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const userDataList = reactive([
  { value: 124325, name: '今日访问量', percent: 12.57 },
  { value: 54323, name: '今日新增用户', percent: -5.36 },
  { value: 168323, name: '累计用户', percent: 8.21 },
]);
</script>

<style lang="less" scoped>
.home-content-box {
  background-color: #ffffff;
  padding: 26px;
  height: 100%;

  :deep(.ant-space-item) {
    flex: 1;
  }
}
</style>
