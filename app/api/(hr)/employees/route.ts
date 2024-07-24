export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const employee = await db.employee.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                description: data.description,
                address: data.address,
                title: data.title,
                appliedDate: data.appliedDate,
                status: data.status,
            },
        })
        console.log(employee);

        return NextResponse.json(employee)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create employee"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const employee = await db.employee.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(employee)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create employee"
        },
            { status: 500 }
        )
    }
}