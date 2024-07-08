import z from 'zod';
export declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"development">, z.ZodLiteral<"production">]>>;
    PORT: z.ZodDefault<z.ZodNumber>;
    HOST: z.ZodDefault<z.ZodString>;
    secretKey: z.ZodDefault<z.ZodString>;
    jwtExpiresIn: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    NODE_ENV: "development" | "production";
    PORT: number;
    HOST: string;
    secretKey: string;
    jwtExpiresIn: string;
}, {
    NODE_ENV?: "development" | "production" | undefined;
    PORT?: number | undefined;
    HOST?: string | undefined;
    secretKey?: string | undefined;
    jwtExpiresIn?: string | undefined;
}>;
export declare const env: {
    NODE_ENV: "development" | "production";
    PORT: number;
    HOST: string;
    secretKey: string;
    jwtExpiresIn: string;
};
