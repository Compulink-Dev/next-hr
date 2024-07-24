export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const certification = await db.certification.create({
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
            message: "Failed to create certification"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const certification = await db.certification.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true
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