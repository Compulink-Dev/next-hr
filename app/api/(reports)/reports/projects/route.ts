export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const projectsReport = await db.projectsReport.create({
            data: {
                name: data.name,
                purpose: data.purpose,
                destination: data.destination,
                startDate: data.startDate,
                endDate: data.endDate,
                status: data.status,
                createdAt: data.createdAt
            },
        })
        console.log(projectsReport);

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

export async function GET(request: Request) {
    try {
        const projectsReport = await db.projectsReport.findMany({
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