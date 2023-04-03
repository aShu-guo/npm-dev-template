import { defineConfig } from 'vite';
import { createVitePlugins } from './config/plugins';
import modifyTheme from './config/theme';
import { resolve } from 'path';

function pathResolve(dir) {
  return resolve(process.cwd(), dir);
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 是否为构建版本
  const isBuild = command === 'build';
  // 构建的版本是生产环境还是测试环境
  const buildEnv = isBuild && mode === 'production' ? 'prod' : '_test';

  return {
    envDir: './env',
    base: '/',
    resolve: {
      alias: {
        '@': pathResolve('src'),
      },
    },
    // plugins
    plugins: createVitePlugins(isBuild, buildEnv),
    // build
    build: {
      sourcemap: buildEnv !== 'prod',
    },
    // css
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        less: {
          modifyVars: modifyTheme(),
          // additionalData: `@import "${resolve('src/assets/styles/theme.less')}";`,
          javascriptEnabled: true,
        },
      },
    },
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      port: 4000, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      host: '0.0.0.0', // IP配置，支持从IP启动
    },
    clearScreen: false,
  };
});
