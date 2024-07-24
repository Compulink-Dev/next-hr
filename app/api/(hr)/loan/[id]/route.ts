import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const loans = await db.loans.findUnique({
            where: {
                id
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

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const data = await request.json()
        const loans = await db.loans.update({
            where: {
                id
            },
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
            message: "Failed to update loans"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.loans.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
