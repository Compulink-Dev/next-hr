import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const document = await db.document.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(document)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create document"
        },
            { status: 500 }
        )
    }
}

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const data = await request.json()
        const document = await db.document.update({
            where: {
                id
            },
            data: {
                name: data.name,
                subTitle: data.subTitle,
                attachment: data.attachment,
                createdAt: data.createdAt
            },
        })
        console.log(document);

        return NextResponse.json(document)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update document"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.document.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
