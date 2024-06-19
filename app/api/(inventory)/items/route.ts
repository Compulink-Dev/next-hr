import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { title, abbreviation } = await request.json()

        const item = { title, abbreviation }
        console.log(item);

        return NextResponse.json(item)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create item"
        },
            { status: 500 }
        )

    }
} 