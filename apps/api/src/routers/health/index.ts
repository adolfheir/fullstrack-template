import { publicProcedure, router } from '@/trpc';

export const healthRouter = router({
  healthz: publicProcedure.query(() => {
    return 'ok';
  }),
});

// export const healthRouter = publicProcedure.query(() => {
//   return {
//     health: 'ok',
//   };
// });
