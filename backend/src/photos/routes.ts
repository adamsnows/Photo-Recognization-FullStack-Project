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
    console.log("📥 Requisição GET /photos recebida");
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
        console.log("📥 Requisição GET /search recebida com termo:", request.query.term);
        const { term } = request.query;
        const photos = await searchPhotos(term);
        return reply.send(photos);
      }
    );

  fastify.get("/images/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    console.log(`📥 Requisição GET /images/${id} recebida`);

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
    console.log("📥 Requisição POST /search-by-image recebida");
    console.log("Content-Type:", req.headers["content-type"]);
  
    try {
      const parts = req.parts();
      let imageFound = false;
  
      for await (const part of parts) {
        if (part.type === "file") {
          console.log("🧩 Parte recebida (arquivo):", {
            fieldname: part.fieldname,
            filename: (part as any).filename,
            mimetype: (part as any).mimetype,
          });
  
          if (part.fieldname === "image") {
            imageFound = true;
            const imageBuffer = await part.toBuffer();
            console.log("🖼 Buffer de imagem recebido, tamanho:", imageBuffer.length);
  
            const result = await searchByImage(imageBuffer);
            return reply.send(result);
          }
        } else {
          console.log("📄 Parte recebida (campo):", part.fieldname);
        }
      }
  
      if (!imageFound) {
        console.warn("🚫 Nenhuma parte com fieldname 'image' foi recebida");
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
