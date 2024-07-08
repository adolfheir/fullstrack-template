import React, { ReactNode, useEffect, useMemo, type CSSProperties } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { omit } from 'lodash-es';
import 'antd/dist/reset.css';
import { routerList } from './generateRouter';
import './tailwind.global.css';

const componentName = 'app';

export interface AppProps {
  style?: CSSProperties;
  className?: string | string[];
}

export const App: React.FC<AppProps> = (props) => {
  const { style, className } = props;

  const defaultPath = routerList?.[0]?.path;

  return (
    <Routes>
      {routerList.map((item) => {
        const { component, ...others } = item;
        const { path } = others;
        const element = React.createElement(component);
        return <Route {...omit(others, 'children')} key={path} element={element} />;
      })}

      <Route path="/" element={<Navigate replace to={defaultPath} />} />
      <Route path="*" element={<Navigate replace to={defaultPath} />} />
    </Routes>
  );
};

//后续看 是否需要放弃严格模式
let root = document.getElementById('root');
ReactDOM.createRoot(root!).render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <AuthWrapper> */}
    <App></App>
    {/* </AuthWrapper> */}
  </BrowserRouter>,
  // </React.StrictMode>,
);
