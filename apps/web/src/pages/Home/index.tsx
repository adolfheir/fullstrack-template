import React, { useEffect, useMemo, type CSSProperties } from 'react';
import cls from 'classnames';
import { trpcClient } from '@services/trpc';

const componentName = 'Index';

export interface IndexProps {
  style?: CSSProperties;
  className?: string;
}
export const Index: React.FC<IndexProps> = (props) => {
  const { style, className } = props;

  useEffect(() => {
    (async () => {
      // try {
      //   let data = await trpcClient.auth.signIn({
      //     // email:""
      //   })
      //   console.log('data', data);
      // } catch (error) {
      //   console.error('error', error);
      // }
    })();
  }, []);

  return useMemo(
    () => (
      <div className={cls(className)} style={style}>
        sad\
      </div>
    ),
    [],
  );
};

Index.displayName = 'Index';

export default Index;
