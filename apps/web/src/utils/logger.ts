// 暂时用consola 后续切
import { createConsola, LogLevels, LogTypes, type Consola, type ConsolaInstance } from 'consola';
import { isNumber } from 'lodash-es';
import { IS_DEV_MODE, isDev } from '@constants/index';
import { LOG_LEVEL } from '@constants/storageKey';

//暂时只使用这5个类别
export type CreateLogger = (namespace?: string) => Pick<ConsolaInstance, 'error' | 'warn' | 'info' | 'debug' | 'trace'>;

export const createLogger: CreateLogger = () => {
  let level = LogLevels['warn'];
  let localValue = localStorage.getItem(LOG_LEVEL);

  if (localValue && isNumber(Number(localValue))) {
    level = Number(localValue);
  }
  if (IS_DEV_MODE) {
    level = LogLevels['info'];
  }

  if (isDev) {
    level = LogLevels['debug'];
  }
  const logger = createConsola({
    level: level,
  });
  return logger;
};

export const logger = createLogger();
export default logger;

// GlobalLogger.error("error")
// GlobalLogger.warn("warn")
// GlobalLogger.info("info")
// GlobalLogger.debug("info")
// GlobalLogger.trace("trace")
