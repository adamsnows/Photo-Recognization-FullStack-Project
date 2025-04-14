import { FastifyInstance, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../database/prisma-client";
import { getPhotos } from "./get-photos/use-case";
import { SearchPhotosInput } from "./search-photos/schemas";
import { searchPhotos } from "./search-photos/use-case";
import { searchByImage } from "./search-by-image/use-case";

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
      console.warn(`⚠️ Foto com ID ${id} não encontrada`);
      return reply.status(404).send({ message: 'Imagem não encontrada' });
    }

    reply
      .header('Content-Type', 'image/png')
      .send(photo.image);
  });

  fastify.post("/search-by-image", async (req, reply) => {
    try {
      const parts = req.parts();
      let imageFound = false;
  
      for await (const part of parts) {
        if (part.type === "file") {
          if (part.fieldname === "image") {
            imageFound = true;
            const imageBuffer = await part.toBuffer();
  
            const result = await searchByImage(imageBuffer);
            return reply.send(result);
          }
        } 
      }
  
      if (!imageFound) {
        return reply.status(400).send({ message: "Imagem não fornecida" });
      }
    } catch (error) {
      console.error("🔥 Erro ao processar imagem:", error);
      if (error instanceof Error) {
        console.error("📛 Mensagem de erro:", error.message);
        console.error("🧠 Stack:", error.stack);
      }
      return reply.status(500).send({ message: "Erro ao processar a imagem" });
    }
  });
}
