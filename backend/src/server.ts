import Fastify from 'fastify';
import path from 'path';  
import fastifyStatic from '@fastify/static';
import { photosRoutes } from './photos/routes';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import fastifyMultipart from 'fastify-multipart';


dotenv.config();

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const root = path.join(__dirname, 'images');
const port = process.env.PORT || 3333; 

const server = Fastify();
await server.register(cors, {
  origin: '*', 
})
await server.register(fastifyMultipart);

await server.register(fastifyStatic, {
  root: path.join(__dirname, 'images'),
  prefix: '/images/',
});

await server.register(photosRoutes);




server.listen({ port: Number(port), host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
