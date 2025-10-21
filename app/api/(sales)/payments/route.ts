import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const payment = await db.payments.create({
            data: {
                name: data.name,
                price: parseFloat(data.price),
            },
        })
        console.log(payment);

        // Auto-create PaymentsReport entry
        await db.paymentsReport.create({
            data: {
                name: payment.name ?? 'Payment',
                invoiceNo: payment.id, // using payment id as reference string
                paymentId: payment.id,
            },
        });

        return NextResponse.json(payment)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create customers"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const payments = await db.payments.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(payments)
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