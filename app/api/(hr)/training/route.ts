export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const training = await db.training.create({
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
            message: "Failed to create training"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const training = await db.training.findMany({
            orderBy: {
                createdAt: 'desc'
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