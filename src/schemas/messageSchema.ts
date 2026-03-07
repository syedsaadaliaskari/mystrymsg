import { z } from "zod";

export const mesageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Must be minimum of 10 characters" })
    .max(300, { message: "No more than 300 words" }),
});
