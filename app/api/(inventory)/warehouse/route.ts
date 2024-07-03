import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { name, location, description, warehouseType } = await request.json()

        const warehouse = await db.warehouse.create({
            data: { name, location, description, warehouseType }
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