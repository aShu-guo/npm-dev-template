/**
 * @name ConfigConsoleDrop
 * @description 清除console
 */
import removeConsole from 'vite-plugin-remove-console';

export const ConfigConsoleDrop = (env) => {
  if (env === 'prod') {
    return removeConsole();
  }
  return [];
};
