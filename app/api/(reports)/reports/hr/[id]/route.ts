import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const hrReport = await db.hrReport.findUnique({
            where: {
                id
            }
        })

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

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const data = await request.json()
        const hrReport = await db.hrReport.update({
            where: {
                id
            },
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
            message: "Failed to update hrReport"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.hrReport.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
