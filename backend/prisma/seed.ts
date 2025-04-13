import fs from 'fs';
import path from 'path';
import { PrismaClient } from '../src/generated/prisma';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { photos } from './data';

// Obtenha o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const baseUrl = process.env.BASE_URL ?? 'http://localhost:3333';

const prisma = new PrismaClient();

async function resetPhotos() {
  // Deleta todas as fotos
  await prisma.photo.deleteMany({});
  console.log('Todas as fotos foram deletadas.');
}

async function populatePhotos() {
  console.log('Conectando ao banco de dados...');
  await prisma.$connect();
  console.log('Conexão estabelecida!');

  for (const photo of photos) {
    const imageBuffer = fs.readFileSync(
      path.resolve(__dirname, '..', 'assets', 'images', photo.imagePath)
      
    );
    console.log('Lendo imagem de:', photo.imagePath)
    
    await prisma.photo.create({
      data: {
        name: photo.name,
        collection: photo.collection,
        location: photo.location,
        models: photo.models,
        creativeDirection: photo.creativeDirection,
        photography: photo.photography,
        photographyAssistant: photo.photographyAssistant,
        film: photo.film,
        styling: photo.styling,
        beauty: photo.beauty,
        setProduction: photo.setProduction,
        executiveProduction: photo.executiveProduction,
        image: imageBuffer,
        fileName: photo.imagePath,
        imageUrl: `${baseUrl}/images/${photo.imagePath}`
      },
    });
  }

  console.log('Fotos foram inseridas no banco!');
}

async function checkPhotos() {
  const photos = await prisma.photo.findMany();
  console.log('Fotos no banco de dados:', photos);
}

async function main() {
  try {
    await resetPhotos();
    await populatePhotos();
    await checkPhotos();
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
