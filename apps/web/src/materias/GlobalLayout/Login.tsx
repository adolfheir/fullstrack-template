import React, { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Button, Checkbox, ConfigProvider, Input, InputRef, message } from 'antd';
import cls from 'classnames';
import { APP_NAME } from '@/constants/index';
import { GLOBAL_PWD, GLOBAL_USER } from '@/constants/storageKey';
import { userStore } from '@/stores/userStore/index';
import { decrypt, encrypt_canRun } from '@/utils/encrypt';
import logger from '@/utils/logger';

const img = new URL('./resources/bg.jpg', import.meta.url).href;

const componentName = 'Login';

export interface LoginProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const Login: React.FC<LoginProps> = (props) => {
  const { style, className } = props;

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  /* ============================== 记住密码 =============================== */
  const [checked, setChecked] = useState<boolean>(false);
  useEffect(() => {
    let pwd = localStorage.getItem(GLOBAL_USER);
    let uname = localStorage.getItem(GLOBAL_PWD);
    setChecked(!!pwd ? true : false);
    setPassword(decrypt(pwd) ?? '');
    setUsername(uname ?? '');
  }, []);

  /* ============================== 表单提交 =============================== */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hanldeSubmit = useMemoizedFn(async () => {
    if (isLoading) return;

    if (!username || !password) {
      message.warning('请输入用户名/密码');
      return;
    }

    setIsLoading(true);
    try {
      await userStore.login(username, password);
      if (checked) {
        localStorage.setItem(GLOBAL_USER, checked ? encrypt_canRun(password) : '');
        localStorage.setItem(GLOBAL_PWD, checked ? username : '');
      }
    } catch (error) {
      logger.error(error);
    }
    setIsLoading(false);
  });

  /* ============================== pwd ============================== */
  const pwdInputRef = useRef<InputRef>(null);

  return (
    <div
      className="flex h-[100vh] w-[100vw] items-center justify-center"
      style={{
        background: `url(${img})`,
        backgroundSize: '150rem',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        // backgroundSize: 'cover',
      }}
    >
      <div className="flex w-[1200px] items-center justify-center">
        <div
          style={{
            boxShadow: '0px 2px 20px 0px rgba(199,207,228,0.26)',
          }}
          className={cls('h-[540px] w-[460px] rounded-[8px] bg-[#fff] px-[40px]')}
        >
          <div className="flex justify-between pt-[70px]">
            <div className="flex items-end">
              <span className="font-PingFang text-[36px] font-bold text-[#333]">登录</span>
              <span className="font-PingFang ml-[4px] text-[24px] text-[#E5E5E5]">LOGIN</span>
            </div>
            {/* <img src={loginRight} className="w-[46px] h-[32px]" /> */}
          </div>

          <ConfigProvider
            theme={{
              token: {
                colorPrimaryHover: '#F8F9FB',
                colorPrimary: '#F8F9FB',
                controlOutlineWidth: 0,
                // inputBorderHoverColor: '#fff',
              },
              components: {
                Input: {
                  lineWidth: 0,
                  colorBgContainer: '#F8F9FB',
                  colorBorder: '#F8F9FB',
                  borderRadius: 8,
                },
              },
            }}
          >
            <>
              <div className="mt-[42px]">
                <Input
                  placeholder="请输入用户名"
                  className="h-[54px]"
                  value={username}
                  onChange={(e) => {
                    setUsername(e?.target?.value?.trim?.() ?? '');
                  }}
                  onPressEnter={() => {
                    pwdInputRef.current!.focus({
                      cursor: 'end',
                    });
                  }}
                />
              </div>
              <div className="mt-[30px]">
                <Input.Password
                  ref={pwdInputRef}
                  placeholder="请输入密码"
                  className="h-[54px]"
                  value={password}
                  onChange={(e) => {
                    setPassword(e?.target?.value?.trim?.() ?? '');
                  }}
                  onPressEnter={() => {
                    hanldeSubmit();
                  }}
                />
              </div>
            </>
          </ConfigProvider>
          <div
            className="mt-[25px] cursor-pointer select-none"
            onClick={() => {
              setChecked(!checked);
            }}
          >
            <Checkbox className="pointer-events-none text-[#1F1F1F]" checked={checked}>
              记住密码
            </Checkbox>
          </div>

          <div className="mt-[45px]">
            <Button
              type={'primary'}
              className="font-Sans h-[54px] text-[18px] font-bold text-[#fff]"
              block
              onClick={() => {
                hanldeSubmit();
              }}
            >
              登录
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.displayName = 'Login';

export default Login;
