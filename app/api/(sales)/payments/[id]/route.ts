import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const payment = await db.payments.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(payment)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create customer"
        },
            { status: 500 }
        )
    }
}

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const { name, price } = await request.json()
        const payment = await db.payments.update({
            where: {
                id
            },
            data: {
                name,
                price: parseFloat(price),
            }
        })
        console.log(payment);

        return NextResponse.json(payment)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update customer"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        // Remove related reports first
        await db.paymentsReport.deleteMany({ where: { paymentId: params.id } });
        await db.payments.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
