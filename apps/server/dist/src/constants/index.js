"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.envSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.envSchema = zod_1.default.object({
    NODE_ENV: zod_1.default.union([zod_1.default.literal('development'), zod_1.default.literal('production')]).default('development'),
    PORT: zod_1.default.coerce.number().int().default(3001),
    HOST: zod_1.default.string().default('0.0.0.0'),
    secretKey: zod_1.default.string().default('secret'),
    jwtExpiresIn: zod_1.default.string().default('1d'),
});
exports.env = exports.envSchema.parse(process.env);
