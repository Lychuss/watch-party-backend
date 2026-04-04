import { z } from "zod";

export const messageValidation = z.object({
    rooms_id: z.string().uuid(),
    senders_id: z.string().uuid(),
    context: z.string()
});
 
export type Message = z.infer<typeof messageValidation>; 