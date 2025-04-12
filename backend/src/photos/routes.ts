import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { getPhotos } from "./get-photos/use-case";
import { searchPhotosSchema } from "./search-photos/schemas";
import { searchPhotos } from "./search-photos/use-case";

export async function photosRoutes(fastify: FastifyInstance) {
    fastify.get("/", async (_req, reply) => {  
        const photos = await getPhotos();

        return reply.send(photos)
     });

    fastify.withTypeProvider<ZodTypeProvider>().get("/search", {
        schema: {
            querystring: searchPhotosSchema,
        }
    }, async (req, reply) => {  
        const photos = await searchPhotos(req.query.term);

        return reply.send(photos)
     });
}   