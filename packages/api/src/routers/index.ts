import { mergeRouters, router } from '@/trpc';
import { authRouter } from './auth/auth.router';
import { healthRouter } from './health';

export const appRouter = mergeRouters(
  router({
    auth: authRouter,
  }),
  healthRouter,
);

export type AppRouter = typeof appRouter;
