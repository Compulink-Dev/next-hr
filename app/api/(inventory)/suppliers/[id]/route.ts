import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const supplier = await db.supplier.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(supplier)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create supplier"
        },
            { status: 500 }
        )
    }
}

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const { name } = await request.json()
        const supplier = await db.supplier.update({
            where: {
                id
            },
            data: {
                name
            }
        })
        console.log(supplier);

        return NextResponse.json(supplier)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update supplier"
        },
            { status: 500 }
        )
    }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.supplier.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
