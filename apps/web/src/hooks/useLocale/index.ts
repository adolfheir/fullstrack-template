import { message } from 'antd';
import { has } from 'lodash-es';
import { APP_LANG, isDev } from '@constants/index';
import logger from '@utils/logger';

const useLocale = (data: any) => {
  return (key: string, interpolation?: { [key: string]: any }) => {
    let text = data[APP_LANG as keyof typeof APP_LANG][key] as any;

    if (!text) {
      if (isDev) {
        message.error('找不到翻译 打开控制台检查');
      }
      logger.error('useLocale not fount', key, text, APP_LANG, data, data[APP_LANG as keyof typeof APP_LANG]);
    }
    //实现插值
    let textCheck = isDev ? true : !!text; //生产环境做兼容 开发环境抛错误
    if (interpolation && textCheck) {
      text = text.replace(/{{(.*?)}}/gi, function (matchValue: string, key: string) {
        let isExitKey = has(interpolation, key);
        return `${isExitKey ? interpolation[key as keyof typeof interpolation] : matchValue}`;
      });
    }

    return text;
  };
};

export default useLocale;
