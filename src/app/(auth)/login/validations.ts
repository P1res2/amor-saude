import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Endereço de e-mail inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export type TLoginFormValues = z.infer<typeof loginSchema>;

export const loginResponseSchema = z.object({
  sessionToken: z.string(),
  email: z.string(),
  passwordHash: z.string(),
});

export type TLoginResponse = z.infer<typeof loginResponseSchema>;
