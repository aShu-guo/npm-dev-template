/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import vue from '@vitejs/plugin-vue';
import { splitVendorChunkPlugin } from 'vite';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { ConfigSvgIconsPlugin } from './svg-icons';
import { AutoRegistryComponents } from './component';
// import { ConfigVisualizerConfig } from './visualizer';
import { ConfigRestartPlugin } from './restart';
import { ConfigProgressPlugin } from './progress';
import { ConfigImageminPlugin } from './imagemin';
import { ConfigConsoleDrop } from './rm-console';
import { ConfigLegacyPolyfill } from './legacy';

export function createVitePlugins(isBuild, buildEnv) {
  const vitePlugins = [
    // vue支持
    vue(),
    // setup语法糖组件名支持，无需单独为name声明默认导出<script>
    vueSetupExtend(),
    // 默认分包策略
    splitVendorChunkPlugin(),
  ];

  // 自动按需引入组件
  vitePlugins.push(AutoRegistryComponents());

  // 监听配置文件改动重启
  vitePlugins.push(ConfigRestartPlugin());

  // 构建时显示进度条
  vitePlugins.push(ConfigProgressPlugin());

  // vite-plugin-svg-icons
  vitePlugins.push(ConfigSvgIconsPlugin());

  vitePlugins.push(ConfigImageminPlugin());

  // 清除console
  vitePlugins.push(ConfigConsoleDrop(buildEnv));

  vitePlugins.push(ConfigLegacyPolyfill());

  /**
   * Always add plugin as last option.
   * 各个bundle占比
   */
  // vitePlugins.push(ConfigVisualizerConfig(buildEnv));
  return vitePlugins;
}
