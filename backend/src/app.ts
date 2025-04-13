import Fastify from "fastify";
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { photosRoutes } from "./photos/routes";

export const app = Fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

async function startApp() {
  await app.register(photosRoutes, { prefix: "/photos" });
  try {
	await app.listen({ port: 3333, host: "0.0.0.0" });
	console.log("Server running at http://0.0.0.0:3333");
	
  } catch (err) {
    console.error("Error starting server", err);
    process.exit(1);
  }
}

startApp();
