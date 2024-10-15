export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const fleetReport = await db.fleetReport.create({
            data: {
                name: data.name,
                mileage: data.mileage,
                receiptNo: data.receiptNo,
                description: data.description,
                vehicleId: data.vehicleId,
                createdAt: data.createdAt
            },
        })
        console.log(fleetReport);

        return NextResponse.json(fleetReport)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create fleetReport"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const fleetReport = await db.fleetReport.findMany({})

        return NextResponse.json(fleetReport)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create fleetReport"
        },
            { status: 500 }
        )
    }
}