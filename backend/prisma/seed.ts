require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

async function main() {
  console.log('Initializing Prisma...');
  const prisma = new PrismaClient();
  console.log('Seeding admin...');
  
  const adminEmail = 'admin@myladoor.com';
  const adminPassword = 'Myladoor@Admin2026.';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Saji Myladoor',
      role: 'ADMIN',
      phone: '8848392990'
    },
  });

  console.log('Admin seeded!');
}

main()
  .catch((e) => {
    console.error('ERROR:', e);
    process.exit(1);
  });
