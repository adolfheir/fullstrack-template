import React, { ComponentType, LazyExoticComponent, ReactElement } from 'react';
import ErrorBoundary from '@components/ErrorBoundary';

let LoadingComponent: ReactElement | null = null;

export function setLoadingComponent(cmp: ReactElement): void {
  LoadingComponent = cmp;
}

export function createLoadable<T = any>(loader: () => Promise<{ default: ComponentType<any> }>) {
  // 创建 LazyExoticComponent 类型
  const LazyComponent: LazyExoticComponent<React.ComponentType<any>> = React.lazy(loader);
  return (props: T) => (
    <ErrorBoundary>
      <React.Suspense fallback={LoadingComponent}>
        <LazyComponent {...props} />
      </React.Suspense>
    </ErrorBoundary>
  );
}
