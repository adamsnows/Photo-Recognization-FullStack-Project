import { PrismaClient } from '../src/generated/prisma';
import { exec } from 'node:child_process';
import { promisify } from 'util';

const prisma = new PrismaClient();
const execPromise = promisify(exec);

async function main() {
  try {
    await execPromise('npx prisma migrate reset --force');
    console.log('🧹 Banco limpo.');

    await execPromise('npm run seed');
    console.log('✨ Seed executado com sucesso.');
  } catch (error) {
    console.error(`Erro: ${error.message}`);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
