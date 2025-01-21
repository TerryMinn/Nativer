import { z } from "zod";

export const passwordEditSchema = z.object({
  old_password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^.{8,}$/, { message: "Password must be at least 8 characters." }),
  new_password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^.{8,}$/, { message: "Password must be at least 8 characters." }),
});

export const infoEditSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  phone: z.optional(z.string()),
  bio: z.optional(z.string()),
  picture: z.optional(z.string()),
});
