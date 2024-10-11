import CredentialsProviders from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import db from './db'
import { compare } from 'bcrypt'

const authOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: "/login"
    },
    providers: [
        //@ts-ignore
        CredentialsProviders({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: "email", placeholder: "Email address" },
                password: { label: "Password", type: "password" },
            },
            //@ts-ignore
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        console.log('Please enter details');
                        return null

                    }
                    const existingUser = await db.user.findUnique({
                        where: {
                            email: credentials.email
                        },
                        select: { // Use select to include specific fields
                            id: true,
                            name: true,
                            email: true,
                            hashedPassword: true,
                            role: true // Ensure you select the role here
                        }

                    })

                    if (!existingUser) {
                        console.log("User not found");
                        return
                    }


                    const passwordMatch = await compare(
                        credentials.password,
                        existingUser.hashedPassword
                    )

                    if (!passwordMatch) {
                        console.log('Password incorrect');
                        return null
                    }

                    const user = {
                        id: existingUser.id,
                        name: existingUser.name,
                        email: existingUser.email,
                        role: existingUser.role
                    }

                    console.log(user);
                    return user
                } catch (error) {
                    console.log(error);

                }
            },
        })
    ],
    callbacks: {
        async session({ session, token }: any) {
            // Set the role from token to session
            if (token?.role) {
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }: any) {
            // Add user role to the token
            if (user) {
                token.role = user.role; // Make sure role is set from user
            }
            return token;
        }
    }
}

export { authOptions }