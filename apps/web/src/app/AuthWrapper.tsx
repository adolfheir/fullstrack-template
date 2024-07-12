import React, { useEffect, useMemo, useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import { userStore, useUserStore } from '@stores/userStore/index';
import { createLoadable } from '@components/CreateLoadable';
import type { LoginProps } from '@materias/GlobalLayout/Login';

const Login = createLoadable<LoginProps>(() => import(/* webpackChunkName: "Login" */ '@materias/GlobalLayout/Login'));

export interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = (props) => {
  const { children } = props;

  /* ============================== init =============================== */
  const [isReady, setIsReady] = useState(false);
  useAsyncEffect(async () => {
    try {
      await userStore.init(true);
    } catch (error) {}
    setIsReady(true);
  }, []);

  /* ============================== user =============================== */
  const { user } = useUserStore();
  const isLogin = !!user;

  return useMemo(
    () => (
      <>
        {!isReady && <></>}
        {isReady && isLogin && <>{children}</>}
        {isReady && !isLogin && <Login />}
      </>
    ),
    [isLogin, isReady, children],
  );
};

AuthWrapper.displayName = 'AuthWrapper';

export default AuthWrapper;
