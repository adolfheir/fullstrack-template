import { authMiddleware } from '@/middlewares/authMiddleware';
import { publicProcedure, router } from '@/trpc';
import { userCredentialsSchema } from './auth.dtos';
import { creatUser, getUserInfoByToken, signIn } from './auth.service';

export const authRouter = router({
  //注册
  creatUser: publicProcedure.input(userCredentialsSchema).mutation(async ({ input, ctx }) => creatUser(input, ctx)),

  //登录
  signIn: publicProcedure.input(userCredentialsSchema).mutation(async ({ input, ctx }) => signIn(input, ctx)),

  // 获取用户信息
  getUserInfoByToken: publicProcedure.use(authMiddleware).query(async ({ ctx }) => getUserInfoByToken(ctx)),
});
