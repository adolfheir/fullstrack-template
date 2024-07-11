"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = createServer;
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_1 = require("@trpc/server/adapters/fastify");
const fastify_2 = __importDefault(require("fastify"));
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const index_1 = require("../constants/index");
const context_1 = require("./context");
const router_1 = require("./router");
function createServer() {
    const { PORT, HOST, NODE_ENV } = index_1.env;
    const stream = (0, pino_pretty_1.default)({
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
    });
    const prettyLogger = (0, pino_1.default)({ level: 'debug' }, stream);
    const server = (0, fastify_2.default)({
        logger: NODE_ENV == 'development' ? prettyLogger : true,
    });
    server.register(cors_1.default, {
        origin: '*',
        methods: '*',
    });
    server.register(fastify_1.fastifyTRPCPlugin, {
        prefix: '/trpc',
        trpcOptions: {
            router: router_1.appRouter,
            createContext: context_1.createContext,
        },
    });
    const stop = () => server.close();
    const start = async () => {
        try {
            await server.listen({ port: PORT, host: HOST });
        }
        catch (err) {
            server.log.error(err);
            process.exit(1);
        }
    };
    return { server, start, stop };
}
