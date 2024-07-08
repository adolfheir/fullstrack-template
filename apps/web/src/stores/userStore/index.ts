/* 维护当前登陆信息 */
import React from 'react';
import { message } from 'antd';
import { proxy, useSnapshot } from 'valtio';
import { GLOBAL_TOKEN } from '@constants/storageKey';

export class UserStore {
  token?: string;

  //   private setUser(user?: User, token?: string) {
  //     localStorage.setItem(GLOBAL_TOKEN, token ?? '');
  //     this.token = token;
  //     this.user = user;
  //   }

  //   /* 初始化 */
  //   async init(toast?: boolean) {
  //     let token = localStorage.getItem(GLOBAL_TOKEN);
  //     try {
  //       if (!!token) {
  //         //接口设计不合理 应该走接口传 不应该在请求头
  //         this.token = token;
  //         let { user } = await UserService.GetUserInfoByToken({}, { toast: false });
  //         this.setUser(user!, token);
  //       }
  //     } catch (error) {
  //       this.token = undefined;
  //       if (toast && token) {
  //         message.error('登录已过期');
  //       }
  //     }
  //   }

  //   async login(username: string, password: string) {
  //     let { user, token } = await UserService.Login({
  //       userName: username,
  //       password: password,
  //     });
  //     if (user && token) {
  //       this.setUser(user, token);
  //     } else {
  //       message.error('登陆失败');
  //       throw new Error('login fail');
  //     }
  //   }

  //   async logout() {
  //     this.user = undefined;
  //     this.token = undefined;
  //     localStorage.removeItem(GLOBAL_TOKEN);
  //   }
}

export const userStore = proxy(new UserStore());

export function useUserStore() {
  return useSnapshot(userStore);
}
