export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const warehouse = await db.warehouse.create({
            data: {
                name: data.name,
                location: data.location,
                description: data.description,
                warehouseType: data.warehouseType,
                stockQty: parseInt(data.stockQty)
            }
        })
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