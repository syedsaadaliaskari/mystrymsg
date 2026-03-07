import "next-auth";
import { DefaultSession } from "next-auth";

import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    username?: string;
    isAcceptingMessages?: boolean; // Changed from string to boolean
  }

  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      username?: string;
      isAcceptingMessages?: boolean; // Changed from string to boolean
    } & DefaultSession["user"];
  }
}

// Ensure JWT also has these properties so the jwt() callback is type-safe
declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    username?: string;
    isAcceptingMessages?: boolean; // Changed from string to boolean
  }
}
