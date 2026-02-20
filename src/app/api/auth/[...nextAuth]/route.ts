import NextAuth from "next-auth";
import { config } from "./options";

const handlers = NextAuth(config);

export { handlers as GET, handlers as POST };
