/**
 * @name ConfigSvgIconsPlugin
 * @description 加载SVG文件，自动引入
 *
 * 1. 默认作为组件导入：import IconComponent from './my-icon.svg?component'
 * 2. 作为字符串导入：import iconRaw from './my-icon.svg?raw'
 * 3. 作为URL导入：import iconUrl from './my-icon.svg?url'
 */
import svgLoader from 'vite-svg-loader';

export const ConfigSvgIconsPlugin = () => {
  return svgLoader({});
};
