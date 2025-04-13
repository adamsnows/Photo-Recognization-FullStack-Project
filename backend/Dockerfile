FROM node:22.12.0-alpine AS builder

# Defina os argumentos que receberão as variáveis de ambiente
ARG NODE_ENV
ARG POSTGRES_PASSWORD
ARG DATABASE_URL
ARG BASE_URL
ARG PORT
ARG API_URL
ARG HOST

# Defina as variáveis de ambiente no Docker
ENV NODE_ENV=${NODE_ENV}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV DATABASE_URL=${DATABASE_URL}
ENV BASE_URL=${BASE_URL}
ENV PORT=${PORT}
ENV API_URL=${API_URL}
ENV HOST=${HOST}

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

ENV NODE_ENV=production

EXPOSE $PORT

CMD ["sh", "-c", "npm run reset && npm run dev"]


