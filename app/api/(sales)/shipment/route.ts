import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const customer = await db.customer.create({
            data: {
                name: data.name,
                phone: data.phone,
                email: data.email,
                address: data.address,
                company: data.company,
                notes: data.notes,
            },
        })
        console.log(customer);

        return NextResponse.json(customer)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create customers"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const customer = await db.customer.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(customer)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create customer"
        },
            { status: 500 }
        )
    }
}