import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { name, phone, email, address, contactPerson, supplierCode, paymentTerms, taxID, notes } = await request.json()

        const supplier = await db.supplier.create({
            data: { name, phone, email, address, contactPerson, supplierCode, paymentTerms, taxID, notes },
        })
        console.log(supplier);

        return NextResponse.json(supplier)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create supplier"
        },
            { status: 500 }
        )

    }
}


export async function GET(request: Request) {
    try {
        const supplier = await db.supplier.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(supplier)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create supplier"
        },
            { status: 500 }
        )
    }
}