import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const invoice = await db.salesInvoice.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(invoice)
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
        const { name } = await request.json()
        const invoice = await db.salesInvoice.update({
            where: {
                id
            },
            data: {
                name,
            }
        })
        console.log(invoice);

        return NextResponse.json(invoice)
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
        await db.salesInvoice.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
