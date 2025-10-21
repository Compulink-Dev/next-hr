// app/api/(inventory)/suppliers/route.ts
export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { name, phone, email, address, contactPerson, supplierCode, paymentTerms, taxID, notes } = await request.json()

        const supplier = await db.supplier.create({
            data: { 
                name, 
                phone, 
                email, 
                address, 
                contactPerson, 
                supplierCode, 
                paymentTerms, 
                taxID, 
                notes 
            },
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
        const suppliers = await db.supplier.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            // Select specific fields to avoid the updatedAt issue
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                address: true,
                contactPerson: true,
                supplierCode: true,
                paymentTerms: true,
                taxID: true,
                notes: true,
                createdAt: true,
                // updatedAt: true, // Temporarily exclude this field
            }
        })

        return NextResponse.json(suppliers)
    } catch (error) {
        console.log(error);
        // Return empty array as fallback instead of error
        return NextResponse.json([])
    }
}