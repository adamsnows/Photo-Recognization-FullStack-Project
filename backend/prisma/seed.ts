import fs from 'fs';
import path from 'path';
import { PrismaClient } from '../src/generated/prisma';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { photos } from './data';
import { ImageAnnotatorClient } from '@google-cloud/vision';

// Obtenha o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const baseUrl = process.env.BASE_URL ?? 'http://localhost:3333';

const prisma = new PrismaClient();
const visionClient = new ImageAnnotatorClient();

async function getImageEmbeddings(imagePath) {
  const [result] = await visionClient.labelDetection(imagePath);
  return result.labelAnnotations?.map(label => label.description) ?? []; 
}

async function resetPhotos() {
  await prisma.photo.deleteMany({});
  console.log('Todas as fotos foram deletadas.');
}

async function populatePhotos() {
  console.log('Conectando ao banco de dados...');
  await prisma.$connect();
  console.log('Conexão estabelecida!');

  for (const photo of photos) {
    const imagePath = path.resolve(__dirname, '..', 'assets', 'images', photo.imagePath);
    const imageBuffer = fs.readFileSync(imagePath);
    console.log('Lendo imagem de:', photo.imagePath);
    
    const embeddings = await getImageEmbeddings(imagePath);

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
        imageUrl: `${baseUrl}/images/${photo.imagePath}`,
        embeddings: JSON.stringify(embeddings), 
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
