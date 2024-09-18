import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const salesOrder = await db.salesOrder.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(salesOrder)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to fetch salesOrder"
        },
            { status: 500 }
        )
    }
}

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const { name, description } = await request.json()
        const salesOrder = await db.salesOrder.update({
            where: {
                id
            },
            data: {
                name,
                description
            }
        })
        console.log(salesOrder);

        return NextResponse.json(salesOrder)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update sales-order"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.salesOrder.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
