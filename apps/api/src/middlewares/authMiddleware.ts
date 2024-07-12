import { TRPCError } from '@trpc/server';
import { verify } from 'jsonwebtoken';
import { env } from '@/constants/index';
import { type TokenPayload } from '@/routers/auth/auth.service';
import { type Context } from '@/routers/context';
import { middleware } from '@/trpc';

export type AuthContext = Context & { tokenPayload: TokenPayload };

async function decodeAndVerifyJwtToken(token: string): Promise<TokenPayload> {
  const decoded = verify(token, env?.secretKey);
  return decoded as TokenPayload;
}

export const authMiddleware = middleware(async (opts) => {
  const { ctx } = opts;

  let tokenPayload: TokenPayload | undefined = undefined;
  if (ctx.req.headers.authorization) {
    try {
      tokenPayload = await decodeAndVerifyJwtToken(ctx.req.headers.authorization.split(' ')[1]);
    } catch (err) {}
  }

  if (!tokenPayload) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid Token' });
  }

  return opts.next({
    ctx: {
      ...ctx,
      tokenPayload,
    } as AuthContext,
  });
});
