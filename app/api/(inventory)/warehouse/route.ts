import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { title, address, description, type } = await request.json()

        const warehouse = { title, address, description, type }
        console.log(warehouse);

        return NextResponse.json(warehouse)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create warehouse"
        },
            { status: 500 }
        )

    }
} 