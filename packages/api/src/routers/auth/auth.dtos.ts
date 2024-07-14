import { z } from 'zod';

export const userCredentialsSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    // .email(),
    .refine(
      (email) => {
        // 自定义校验规则，允许标准的email格式或者'superadmin@domain.com'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) || email === 'superadmin@domain.com';
      },
      {
        message: 'Invalid email address',
      },
    ),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8),
});

export type SignInDto = z.TypeOf<typeof userCredentialsSchema>;
export type SignUpDto = z.TypeOf<typeof userCredentialsSchema>;
