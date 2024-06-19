import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { title, abbreviation } = await request.json()

        const adjustment = { title, abbreviation }
        console.log(adjustment);

        return NextResponse.json(adjustment)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create adjustment"
        },
            { status: 500 }
        )

    }
} 