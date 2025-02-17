import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string; // ObjectID from MongoDB converted to string
        name: string;
        email: string;
        role: string;
        hashedPassword?: string; // Include hashedPassword if needed in callbacks
    }

    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name: string;
        email: string;
        role: string;
    }
}
