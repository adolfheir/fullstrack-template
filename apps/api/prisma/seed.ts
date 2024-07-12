import { PrismaClient, UserRole } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 检查是否已经存在 SUPERADMIN 用户
  const superadminExists = await prisma.user.findFirst({
    where: { role: UserRole.SUPERADMIN },
  });

  if (!superadminExists) {
    // 如果不存在 SUPERADMIN 用户，则创建一个新的
    let hashPwd = await hash('superadmin123', 10);
    const superadmin = await prisma.user.create({
      data: {
        email: 'superadmin@domain.com',
        password: hashPwd,
        role: UserRole.SUPERADMIN,
      },
    });
    console.log('Superadmin created:', superadmin);
  } else {
    console.log('Superadmin already exists.');
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
