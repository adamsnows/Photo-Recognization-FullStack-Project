import { prisma } from "../../database/prisma-client";
import { ImageAnnotatorClient } from "@google-cloud/vision";

const visionClient = new ImageAnnotatorClient({
    credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON ?? '{}'),
  });

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

  let maxSimilarity = -1;
  let mostSimilarPhoto = null;

  for (const photo of photos) {
    let storedEmbeddings: string[] = [];

    if (photo.embeddings) {
      try {
        storedEmbeddings = JSON.parse(photo.embeddings as string);
      } catch (error) {
        console.error("Erro ao processar embeddings da foto armazenada:", error);
        continue;
      }
    } else {
      continue;
    }

    if (Array.isArray(incomingEmbeddings) && Array.isArray(storedEmbeddings)) {
      const intersection = incomingEmbeddings.filter(label => 
        typeof label === 'string' && storedEmbeddings.includes(label)
      );
      
      const similarity = intersection.length / Math.max(incomingEmbeddings.length, storedEmbeddings.length);
    
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        mostSimilarPhoto = photo;
      }
    }
  }

  return mostSimilarPhoto
  ? {
      similarPhoto: {
        ...mostSimilarPhoto,
        imageUrl: mostSimilarPhoto.imageUrl.replace(/\.\w+$/, ''),
      },
      similarity: maxSimilarity,
    }
  : null;
}
