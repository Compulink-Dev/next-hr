import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const certification = await db.certification.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(certification)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create certification"
        },
            { status: 500 }
        )
    }
}

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const data = await request.json()
        const certification = await db.certification.update({
            where: {
                id
            },
            data: {
                name: data.name,
                startDate: data.startDate,
                endDate: data.endDate,
                duration: parseFloat(data.duration),
                image: data.image,
                description: data.description,
                price: data.price,
                modality: data.modality,
                attachment: data.attachment,
                status: data.status,
                createdAt: data.createdAt
            },
        })
        console.log(certification);

        return NextResponse.json(certification)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update certification"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.certification.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
