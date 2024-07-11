"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const trpc_1 = require("../../server/trpc");
const auth_dtos_1 = require("./auth.dtos");
const auth_service_1 = require("./auth.service");
exports.authRouter = (0, trpc_1.router)({
    signUp: trpc_1.noAuthProcedure.input(auth_dtos_1.userCredentialsSchema).mutation(async ({ input, ctx }) => (0, auth_service_1.signUp)(input, ctx)),
    signIn: trpc_1.noAuthProcedure.input(auth_dtos_1.userCredentialsSchema).mutation(async ({ input, ctx }) => (0, auth_service_1.signIn)(input, ctx)),
});
