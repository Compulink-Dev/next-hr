import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const fleetInvoice = await db.fleetInvoice.findUnique({
            where: {
                id
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

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const data = await request.json()
        const fleetInvoice = await db.fleetInvoice.update({
            where: {
                id
            },
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
            message: "Failed to update fleetInvoice"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.fleetInvoice.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
