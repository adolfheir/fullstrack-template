import { noAuthProcedure, router } from "../../trpc"

export const healthRouter = router({
  health: noAuthProcedure.query(() => {
    return {
      health: 'ok',
    };
  }),
});
