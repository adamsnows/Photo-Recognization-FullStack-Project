import { z } from "zod";

export const searchPhotosSchema = z.object({
    term: z.string(),
})

export type SearchPhotosInput = z.infer<typeof searchPhotosSchema>