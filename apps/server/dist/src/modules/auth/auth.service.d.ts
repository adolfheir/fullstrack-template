import { User } from '@prisma/client';
import { Context } from '../../server/context';
import { SignInDto, SignUpDto } from './auth.dtos';
type UserResponse = Omit<User, 'password'>;
type SignUpResult = UserResponse & {
    accessToken: string;
};
export declare const signUp: (input: SignUpDto, ctx: Context) => Promise<UserResponse>;
export declare const signIn: (input: SignInDto, ctx: Context) => Promise<SignUpResult>;
export {};
