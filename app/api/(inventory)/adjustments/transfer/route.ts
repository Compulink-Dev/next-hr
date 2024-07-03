import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { transferStockQty, itemId, givingWarehouseId, receivingWarehouseId, referenceNumber, notes } = await request.json()

        const adjustment = await db.transferStockAdjustment.create({
            data: { transferStockQty: Number(transferStockQty), itemId, givingWarehouseId, receivingWarehouseId, referenceNumber, notes }
        })
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