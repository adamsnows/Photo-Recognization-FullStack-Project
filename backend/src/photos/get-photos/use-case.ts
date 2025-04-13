import { prisma } from "../../database/prisma-client";

export async function getPhotos() {
    const photos = await prisma.photo.findMany();

    const photosWithUrls = photos.map(photo => {
        return {
            id: photo.id,
            name: photo.name,
            collection: photo.collection,
            location: photo.location,
            models: photo.models,
            creativeDirection: photo.creativeDirection,
            photography: photo.photography,
            photographyAssistant: photo.photographyAssistant,
            film: photo.film,
            styling: photo.styling,
            beauty: photo.beauty,
            setProduction: photo.setProduction,
            executiveProduction: photo.executiveProduction,
            imageUrl: photo.imageUrl.replace(/\.\w+$/, '')
        };
    });
    console.log('teste')
    return photosWithUrls;
}
