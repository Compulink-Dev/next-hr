import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const salesReport = await db.salesReport.findUnique({
            where: {
                id
            }
        })

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

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const data = await request.json()
        const salesReport = await db.salesReport.update({
            where: {
                id
            },
            data: {
                name: data.name,
                vehicleId: data.vehicleId,
                clientId: data.clientId,
                productId: data.productId,
                location: data.location,
                time: data.time,
                paymentType: data.paymentType,
                amount: data.amount,
                createdAt: data.createdAt
            },
        })
        console.log(salesReport);

        return NextResponse.json(salesReport)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update Sales Report"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.salesReport.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
