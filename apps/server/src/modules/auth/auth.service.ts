import { prisma } from '../../utils/prisma';
import { User } from '@prisma/client';
import { Context } from '@root/server/context';
import { TRPCError } from '@trpc/server';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
// import { authConfig } from '../../configs/auth.config';
import { env } from '@root/constants/index';
import { SignInDto, SignUpDto } from './auth.dtos';

type UserResponse = Omit<User, 'password'>;
type SignUpResult = UserResponse & { accessToken: string };

export const signUp = async (input: SignUpDto, ctx: Context): Promise<UserResponse> => {
  const bcryptHash = await hash(input.password, 10);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      password: bcryptHash,
      role: 'user',
    },
  });
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    role: user.role,
  };
};

export const signIn = async (input: SignInDto, ctx: Context): Promise<SignUpResult> => {
  const user = await prisma.user.findUnique({
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

  const token = sign(
    {
      id: user.id,
      roles: user.role,
    },
    env.secretKey,
    { expiresIn: env.jwtExpiresIn },
  );

  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    role: user.role,
    accessToken: token,
  };
};
