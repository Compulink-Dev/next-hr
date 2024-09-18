export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const salesReport = await db.salesReport.create({
            data: {
                name: data.name,
                date: data.date,
                creditName: data.creditName,
                quantity: parseFloat(data.quantity),
                price: parseFloat(data.price),
                technician: data.technician,
                description: data.description,
                attachment: data.attachment,
                status: data.status,
                createdAt: data.createdAt
            },
        })
        console.log(salesReport);

        return NextResponse.json(salesReport)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create Sales Report"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const salesReport = await db.salesReport.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true
            }
        })

        return NextResponse.json(salesReport)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create salesReport"
        },
            { status: 500 }
        )
    }
}