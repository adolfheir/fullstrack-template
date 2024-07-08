"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.createContext = createContext;
const client_1 = require("@prisma/client");
const server_1 = require("@trpc/server");
const jsonwebtoken_1 = require("jsonwebtoken");
const index_1 = require("@root/constants/index");
exports.prisma = new client_1.PrismaClient();
async function decodeAndVerifyJwtToken(token) {
    const decoded = (0, jsonwebtoken_1.verify)(token, index_1.env?.secretKey);
    return decoded;
}
async function createContext({ req, res }) {
    if (req.headers.authorization) {
        try {
            const user = await decodeAndVerifyJwtToken(req.headers.authorization.split(' ')[1]);
            return { req, res, prisma: exports.prisma, user };
        }
        catch (err) {
            throw new server_1.TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
        }
    }
    return { req, res, prisma: exports.prisma };
}
