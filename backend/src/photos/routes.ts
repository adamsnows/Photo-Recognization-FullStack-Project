import { FastifyInstance, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../database/prisma-client";// Certifique-se de importar o prisma corretamente
import { getPhotos } from "./get-photos/use-case";
import { SearchPhotosInput, searchPhotosSchema } from "./search-photos/schemas";
import { searchPhotos } from "./search-photos/use-case";

// Defina o tipo para os parâmetros da rota de imagem
interface Params {
    id: string;
}

export async function photosRoutes(fastify: FastifyInstance) {
    // Rota para obter todas as fotos com URL
    fastify.get("/photos", async (_req, reply) => {  
        const photos = await getPhotos();
        return reply.send(photos);
    });

    // Rota de busca
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
}
