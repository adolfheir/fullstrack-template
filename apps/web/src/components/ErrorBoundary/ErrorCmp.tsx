import React, { useMemo, type CSSProperties } from 'react';
import cls from 'classnames';
import useLocale from '@/hooks/useLocale';
import styles from './index.module.scss';
import locale from './locales';

const t = useLocale(locale);

const componentName = 'error-cmp';

export interface ErrorCmpProps {
  style?: CSSProperties;
  className?: string | string[];
}
export const ErrorCmp: React.FC<ErrorCmpProps> = (props) => {
  const { style, className } = props;
  return useMemo(
    () => (
      <div className={cls(styles[componentName], className)} style={style}>
        {t('组件渲染出错')}
      </div>
    ),
    [],
  );
};

ErrorCmp.displayName = 'error-cmp';

export default ErrorCmp;
