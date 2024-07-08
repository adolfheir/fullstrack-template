import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { TRPC_HOST } from '@constants/host';
import type { AppRouter } from '@fullstrack/server/src/type';
import {} from "@fullstrack/server/src/type"
import { userStore } from '@stores/userStore';

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://127.0.0.1:3000/trpc',
    }),
  ],
});
