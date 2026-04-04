import { z } from "zod";

export const roomValidation = z.object({
    rooms_code: z.string()
})

export type Room = z.infer<typeof roomValidation>;