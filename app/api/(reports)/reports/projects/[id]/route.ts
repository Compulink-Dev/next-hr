import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const projectsReport = await db.projectsReport.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(projectsReport)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create projectsReport"
        },
            { status: 500 }
        )
    }
}

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const data = await request.json()
        const projectsReport = await db.projectsReport.update({
            where: {
                id
            },
            data: {
                name: data.name,
                purpose: data.purpose,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate,
                createdAt: data.createdAt
            },
        })
        console.log(projectsReport);

        return NextResponse.json(projectsReport)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update projectsReport"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.projectsReport.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
