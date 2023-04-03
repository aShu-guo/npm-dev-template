import { createApp } from 'vue';
import './index.less';
import App from './App.vue';
import piniaStore from './stores';
import router from './router';
// 引入图片预览组件
import 'viewerjs/dist/viewer.css';
import ImgPreviewer from 'v-viewer';
// 引入非组件模块样式作为全局样式加载： unplugin-vue-components无法处理非组件模块
import 'ant-design-vue/es/message/style/css';

const app = createApp(App);
app.use(router).use(piniaStore).use(ImgPreviewer).mount('#app');
