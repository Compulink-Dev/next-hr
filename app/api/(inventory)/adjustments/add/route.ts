import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { referenceNumber, itemId, addStockQty, receivingWarehouseId, notes } = await request.json()

        const adjustment = await db.addStockAdjustment.create({
            data: { referenceNumber, itemId, addStockQty: Number(addStockQty), receivingWarehouseId, notes }
        });
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
        const adjustment = await db.addStockAdjustment.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

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