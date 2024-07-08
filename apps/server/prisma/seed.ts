import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Add more seeding logic as needed
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
