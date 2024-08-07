import { PrismaClient } from './generated/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prismaIns =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

export * from './generated/client';

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prismaIns;
}
