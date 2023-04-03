# 路由中 meta 属性说明

```ts
interface MetaRecord {
  /**
   * @name 菜单未选中状态下的icon
   */
  icon?: VNode;
  /**
   * @name 菜单被选中状态下的icon
   */
  iconActive?: VNode;
  /**
   * @name 为详情页添加父页面包屑
   */
  parentTitle?: string;
  /**
   * @name 当前路由下被激活的菜单
   */
  activeMenu?: string;
  /**
   * @type 有 children 的菜单的组件类型 可选值 'group'
   */
  type?: string;
  /**
   * @name 自定义菜单的国际化 key，如果没有则返回自身
   */
  title?: string;
  /**
   * @name 内建授权信息
   */
  authority?: string | string[];
  /**
   * @name 打开目标位置 '_blank' | '_self' | null | undefined
   */
  target?: TargetType;
  /**
   * @name 在菜单中隐藏子节点
   */
  hideChildInMenu?: boolean;
  /**
   * @name 在菜单中隐藏自己和子节点
   */
  hideInMenu?: boolean;
  /**
   * @name disable 菜单选项
   */
  disabled?: boolean;
  /**
   * @name 隐藏自己，并且将子节点提升到与自己平级
   */
  flatMenu?: boolean;

  [key: string]: any;
}
```
