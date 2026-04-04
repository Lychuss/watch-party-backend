import { z } from "zod";

export const loginValidation = z.object({
    username: z.string(),
    password: z.string()
})

export type Login = z.infer<typeof loginValidation>;