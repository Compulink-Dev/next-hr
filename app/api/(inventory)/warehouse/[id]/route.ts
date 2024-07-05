import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const warehouse = await db.warehouse.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(warehouse)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create warehouse"
        },
            { status: 500 }
        )
    }
}

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const { name } = await request.json()
        const warehouse = await db.warehouse.update({
            where: {
                id
            },
            data: {
                name
            }
        })
        console.log(warehouse);

        return NextResponse.json(warehouse)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update warehouse"
        },
            { status: 500 }
        )
    }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.warehouse.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
