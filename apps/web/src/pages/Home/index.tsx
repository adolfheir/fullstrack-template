import React, { useEffect, useMemo, type CSSProperties } from 'react';
import Password from 'antd/es/input/Password';
import cls from 'classnames';
import { trpcClient } from '@/services/trpc';

const componentName = 'Index';

export interface IndexProps {
  style?: CSSProperties;
  className?: string;
}
export const Index: React.FC<IndexProps> = (props) => {
  const { style, className } = props;

  useEffect(() => {
    (async () => {
      try {
      } catch (error) {
        console.error('error', error);
      }
    })();
  }, []);

  return useMemo(
    () => (
      <div className={cls(className)} style={style}>
        login success
      </div>
    ),
    [],
  );
};

Index.displayName = 'Index';

export default Index;
