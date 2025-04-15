import { prisma } from "../../database/prisma-client";
import { ImageAnnotatorClient } from "@google-cloud/vision";

const visionClient = new ImageAnnotatorClient(); 

async function getImageEmbeddings(imageBuffer: Buffer) {
  try {
    const [result] = await visionClient.labelDetection(imageBuffer);
    return result.labelAnnotations?.map(label => label.description) ?? []; 
  } catch (error) {
    console.error("Erro ao processar imagem com Google Vision:", error);
    throw new Error("Erro ao processar a imagem");
  }
}

export async function searchByImage(imageBuffer: Buffer) {
  
  const incomingEmbeddings = await getImageEmbeddings(imageBuffer);
  const photos = await prisma.photo.findMany();

  const similarPhotos = [];

  for (const photo of photos) {
    if (!photo.embeddings || typeof photo.embeddings !== "string") continue;

    let storedEmbeddings: string[];

    try {
      storedEmbeddings = JSON.parse(photo.embeddings);
    } catch {
      continue;
    }

    if (Array.isArray(incomingEmbeddings) && Array.isArray(storedEmbeddings)) {
      const intersection = incomingEmbeddings.filter(label => 
        typeof label === 'string' && storedEmbeddings.includes(label)
      );

      const similarity = intersection.length / Math.max(incomingEmbeddings.length, storedEmbeddings.length);

      if (similarity >= 0.4) {
        similarPhotos.push({
          ...photo,
          imageUrl: photo.imageUrl.replace(/\.\w+$/, ''),
          similarity,
        });
      }
    }
  }

  return similarPhotos;
}
