import Fastify from 'fastify';
import path from 'path';  
import fastifyStatic from '@fastify/static';
import { photosRoutes } from './photos/routes';
import dotenv from 'dotenv';
import cors from '@fastify/cors';

dotenv.config();

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const root = path.join(__dirname, 'images');
const port = process.env.PORT || 3333; 

const server = Fastify();
await server.register(cors, {
  origin: '*', 
})

server.register(fastifyStatic, {
  root: path.join(__dirname, 'images'),
  prefix: '/images/',
});

server.register(photosRoutes);



server.listen({ port: Number(port), host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
