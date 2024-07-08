"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCredentialsSchema = void 0;
const zod_1 = require("zod");
exports.userCredentialsSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: 'Email is required',
    })
        .email(),
    password: zod_1.z
        .string({
        required_error: 'Password is required',
    })
        .min(8),
});
