import { prisma } from "../../database/prisma-client"

export async function getPhotos() {
    const photos = await prisma.photo.findMany()

    return photos
}