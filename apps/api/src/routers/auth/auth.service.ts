import { User, UserRole } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { omit } from 'lodash';
import { env } from '@/constants/index';
import { type AuthContext } from '@/middlewares/authMiddleware';
import { type Context } from '@/routers/context';
import { prismaIns } from '@/utils/prisma';
import { SignInDto, SignUpDto } from './auth.dtos';

type UserResponse = Omit<User, 'password'>;
type SignUpResult = UserResponse & { accessToken: string };

export type TokenPayload = UserResponse;

export const creatUser = async (input: SignUpDto, ctx: Context): Promise<UserResponse> => {
  const bcryptHash = await hash(input.password, 10);

  const user = await prismaIns.user.create({
    data: {
      email: input.email,
      password: bcryptHash,
      role: UserRole['USER'],
    },
  });
  return omit(user, 'password');
};

export const signIn = async (input: SignInDto, ctx: Context): Promise<SignUpResult> => {
  const user = await prismaIns.user.findUnique({
    where: {
      email: input.email,
    },
  });

  const error = new TRPCError({
    message: 'Incorrect email or password',
    code: 'UNAUTHORIZED',
  });

  if (!user) {
    throw error;
  }

  const result = await compare(input.password, user.password);

  if (!result) {
    throw error;
  }

  const token = sign(omit(user, 'password') as TokenPayload, env.secretKey, { expiresIn: env.jwtExpiresIn });

  return {
    ...omit(user, 'password'),
    accessToken: token,
  };
};

export const getUserInfoByToken = async (ctx: AuthContext): Promise<UserResponse> => {
  //通过数据库查最新状态
  const user = await prismaIns.user.findUnique({
    where: {
      email: ctx.tokenPayload.email,
    },
  });

  if (!user) {
    throw new TRPCError({
      message: 'user is notfount',
      code: 'UNAUTHORIZED',
    });
  }

  return omit(user, 'password');
};
