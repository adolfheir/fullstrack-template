"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRouter = void 0;
const trpc_1 = require("../..//server/trpc");
exports.healthRouter = (0, trpc_1.router)({
    health: trpc_1.noAuthProcedure.query(() => {
        return {
            health: 'ok',
        };
    }),
});
