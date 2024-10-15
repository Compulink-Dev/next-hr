import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const fleetReport = await db.fleetReport.findUnique({
            where: {
                id
            }
        })

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

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const data = await request.json()
        const fleetReport = await db.fleetReport.update({
            where: {
                id
            },
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
            message: "Failed to update fleetReport"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.fleetReport.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
