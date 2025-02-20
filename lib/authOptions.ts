import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { Session } from "next-auth";

const prisma = new PrismaClient();

type CustomSession = Session & {
  token: any;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "get@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore

      async authorize(credentials) {
        if (credentials) {
          // Replace this with a database lookup
          const user = await prisma.user.findUnique({
            where: { email: credentials?.username },
          });

          if (
            user &&
            user.hashedPassword &&
            (await bcrypt.compare(credentials.password, user.hashedPassword))
          ) {
            return {
              user: {
                id: user.id,
                name: user.name,
                role: user.role,
                email: user.email,
              },
            };
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Include user ID in token
        token.email = user.email; // Include user email in token
        token.name = user.name; // Include user name in token
        token.role = user.role; // Include user role in token
        console.log("JWT token updated:", token);
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Token received in session callback:", token);
      if (token) {
        session.user = {
          id: token.sub?.toString() ?? "", // Add a null check and a default value
          email: token.email,
          name: token.name,
          role: token.role,
        };
        //@ts-ignore
        session.token = token; // Now valid with the updated type
        console.log("Session updated:", session);
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
