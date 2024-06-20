import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { title, description, categoryId, sku, barcode, quantity, unitId, brandId, sellingPrice, buyingPrice, supplierId, reOrderPoint, imageUrl, warehouseId, weight, dimensions, taxRate, notes } = await request.json()

        const item = { title, description, categoryId, sku, barcode, quantity, unitId, brandId, sellingPrice, buyingPrice, supplierId, reOrderPoint, imageUrl, warehouseId, weight, dimensions, taxRate, notes }
        console.log(item);

        return NextResponse.json(item)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create item"
        },
            { status: 500 }
        )

    }
} 