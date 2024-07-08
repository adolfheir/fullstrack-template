import { noAuthProcedure, router } from '@root/server/trpc';

export const healthRouter = router({
  health: noAuthProcedure.query(() => {
    return {
      health: 'ok',
    };
  }),
});
