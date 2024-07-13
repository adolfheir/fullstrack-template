import z from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.union([z.literal('development'), z.literal('production')]).default('development'),
  PORT: z.coerce.number().int().default(3001),
  HOST: z.string().default('0.0.0.0'),

  secretKey: z.string().default('secret'),
  jwtExpiresIn: z.string().default('1d'),
});

export const env = envSchema.parse(process.env);
