import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const salesorder = await db.salesOrder.create({
            data: {
                name: data.name,
                description: data.description,
                quantity: parseFloat(data.quantity),
                unit: data.unit,
                price: parseFloat(data.price),
                discount: parseFloat(data.discount),
                vat: parseFloat(data.vat),
                total: parseFloat(data.total),
            },
        })
        console.log(salesorder);

        return NextResponse.json(salesorder)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create salesOrders"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const salesorder = await db.salesOrder.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(salesorder)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to fetch salesorder"
        },
            { status: 500 }
        )
    }
}