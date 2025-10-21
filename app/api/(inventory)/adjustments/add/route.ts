export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function POST(request: Request) {
    try {
        const data = await request.json()



        const itemToUpdate = await db.item.findUnique({
            where: {
                id: data.itemId
            }
        })


        const currentItemQty = itemToUpdate.quantity

        const newQty = parseInt(currentItemQty) + parseInt(data.addStockQty)

        const updatedItem = await db.item.update({
            where: {
                id: data.itemId
            },
            data: { quantity: newQty }
        });

        const warehouse = await db.warehouse.findUnique({
            where: {
                id: data.receivingWarehouseId
            }
        })

        const currentWarehouseStock = warehouse.stockQty

        const newStockQty = parseInt(currentWarehouseStock) + parseInt(data.addStockQty)

        const updatedWarehouse = await db.warehouse.update({
            where: {
                id: data.receivingWarehouseId
            },
            data: {
                stockQty: newStockQty
            }
        })

        const adjustment = await db.addStockAdjustment.create({
            data: {
                itemId: data.itemId,
                supplierId: data.supplierId,
                referenceNumber: data.referenceNumber,
                addStockQty: parseInt(data.addStockQty),
                receivingWarehouseId: data.receivingWarehouseId,
                notes: data.notes

            }
        })

        // Auto-create a PurchaseReport entry (used here as stock movement log)
        try {
            const session = await getServerSession(authOptions);
            const userId = (session as any)?.user?.id as string | undefined;
            const quantity = parseInt(data.addStockQty);
            const description = `Add ${quantity} of ${itemToUpdate?.name ?? 'item'} to ${warehouse?.name ?? 'warehouse'} (ref ${data.referenceNumber})`;
            if (userId) {
                await db.purchaseReport.create({
                    data: {
                        name: 'Stock Addition',
                        date: new Date().toISOString(),
                        quantity,
                        price: 0,
                        description,
                        technician: (session as any)?.user?.name ?? 'system',
                        paymentType: 'N/A',
                        userId,
                    }
                });
            }
        } catch (e) {
            console.error('Failed to create PurchaseReport for stock addition:', e);
        }

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


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.addStockAdjustment.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
