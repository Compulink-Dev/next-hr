import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const integration = await db.integration.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(integration)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create integration"
        },
            { status: 500 }
        )
    }
}

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const data = await request.json()
        const integration = await db.integration.update({
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
        console.log(integration);

        return NextResponse.json(integration)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update integration"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.integration.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
