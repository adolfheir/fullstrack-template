import { router } from '@/trpc';
import { authRouter } from './auth/auth.router';
import { healthRouter } from './health';

export const appRouter = router({
  auth: authRouter,
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
