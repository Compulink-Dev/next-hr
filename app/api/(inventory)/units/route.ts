import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { name, abbreviation } = await request.json()

        const unit = await db.unit.create({
            data: { name, abbreviation }
        })
        console.log(unit);

        return NextResponse.json(unit)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create unit"
        },
            { status: 500 }
        )

    }
} 