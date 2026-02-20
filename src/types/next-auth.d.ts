import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    username?: string;
    isAcceptingMessages?: string;
  }

  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      username?: string;
      isAcceptingMessages?: string;
    } & DefaultSession["user"]; // This keeps the default name, email, etc.
  }

  interface JWT {
    _id?: string;
    isVerified?: boolean;
    username?: string;
    isAcceptingMessages?: string;
  }
}
