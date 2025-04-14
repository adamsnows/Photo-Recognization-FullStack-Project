# 📸 Photos API + Farm RIO

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

- **Frontend:** Vercel com CI/CD automático via GitHub Actions.
- **Backend:** GCP com CI/CD automático via Github Actions.

- O deploy é feito automaticamente quando a main do frontend ou backend é atualizada.

---

Desenvolvido por Adam.
