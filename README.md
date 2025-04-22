Both with autodeploy in Github Actions

# 📸 ENG: Fullstack Project / GCloud Vision for Photo Intelligent Recognition

This is a fullstack project for intelligent image management and search, integrated with the **Google Vision API** for recognizing similar photos based on visual characteristics.

## ✨ Features

- 🔍 **Search by attributes** such as collection, location, model, creative direction, and more.
- 🧠 **Visual similarity search** using the Google Vision API.
- 📦 Monorepo structure with separated Frontend and Backend.
- 🚀 Automatic deployment with **GitHub Actions**, **Vercel** (Frontend), and **Google Cloud Platform** (Backend).
- 🐳 Containerized backend with **Docker**.

## 🖥️ Technologies

### Backend
- [Fastify](https://fastify.dev/) — Lightweight and fast Node.js API framework.
- [Prisma ORM](https://www.prisma.io/) — Modern type-safe ORM.
- [PostgreSQL](https://www.postgresql.org/) — Relational database.
- [Google Cloud Vision](https://cloud.google.com/vision) — API for visual similarity detection.
- Deployed on **Google Cloud Run** with **Docker**.

### Frontend
- [Next.js](https://nextjs.org/) — React framework for modern web applications.
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework.
- [React Easy Crop](https://github.com/ValeryBugakov/react-easy-crop) — Component for image selection and cropping.
- Deployed on **Google Cloud Run** with **Docker**.

## 🗂 Monorepo Structure

```
/
├── backend/
│   ├── src/
│   ├── prisma/
│   └── Dockerfile
│
├── frontend/
│   ├── app/
│   └── public/
│
└── README.md
```

## ⚙️ Useful Scripts

### Backend
```bash
npm run dev           # Starts the API in development mode
npm run seed          # Seeds the database
npm run build         # Builds the server
npm run release       # Builds + Docker push + deploy to GCP
```

### Frontend
```bash
npm run dev           # Starts the frontend locally
npm run build         # Production build
```

## 🚀 Deployment

- **Frontend:** GCP with CI/CD via GitHub Actions.
- **Backend:** GCP with CI/CD via GitHub Actions.

- Deployment is automatic when the frontend or backend main branches are updated.

- [Frontend Deploy](https://farm-rio-434732873433.us-central1.run.app)
- [Backend Deploy](https://photos-api-434732873433.us-central1.run.app)

## ✨ Backend Routes

- /photos (GET) -> Returns all photos from the database
- /photos/:id (GET) -> Returns a specific photo
- /photos/:id (DELETE) -> Deletes a specific photo
- /search-by-image (POST) -> Searches for visually similar photos (minimum 40%)
- /search?term=<term> (POST) -> Searches for photos using a specific keyword

---

Developed by Adam.


# 📸 PT-BR: Projeto Fullstack / GCloud Vision API para Reconhecimento inteligente de fotos.

Este é um projeto full stack para gerenciamento e busca inteligente de imagens, com integração à **Google Vision API** para identificação de fotos semelhantes com base em características visuais.

## ✨ Funcionalidades

- 🔍 **Busca por características** das fotos (coleção, local, modelo, direção criativa, entre outros).
- 🧠 **Busca por similaridade visual** usando a Google Vision API.
- 📦 Organização em **monorepo** com Frontend e Backend separados.
- 🚀 Deploy automático com **GitHub Actions**, **Vercel** (Frontend) e **Google Cloud Platform** (Backend).
- 🐳 Backend containerizado com **Docker**.

## 🖥️ Tecnologias

### Backend
- [Fastify](https://fastify.dev/) — Framework leve e rápido para APIs Node.js.
- [Prisma ORM](https://www.prisma.io/) — ORM moderno e type-safe.
- [PostgreSQL](https://www.postgresql.org/) — Banco de dados relacional.
- [Google Cloud Vision](https://cloud.google.com/vision) — API para detecção de similaridade visual.
- Deploy em **Google Cloud Run** com **Docker**.

### Frontend
- [Next.js](https://nextjs.org/) — Framework React para aplicações web modernas.
- [Tailwind CSS](https://tailwindcss.com/) — Estilização com utilitários.
- [React Easy Crop](https://github.com/ValeryBugakov/react-easy-crop) — Componente para seleção e corte de imagem.
- Deploy em **Google Cloud Run** com **Docker**.

## 🗂 Estrutura do Monorepo

```
/
├── backend/
│   ├── src/
│   ├── prisma/
│   └── Dockerfile
│
├── frontend/
│   ├── app/
│   └── public/
│
└── README.md
```

## ⚙️ Scripts úteis

### Backend
```bash
npm run dev           # Inicia a API em modo desenvolvimento
npm run seed          # Popula o banco de dados
npm run build         # Compila o servidor
npm run release       # Faz build + push do Docker + deploy no GCP
```

### Frontend
```bash
npm run dev           # Inicia o frontend local
npm run build         # Build de produção
```

## 🚀 Deploy

- **Frontend:** GCP com CI/CD automático via GitHub Actions.
- **Backend:** GCP com CI/CD automático via Github Actions.

- O deploy é feito automaticamente quando a main do frontend ou backend é atualizada.

- [Deploy do Frontend](https://farm-rio-434732873433.us-central1.run.app)
- [Deploy do Backend](https://photos-api-434732873433.us-central1.run.app)


## ✨ Rotas backend

- /photos GET -> Trás todas fotos no banco de dados;
- /photos/:id (GET) -> Trás uma foto específica
- /photos/:id (DELETE) -> Deleta uma foto específica
- /search-by-image POST -> Procura fotos semelhantes a pelo menos 40% usando uma imagem;
- /search?term=<term> POST -> Procura fotos com algum dos termos citados na pesquisa.

---

Desenvolvido por Adam.
