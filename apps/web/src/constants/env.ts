import { WEB_DEV_MODE } from './storageKey';

export const isDev = import.meta.env.DEV; //是否是开发环境
export const IS_DEV_MODE = localStorage.getItem(WEB_DEV_MODE) === 'true' || isDev; //是否打开了调试环境
// export const IS_DEV_MODE = false;
//@ts-ignore
export const isPreview = import.meta.env.VITE_PREVIEW === '1';
