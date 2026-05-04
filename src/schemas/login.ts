import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 or more characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type ErrorState = {
  email: string | null;
  password: string | null;
  general: string | null;
};
