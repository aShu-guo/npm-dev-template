/**
 * 在非单页面组件中使用svg作为组件形式渲染
 */
import { h } from 'vue';
import xss from 'xss';

export const renderIcon = function (svg) {
  return h('span', { class: 'anticon' }, [h(svg)]);
};

/**
 * 根据enum构造出对应的list，用于下拉遍历
 * @param enums
 * @return {*[]}
 */
export const getListByEnum = function (enums) {
  const list = [];
  Object.keys(enums).map((key) => {
    list.push(enums[key]);
  });
  return list;
};

/**
 * 根据{key: {value: xxx, name: ''}}构造出对应的value枚举，用于映射后端接口响应
 * @param enums
 */
export const getValueEnum = function (enums) {
  const valueEnums = {};

  Object.keys(enums).map((key) => {
    valueEnums[enums[key].value] = enums[key].name;
  });
  return valueEnums;
};

/**
 * 过滤出当前用户可以访问的路由
 * @param innerRoutes
 * @param asyncRoutes
 * @return {*[]}
 */
export const filterAsyncRouter = function (innerRoutes, asyncRoutes = []) {
  const finalRoutes = [];
  innerRoutes.forEach((route) => {
    const tmp = Object.assign({}, route);

    asyncRoutes.forEach((route) => {
      // 过滤出匹配的路由和动态路由，此处用正则更好（与vue-router保持一致）
      if (route.path === tmp.path || tmp.path.indexOf(`${route.path}/:`) !== -1) {
        if (tmp.children && tmp.children.length) {
          tmp.children = filterAsyncRouter(tmp.children, route.childList);
        }
        finalRoutes.push(tmp);
      }
    });
  });
  return finalRoutes;
};

/**
 * 过滤用户自定义html，防止xss攻击
 * @param html
 * @return {string}
 */
export const htmlFilter = function (html) {
  return xss(html);
};
