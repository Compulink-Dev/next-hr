import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const payslip = await db.payslip.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(payslip)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create payslip"
        },
            { status: 500 }
        )
    }
}

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const { name, period, attachment } = await request.json()
        const payslip = await db.payslip.update({
            where: {
                id
            },
            data: {
                name, period, attachment
            }
        })
        console.log(payslip);

        return NextResponse.json(payslip)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update payslip"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.payslip.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
