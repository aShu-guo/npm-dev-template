<template>
  <AConfigProvider :locale="locale">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </AConfigProvider>
</template>
<script setup>
import { RouterView } from 'vue-router';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import locale from 'ant-design-vue/es/locale/zh_CN';
dayjs.locale('zh-cn');
</script>
