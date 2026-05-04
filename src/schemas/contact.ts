import { z } from "zod";

export const contactSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 or more characters"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the Terms of Service",
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ErrorState = {
  email: string | null;
  password: string | null;
  terms: string | null;
  general: string | null;
};
