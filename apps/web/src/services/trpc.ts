import type { AppRouter } from '@fullstrack/api/src/routers';
import { createTRPCClient, httpBatchLink, httpLink, loggerLink, splitLink, type CreateTRPCClient } from '@trpc/client';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { TRPC_HOST } from '@/constants/host';
import { userStore } from '@/stores/userStore';
// import type { AppRouter } from '../../../../packages/api/src/routers';
import { toastMsgLink } from './toastMsgLink';

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;



const httpLinkOptions = {
  url: TRPC_HOST,
  headers: () => {
    return {
      authorization: userStore?.token ? `Bearer ${userStore?.token}` : '',
    };
  },
};

export const trpcClient: CreateTRPCClient<AppRouter> = createTRPCClient<AppRouter>({
  links: [
    toastMsgLink(),
    splitLink({
      condition(op) {
        // check for context property `skipBatch`
        return Boolean(op.context.skipBatch);
      },
      // when condition is true, use normal request
      true: httpLink(httpLinkOptions),
      // when condition is false, use batching
      false: httpBatchLink(httpLinkOptions),
    }),
  ],
});
