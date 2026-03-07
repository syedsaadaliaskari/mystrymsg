import NextAuth from "next-auth";
import { config } from "./options";

// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/src/auth"; // Import from the file we made above
export const { GET, POST } = handlers;
