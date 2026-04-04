import { z } from "zod";

export const userValidation = z.object({
    email: z.email(),
    username: z.string(),
    password: z.string()
})

export type User = z.infer<typeof userValidation>;