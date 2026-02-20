import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(4, { message: "Must be at least 4 chracters" })
  .max(10, { message: "No longer than 10 allowed" })
  .regex(/^[a-zA-Z0-9]+$/);

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Must be at least 8 characters" }),
});
