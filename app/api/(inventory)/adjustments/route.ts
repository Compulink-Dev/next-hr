export const dynamic = "force-dynamic";
import db from "@/lib/db";
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

export async function GET(request: Request) {
    try {
        const warehouse = await db.warehouse.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

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