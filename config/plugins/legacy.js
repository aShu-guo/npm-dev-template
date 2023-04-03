/**
 * @name AutoImportDeps
 * @description
 * 支持传统浏览器，用于自动生成传统版本的 chunk 及与其相对应 ES 语言特性方面的 polyfill。
 * 并且兼容版的 chunk 只会在不支持原生 ESM 的浏览器中进行按需加载。
 */
import legacy from '@vitejs/plugin-legacy';

export const ConfigLegacyPolyfill = () => {
  return legacy({
    targets: ['defaults', 'not IE 11'],
  });
};
