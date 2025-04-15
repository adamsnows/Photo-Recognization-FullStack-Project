import { FastifyInstance, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../database/prisma-client";
import { getPhotos } from "./get-photos/use-case";
import { SearchPhotosInput } from "./search-photos/schemas";
import { searchPhotos } from "./search-photos/use-case";
import { searchByImage } from "./search-by-image/use-case";
import { addPhoto } from "./upload-photo/use-case";

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

  fastify.post("/photos", async (req, reply) => {
    try {
      const parts = req.parts();
      const data: Record<string, string> = {};
      let imageBuffer: Buffer | null = null;
      let fileName = "";
  
      for await (const part of parts) {
        if (part.type === "file" && part.fieldname === "image") {
          imageBuffer = await part.toBuffer();
          fileName = part.filename ?? "image.jpg";
        } else if (part.type === "field" && part.fieldname === "data") {
          Object.assign(data, JSON.parse(part.value as string));
        }
      }
  
      if (!imageBuffer) {
        return reply.status(400).send({ message: "Imagem não fornecida" });
      }
  
      if (!data.name || !data.collection) {
        return reply.status(400).send({ message: "Campos obrigatórios ausentes" });
      }
  
      const imageUrl = `/images/${Date.now()}-${fileName}`;
  
      const photo = await addPhoto({
        name: data.name,
        collection: data.collection,
        location: data.location ?? "", 
        models: data.models ?? "",
        creativeDirection: data.creativeDirection ?? "",
        photography: data.photography ?? "",
        photographyAssistant: data.photographyAssistant ?? "",
        film: data.film ?? "",
        styling: data.styling ?? "",
        beauty: data.beauty ?? "",
        setProduction: data.setProduction ?? "",
        executiveProduction: data.executiveProduction ?? "",
        image: imageBuffer,
        fileName,
        imageUrl,
      });
  
      return reply.status(201).send(photo);
    } catch (err) {
      console.error("❌ Erro ao subir imagem:", err);
      return reply.status(500).send({ message: "Erro interno ao salvar imagem" });
    }
  });
  

  fastify.delete("/photos/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
  
    try {
      const photo = await prisma.photo.findUnique({
        where: {
          id: Number(id),
        },
      });
  
      if (!photo) {
        return reply.status(404).send({ message: "Imagem não encontrada" });
      }
  
      await prisma.photo.delete({
        where: {
          id: Number(id),
        },
      });
  
      return reply.status(200).send({ message: "Imagem excluída com sucesso" });
    } catch (err) {
      console.error("❌ Erro ao excluir imagem:", err);
      return reply.status(500).send({ message: "Erro interno ao excluir imagem" });
    }
  });
  
}
