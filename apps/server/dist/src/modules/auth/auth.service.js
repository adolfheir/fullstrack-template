"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const prisma_1 = require("../../utils/prisma");
const server_1 = require("@trpc/server");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
// import { authConfig } from '../../configs/auth.config';
const index_1 = require("../..//constants/index");
const signUp = async (input, ctx) => {
    const bcryptHash = await (0, bcryptjs_1.hash)(input.password, 10);
    const user = await prisma_1.prisma.user.create({
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
exports.signUp = signUp;
const signIn = async (input, ctx) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            email: input.email,
        },
    });
    const error = new server_1.TRPCError({
        message: 'Incorrect email or password',
        code: 'UNAUTHORIZED',
    });
    if (!user) {
        throw error;
    }
    const result = await (0, bcryptjs_1.compare)(input.password, user.password);
    if (!result) {
        throw error;
    }
    const token = (0, jsonwebtoken_1.sign)({
        id: user.id,
        roles: user.role,
    }, index_1.env.secretKey, { expiresIn: index_1.env.jwtExpiresIn });
    return {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role,
        accessToken: token,
    };
};
exports.signIn = signIn;
