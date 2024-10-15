export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const integration = await db.integration.create({
            data: {
                name: data.name,
                subTitle: data.subTitle,
                attachment: data.attachment,
                category: data.category,
                createdAt: data.createdAt
            },
        })
        console.log(integration);

        return NextResponse.json(integration)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create integration"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const integration = await db.integration.findMany({})

        return NextResponse.json(integration)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create integration"
        },
            { status: 500 }
        )
    }
}