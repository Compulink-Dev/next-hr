import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { qtyStock, branch, notes } = await request.json()

        const adjustment = { qtyStock, branch, notes }
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