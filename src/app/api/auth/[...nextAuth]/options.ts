import NextAuth, { NextAuthConfig } from "next-auth";
import dbConnect from "@/src/lib/dbConnect";
import { UserModel } from "@/src/model/User.model";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const config: NextAuthConfig = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",

      credentials: {
        identifier: { label: "email/username", type: "text" },
        password: { label: "password", type: "text" },
      },

      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error(
              "User with this email or password is not found please try again!",
            );
          }
          if (!user?.isVerified) {
            throw new Error("Verify your account first");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Password is not correct ");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/signIn",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // Match the keys exactly as you defined them in the jwt callback
        session.user._id = token._id as string;
        session.user.username = token.username as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.isAcceptingMessages = token.isAcceptingMessages as boolean;
      }
      return session;
    },
  },
};
