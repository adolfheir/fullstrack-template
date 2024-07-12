/* 维护当前登陆信息 */
import React from 'react';
import { GLOBAL_TOKEN } from '@constants/storageKey';
import { clearCache } from 'ahooks';
import { message } from 'antd';
import { proxy, useSnapshot } from 'valtio';
import { trpcClient, type RouterOutput } from '@services/trpc';

export type User = RouterOutput['auth']['getUserInfoByToken'];
// export type User = {
//   email: string;
//   id: number;
//   createdAt: string;
//   updatedAt: string;
//   // role: $Enums.UserRole;
// };

export class UserStore {
  user?: User;
  token?: string;

  private setUser(user?: User, token?: string) {
    localStorage.setItem(GLOBAL_TOKEN, token ?? '');
    this.token = token;
    this.user = user;
  }

  /* 初始化 */
  async init(toast?: boolean) {
    let token = localStorage.getItem(GLOBAL_TOKEN);
    try {
      if (!!token) {
        this.token = token;
        let resp = await trpcClient.auth.getUserInfoByToken.query();
        this.setUser(resp!, token);
      }
    } catch (error) {
      this.token = undefined;
      if (toast && token) {
        message.error('登录已过期');
      }
    }
  }

  async login(username: string, password: string) {
    let { accessToken: token, ...user } = await trpcClient.auth.signIn.mutate({
      email: username,
      password: password,
    });
    if (user && token) {
      this.setUser(user, token);
    } else {
      message.error('登陆失败');
      throw new Error('login fail');
    }
  }

  async logout() {
    this.user = undefined;
    this.token = undefined;
    localStorage.removeItem(GLOBAL_TOKEN);
  }
}

export const userStore = proxy(new UserStore());

export function useUserStore() {
  return useSnapshot(userStore);
}
