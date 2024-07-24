export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { name, period, attachment } = await request.json()

        const payslip = await db.payslip.create({
            data: { name, period, attachment },
        })
        console.log(payslip);

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

export async function GET(request: Request) {
    try {
        const payslip = await db.payslip.findMany({
            orderBy: {
                createdAt: 'desc'
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