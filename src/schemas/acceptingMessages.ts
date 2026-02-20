import { z } from "zod";

export const aceptingMessagesSchema = z.object({
  messages: z.boolean(),
});
