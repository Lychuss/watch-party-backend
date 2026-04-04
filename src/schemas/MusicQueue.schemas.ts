import { z } from "zod";

export const musicQueueValidation = z.object({
    rooms_id: z.string().uuid(),
    added_by: z.string().uuid(),
    youtube_url: z.string().url().refine(
        (url) => url.includes("youtube.com") || url.includes("youtu.be"),
        { message: "Must be a valid youtube url!"}
    ),
    is_playing: z.boolean()
})

export type MusicQueue = z.infer<typeof musicQueueValidation>;