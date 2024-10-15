export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const document = await db.document.create({
            data: {
                name: data.name,
                subTitle: data.subTitle,
                attachment: data.attachment,
                category: data.category,
                createdAt: data.createdAt
            },
        })
        console.log(document);

        return NextResponse.json(document)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create document"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const document = await db.document.findMany({})

        return NextResponse.json(document)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create document"
        },
            { status: 500 }
        )
    }
}