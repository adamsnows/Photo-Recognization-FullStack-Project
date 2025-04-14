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
      return reply.status(404).send({ message: 'Imagem não encontrada' });
    }
    
    reply
      .header('Content-Type', 'image/png')
      .send(photo.image);
  });

fastify.post("/search-by-image", async (req, reply) => {
  console.log("➡️ Rota /search-by-image chamada");

  const parts = req.parts();
  let foundFile = false;

  for await (const part of parts) {
    console.log("📦 Parte recebida:", {
      type: part.type,
      fieldname: part.fieldname,
      mime: part.mimetype,
    });

    if (part.type === 'file' && part.fieldname === 'image') {
      foundFile = true;

      try {
        const imageBuffer = await part.toBuffer();
        console.log("🧠 Imagem convertida em buffer. Tamanho:", imageBuffer.length);

        const result = await searchByImage(imageBuffer);
        console.log("🔍 Resultado da busca:", result);

        if (result) {
          return reply.send(result);
        } else {
          console.log("⚠️ Nenhuma imagem semelhante encontrada");
          return reply.status(404).send({ message: "Nenhuma foto semelhante encontrada" });
        }
      } catch (error) {
        console.error("❌ Erro ao processar a imagem:", error);
        return reply.status(500).send({ message: "Erro ao processar a imagem" });
      }
    }
  }

  if (!foundFile) {
    console.warn("🚫 Nenhum arquivo do tipo 'image' foi encontrado no multipart");
  }

  return reply.status(400).send({ message: "Imagem não fornecida" });
});
  
}
