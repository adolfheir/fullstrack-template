import { TRPC_HOST } from '@constants/host';
import { createTRPCClient, httpBatchLink, type CreateTRPCClient } from '@trpc/client';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { userStore } from '@stores/userStore';
import type { AppRouter } from '@fullstrack/api/src/routers';
// import type { AppRouter } from '../../../api/src/routers';

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export const trpcClient: CreateTRPCClient<AppRouter> = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: TRPC_HOST,
      headers: () => {
        return {
          authorization: userStore?.token ? `Bearer ${userStore?.token}` : '',
        };
      },
    }),
  ],


});
