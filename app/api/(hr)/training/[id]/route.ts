import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const training = await db.training.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(training)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create training"
        },
            { status: 500 }
        )
    }
}

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const data = await request.json()
        const training = await db.training.update({
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
                price: parseFloat(data.price),
                modality: data.modality,
                attachment: data.attachment,
                status: data.status,
                createdAt: data.createdAt
            },
        })
        console.log(training);

        return NextResponse.json(training)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update training"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.training.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
7