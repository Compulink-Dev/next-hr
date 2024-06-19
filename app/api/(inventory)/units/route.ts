import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { name } = await request.json()

        const unit = { name }
        console.log(unit);

        return NextResponse.json(unit)
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