import { TRPC_HOST } from '@constants/host';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
// import type { AppRouter } from '@fullstrack/server/src/type';
import type { AppRouter } from '../../../server/src/type';
import { userStore } from '@stores/userStore';

export const trpcClient: AppRouter = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: TRPC_HOST,
      headers: () => {
        return {
          authorization: `Bearer ${userStore?.token}`,
        };
      },
    }),
  ],
});
