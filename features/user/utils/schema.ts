import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^.{8,}$/, { message: "Password must be at least 8 characters." }),
});

export const registerSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^.{8,}$/, { message: "Password must be at least 8 characters." }),
  accept_rule: z.optional(z.array(z.string())),
});
