/*
此处管理所有可控制的环境变量,方便后续维护
原则:导出的环境变量定义需明确&有具体含义(除 WEB_RUNTIME)
错误示范:IS_GUANGMAI:false //是否是广脉环境 (广脉环境变了啥 需定义到每个变量)
正确示范:GLOBAL_IS_HELMET_SHOW:true //是否展示头盔检索
 */
import dayjs from 'dayjs';
import get from 'lodash-es/get';
import { IS_DEV_MODE, isDev } from './env';

// ========================== 所有的变量 =========================
//运行环境
export { IS_DEV_MODE, isDev };
export const IS_NEXT_VERSION = false;
export const APP_LANG = 'zh-CN' as 'zh-CN' | 'en-US' | 'vi-VN';
export const APP_NAME = '包行天下';
