import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const customer = await db.customer.findUnique({
            where: {
                id
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

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const { name, description } = await request.json()
        const customer = await db.customer.update({
            where: {
                id
            },
            data: {
                name,
                description
            }
        })
        console.log(customer);

        return NextResponse.json(customer)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update customer"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.customer.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
