import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  memorableWord: z.string().optional()
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  memorableWord: z.string().optional()
});

export const ResetPasswordSchema = z.object({
    email:z.string().email(),
    newPassword:z.string().min(4),
    confirmPassword:z.string().min(4)

});