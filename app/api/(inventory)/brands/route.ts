import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { name } = await request.json()

        const brand = await db.brand.create({
            data: { name },
        })
        console.log(brand);

        return NextResponse.json(brand)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create brand"
        },
            { status: 500 }
        )

    }
} 