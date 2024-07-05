import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const category = await db.category.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create category"
        },
            { status: 500 }
        )
    }
}

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const { name } = await request.json()
        const category = await db.category.update({
            where: {
                id
            },
            data: {
                name
            }
        })
        console.log(category);

        return NextResponse.json(category)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update category"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.category.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
