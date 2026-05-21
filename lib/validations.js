import { z } from "zod";

export const identificationSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  whatsapp: z
    .string()
    .min(14, "WhatsApp inválido — use o formato (11) 99999-9999")
    .max(16, "WhatsApp inválido"),
});

export const textInputSchema = (field) =>
  z.object({
    [field]: z.string().min(1, "Campo obrigatório"),
  });
