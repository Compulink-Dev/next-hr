export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const hrReport = await db.hrReport.create({
            data: {
                name: data.name,
                date: data.date,
                loanId: data.loanId,
                leaveId: data.leaveId,
                createdAt: data.createdAt
            },
        })
        console.log(hrReport);

        return NextResponse.json(hrReport)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create hrReport"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const hrReport = await db.hrReport.findMany({})

        return NextResponse.json(hrReport)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create hrReport"
        },
            { status: 500 }
        )
    }
}