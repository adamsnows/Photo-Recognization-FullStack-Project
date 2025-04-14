import { FastifyInstance, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../database/prisma-client";
import { getPhotos } from "./get-photos/use-case";
import { SearchPhotosInput } from "./search-photos/schemas";
import { searchPhotos } from "./search-photos/use-case";
import { searchByImage } from "./search-by-image/use-case";
import type { MultipartFile } from '@fastify/multipart'

interface Params {
    id: string;
}

export async function photosRoutes(fastify: FastifyInstance) {
  fastify.get("/photos", async (_req, reply) => {
    const photos = await getPhotos();
    return reply.send(photos);
  });

  fastify
    .withTypeProvider<ZodTypeProvider>()
    .get(
      "/search",
      async (
        request: FastifyRequest<{
          Querystring: SearchPhotosInput;
        }>,
        reply
      ) => {
        const { term } = request.query;
        const photos = await searchPhotos(term);
        return reply.send(photos);
      }
    );

  fastify.get("/images/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    
    const photo = await prisma.photo.findUnique({
      where: {
        id: Number(id),
      },
    });
    
    if (!photo) {
      return reply.status(404).send({ message: 'Imagem não encontrada' });
    }
    
    reply
      .header('Content-Type', 'image/png')
      .send(photo.image);
  });


  fastify.post("/search-by-image", async (req, reply) => {
    console.log("📥 Requisição recebida em /search-by-image");
    console.log(req.body, "body");
    console.log(req.isMultipart(), "isMultipart");
  
    const parts = req.parts();
    let imageFound = false;
  
    for await (const part of parts) {
      console.log("🔍 Parte recebida:", {
        type: part.type,
        fieldname: part.fieldname,
        filename: (part as any).filename,
        mimetype: (part as any).mimetype,
      });
  
      if (part.type === 'file' && part.fieldname === 'image') {
        imageFound = true;
        const file = part as MultipartFile;
  
        try {
          console.log("📦 Lendo buffer da imagem...");
          const imageBuffer = await file.toBuffer();
  
          console.log("🤖 Chamando searchByImage com buffer de tamanho:", imageBuffer.length);
          const result = await searchByImage(imageBuffer);
  
          if (result) {
            console.log("✅ Imagem semelhante encontrada:", result);
            return reply.send(result);
          } else {
            console.log("❌ Nenhuma foto semelhante encontrada");
            return reply.status(404).send({ message: "Nenhuma foto semelhante encontrada" });
          }
        } catch (error) {
          console.error("🔥 Erro ao processar imagem:", error);
          return reply.status(500).send({ message: "Erro ao processar a imagem" });
        }
      }
    }
  
    if (!imageFound) {
      console.warn("🚫 Nenhum arquivo do tipo 'image' foi encontrado no multipart");
    }
  
    return reply.status(400).send({ message: "Imagem não fornecida" });
  });
  
}
