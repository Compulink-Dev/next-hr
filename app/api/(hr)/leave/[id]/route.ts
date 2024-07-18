import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const leave = await db.leave.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(leave)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create leave"
        },
            { status: 500 }
        )
    }
}

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const data = await request.json()
        const leave = await db.leave.update({
            where: {
                id
            },
            data: {
                type: data.type,
                source: data.source,
                from: data.from,
                to: data.to,
                duration: data.duration,
                contact: data.contact,
                reason: data.reason,
                attachment: data.attachment,
            },
        })
        console.log(leave);

        return NextResponse.json(leave)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update leave"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.leave.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
