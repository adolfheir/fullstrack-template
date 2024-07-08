"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminProcedure = exports.noAuthProcedure = exports.procedure = exports.router = void 0;
const superjson_1 = require("@src/utils/superjson");
const server_1 = require("@trpc/server");
const t = server_1.initTRPC.context().create({
    transformer: superjson_1.superjson,
    errorFormatter({ shape, error, ctx }) {
        if (error.code === 'INTERNAL_SERVER_ERROR') {
            ctx?.req.log.error(error);
            return { ...shape, message: 'Internal server error' };
        }
        return shape;
    },
});
const isAuthenticated = t.middleware(({ next, ctx }) => {
    if (!ctx.user) {
        throw new server_1.TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});
const isAdmin = t.middleware(({ next, ctx }) => {
    if (!ctx.user || ctx.user.role !== 'admin') {
        throw new server_1.TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});
exports.router = t.router;
exports.procedure = t.procedure.use(isAuthenticated);
exports.noAuthProcedure = t.procedure;
exports.adminProcedure = t.procedure.use(isAdmin);
