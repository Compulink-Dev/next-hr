export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const loans = await db.loans.create({
            data: {
                payment: data.payment,
                type: data.type,
                amount: parseFloat(data.amount),
                repayment: data.repayment,
                repayments: parseInt(data.repayments),
                reason: data.reason,
                interest: parseFloat(data.interest),
                installment: parseFloat(data.installment),
                attachment: data.attachment,
            },
        })
        console.log(loans);

        return NextResponse.json(loans)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create loan"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const loans = await db.loans.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(loans)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create loans"
        },
            { status: 500 }
        )
    }
}