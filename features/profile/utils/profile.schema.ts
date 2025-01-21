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
