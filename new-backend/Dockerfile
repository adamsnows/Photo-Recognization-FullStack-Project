FROM node:22.12.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22.12.0-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src
COPY ./assets /app/assets 
COPY .env .env

ENV NODE_ENV=production

EXPOSE $PORT

CMD ["sh", "-c", "npm run reset && npm run dev"]


