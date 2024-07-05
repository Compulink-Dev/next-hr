import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const unit = await db.unit.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(unit)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create unit"
        },
            { status: 500 }
        )
    }
}

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const { name } = await request.json()
        const unit = await db.unit.update({
            where: {
                id
            },
            data: {
                name
            }
        })
        console.log(unit);

        return NextResponse.json(unit)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update unit"
        },
            { status: 500 }
        )
    }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.unit.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
