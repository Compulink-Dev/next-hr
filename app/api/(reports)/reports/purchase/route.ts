export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const purchaseReport = await db.purchaseReport.create({
            data: {
                user: data.user,
                name: data.name,
                date: data.date,
                creditName: data.creditName,
                price: parseFloat(data.price),
                quantity: parseInt(data.quantity),
                description: data.description,
                technician: data.technician,
                paymentType: data.paymentType,
                attachment: data.attachment,
                status: data.status,
                createdAt: data.createdAt
            },
        })
        console.log(purchaseReport);

        return NextResponse.json(purchaseReport)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create purchaseReport"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const purchaseReport = await db.purchaseReport.findMany({})
        return NextResponse.json(purchaseReport)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create purchaseReport"
        },
            { status: 500 }
        )
    }
}