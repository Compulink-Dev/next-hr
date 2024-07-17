import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const {
            transferStockQty,
            itemId,
            givingWarehouseId,
            receivingWarehouseId,
            referenceNumber,
            notes } = await request.json()




        const receivingWarehouse = await db.warehouse.findUnique({
            where: {
                id: receivingWarehouseId
            }
        })

        const givingWarehouse = await db.warehouse.findUnique({
            where: {
                id: givingWarehouseId
            }
        })



        const currentGivingWarehouseStock = givingWarehouse.stockQty

        if (parseInt(currentGivingWarehouseStock) > parseInt(transferStockQty)) {

            const currentReceivingWarehouseStock = receivingWarehouse.stockQty


            const newStockReceivingWarehouse = parseInt(currentReceivingWarehouseStock) + parseInt(transferStockQty)


            const newStockGivingWarehouse = parseInt(currentGivingWarehouseStock) - parseInt(transferStockQty)

            const updatedReceivingWarehouse = await db.warehouse.update({
                where: {
                    id: receivingWarehouseId
                },
                data: {
                    stockQty: newStockReceivingWarehouse
                }
            })


            const updatedGivingWarehouse = await db.warehouse.update({
                where: {
                    id: givingWarehouseId
                },
                data: {
                    stockQty: newStockGivingWarehouse
                }
            })




            const adjustment = await db.transferStockAdjustment.create({
                data: {
                    transferStockQty: Number(transferStockQty),
                    itemId,
                    givingWarehouseId,
                    receivingWarehouseId,
                    referenceNumber,
                    notes
                }
            })
            console.log(adjustment);

            return NextResponse.json(adjustment)
        } else {

        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error,
            message: "Failed to create adjustment"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const adjustment = await db.transferStockAdjustment.findMany({
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
        await db.transferStockAdjustment.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
