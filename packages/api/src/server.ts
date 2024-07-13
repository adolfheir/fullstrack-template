import cors from '@fastify/cors';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import pino from 'pino';
import pretty from 'pino-pretty';
import { env } from './constants/index';
import { appRouter } from './routers';
import { createContext } from './routers/context';

export function createServer() {
  const { PORT, HOST, NODE_ENV } = env;

  const stream = pretty({
    colorize: true,
    translateTime: 'HH:MM:ss Z',
    ignore: 'pid,hostname',
  });
  const prettyLogger = pino({ level: 'debug' }, stream);

  const server = fastify({
    logger: NODE_ENV == 'development' ? prettyLogger : true,
  });

  server.register(cors, {
    origin: '*',
    methods: '*',
  });

  server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,

      createContext,
    },
  });

  const stop = () => server.close();
  const start = async () => {
    try {
      await server.listen({ port: PORT, host: HOST });
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };

  return { server, start, stop };
}
