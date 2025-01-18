import { z } from "zod";

export const passwordEditSchema = z.object({
  NewPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^.{8,}$/, { message: "Password must be at least 8 characters." }),
  ConfirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^.{8,}$/, { message: "Password must be at least 8 characters." }),
});
