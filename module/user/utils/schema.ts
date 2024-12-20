import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }) // Enforces minimum length
    .regex(/^.{8,}$/, { message: "Password must be at least 8 characters." }), // Additional regex validation
});
