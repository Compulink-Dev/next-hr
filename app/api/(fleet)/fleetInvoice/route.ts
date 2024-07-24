export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const fleetInvoice = await db.fleetInvoice.create({
            data: {
                name: data.name,
                location: data.location,
                time: data.time,
                paymentType: data.paymentType,
                amount: parseFloat(data.amount),
            },
        })
        console.log(fleetInvoice);

        return NextResponse.json(fleetInvoice)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create fleetInvoice"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const fleetInvoice = await db.fleetInvoice.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(fleetInvoice)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create fleetInvoice"
        },
            { status: 500 }
        )
    }
}