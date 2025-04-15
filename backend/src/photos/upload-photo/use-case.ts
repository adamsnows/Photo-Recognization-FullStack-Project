import { prisma } from "../../database/prisma-client";
import { ImageAnnotatorClient } from "@google-cloud/vision";

interface AddPhotoInput {
  name: string;
  collection: string;
  location: string;
  models: string;
  creativeDirection: string;
  photography: string;
  photographyAssistant: string;
  film: string;
  styling: string;
  beauty: string;
  setProduction: string;
  executiveProduction: string;
  image: Buffer;
  fileName: string;
  imageUrl: string;
}
const baseUrl = "https://photos-api-434732873433.us-central1.run.app";  

const visionClient = new ImageAnnotatorClient();

async function getImageEmbeddings(imageBuffer: Buffer) {
  const [result] = await visionClient.labelDetection({ image: { content: imageBuffer } });
  return result.labelAnnotations?.map(label => label.description) ?? [];
}

export async function addPhoto(data: AddPhotoInput) {
  const embeddings = await getImageEmbeddings(data.image);

  const photo = await prisma.photo.create({
    data: {
      ...data,
      imageUrl: `${baseUrl}/images/${Date.now()}-${data.fileName}`,
      embeddings: JSON.stringify(embeddings),
    },
  });

  return photo;
}
