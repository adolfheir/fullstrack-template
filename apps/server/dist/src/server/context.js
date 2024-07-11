"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = createContext;
const server_1 = require("@trpc/server");
const jsonwebtoken_1 = require("jsonwebtoken");
const index_1 = require("../constants/index");
async function decodeAndVerifyJwtToken(token) {
    const decoded = (0, jsonwebtoken_1.verify)(token, index_1.env?.secretKey);
    return decoded;
}
async function createContext({ req, res }) {
    if (req.headers.authorization) {
        try {
            const user = await decodeAndVerifyJwtToken(req.headers.authorization.split(' ')[1]);
            return { req, res, user };
        }
        catch (err) {
            throw new server_1.TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
        }
    }
    return { req, res };
}
