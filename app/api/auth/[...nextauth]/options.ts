import type { NextAuthOptions } from "next-auth";
import CredentialsProviders from 'next-auth/providers/credentials'


export const options: NextAuthOptions = {
    providers: [
        CredentialsProviders({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "get@example.com" },
                password: { label: "Password", type: "password" }
            },
            //@ts-ignore
            async authorize(credentials) {

                const user = { id: "42", name: "Admin", password: "1234", role: "student" }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                }
                else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role
            return token
        },
        async session({ session, token }) {
            return session
        }
    }
}