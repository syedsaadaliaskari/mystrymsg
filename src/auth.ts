// src/auth.ts
import NextAuth from "next-auth";
import { config } from "./app/api/auth/[...nextAuth]/options"; // Path to your options.ts

export const { handlers, auth, signIn, signOut } = NextAuth(config);
