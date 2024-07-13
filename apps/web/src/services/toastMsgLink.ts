import type { AppRouter } from '@fullstrack/api/src/routers';
import { TRPCClientError, TRPCLink } from '@trpc/client';
import { observable, tap } from '@trpc/server/observable';
import { message } from 'antd';

export function isTRPCClientError(cause: unknown): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}

export function toastMsgLink(): TRPCLink<AppRouter> {
  return () => {
    return ({ op, next }) => {
      return observable((observer) => {
        return next(op)
          .pipe(
            tap({
              error(result) {
                const { showToast = true, defaultMsg = '服务器错误' } = (op?.context ?? {}) as {
                  showToast?: boolean;
                  defaultMsg?: string;
                };
                if (showToast) {
                  let msg = defaultMsg;
                  if (isTRPCClientError(result?.cause)) {
                    //这是客户端自己的错误 包括http错误
                    msg = result.cause.message ?? defaultMsg;
                  } else {
                    //服务端返回的错误
                    msg = result.message ?? defaultMsg;
                  }
                  message.error(msg);
                }
              },
            }),
          )
          .subscribe(observer);
      });
    };
  };
}
