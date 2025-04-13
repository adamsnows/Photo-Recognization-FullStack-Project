import fs from "fs";
import path from "path";
import { prisma } from "../database/prisma-client";
import { Buffer } from "buffer";

async function loadImage(filePath) {
  const image = fs.readFileSync(filePath);
  return image;
}

async function insertPhotos() {
  const photoData = [
    {
      name: "Image 1",
      collection: "Resort 23",
      location: "Les Trois Vallées",
      models: "Amanda Silva, João Pedro",
      creativeDirection: "time FARM",
      photography: "Rafael Lucena",
      photographyAssistant: "Daniel Sulima",
      film: "Ariela Dorf e Caio Nigro",
      styling: "time FARM",
      beauty: "Cidoca Nogueira",
      setProduction: "Rodrigo (bombinha)",
      executiveProduction: "21 Sun production",
      imagePath: path.join(__dirname, "images", "1.png"), // Caminho para a imagem
    },
    {
      name: "Image 2",
      collection: "Outono 23",
      location: "Paris, Rue de Rivoli",
      models: "Lara Costa, Bruno Alves",
      creativeDirection: "time FARM",
      photography: "Thiago Lima",
      photographyAssistant: "Marcela Souza",
      film: "Ariela Dorf",
      styling: "Lucas Santos",
      beauty: "Cidoca Nogueira",
      setProduction: "Juliana Ribeiro",
      executiveProduction: "21 Sun production",
      imagePath: path.join(__dirname, "images", "2.png"),
    },
    {
      name: "Image 3",
      collection: "Primavera 23",
      location: "Jardins de Luxemburgo",
      models: "Beatriz Rocha, Felipe Almeida",
      creativeDirection: "time FARM",
      photography: "Mariana Oliveira",
      photographyAssistant: "Rafael Moreira",
      film: "Ariela Dorf e Caio Nigro",
      styling: "time FARM",
      beauty: "Cidoca Nogueira",
      setProduction: "Rodrigo (bombinha)",
      executiveProduction: "21 Sun production",
      imagePath: path.join(__dirname, "images", "3.png"),
    },
    {
      name: "Image 4",
      collection: "Inverno 23",
      location: "Torre Eiffel",
      models: "Juliana Andrade, Lucas Costa",
      creativeDirection: "time FARM",
      photography: "Rafael Lucena",
      photographyAssistant: "Marcela Souza",
      film: "Ariela Dorf",
      styling: "time FARM",
      beauty: "Cidoca Nogueira",
      setProduction: "Rodrigo (bombinha)",
      executiveProduction: "21 Sun production",
      imagePath: path.join(__dirname, "images", "4.png"),
    },
    {
      name: "Image 5",
      collection: "Verão 23",
      location: "Praia de Copacabana",
      models: "Gabriela Mendes, Pedro Santos",
      creativeDirection: "time FARM",
      photography: "Thiago Lima",
      photographyAssistant: "Daniel Sulima",
      film: "Ariela Dorf e Caio Nigro",
      styling: "Lucas Santos",
      beauty: "Cidoca Nogueira",
      setProduction: "Juliana Ribeiro",
      executiveProduction: "21 Sun production",
      imagePath: path.join(__dirname, "images", "5.png"),
    },
    {
      name: "Image 6",
      collection: "Resort 23",
      location: "Ilhas Maldivas",
      models: "Ana Clara, João Lima",
      creativeDirection: "time FARM",
      photography: "Mariana Oliveira",
      photographyAssistant: "Marcela Souza",
      film: "Ariela Dorf",
      styling: "time FARM",
      beauty: "Cidoca Nogueira",
      setProduction: "Rodrigo (bombinha)",
      executiveProduction: "21 Sun production",
      imagePath: path.join(__dirname, "images", "6.png"),
    },
    {
      name: "Image 7",
      collection: "Outono 23",
      location: "Central Park, NY",
      models: "Rafaela Costa, Bruno Alves",
      creativeDirection: "time FARM",
      photography: "Rafael Lucena",
      photographyAssistant: "Daniel Sulima",
      film: "Ariela Dorf e Caio Nigro",
      styling: "Lucas Santos",
      beauty: "Cidoca Nogueira",
      setProduction: "Juliana Ribeiro",
      executiveProduction: "21 Sun production",
      imagePath: path.join(__dirname, "images", "7.png"),
    },
    {
      name: "Image 8",
      collection: "Primavera 23",
      location: "Campos do Jordão",
      models: "Mariana Silva, Felipe Almeida",
      creativeDirection: "time FARM",
      photography: "Thiago Lima",
      photographyAssistant: "Rafael Moreira",
      film: "Ariela Dorf",
      styling: "time FARM",
      beauty: "Cidoca Nogueira",
      setProduction: "Rodrigo (bombinha)",
      executiveProduction: "21 Sun production",
      imagePath: path.join(__dirname, "images", "8.png"),
    },
    {
      name: "Image 9",
      collection: "Inverno 23",
      location: "Santiago, Chile",
      models: "Beatriz Rocha, Pedro Santos",
      creativeDirection: "time FARM",
      photography: "Mariana Oliveira",
      photographyAssistant: "Marcela Souza",
      film: "Ariela Dorf e Caio Nigro",
      styling: "Lucas Santos",
      beauty: "Cidoca Nogueira",
      setProduction: "Juliana Ribeiro",
      executiveProduction: "21 Sun production",
      imagePath: path.join(__dirname, "images", "9.png"),
    },
    {
      name: "Image 10",
      collection: "Verão 23",
      location: "Playa del Carmen, México",
      models: "Gabriela Mendes, João Lima",
      creativeDirection: "time FARM",
      photography: "Rafael Lucena",
      photographyAssistant: "Daniel Sulima",
      film: "Ariela Dorf",
      styling: "time FARM",
      beauty: "Cidoca Nogueira",
      setProduction: "Rodrigo (bombinha)",
      executiveProduction: "21 Sun production",
      imagePath: path.join(__dirname, "images", "10.png"),
    },
    {
      name: "Image 11",
      collection: "Resort 23",
      location: "Bora Bora, Polinésia Francesa",
      models: "Amanda Silva, Lucas Costa",
      creativeDirection: "time FARM",
      photography: "Thiago Lima",
      photographyAssistant: "Marcela Souza",
      film: "Ariela Dorf e Caio Nigro",
      styling: "Lucas Santos",
      beauty: "Cidoca Nogueira",
      setProduction: "Juliana Ribeiro",
      executiveProduction: "21 Sun production",
      imagePath: path.join(__dirname, "images", "11.png"),
    },
    {
      name: "Image 12",
      collection: "Outono 23",
      location: "Monte Fuji, Japão",
      models: "Lara Costa, Felipe Almeida",
      creativeDirection: "time FARM",
      photography: "Mariana Oliveira",
      photographyAssistant: "Rafael Moreira",
      film: "Ariela Dorf",
      styling: "time FARM",
      beauty: "Cidoca Nogueira",
      setProduction: "Rodrigo (bombinha)",
      executiveProduction: "21 Sun production",
      imagePath: path.join(__dirname, "images", "12.png"),
    },
  ];

  // Inserção das imagens no banco
  for (const photo of photoData) {
    const imageBuffer = await loadImage(photo.imagePath); // Usando o imagePath para carregar a imagem

    await prisma.photo.create({
      data: {
        ...photo,
        image: imageBuffer,
      },
    });

    console.log(`Imagem ${photo.name} inserida com sucesso.`);
  }
}

insertPhotos().catch((e) => {
  console.error(e);
  process.exit(1);
});
