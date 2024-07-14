import React, { HTMLAttributeAnchorTarget } from 'react';
import { get, isArray } from 'lodash-es';
import { createLoadable } from '@/components/CreateLoadable/index';

const HOME = createLoadable(() => import(/* webpackChunkName: "home" */ '@/pages/Home'));

export interface RouterItem {
  path: string;
  component: React.ComponentType<any>;
  // component: () => Promise<any>;
  // icon?: 'testicon';
  //是否启用keep alive 默认true
  keepAlive?: boolean;
  // 新页面打开
  target?: HTMLAttributeAnchorTarget;
  // 权限配置 不配置所有权限可见
  // access?: Array<UserRight> | undefined;
  // 子目录group标题,不存在则不会显示在子目录下
  title: string;
  group?: string;
  //是否是上帝模式页面  defatlt:false
  isDevPage?: boolean;
  /**
   * 路由转场动画 默认淡入淡出 由RouterAnimateWrapper实现
   * @default BASE
   */
  layout?: 'BASE' | 'NONE';
  /* 暂未实现 */
  children?: Array<RouterItem>;
}

export const routerList: RouterItem[] = [
  {
    keepAlive: true,
    path: 'home',
    component: HOME,
    group: 'HOME',
    title: '',
  },
];
