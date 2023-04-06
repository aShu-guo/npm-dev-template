import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/coindexnfig/
export default defineConfig(() => {
  return {
    // plugins
    plugins: [vue()],
    // build
    build: {
      minify: true,
      lib: {
        entry: resolve('src/main.js'),
        name: 'MyLib',
        fileName: 'my-lib',
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
            //
          },
        },
      },
    },
  };
});
