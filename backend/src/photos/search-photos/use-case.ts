import { prisma } from "../../database/prisma-client"
import type { SearchPhotosInput } from "./schemas"

export async function searchPhotos(term: SearchPhotosInput['term']) {
    const photos = await prisma.photo.findMany({
        where: {
            OR: [
                { name: { contains: term,    mode: 'insensitive' } },
                { collection: { contains: term, mode: 'insensitive' } },
                { location: { contains: term, mode: 'insensitive' } },
                { models: { contains: term, mode: 'insensitive' } },
                { creativeDirection: { contains: term, mode: 'insensitive' } },
                { photography: { contains: term, mode: 'insensitive' } },
                { photographyAssistant: { contains: term, mode: 'insensitive' } },
                { film: { contains: term, mode: 'insensitive' } },
                { styling: { contains: term, mode: 'insensitive' } },
                { beauty: { contains: term, mode: 'insensitive' } },
                { setProduction: { contains: term,  mode: 'insensitive' } },
                { executiveProduction: { contains: term, mode: 'insensitive' } },
            ]
        }
    })

    const cleanedPhotos = photos.map(photo => {
        return {
            ...photo,
            imageUrl: photo.imageUrl.replace(/\.\w+$/, '')
        }
    })

    return cleanedPhotos
}
