import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // const { title, description, categoryId, sku, barcode, quantity, unitId, brandId, sellingPrice, buyingPrice, supplierId, reOrderPoint, imageUrl, warehouseId, weight, dimensions, taxRate, notes } = await request.json()
        const itemData = await request.json()


        const warehouse = await db.warehouse.findUnique({
            where: {
                id: itemData.warehouseId
            }
        })


        const currentWarehouseStock = warehouse.stockQty


        const newStockQty = parseInt(currentWarehouseStock) + parseInt(itemData.quantity)

        const updatedWarehouse = await db.warehouse.update({
            where: {
                id: itemData.warehouseId
            },
            data: {
                stockQty: newStockQty
            }
        })

        const item = await db.item.create({
            data: {
                name: itemData.name,
                description: itemData.description,
                categoryId: itemData.categoryId,
                sku: itemData.sku,
                barcode: itemData.barcode,
                quantity: parseInt(itemData.quantity),
                unitId: itemData.unitId,
                brandId: itemData.brandId,
                sellingPrice: parseFloat(itemData.sellingPrice),
                buyingPrice: parseFloat(itemData.buyingPrice),
                supplierId: itemData.supplierId,
                reOrderPoint: parseInt(itemData.reOrderPoint),
                imageUrl: itemData.imageUrl,
                warehouseId: itemData.warehouseId,
                weight: parseFloat(itemData.weight),
                dimensions: itemData.dimensions,
                taxRate: parseFloat(itemData.taxRate),
                notes: itemData.notes
            }
        })
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


export async function GET(request: Request) {
    try {
        const items = await db.item.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                category: true,
                supplier: true,
                brand: true,
                unit: true,
                warehouse: true
            }
        })

        return NextResponse.json(items)
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

