// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        role?: string | null; // Add role to the User object
    }

    interface Session {
        user: {
            role?: string | null; // Add role to the session's user
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}
