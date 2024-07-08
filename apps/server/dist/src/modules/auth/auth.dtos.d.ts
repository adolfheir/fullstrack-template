import { z } from 'zod';
export declare const userCredentialsSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SignInDto = z.TypeOf<typeof userCredentialsSchema>;
export type SignUpDto = z.TypeOf<typeof userCredentialsSchema>;
