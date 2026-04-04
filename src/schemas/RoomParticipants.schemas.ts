import { z } from "zod";

export const roomParticipantsValidation = z.object({
    rooms_code: z.string(),
    rooms_id: z.string().uuid(),
    users_id: z.string().uuid(),
    left_at: z.null()
})

export type RoomParticipants = z.infer<typeof roomParticipantsValidation>;