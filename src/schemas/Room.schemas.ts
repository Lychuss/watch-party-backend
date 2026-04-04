import { z } from "zod";

export const roomValidation = z.object({
    rooms_code: z.string(),
    created_by: z.uuid()
})

export type Room = z.infer<typeof roomValidation>;