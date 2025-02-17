import db from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const { name, email, password, role } = await request.json()

        const userExist = await db.user.findUnique({
            where: { email }
        })

        if (userExist) {
            return NextResponse.json({
                message: 'User already exists',
                user: null,
            }, {

                status: 409
            }
            )
        }
        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                name,
                email,
                role,
                hashedPassword
            }
        })
        console.log(newUser);
        return NextResponse.json(newUser)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })
    }
}

export async function GET() {
    try {
        const users = await db.user.findMany({
            select: {
                id: true,
                name: true,
            },
        })
        return NextResponse.json(users)
    } catch (error) {
        console.error('Error fetching users:', error)
        return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 })
    }
}